# Line Viz Insight — Refactored (SQL + API + Airflow + Kafka)

This refactor removes in-code sample data and replaces it with:

- **SQL** (Postgres) schema + seed
- **API** endpoints under `/api/*` (Vercel serverless) using `pg`
- **Airflow** DAG stub for Kafka→Postgres
- **Kafka** (Redpanda) & Postgres via `docker-compose` for local dev

## Quick start (Local)
```bash
npm i
npm run infra:up              # start Postgres, Kafka, Airflow locally
export DATABASE_URL=postgres://app:app@localhost:5432/appdb
npm run db:apply && npm run db:seed
npm run dev
```

Airflow UI: http://localhost:8080 (admin/admin)
Redpanda: kafka broker at localhost:9092

## Deploy to Vercel
- Set `DATABASE_URL` in Vercel project (Postgres-compatible, e.g., Neon/Vercel Postgres).
- Optional: `PGSSL=1` if your provider requires SSL.
- Deploy. The frontend fetches from `/api/metrics` and `/api/anomalies`.
  When no `DATABASE_URL` is present, serverless functions serve fallback seed JSON.

## Notes
- Serverless runtimes don't keep long-lived Kafka connections. Use a REST proxy or external worker for Kafka publishing.
- Airflow and Kafka are **not** run on Vercel. They are provided for your pipeline replacement off-Vercel.


---

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/0cda72fc-0149-40cf-b2ca-8fc928097807

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/0cda72fc-0149-40cf-b2ca-8fc928097807) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/0cda72fc-0149-40cf-b2ca-8fc928097807) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
