"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { handleSuccess } from "@/lib/utils";

const LogOut = ({ onLogout }: { onLogout: () => void }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("logged");
    handleSuccess("User logged out successfully");
    onLogout(); // Call the function passed as a prop
    setTimeout(() => {
      router.push("/sign-in");
    }, 1000);
  };

  return (
    <button
      onClick={handleLogout}
      className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
    >
      Logout
    </button>
  );
};

export default LogOut;
