# The Backend

Welcome to **The Backend**! This part of the project is built using Fastify, Prisma and Postgres. Below you'll find instructions for setting up and running the project.

## Requirements

- Node.js (v22)
- npm or yarn
- Access to the provided `.env` file with the database connection string. (sent via email)

## Environment Variables

1. Place the `.env` file provided alongside this project in the root folder (backend). This file includes the `DATABASE_URL` for connecting to the preconfigured database.

## Getting Started

1. **Install Dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

2. **Database Setup**:
   This project connects to an existing database, so there’s no need to run migrations.

   - **Important**: Please do not run any Prisma migration commands, as the database is already structured. Executing migrations might interfere with the existing schema.

3. **Run the Application**:
   Start the application with:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Prisma Commands**:
   The following Prisma commands should **not** be run as part of this setup:

   :x: - `prisma migrate dev`
   &nbsp;
   :x: - `prisma migrate deploy`

   **Feel free to use**:

   - `prisma db pull` (if you wish to view the schema without altering the database).

## Return to the Main README

- [Main README](../README.md)
