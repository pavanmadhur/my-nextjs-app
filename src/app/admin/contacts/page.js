"use client";
import AdminContact from "@/components/AdminContact";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  return (
    <>
      
      <AdminContact></AdminContact>
    </>
  );
}
