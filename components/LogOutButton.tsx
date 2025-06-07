// components/LogoutButton.tsx
"use client";
import { supabase } from "@/lib/supabase/supabaseClient";
import { Button } from "./ui/button";

export const LogoutButton = () => {
  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return <Button onClick={logout}>Logout</Button>;
};
