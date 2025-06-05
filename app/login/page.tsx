"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginWithEmail = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert("Login error: " + error.message);
    else alert("Logged in!");
  };

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert("Registration error: " + error.message);
    else alert("Check your email for confirmation");
  };

  const handleOAuth = async (
    provider: "google" | "github" | "facebook" | "linkedin"
  ) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: "http://localhost:3000/api/auth/callback", // ✅ match Google Console
      },
    });

    if (error) alert("OAuth error: " + error.message);
  };

  return (
    <div className='max-w-sm mx-auto mt-10 space-y-6'>
      <h1 className='text-xl font-bold'>Login or Register</h1>

      <div className='space-y-2'>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='border rounded w-full p-2'
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='border rounded w-full p-2'
        />
        <div className='flex gap-2'>
          <button
            onClick={handleLoginWithEmail}
            className='bg-blue-600 text-white px-4 py-2 rounded'
          >
            Login
          </button>
          <button
            onClick={handleRegister}
            className='bg-green-600 text-white px-4 py-2 rounded'
          >
            Register
          </button>
        </div>
      </div>

      <div className='space-y-2'>
        <button
          onClick={() => handleOAuth("google")}
          className='w-full border p-2 rounded'
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
