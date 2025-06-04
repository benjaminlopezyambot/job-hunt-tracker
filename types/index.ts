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
  status: Exclude<JobStatus, "all">;
  dateApplied: string;
};
