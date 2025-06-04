"use client";

import { Job } from "@/types";
import React, { useState } from "react";

type Props = {
  onAdd: (job: {
    company: string;
    position: string;
    status: string;
    dateApplied: string;
    priority?: Job["priority"];
    workSetup?: Job["workSetup"];
    salary?: string;
  }) => void;
};

export const JobForm: React.FC<Props> = ({ onAdd }) => {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("applied");
  const [priority, setPriority] = useState<Job["priority"]>("");
  const [workSetup, setWorkSetup] = useState<Job["workSetup"]>("");
  const [salary, setSalary] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dateApplied = new Date().toISOString().split("T")[0];
    onAdd({
      company,
      position,
      status,
      dateApplied,
      priority,
      workSetup,
      salary,
    });
    setCompany("");
    setPosition("");
    setStatus("applied");
    setPriority("");
    setWorkSetup("");
    setSalary("");
  };
  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, ""); // Remove non-digits
    const formatted = value ? `₱${Number(value).toLocaleString("en-PH")}` : "";
    setSalary(formatted);
  };
  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <input
        type='text'
        placeholder='Company'
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className='border p-2 w-full rounded'
        required
      />
      <input
        type='text'
        placeholder='Position'
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        className='border p-2 w-full rounded'
        required
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className='border p-2 w-full rounded'
      >
        <option value='applied'>Applied</option>
        <option value='interviewing'>Interviewing</option>
        <option value='offer'>Offer</option>
        <option value='rejected'>Rejected</option>
      </select>
      <div className='mb-2'>
        <label className='block text-sm font-medium mb-1'>Priority</label>
        <select
          className='border p-2 rounded w-full'
          value={priority}
          onChange={(e) => setPriority(e.target.value as Job["priority"])}
        >
          <option value=''>Select</option>
          <option value='high'>High</option>
          <option value='medium'>Medium</option>
          <option value='low'>Low</option>
        </select>
      </div>

      <div className='mb-2'>
        <label className='block text-sm font-medium mb-1'>Work Setup</label>
        <select
          className='border p-2 rounded w-full'
          value={workSetup}
          onChange={(e) => setWorkSetup(e.target.value as Job["workSetup"])}
        >
          <option value=''>Select</option>
          <option value='remote'>Remote</option>
          <option value='onsite'>Onsite</option>
          <option value='hybrid'>Hybrid</option>
        </select>
      </div>

      <div className='mb-2'>
        <label className='block text-sm font-medium mb-1'>Salary</label>
        <input
          className='border p-2 rounded w-full'
          value={salary}
          onChange={handleSalaryChange}
          placeholder='₱70,000'
        />
      </div>

      <button
        type='submit'
        className='bg-blue-600 text-white px-4 py-2 rounded'
      >
        Add Job
      </button>
    </form>
  );
};
