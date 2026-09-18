export type Article = {
  slug: string;
  title: string;
  category: string;
  author?: string;
  date?: string;
  readingTime?: string;
  summary?: string;
  keyTerms?: string[];
  body?: string[];
};

export type Event = {
  slug: string;
  title: string;
  date: string;
  location: string;
  facts: string[];
  description?: string;
  rounds?: string[];
  support?: string;
  className: string;
};

export const articles: Article[] = [
  {
    slug: "how-does-monetary-policy-work",
    title: "How Does Monetary Policy Work?",
    category: "World economy",
    author: "Diana Baizhanova",
    date: "February 28, 2024",
    readingTime: "3 min read",
    summary:
      "An explanation of monetary policy, inflation, exchange rates and the United Kingdom's response to high inflation.",
    keyTerms: ["Inflation", "Monetary policy", "Exchange rate", "GDP"],
    body: [
      "The article examines how contractionary monetary policy was used in the United Kingdom to respond to high inflation.",
      "It considers interest rates, consumption, GDP, exchange rates and the limits of monetary policy without complementary fiscal policy.",
    ],
  },
  {
    slug: "minimum-wages-are-rising-around-the-world",
    title: "Minimum wages are rising around the world",
    category: "World economy",
    author: "Diana Baizhanova",
    date: "February 28, 2024",
    readingTime: "3 min read",
    summary:
      "An analysis of minimum wages as a price floor and their effects on workers, producers, consumers, government and society.",
    keyTerms: ["Price floor", "Surplus", "Minimum wage"],
    body: [
      "The article uses examples from several countries to examine why governments raise minimum wages and how the policy affects stakeholders.",
      "It describes possible benefits including higher incomes and living standards, alongside unemployment, inflation and welfare-loss risks.",
    ],
  },
  {
    slug: "dealing-with-air-pollution-in-different-countries",
    title: "Dealing with air pollution in different countries",
    category: "Economic theory",
    author: "Diana Baizhanova",
    date: "February 1, 2024",
    readingTime: "4 min read",
    summary:
      "A discussion of air pollution as a negative externality and policy responses including carbon taxes, tradable permits, regulation and international agreements.",
    keyTerms: ["Negative externality of production", "Air pollution"],
    body: [
      "The article describes air pollution from fossil-fuel production as a negative externality where marginal social cost exceeds marginal private cost.",
      "It compares carbon taxes, tradable permits, legislation and international agreements, including their possible strengths and limitations.",
    ],
  },
  {
    slug: "inflation-soars-in-kazakhstan",
    title: "Inflation Soars in Kazakhstan",
    category: "Economy of Kazakhstan",
    author: "Aiana Zhulmukhambetova",
    date: "October 15, 2023",
    readingTime: "3 min read",
    summary:
      "An overview of inflation in Kazakhstan, including regional differences, currency devaluation and monetary policy responses.",
    body: [
      "The article discusses how rising prices affect households and how inflation in Kazakhstan is connected to regional conditions, global supply disruptions and the tenge.",
      "It considers the role of monetary policy and the National Bank of Kazakhstan in managing inflation while supporting economic stability.",
    ],
  },
  {
    slug: "unveiling-kazakhstan-s-economic-transformation-a-thriving-nation-at-the-crossroads-of-opportunity",
    title: "Unveiling Kazakhstan's Economic Transformation: A Thriving Nation at the Crossroads of Opportunity",
    category: "Economy of Kazakhstan",
    author: "Zhangir Kuanyshev",
    date: "May 28, 2023",
    readingTime: "3 min read",
    summary: "An article about Kazakhstan's economic diversification, investment environment and sustainable development.",
  },
  {
    slug: "the-effectiveness-of-fiscal-policy-in-achieving-the-economic-growth",
    title: "The effectiveness of fiscal policy in achieving the economic growth.",
    category: "World economy",
    author: "Zhangir Kuanyshev",
    date: "May 27, 2023",
    readingTime: "4 min read",
    summary: "An analysis of fiscal policy, economic growth, crowding out and alternative monetary policy responses.",
  },
  {
    slug: "tackling-unemployment-in-kazakhstan",
    title: "Tackling Unemployment in Kazakhstan",
    category: "Economy of Kazakhstan",
    author: "Zhamilya Akhmetova",
    date: "October 14, 2023",
    readingTime: "2 min read",
  },
  {
    slug: "closer-look-to-income-inequality-in-kazakhstan",
    title: "Closer look to income inequality in Kazakhstan",
    category: "Economy of Kazakhstan",
  },
  {
    slug: "a-closer-look-at-slower-growth",
    title: "A Closer Look at Slower Growth",
    category: "Economy of Kazakhstan",
  },
  {
    slug: "kazakhstan-s-quest-for-economic-resilience-diversifying-beyond-oil",
    title: "Kazakhstan's Quest for Economic Resilience: Diversifying Beyond Oil",
    category: "Economy of Kazakhstan",
  },
  {
    slug: "landlocked-wonders-kazakhstan-s-unique-geographical-challenge",
    title: "Landlocked Wonders: Kazakhstan's Unique Geographical Challenge",
    category: "Economy of Kazakhstan",
  },
  {
    slug: "in-2022-norwegian-state-introduced-electicity-subsidies",
    title: "In 2022 Norwegian State Introduced Electricity Subsidies",
    category: "World economy",
  },
  {
    slug: "to-combat-obesity-the-government-imposed-taxes-on-unhealthy-food-items-in-india",
    title: "To Combat Obesity, the Government Imposed Taxes on Unhealthy Food Items in India",
    category: "World economy",
  },
  {
    slug: "the-effect-of-introducing-price-controls-on-the-stakeholders",
    title: "The effect of introducing price controls on the stakeholders",
    category: "Economic theory",
  },
  {
    slug: "template-how-to-write-a-tips-blog-post",
    title: "Template: How to Write a Tips Blog Post",
    category: "Economic theory",
  },
];

export const events: Event[] = [
  {
    slug: "major-economics-olympiad-meo",
    title: "Major Economics Olympiad (MEO)",
    date: "24 July–5 August 2025",
    location: "Astana, Kazakhstan",
    facts: ["6 countries", "19 cities", "345 participants", "104 teams", "900,000 KZT funding"],
    description:
      "The Major Economics Olympiad brought together young economic thinkers from six countries and 19 cities.",
    rounds: [
      "Round 1: online selection with multiple-choice microeconomics and macroeconomics questions.",
      "Round 2: an offline final where 104 teams presented solutions to a real-world business case.",
    ],
    className: "bg-[var(--brand-blue)]",
  },
  {
    slug: "youth-economics-olympiad-yeo",
    title: "Youth Economics Olympiad (YEO)",
    date: "30 September–3 November 2024",
    location: "Astana, Kazakhstan",
    facts: ["45 cities", "20+ countries", "2,000 participants", "134 schools", "1,500,000 KZT investments"],
    description:
      "The Youth Economics Olympiad united young people from around the world through online selection and an applied offline final.",
    rounds: [
      "Round 1: online selection using multiple-choice microeconomics and macroeconomics questions.",
      "Round 2: an offline business case presented to economics and management professionals.",
    ],
    className: "bg-[var(--brand-purple)]",
  },
  {
    slug: "national-economics-olympiad-nec",
    title: "National Economics Olympiad (NEC)",
    date: "1–23 August 2024",
    location: "Astana, Kazakhstan",
    facts: ["Kazakhstan and Kyrgyzstan", "14 cities", "500 participants", "50 schools", "1,600,000 KZT investments"],
    description:
      "The National Economics Challenge was designed to identify and nurture young economists in Kazakhstan and Kyrgyzstan.",
    rounds: [
      "Round 1: online qualification covering microeconomics and macroeconomics.",
      "Round 2: an offline final based on a real-world business case and presentation.",
    ],
    className: "bg-[var(--brand-coral)]",
  },
  {
    slug: "qazeconomics-olympiad",
    title: "QazEconomics Olympiad",
    date: "9–10 December 2023",
    location: "Olympiad's meet",
    facts: ["Registration closed", "Teams of three members"],
    description:
      "The QazEconomics Olympiad was supported by ForteBank, Eurasian Trading System commodity exchange and Avantgarde Advisory.",
    support: "ForteBank, Eurasian Trading System commodity exchange and Avantgarde Advisory.",
    className: "bg-[var(--brand-magenta)]",
  },
];

export const studentResources = [
  {
    slug: "lessons",
    title: "Lessons",
    description: "Grade 9 economics lessons covering foundations, markets, elasticity, production and economic agents.",
    href: "/for-students/lessons",
  },
  {
    slug: "olympiad-preparation",
    title: "Olympiad Preparation",
    description: "The live site provides preparation materials for macroeconomics, microeconomics, exam style and economic theory.",
    href: "/for-students/olympiad-preparation",
  },
  {
    slug: "olympiad-tracker",
    title: "Olympiad Tracker",
    description: "External links and short descriptions for AEO, IEO and the National Economics Olympiad.",
    href: "/for-students/olympiad-tracker",
  },
  {
    slug: "essentials-of-economics",
    title: "Essentials of Economics",
    description: "A book covering MYP, A-Level and AP Economics for teenagers, especially students in grades 7–9.",
    href: "/for-students/essentials-of-economics",
  },
];

export const articleCategories = [
  "All Posts",
  "Economy of Kazakhstan",
  "World economy",
  "Economic theory",
];