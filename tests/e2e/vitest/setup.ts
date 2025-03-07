import { getPool } from "@coyle/database";
import { createDatabases, runMigrations } from "./utils/database";
import { startPostgresContainer } from "./utils/docker";
import { spawn } from "child_process";
import waitOn from "wait-on";

let nextProcess: any;

export async function setup() {
  console.log("Starting PostgreSQL server...");
  const container = await startPostgresContainer();
  const connection = container.getConnectionUri();
  console.log(`Started PostgreSQL server at "${connection}"!`);

  const [adminDb] = await createDatabases(connection);

  process.env.DB_HOST = container.getHost();
  process.env.DB_PORT = container.getPort().toString();
  process.env.DB_USERNAME = container.getUsername();
  process.env.DB_PASSWORD = container.getPassword();
  process.env.DB_NAME = adminDb;
  process.env.PORT = "3002";
  process.env.NEXT_PUBLIC_SOCKET_SITE = "http://localhost:3002";

  console.log("Migrating database...");
  console.log("Migrated database", await runMigrations());

  // Start Next.js server
  console.log("Starting Next.js server...");
  nextProcess = spawn(
    "yarn",
    ["workspace", "@coyle/web", "start", "-p", "3000"],
    { stdio: "inherit", shell: true, detached: true },
  );

  nextProcess.on("error", (err) => {
    console.error("Failed to start subprocess.", err);
  });

  nextProcess.on("exit", (code, signal) => {
    console.log(
      `Next.js server process exited with code ${code} and signal ${signal}`,
    );
  });

  // Wait for the server to be available
  await waitOn({ resources: ["http://localhost:3000"] });

  console.log("Next.js server is running!");
}

export async function teardown() {
  console.log("Stopping Next.js server...");
  if (nextProcess) {
    nextProcess.kill();
  }

  console.log("Closing database connection...");
  await getPool().end();
}
