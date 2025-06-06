import { create } from "zustand";
import { supabase } from "@/lib/supabase/supabaseClient";
import { Job } from "@/types";
import { v4 as uuidv4 } from "uuid";

interface JobStore {
  jobs: Job[];
  loading: boolean;
  fetchJobs: () => Promise<void>;
  addJob: (job: Omit<Job, "id">) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  editJob: (id: string, updated: Omit<Job, "id">) => Promise<void>;
}

export const useJobStore = create<JobStore>((set, get) => ({
  jobs: [],
  loading: false,

  fetchJobs: async () => {
    set({ loading: true });

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("User not found:", userError?.message);
      set({ loading: false });
      return;
    }

    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("user_id", user.id)
      .order("dateApplied", { ascending: false });

    if (!error) set({ jobs: data as Job[] });
    else console.error("Error fetching jobs:", error.message);

    set({ loading: false });
  },

  addJob: async (job) => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("User not found:", userError?.message);
      return;
    }

    const newJob = {
      ...job,
      id: uuidv4(),
      user_id: user.id,
    };

    const { error } = await supabase.from("jobs").insert(newJob);
    if (!error) {
      set({ jobs: [newJob, ...get().jobs] });
    } else {
      console.error("Error adding job:", error.message);
    }
  },

  deleteJob: async (id) => {
    const { error } = await supabase.from("jobs").delete().eq("id", id);
    if (!error) {
      set({ jobs: get().jobs.filter((job) => job.id !== id) });
    }
  },

  editJob: async (id, updatedJob) => {
    const { error } = await supabase
      .from("jobs")
      .update(updatedJob)
      .eq("id", id);
    if (!error) {
      set({
        jobs: get().jobs.map((job) =>
          job.id === id ? { ...updatedJob, id } : job
        ),
      });
    }
  },
}));
