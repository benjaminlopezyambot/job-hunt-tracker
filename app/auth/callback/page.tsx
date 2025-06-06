"use client";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";

export default function AuthCallbackPage() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) window.location.href = "/home";
      else window.location.href = "/login";
    });
  }, []);
  return <p>Redirecting...</p>;
}
