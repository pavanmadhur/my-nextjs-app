"use client";
import AdminContact from "@/components/AdminContact";
import { LogOut } from "lucide-react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-[#0b223a] z-50">
        <div className="flex justify-between items-center px-4 py-2">
          {/* Left Section */}
          <div className="flex items-center">
            <Heart className="text-white w-8 h-8" />
            <span className="ml-2 text-2xl font-serif italic  text-white">
              ADMIN
            </span>
          </div>
          <div>
            <LogOut
              className="text-white h-8 w-8 cursor-pointer hover:text-gray-400"
              onClick={() => {
                localStorage.removeItem("auth");
                router.push("/admin");
              }}
            />
          </div>
        </div>
      </header>
      <AdminContact></AdminContact>
    </>
  );
}
