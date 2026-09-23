import { test, expect, type Page } from "@playwright/test";

const login = async (page: Page, email = "admin@example.test") => {
  await page.goto("/admin/login");
  await page.getByLabel("Email", { exact: true }).fill(email);
  await page.getByLabel("Password", { exact: true }).fill("test-password");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  if (email === "admin@example.test") await expect(page).toHaveURL(/\/admin$/);
};

test.beforeEach(async ({ request }) => {
  await request.post("http://127.0.0.1:54329/__test/reset");
});

test("admin routes reject anonymous visitors and unapproved users", async ({
  page,
}) => {
  await page.goto("/admin/new");
  await expect(page).toHaveURL(/\/admin\/login/);
  await login(page, "member@example.test");
  await expect(page.getByRole("main").getByRole("alert")).toContainText(
    "does not have admin access",
  );
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/admin\/login/);
});

test("create, preview, publish, edit and archive an article", async ({
  page,
  browser,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await login(page);
  await expect(
    page.getByRole("heading", { name: "Content", exact: true }),
  ).toBeVisible();
  await page.screenshot({
    path: "test-results/admin-desktop.png",
    fullPage: true,
  });
  await page.getByRole("link", { name: "New content" }).click();
  await page
    .getByLabel("Title", { exact: true })
    .fill("Editorial workflow test");
  await expect(page.getByLabel("URL slug")).toHaveValue(
    "editorial-workflow-test",
  );
  await page
    .getByLabel("Summary", { exact: true })
    .fill("Browser test content, not organizational claims.");
  await page
    .getByLabel("Body", { exact: true })
    .fill(
      "## A verified workflow\n\n**Published from the admin editor.**\n\n<script>window.__unsafe = true</script>\n\n[unsafe](javascript:alert(1))",
    );
  await page.getByRole("button", { name: "Preview", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "A verified workflow" }),
  ).toBeVisible();
  await expect(page.locator('a[href^="javascript:"]')).toHaveCount(0);
  await page.screenshot({
    path: "test-results/editor-desktop.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByRole("status")).toContainText("Draft saved");
  const visitor = await browser.newPage();
  expect(
    (
      await visitor.goto(
        "http://127.0.0.1:3100/articles/editorial-workflow-test",
      )
    )?.status(),
  ).toBe(404);
  await page.getByRole("heading", { name: "Editorial workflow test" }).click();
  await page.getByLabel("Visibility").selectOption("published");
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByRole("status")).toContainText("Published");
  await visitor.goto("http://127.0.0.1:3100/articles/editorial-workflow-test");
  await expect(
    visitor.getByRole("heading", {
      name: "Editorial workflow test",
      exact: true,
    }),
  ).toBeVisible();
  expect(
    await visitor.evaluate(() => Reflect.get(window, "__unsafe")),
  ).toBeUndefined();
  await visitor.goto("http://127.0.0.1:3100/");
  await expect(
    visitor.getByRole("link", { name: "Editorial workflow test", exact: true }),
  ).toBeVisible();
  await page.getByRole("heading", { name: "Editorial workflow test" }).click();
  await page.getByLabel("Title", { exact: true }).fill("Revised workflow test");
  await expect(page.getByLabel("URL slug")).toHaveValue(
    "editorial-workflow-test",
  );
  await page.getByLabel("Visibility").selectOption("archived");
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByRole("status")).toContainText("Archived");
  expect(
    (
      await visitor.goto(
        "http://127.0.0.1:3100/articles/editorial-workflow-test",
      )
    )?.status(),
  ).toBe(404);
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/\/admin\/login/);
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/admin\/login/);
  await visitor.close();
  expect(errors).toEqual([]);
});

test("mobile publishing routes olympiads, resources and posts to their public pages", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await login(page);
  await expect(
    page.getByRole("heading", { name: "Content", exact: true }),
  ).toBeVisible();
  await page.screenshot({
    path: "test-results/admin-mobile.png",
    fullPage: true,
  });
  for (const kind of ["olympiad", "resource", "post"]) {
    await page.goto("/admin/new");
    await page.getByLabel("Content type").selectOption(kind);
    await page.getByLabel("Title", { exact: true }).fill(`Test ${kind} entry`);
    await page
      .getByLabel("Summary", { exact: true })
      .fill("Test entry for browser verification only.");
    await page.getByLabel("Visibility").selectOption("published");
    if (kind === "olympiad") {
      await page.getByLabel("Event dates").fill("To be announced");
      await page
        .getByLabel("Registration status")
        .selectOption("registration-open");
      await page
        .getByLabel("Event / registration URL")
        .fill("https://example.com/registration");
      await page.screenshot({
        path: "test-results/editor-mobile.png",
        fullPage: true,
      });
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.getByRole("button", { name: "Save changes" }).click();
    await expect(page.getByRole("status")).toContainText("Published");
    const route =
      kind === "olympiad"
        ? "/for-students/olympiad-tracker"
        : kind === "resource"
          ? "/for-students"
          : "/posts";
    await page.goto(route);
    await expect(
      page.getByRole("heading", { name: `Test ${kind} entry` }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test("invalid publication and duplicate slugs keep entered content", async ({
  page,
}) => {
  await login(page);
  await page.goto("/admin/new");
  await page
    .getByLabel("Title", { exact: true })
    .fill("Test invalid publication");
  await page.getByLabel("Visibility").selectOption("published");
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByRole("main").getByRole("alert")).toContainText(
    "Check the highlighted fields",
  );
  await expect(page.getByLabel("Title", { exact: true })).toHaveValue(
    "Test invalid publication",
  );
  await page.getByLabel("Summary", { exact: true }).fill("A summary.");
  await page.getByLabel("URL slug").fill("how-does-monetary-policy-work");
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByRole("main").getByRole("alert")).toContainText(
    "already in use",
  );
  await expect(page.getByLabel("Summary", { exact: true })).toHaveValue(
    "A summary.",
  );
  await expect(page.getByLabel("Visibility")).toHaveValue("published");
});

test("filters find content and stale edits cannot overwrite a newer version", async ({
  page,
  context,
}) => {
  await login(page);
  await page.getByLabel("Search", { exact: true }).fill("Monetary");
  await page.getByRole("button", { name: "Filter", exact: true }).click();
  await expect(
    page.getByRole("heading", {
      name: "How Does Monetary Policy Work?",
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.getByRole("main").locator("article")).toHaveCount(1);
  await page.getByRole("link", { name: "Edit", exact: true }).click();
  const other = await context.newPage();
  await other.goto(page.url());
  await other
    .getByLabel("Summary", { exact: true })
    .fill("Changes in a second tab.");
  await page
    .getByLabel("Summary", { exact: true })
    .fill("The first saved change.");
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page).toHaveURL(/saved=published/);
  await other.getByRole("button", { name: "Save changes" }).click();
  await expect(other.getByRole("main").getByRole("alert")).toContainText(
    "Someone else updated this entry",
  );
  await expect(other.getByLabel("Summary", { exact: true })).toHaveValue(
    "Changes in a second tab.",
  );
  await other.close();
});
