"use client";

import { JobStatus } from "@/types";
import React, { useState } from "react";

type JobCardProps = {
  company: string;
  position: string;
  status: JobStatus;
  dateApplied: string;
  priority?: "high" | "medium" | "low" | "";
  workSetup?: "onsite" | "remote" | "hybrid" | "";
  salary?: string;
  onDelete: () => void;
  onEdit: (updatedJob: Omit<JobCardProps, "onDelete" | "onEdit">) => void;
};

export const JobCard: React.FC<JobCardProps> = ({
  company,
  position,
  status,
  dateApplied,
  priority,
  workSetup,
  salary,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  // Temp state to hold edits
  const [editCompany, setEditCompany] = useState(company);
  const [editPosition, setEditPosition] = useState(position);
  const [editStatus, setEditStatus] = useState<JobStatus>(status);

  const handleSave = () => {
    onEdit({
      company: editCompany,
      position: editPosition,
      status: editStatus,
      dateApplied,
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className='border rounded-xl p-4 shadow-sm'>
        <input
          className='border p-2 w-full rounded mb-2'
          value={editCompany}
          onChange={(e) => setEditCompany(e.target.value)}
        />
        <input
          className='border p-2 w-full rounded mb-2'
          value={editPosition}
          onChange={(e) => setEditPosition(e.target.value)}
        />
        <select
          className='border p-2 w-full rounded mb-2'
          value={editStatus}
          onChange={(e) => setEditStatus(e.target.value as JobStatus)}
        >
          <option value='applied'>Applied</option>
          <option value='interviewing'>Interviewing</option>
          <option value='offer'>Offer</option>
          <option value='rejected'>Rejected</option>
        </select>

        <div className='flex gap-2'>
          <button
            onClick={handleSave}
            className='bg-green-600 text-white px-4 py-2 rounded'
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className='bg-gray-300 px-4 py-2 rounded'
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='border rounded-xl p-4 shadow-sm hover:shadow-md transition relative'>
      <h3 className='text-lg font-semibold'>{position}</h3>
      <p className='text-gray-700'>{company}</p>
      <p className='text-sm text-gray-500'>Applied: {dateApplied}</p>
      <p
        className={`text-sm font-medium mt-2 ${
          status === "applied"
            ? "text-blue-500"
            : status === "interviewing"
            ? "text-yellow-500"
            : status === "offer"
            ? "text-green-600"
            : "text-red-500"
        }`}
      >
        Status: {status}
      </p>
      <p className='text-sm text-gray-600'>Priority: {priority || "—"}</p>
      <p className='text-sm text-gray-600'>Work Setup: {workSetup || "—"}</p>
      <p className='text-sm text-gray-600'>Salary: {salary || "—"}</p>

      <div className='absolute top-2 right-2 flex gap-2'>
        <button
          onClick={() => setIsEditing(true)}
          className='bg-yellow-400 text-white px-2 py-1 rounded'
          title='Edit'
        >
          ✏️
        </button>
        <button
          onClick={onDelete}
          className='bg-red-600 text-white px-2 py-1 rounded'
          title='Delete'
        >
          🗑️
        </button>
      </div>
    </div>
  );
};
