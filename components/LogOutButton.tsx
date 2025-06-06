// components/LogoutButton.tsx
"use client";
import { supabase } from "@/lib/supabase/supabaseClient";

export const LogoutButton = () => {
  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return <button onClick={logout}>Logout</button>;
};
