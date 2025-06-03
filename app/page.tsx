"use client";

import React, { useState, useEffect } from "react";
import { JobForm } from "../components/JobForm";
import { JobCard } from "../components/JobCard";
import { v4 as uuidv4 } from "uuid";

type JobStatus = "applied" | "interviewing" | "offer" | "rejected" | "all";

type Job = {
  id: string;
  company: string;
  position: string;
  status: Exclude<JobStatus, "all">;
  dateApplied: string;
};

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filter, setFilter] = useState<JobStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedJobs = localStorage.getItem("jobs");
    if (storedJobs) setJobs(JSON.parse(storedJobs));
  }, []);

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (job: Omit<Job, "id">) => {
    setJobs((prev) => [{ ...job, id: uuidv4() }, ...prev]);
  };

  const deleteJob = (id: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  const editJob = (id: string, updatedJob: Omit<Job, "id">) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...updatedJob, id } : job))
    );
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesStatus = filter === "all" || job.status === filter;
    const matchesSearch =
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.position.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <main className='max-w-3xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>Job Hunt Tracker</h1>

      <section className='mb-6'>
        <JobForm onAdd={addJob} />
      </section>

      <section className='mb-6 flex flex-col sm:flex-row gap-4 sm:items-center'>
        <div>
          <label htmlFor='statusFilter' className='mr-2 font-medium'>
            Filter by Status:
          </label>
          <select
            id='statusFilter'
            value={filter}
            onChange={(e) => setFilter(e.target.value as JobStatus)}
            className='border rounded p-2'
          >
            <option value='all'>All</option>
            <option value='applied'>Applied</option>
            <option value='interviewing'>Interviewing</option>
            <option value='offer'>Offer</option>
            <option value='rejected'>Rejected</option>
          </select>
        </div>

        <div>
          <label htmlFor='search' className='mr-2 font-medium'>
            Search:
          </label>
          <input
            id='search'
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='border rounded p-2'
            placeholder='Company or Position'
          />
        </div>
      </section>

      <section>
        {filteredJobs.length === 0 ? (
          <p className='text-gray-500'>No jobs found for this status.</p>
        ) : (
          <div className='grid gap-4'>
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                {...job}
                onDelete={() => deleteJob(job.id)}
                onEdit={(updatedJob) => editJob(job.id, updatedJob)}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
