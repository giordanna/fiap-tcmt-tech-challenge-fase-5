export interface DeployedResource {
  id: string;
  name: string;
  type: string;
  env: "development" | "staging" | "production";
  status: "deploying" | "running" | "testing" | "stopped";
  health: "healthy" | "degraded" | "critical";
  url: string;
  createdAt: string;
  category?: "service" | "database";
}
