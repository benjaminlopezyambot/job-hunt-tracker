"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { supabase } from "@/lib/supabase/supabaseClient";

export default function RootSessionLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user ?? null);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase, setUser]);

  return <>{children}</>;
}
