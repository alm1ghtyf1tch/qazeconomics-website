# QazEconomics content administration

The editor is at `/admin`. It manages articles, posts, olympiads, events and new
student resources. Supabase stores content and authenticates approved admins.
There is no shared password, default account, public signup or service-role key in
the application. An unconfigured installation continues to display the existing
archive and disables admin sign-in.

## Connect Supabase

1. Create a Supabase project at https://supabase.com/dashboard. Keep the database
   password private; the website does not need it.
2. In the project's SQL Editor, run
   `supabase/migrations/202609230001_content_admin.sql` once. It creates the content
   tables, indexes, timestamp trigger and row-level access policies.
3. Run `supabase/seed.sql` in SQL Editor to import the 19 existing article/event
   entries. This preserves their slugs and existing copy. It does not invent full
   article bodies or overwrite edits. Once configured, the database is the source
   of truth, including when empty. There is no fallback that resurrects archived
   content. The four existing student landing pages remain in the application;
   newly created resources are managed through the editor.
4. Get the **Project URL** and **Publishable key** from the project's Connect
   dialog. Create `.env.local` beside `package.json` using `.env.example`:

   ```dotenv
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
   ```

   A legacy anon key is also supported as `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
   Never use a secret or service-role key in a `NEXT_PUBLIC_` variable.

5. Under Authentication, disable new user signups. In Users, use **Add user /
   Create new user** to create the admin email/password account and confirm the
   email. The owner should set a unique password and share it privately.
6. Copy that user's UUID, then run this SQL with the real UUID:

   ```sql
   insert into public.cms_admins (user_id)
   values ('a3c77bda-5fa2-46c7-8589-e221ad4227f2')
   on conflict do nothing;
   ```

   Membership can only be granted by the project owner through SQL, not by a
   signed-in user. To revoke access, delete that UUID from `cms_admins`.

7. Restart `npm run dev` and open http://localhost:3000/admin. For deployment,
   configure the same environment variables in the hosting provider and redeploy.
   Set the Supabase Auth Site URL to the actual production origin. No email
   redirect URLs are needed for this password-only sign-in flow.

## Daily use

- Sign in, choose **New content**, select a content type and enter a title.
- The URL slug is generated from the title and can be changed before the first
  save. Type and URL are fixed afterward to protect existing links. For titles
  without Latin characters, enter a Latin-letter slug manually.
- Add a summary, body, author and category. Markdown supports headings, links,
  lists and images. Use **Preview** to inspect the body. Raw HTML is disabled.
- Optional cover images use a publicly reachable HTTP(S) image URL and require
  an image description. This release does not upload or store media files.
- Events and olympiads include dates, location, registration status, an external
  event link and optional facts. Enter only verified information.
- Leave visibility as **Draft** to keep the entry private. Select **Published**
  and save to make it visible immediately. **Archived** removes it from public
  listings and makes its public URL return 404. Restore it by publishing again.
- Articles appear in Articles and on the homepage. Posts appear in Updates and
  on the homepage. Olympiads/events appear in Events; non-completed olympiads
  also appear in the tracker. Resources appear in For students and on the homepage.
- An archive article keeps its original-article notice until its body is edited.
  Replace the body with complete, verified text when migrating it.
- The owner manages account creation and password resets in Supabase. There is
  no public registration or password recovery flow in this release.

## Verification

`npm run test` checks validation, migration, database policies and archive imports
using an embedded PostgreSQL instance. `npm run test:e2e` runs the publishing
workflow against a local **simulated Supabase HTTP service**, not a hosted project.
The simulator exists only under `tests/` and is never used by application code.
After connecting the real project, verify sign-in, draft isolation, publication,
editing, archiving, sign-out and denial for a user without admin membership.

The integration follows Supabase's official guides:

- https://supabase.com/docs/guides/auth/server-side/creating-a-client
- https://supabase.com/docs/guides/database/postgres/row-level-security
