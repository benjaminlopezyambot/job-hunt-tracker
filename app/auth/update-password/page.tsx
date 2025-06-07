/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/supabaseClient";

export default function UpdatePassword() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      // Re-authenticate session if needed (useful for reset links)
      const { error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        alert("Session error: " + sessionError.message);
        setIsLoading(false);
        return;
      }

      // Update the password
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        alert("Failed to update password: " + error.message);
      } else {
        alert("Password updated successfully! Redirecting to login...");
        router.push("/login");
      }
    } catch (err) {
      alert("Unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-background px-4'>
      <form
        onSubmit={handleSubmit}
        className='max-w-md w-full p-6 bg-white rounded-lg shadow-md space-y-6'
      >
        <h2 className='text-2xl font-semibold text-center'>Reset Password</h2>

        <input
          type='password'
          placeholder='New Password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className='w-full px-4 py-3 border border-gray-300 rounded-md'
        />
        <input
          type='password'
          placeholder='Confirm New Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className='w-full px-4 py-3 border border-gray-300 rounded-md'
        />

        <button
          type='submit'
          disabled={isLoading}
          className='w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition'
        >
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
