"use client";

import { supabase } from "@/lib/supabase/supabaseClient";
import { useUser } from "@/store/useUserStore";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useUser((s) => s.setUser);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ? { id: data.user.id, email: data.user.email } : null);
    });
  }, []);

  return <>{children}</>;
}
