"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Ambil token dari localStorage (atau cookie, sesuai implementasi)
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Anda belum login");
        router.push("/auth/login");
        return;
      }

      // Panggil endpoint backend logout
      const res = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log(data); // debug response

      if (data.success) {
        // Hapus token di client
        localStorage.removeItem("token");

        // Redirect ke halaman login
        router.push("/auth/login");
      } else {
        alert("Logout gagal: " + data.message);
      }
    } catch (err) {
      console.error("Error saat logout:", err);
      alert("Terjadi kesalahan saat logout: " + err.message);
    }
  };

  return (
    <div className="relative group/menu">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span className="h-10 w-10 hover:text-primary hover:bg-lightprimary rounded-full flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary">
            <Image
              src="/images/profile/user-1.jpg"
              alt="Profile"
              height={35}
              width={35}
              className="rounded-full"
            />
          </span>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-44 rounded-sm shadow-md p-2"
        >
          <DropdownMenuItem asChild>
            <Link
              href="/dashboard/user-profile"
              className="px-3 py-2 flex items-center w-full gap-3 text-darkLink hover:bg-lightprimary hover:text-primary"
            >
              <Icon icon="solar:user-circle-outline" height={20} />
              My Profile
            </Link>
          </DropdownMenuItem>

          <div className="p-3 pt-0">
            <Button
              variant="outline"
              size="sm"
              className="mt-2 w-full"
              onClick={handleLogout} // sambungkan ke backend logout
            >
              Logout
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Profile;
