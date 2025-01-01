"use client";
import AdminContact from "@/components/AdminContact";
import { LogOut } from "lucide-react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  return (
    <>
      
      <AdminContact></AdminContact>
    </>
  );
}
