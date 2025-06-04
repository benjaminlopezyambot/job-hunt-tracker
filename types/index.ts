export type JobStatus =
  | "applied"
  | "interviewing"
  | "offer"
  | "rejected"
  | "all";

export type Job = {
  id: string;
  company: string;
  position: string;
  status: JobStatus;
  dateApplied: string;
  priority?: "high" | "medium" | "low" | "";
  workSetup?: "onsite" | "remote" | "hybrid" | "";
  salary?: string;
};
