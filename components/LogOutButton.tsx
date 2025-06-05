// components/LogoutButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/supabaseClient";

export const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className='bg-red-500 text-white px-4 py-2 rounded @hover:cursor-pointer hover:bg-red-600 transition-colors duration-200'
    >
      Logout
    </button>
  );
};
