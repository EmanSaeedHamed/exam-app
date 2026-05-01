"use client";
import Link from "next/link";
import { CircleUserRound, Lock, LogIn } from "lucide-react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
export default function SideBar() {
     const pathname = usePathname();
      const isProfileActive = pathname === "/account/profile";
      const isChangePasswordActive = pathname === "/account/change-password";
  return <>
      <div className="p-6 flex flex-col justify-between h-full">
         {/* Links */}
          <ul className="space-y-2.5">
            <li className={`${isProfileActive ? "text-blue-600 bg-blue-50" : "text-gray-500 bg-transparent"} py-2.5 px-4 hover:text-blue-600 transition-colors duration-200`}>
              <Link
                href="/account/profile"
                className={`flex gap-2.5 items-center`}>
                <CircleUserRound />
                <span className="font-mono">Profile</span>
              </Link>
            </li>
            <li className={`${isChangePasswordActive ? "text-blue-600 bg-blue-50" : "text-gray-500 bg-transparent"} py-2.5 px-4 hover:text-blue-600 transition-colors duration-200`}>
              <Link
                href="/account/change-password"
                className={`flex gap-2.5 items-center`}>
                <Lock />
                <span className="font-mono">Change Password</span>
              </Link>
            </li>
          </ul>
          {/* item */}
          <div onClick={()=>{signOut({ callbackUrl: '/login' })}} className="bg-red-50 text-red-600 py-2.5 px-4 flex items-center gap-2.5 cursor-pointer hover:bg-red-100">
            <LogIn />
            <span>Logout</span>
          </div>
      </div>
  </>
}
