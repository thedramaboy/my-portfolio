export type Challenge = {
  title: string;
  problem: string;
  investigation?: string;
  solution: string;
  result?: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  year: string;
  level: 1 | 2 | 3;
  technologies: string[];
  images: string[];
  // case study fields
  requirements?: string;
  databaseDesign?: string;
  techStack?: Record<string, string[]>;
  stackRationale?: string;
  challenges?: Challenge[];
  outcome?: string;
};

export const projects: Project[] = [
  {
    slug: "queuemein",
    title: "QueueMeIn",
    description: "Clinic appointment & queue management SaaS",
    year: "2026",
    level: 3,
    technologies: ["React", "Vite", "shadcn/ui", "MUI X", "TanStack Query", "Zustand", "Node.js (Express)", "Prisma ORM", "PostgreSQL", "JWT", "LINE API", "Vercel", "Railway"],
    techStack: {
      Language: ["JavaScript"],
      Frontend: ["React", "Vite", "shadcn/ui", "MUI X DataGrid", "Zustand"],
      Backend: ["Node.js", "Express", "Prisma ORM", "JWT"],
      Database: ["PostgreSQL"],
      Services: ["LINE Messaging API"],
      Infrastructure: ["Vercel", "Railway"],
    },
    images: [],
    requirements:
      "A Thai aesthetic clinic with 3 branches was managing all bookings through Facebook messages, LINE OA, and phone calls with no central system. Staff had to check multiple platforms to know who was coming in, and patient records were scattered across spreadsheets and LINE chats. I gathered requirements through a structured questionnaire with the clinic owners, which covered their services and durations, how they scheduled doctors across branches, what patient data they needed to store, how they wanted notifications to work, and what reports they cared about. The outcome of that process shaped the whole data model.",
    databaseDesign:
      "PostgreSQL via Supabase, managed with Prisma ORM. The core models are Branch, Doctor, DoctorBranch (a junction since doctors work across multiple branches), Schedule (recurring weekly slots per doctor per branch), Service (with duration in minutes), Patient, Booking, and Notification. A few design decisions worth noting: Schedule uses a dayOfWeek integer with start and end time strings rather than storing individual date slots - the clinic runs on a consistent weekly pattern so generating available slots from a recurring schedule made more sense than maintaining a calendar of individual entries. Booking has a self-referencing rescheduledFrom field so you can trace the full chain of reschedules for any appointment. Notification stores scheduledAt and sentAt separately and logs errors per attempt, which supports the hourly cron job retrying failed LINE messages. There's also a PendingLineUser model for LINE webhook users who interact before a staff member has linked them to a patient record.",
    stackRationale:
      "React + Vite for the frontend - a fast SPA was the right fit since this is a staff-facing tool, not a public-facing site. MUI X DataGrid handled the sortable, paginated tables across most pages, and shadcn/ui covered forms and dialogs. Zustand managed auth state. On the backend, Express with Prisma in a Controller-Service-Router structure, with Zod schemas for request validation at the route layer. LINE Messaging API ran on an hourly cron job for appointment reminders - the clinic specifically wanted a day-before evening notification and a morning-of reminder at 8 AM. Railway for the backend since it needs to stay always-on for the cron, Vercel for the frontend.",
    challenges: [
      {
        title: "Preventing doctor double-booking across branches",
        problem: "Doctors work at different branches on different days. The system needed to prevent a doctor from being scheduled at two branches simultaneously - but the booking flow had to guide staff to valid slots without exposing the constraint directly.",
        investigation: "The naive approach was checking availability on the frontend. But two concurrent requests could still commit a conflict, and the frontend can be bypassed entirely. The constraint had to live at the data layer.",
        solution: "The Schedule model uses a unique constraint on (branchId, doctorId, dayOfWeek), so each doctor can only have one working pattern per day per branch. Slot availability is calculated server-side from that recurring pattern. The booking controller re-validates the selected time against the doctor's schedule before inserting - so a conflict cannot be committed even under concurrent requests.",
        result: "Doctor double-booking is prevented at the database level, not the UI. The constraint holds regardless of how the booking request originates.",
      },
      {
        title: "Branch-scoped data access without leaking across branches",
        problem: "Staff at one branch should only see patients and bookings from their own branch. Hiding data in the UI is not access control - I needed the restriction enforced on the backend so it couldn't be bypassed by constructing a request manually.",
        solution: "Added a branchId to the User model. An effectiveBranchId helper is called at the top of every controller before any query. ADMIN and SUPERUSER return null, meaning no branch filter is applied. STAFF return their assigned branchId, which gets injected as a Prisma where condition on every query. Controllers pass intent - the helper resolves scope.",
        result: "Branch isolation is enforced server-side on every request. A staff member at Branch A cannot retrieve Branch B's data even if they construct the request directly.",
      },
      {
        title: "Handling LINE messages before a patient record exists",
        problem: "Patients often message the clinic via LINE before being registered in the system. The webhook was receiving LINE user IDs with no matching Patient record and had no way to handle that state cleanly.",
        investigation: "I mapped the full lifecycle: message received, check lineUserId on Patient, not found, dead end. There was a gap between 'LINE user exists' and 'patient record exists' with no holding state in between.",
        solution: "Created a PendingLineUser model. The webhook checks for a matching Patient first - if none exists, the LINE user ID is stored in PendingLineUser instead. Staff can link a pending user to an existing patient through the admin UI, moving the lineUserId to the Patient record and enabling notifications.",
        result: "No LINE interactions are lost during the window before a patient is registered. Staff have a clear workflow to connect LINE contacts to patient records when they come in.",
      },
    ],
    outcome:
      "Deployed on Vercel and Railway, currently piloted with the clinic. The system replaced a workflow that was spread across Facebook, LINE, phone calls, and spreadsheets with one place to manage bookings, patient records, doctor schedules, and LINE notifications. What shipped: multi-branch booking management, doctor scheduling, patient records with LINE integration, automated reminders via cron, a reports page with new vs returning patient breakdown, three-role access control, and 16 unit tests on the controller logic.",
  },
  {
    slug: "jr-plus",
    title: "JR Plus",
    description: "Pharmacy e-commerce dashboard with order and warehouse workflow",
    year: "2025",
    level: 3,
    technologies: ["Next.js", "TypeScript", "Supabase", "TanStack Query", "Zustand", "Recharts", "Tailwind CSS"],
    techStack: {
      Language: ["TypeScript"],
      Frontend: ["Next.js", "TanStack Query", "Zustand", "Recharts", "Tailwind CSS"],
      Database: ["Supabase (PostgreSQL)"],
    },
    images: [
      "/projects/jr/jr1.JPG",
      "/projects/jr/jr2.JPG",
      "/projects/jr/jr3.JPG",
      "/projects/jr/jr4.JPG",
      "/projects/jr/jr5.JPG",
    ],
    requirements:
      "This was an admin dashboard for a Thai pharmacy distributor. My scope was three sections: Overview (KPI cards and 30-day revenue/order charts), Order management (the full workflow from payment verification through warehouse picking and packing to shipping), and Product management (with per-lot pricing and expiry tracking). The order side especially had a lot of moving parts - the client wanted to know exactly who changed what and when at every step.",
    databaseDesign:
      "The database was PostgreSQL through Supabase. Most of the read-heavy pages pulled from pre-built views rather than raw tables - v_stats_card for the KPI overview, v_orders for the paginated order list, v_order_details for the order detail page, and v_product_details for the product list with thumbnail data. On the write side, one thing that caught me off guard was that payment status lives on payment_groups, not on orders directly. A separate payment_group_orders junction table ties a payment group to its orders. Shipping status has its own table (order_shipments), and every change gets logged to order_shipping_history with who made it and an optional note. Products support up to 3 lots via product_batches, each with independent quantity, cost, sale price, and expiry date. Per-item warehouse picks are tracked in order_item_picks with picked_by, picked_at, and a verified_quantity field.",
    stackRationale:
      "TanStack Query was the right call here because the order detail page needed several data sources in parallel and cache invalidation needed to be tight - updating an order status should immediately refresh all the related views. Supabase gave me auth, Postgres, and storage without needing a separate backend. Recharts handled the line charts on the overview page.",
    challenges: [
      {
        title: "Payment status hidden in a junction table",
        problem: "Payment status updates weren't sticking. I was writing to the orders table and the changes weren't reflected anywhere on the page.",
        investigation: "Traced through the schema and found that orders don't own payment status directly. A payment_groups table owns the status, and orders connect to it through a payment_group_orders junction table. My updates were targeting the wrong table and doing nothing.",
        solution: "Centralized all order mutations into a single useUpdateOrder hook. You pass a type ('payment', 'shipping', or 'region') and the hook resolves the correct chain of lookups and writes internally. The UI passes intent - the hook handles which tables are involved.",
        result: "Order status updates are reliable. The mutation logic lives in one place, and adding a new update type later is a single addition to the hook.",
      },
      {
        title: "Shipping audit trail without slowing down warehouse staff",
        problem: "The client needed a complete log of every shipping status change - who changed it, when, and optionally why. But warehouse staff update statuses throughout the day and I didn't want every action to feel like filing a form.",
        solution: "A modal appears before any shipping status update, asking for the staff member's name and an optional note. The hook then writes to both order_shipments and order_shipping_history in one call. The note field is optional - staff don't feel required to justify routine updates, but the field is there when it matters.",
        result: "A full audit trail exists for every shipping status change. The one-step modal is quick enough that staff actually use it.",
      },
      {
        title: "Saving product lots without a diff algorithm",
        problem: "Products support up to 3 lots with independent pricing and expiry. On save, the system needed to handle new lots, edited lots, and removed lots - without turning the save logic into a state diff.",
        solution: "Delete all existing batches for the product, then re-insert whatever the current form contains. Since batch_number (1, 2, or 3) is the only identifier and nothing else references batches by row ID, there's no referential integrity to break. The save logic stays flat and predictable.",
        result: "Product lot saves are reliable regardless of what changed. No diffing, no patch logic - just delete and rewrite.",
      },
    ],
    outcome:
      "Shipped the Overview, Order, and Product sections. Orders could be tracked from payment pending all the way through to delivered, with a full history of who touched each step. Products supported up to 3 lots with independent pricing and expiry, which the client needed for managing near-expiry stock.",
  },
  {
    slug: "bsh-drug",
    title: "BSH Drug",
    description: "Thai pharmacy drug information admin panel",
    year: "2025",
    level: 3,
    technologies: ["Next.js", "TypeScript", "Supabase", "shadcn/ui", "xlsx", "Tailwind CSS"],
    techStack: {
      Language: ["TypeScript"],
      Frontend: ["Next.js", "shadcn/ui", "Tailwind CSS"],
      Database: ["Supabase (PostgreSQL)"],
      Libraries: ["xlsx", "react-colorful"],
    },
    images: [
      "/projects/bsh/bsh1.JPG",
      "/projects/bsh/bsh2.JPG",
      "/projects/bsh/bsh3.JPG",
    ],
    requirements:
      "A Thai pharmacy needed an admin panel to manage the drug information that powers their companion mobile app. The main things they needed: organize drugs into color-coded categories, attach images and PDFs to each drug, add structured detail sections (like dosage, indications, side effects), and let admins control the app's theme images and app config. They also needed to manage the informed consent document that users see in the app, and view each user's profile alongside the in-app survey responses they had filled in. Exporting all of that user and survey data to Excel was part of the scope too. On top of that, they had hundreds of existing drug records sitting in Excel spreadsheets that they wanted to bulk import, and needed to export back out in the same format.",
    databaseDesign:
      "I used PostgreSQL through Supabase. The core tables were categories, drugs (linked to a category), drug_attachments (covering both images and PDFs with an order_index so the main image is always first), and drug_details (key-value sections per drug with their own ordering). I also set up a consents table to version the informed consent document, and a user_survey table that stored responses to a 5-category in-app questionnaire (usability, accuracy, efficiency, satisfaction, impact). A data_version table handled mobile app cache invalidation so the app knows to refresh when drug data changes. For the Excel export I created a database view called export_details that pre-joined all the drug data so the export API route just maps rows to columns without doing any joins in code. Files went into Supabase Storage, split into separate buckets for drug assets and theme images.",
    stackRationale:
      "Supabase was a good fit here - auth, storage, and database all in one place for what was essentially an internal tool. The xlsx library handled both reading uploaded Excel files and generating the export. For the category color picker I used react-colorful since it's lightweight and easy to wire into a controlled input.",
    challenges: [
      {
        title: "Uploading large PDFs without routing through the server",
        problem: "Drug information PDFs can be large. Routing them through a Next.js API route to reach Supabase Storage would hold a server connection open for the duration and hit Next.js's default body size limit.",
        investigation: "Traced how existing image uploads worked - every byte was flowing through the API route. That was fine for small images but would fail for multi-megabyte PDFs.",
        solution: "Split the upload into two steps. The browser uploads directly to Supabase Storage using the client-side SDK. Once complete, a lightweight API route receives only the returned storage path and writes the URL to drug_attachments. The server never handles file bytes.",
        result: "PDF uploads bypass the server body size limit entirely. The server connection isn't held open during the upload.",
      },
      {
        title: "Importing Excel files with inconsistent column names",
        problem: "The client's drug spreadsheets were created by multiple people over several years. Column names and structure varied between files, so I couldn't rely on a fixed schema.",
        solution: "After parsing each file with xlsx, a normalization pass maps whatever headers exist to the expected field names using a lookup table. Rows that can't be mapped are collected into a validation report shown to the admin after import - they see exactly which rows didn't make it through and why.",
        result: "The import handles varied spreadsheet formats without crashing. Admins get a clear picture of what was imported and what was skipped.",
      },
      {
        title: "Preventing orphaned files when replacing theme images",
        problem: "When an admin replaces a theme image, the old file needed to be deleted from Supabase Storage. Just uploading the new file and updating the database row would leave old files accumulating with no reference.",
        solution: "The upload route fetches the current image URL first, deletes the old file from storage, uploads the new file, then upserts the database row - in that exact order. A failed upload leaves the database still pointing at the old file rather than a dead URL.",
        result: "Storage stays clean on every update. A failed mid-upload doesn't leave the database in an inconsistent state.",
      },
    ],
    outcome:
      "Delivered the full admin panel: drug categories with color labels, drug management with images and PDFs, structured detail sections, informed consent version management, user viewer with in-app survey responses and Excel export, feedback and review dashboard, theme image management, app config, and Excel import/export for drug data. The bulk import saved the client a lot of manual entry since they had hundreds of drug records sitting in spreadsheets.",
  },
  {
    slug: "tempjob",
    title: "TempJob",
    description: "Freelance engagement on a live Thai job-seeking platform - infrastructure rescue, bug fixes, and 15-feature delivery",
    year: "2025",
    level: 2,
    technologies: ["React Native (Expo)", "Next.js", "Node.js (Express)", "Supabase", "Google Maps Static API", "EAS", "Google Cloud Console"],
    techStack: {
      Language: ["JavaScript", "TypeScript"],
      Mobile: ["React Native", "Expo"],
      Web: ["Next.js"],
      Backend: ["Node.js", "Express"],
      Database: ["Supabase (PostgreSQL)"],
      Services: ["Google Maps Static API", "Google OAuth"],
      Infrastructure: ["EAS", "Google Cloud Console"],
    },
    images: [
      "/projects/tempjob/temp1.JPG",
      "/projects/tempjob/temp2.JPG",
      "/projects/tempjob/temp3.JPG",
      "/projects/tempjob/temp4.jpg",
    ],
    requirements:
      "TempJob was a live Thai job-seeking mobile app - similar to JobTopGun or JobThai - that connected temporary workers with employers across Thailand. The app was already on Google Play when the client brought me in, but the previous developer had left without handing over credentials and wasn't responding. Multiple features were broken, infrastructure was in a bad state, and there was no keystore for the existing Play Store listing. My job across three phases over five months was to get everything working again, migrate everything out of the old developer's accounts, and then deliver a batch of 15 improvements collected from real user feedback.",
    stackRationale:
      "The stack was pre-existing: React Native with Expo for the job seeker mobile app, Next.js for the employer web portal, and Node.js with Express on the backend using a Controller-Service-Model pattern. Supabase handled auth, Postgres, and storage. I added the Google Maps Static API during Phase 1 so workers could see a preview of a job's location directly in the app before tapping through to Google Maps. EAS managed all builds and the Play Store deployment pipeline.",
    challenges: [
      {
        title: "Play Store listing locked to an unreachable developer",
        problem: "The live Play Store listing was tied to a keystore only the previous developer had. He was completely unreachable. Without it there was no way to push updates or fixes to existing users on that listing.",
        investigation: "Explored every recovery path - Google's Play App Signing backup didn't exist for this listing, and the previous developer's Google account wasn't one the client could access. There was no path to the original keystore.",
        solution: "Created a new Play Console listing under the client's own account. Walked through EAS build configuration from scratch - signing setup, app.json, SHA-1 fingerprint registration. Submitted for review, unpublished the old listing once the new one was live. Hit EAS's free tier 15-builds-per-month limit multiple times getting signing configuration right.",
        result: "The client now owns the full deployment pipeline - Play Console account, signing credentials, and EAS project. No dependency on any previous developer.",
      },
      {
        title: "Job applications silently failing after key rotation",
        problem: "After Scope 1 wrapped, the job application feature was completely broken. Users could see job listings but couldn't submit applications. The client assumed it was something I had broken during the migration.",
        investigation: "The React Native app was sending requests normally. Traced the API call through to the Express backend and checked what it was returning - the backend was rejecting every application request. Compared environment variables across both services and found the mismatch immediately.",
        solution: "When the client had rotated the Supabase service key during the credential migration, only the frontend environment variable had been updated. The Express backend was still using the old key. Updating the backend config restored the entire feature.",
        result: "Root cause found in one debugging session, fixed with a single config change. This became the entry point for Scope 2.",
      },
    ],
    outcome:
      "Across three phases from October 2025 to March 2026, the app went from broken and stranded in a previous developer's accounts to fully live on the Play Store under the client's own infrastructure. Phase 1 restored core functionality and got it back on the Play Store with working Google Sign-In and a new job location map preview. Phase 2 fixed the apply-for-job flow and a cascade delete bug where removing a job posting was silently deleting the freelancer's profile. Phase 3 delivered 14 features across both the mobile app and the employer web portal - archive tabs, read/unread/review tracking, company profile editing, welfare sections, color and layout improvements, and more. Real users were getting jobs through the platform by the time Phase 3 started, and the client is planning a web app phase next.",
  },
  {
    slug: "goapricot",
    title: "GoApricot",
    description: "Company website built during internship",
    year: "2025",
    level: 1,
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    techStack: {
      Language: ["TypeScript"],
      Frontend: ["Next.js", "Tailwind CSS"],
    },
    images: [
      "/projects/goapricot/goapricot1.JPG",
      "/projects/goapricot/goapricot2.JPG",
      "/projects/goapricot/goapricot3.JPG",
    ],
    requirements:
      "A two-week internship task to build a company marketing site from scratch. No formal requirements doc - just a logo, a color direction, a rough idea of the sections needed (nav, hero, services, footer), and a deadline.",
    stackRationale:
      "I was genuinely curious about Next.js, TypeScript, and Tailwind CSS at the time, so I used this project to try all three at once. Looking back, I had jumped ahead of where I actually was - my JavaScript fundamentals weren't solid enough to make the most of TypeScript yet. But the constraint of a real deadline pushed me to figure things out fast.",
    challenges: [
      {
        title: "Delivering under a real deadline while learning three new tools",
        problem: "I was picking up Next.js, TypeScript, and Tailwind CSS all at once while building something with an actual deadline. It was easy to get stuck on tooling questions instead of making progress.",
        solution: "Locked in the visual direction with reference images before writing any code, so design decisions and TypeScript errors weren't competing for attention at the same time. Then built the page one section at a time, each as a self-contained component.",
        result: "Shipped in two weeks. Building section by section was also the moment I properly understood what a component is - not from reading about it, but from needing that mental model to stay organized while building.",
      },
    ],
    outcome:
      "Got the site done in about two weeks. Senior developers handled the production deployment. The code wasn't perfect but I shipped something real and learned three tools in the process. The component mindset I picked up here is something I still think about every time I start building a new UI.",
  },
  {
    slug: "flashyourmeme",
    title: "FlashYourMeme",
    description: "Bug fixes and UI improvements on a live ASP.NET Core MVC app",
    year: "2025",
    level: 1,
    technologies: ["ASP.NET Core MVC", "C#", "Firebase", "Firestore"],
    techStack: {
      Language: ["C#"],
      Framework: ["ASP.NET Core MVC"],
      Database: ["Firebase", "Firestore"],
    },
    images: ["/projects/flashyourmeme/flashyourmeme_logo.png"],
    requirements:
      "FlashYourMeme was already live when I joined. My job was to fix existing bugs, replace the page-based content feed with something smoother, and clean up the dashboard UI across multiple content categories. No new features - just making what was there work better.",
    stackRationale:
      "The stack was pre-existing: ASP.NET Core MVC with C# and Firebase. I had seen MVC in school but never really worked with it in a real codebase. This project forced me to actually understand it - not from a tutorial, but by reading live production code and figuring out what it was doing before I touched anything.",
    challenges: [
      {
        title: "Reading a production codebase before touching it",
        problem: "I was jumping into a live production codebase written by someone else in a stack I hadn't worked with seriously before. Starting to edit without understanding the flow was a reliable way to break things I wasn't supposed to touch.",
        solution: "Before changing anything, I read through the Model, View, and Controller files for every feature I was going to modify. Traced how a request moved from the route through the controller to the view and back. Only started making changes once I had a clear picture of each flow.",
        result: "Got the changes done without breaking unrelated features. The upfront reading took longer but the actual edits were fast and clean once I understood what I was looking at.",
      },
      {
        title: "Replacing page-based pagination with cursor-based loading",
        problem: "The content feed used numbered page buttons. The client found it clunky and wanted content to load continuously as the user scrolled rather than jumping between fixed pages.",
        solution: "Replaced the pagination with cursor-based loading using Firestore's startAfter() query method. Each batch stores the last document as a cursor. The next fetch passes that cursor to Firestore to load the next set. No page numbers, no offset arithmetic.",
        result: "The feed loads the next batch from where it left off. The experience feels continuous and removes the need for any page state tracking.",
      },
    ],
    outcome:
      "Fixed the bugs, shipped the cursor-based feed, and tidied up the dashboard over about 1-2 months. The biggest thing I took away from this project was learning how to work in a codebase I didn't write - which is honestly a skill you can only get by doing it.",
  },
  {
    slug: "ferra-ag",
    title: "Ferra Ag",
    description: "Farm management desktop app - SAIT Capstone project",
    year: "2023",
    level: 1,
    technologies: ["Flutter", "Dart", "Firebase", "Firestore"],
    techStack: {
      Language: ["Dart"],
      Framework: ["Flutter"],
      Database: ["Firebase", "Firestore"],
    },
    images: [
      "/projects/farm/farm1.JPG",
      "/projects/farm/farm2.JPG",
      "/projects/farm/farm3.JPG",
    ],
    requirements:
      "This was my SAIT capstone project and our client was an actual farmer. They wanted a mobile app to track everything happening on his farm - cattle, rice and crop yields, dogs, equipment like shovels and hoes with maintenance records, and tractors. The idea was to have all of it in one place so he could look back at the data and evaluate how the farm was doing over time. We gathered the requirements by talking to him directly. Nothing was formally documented - we just had conversations and turned them into features. Four months, team of 3-4 people.",
    stackRationale:
      "Flutter made sense because we needed one codebase for both desktop and mobile app and didn't have time to build two native apps. The catch was none of us had used Flutter before. Firebase and Firestore were picked because they got us a working backend without needing to set up and manage a separate server, which saved a lot of time given our timeline.",
    challenges: [
      {
        title: "Keeping the project moving when team members went quiet",
        problem: "Some team members had other commitments and would go quiet for stretches. Their tasks would sit unfinished and block progress for the rest of the team.",
        solution: "Whoever had capacity picked up the unfinished tasks and kept things moving. Usually that meant me. It wasn't always comfortable, but it was the only way to hit the deadline.",
        result: "Delivered the app on time. It was also my first real lesson in what team coordination actually looks like in practice - not everyone contributes equally and the project still needs to ship.",
      },
      {
        title: "Learning Flutter and Dart under a fixed deadline",
        problem: "None of the team had used Flutter or Dart before. We had to learn both while building a real app for a real client in four months.",
        solution: "Used the official docs and tutorials to learn exactly what each task needed, no more. Broke the UI into small isolated widgets so different team members could build different sections in parallel without stepping on each other.",
        result: "The app was delivered within the timeline. Working under a deadline forced better learning habits - you learn what you need for the task in front of you and move on.",
      },
    ],
    outcome:
      "We delivered a working app by the end of the four months. My main contribution was the frontend - designing and building the UI in Flutter, trying to make it look approachable for a client who wasn't technical at all. It was my first time working in a real team, first time using Git collaboratively, and first time learning a new language under a real deadline. A lot of firsts in one project.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
