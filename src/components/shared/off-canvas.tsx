"use client";

import Image from "next/image";
import logoApp from "../../assets/images/Final Logo 1.svg";
import folderCodeIcon from "../../assets/images/folder-code.svg";
import userAvatar from "../../assets/images/user-image.jpg"
import Link from "next/link";
import { GraduationCap, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import Dropdown from "../ui/dropdown";


export default function OffCanvas() {
  const pathname = usePathname();

  return (
    <>
      <div className="bg-blue-50 fixed top-0 bottom-0 w-96 p-8 flex flex-col justify-between">
        {/* Exam App Logo */}
        <div>
          <Image src={logoApp} alt="elavate logo app" className="mb-2.5" />
          <div className="flex items-center gap-2.5">
            <Image src={folderCodeIcon} alt="folder code icon" />
            <span className="font-mono text-xl font-semibold text-blue-600">
              Exam App
            </span>
          </div>
           {/*  Navigation  */}
          {/* Links */}
          <ul className="mt-14">
            <li className={`${pathname == "/" ? "text-blue-600 border-blue-500" : "text-gray-500 border-transparent"} p-4 border hover:text-blue-600 transition-colors duration-200`}>
              <Link
                href="/"
                className={`flex gap-2.5`}>
                <GraduationCap />
                <span className="font-mono">Diplomas</span>
              </Link>
            </li>
            <li className={`${pathname == "/account/profile" ? "text-blue-600 border-blue-500" : "text-gray-500 border-transparent"} p-4 border hover:text-blue-600 transition-colors duration-200`}>
              <Link
                href="/account/profile"
                className={`flex gap-2.5 items-center`}>
                <UserRound />
                <span className="font-mono">Account Settings</span>
              </Link>
            </li>
          </ul>
        </div>
       

        

          {/* user */}
          <div className="flex items-center gap-2.5">
            <Image src={userAvatar} alt="user avatar" className="size-14 border border-blue-600 object-cover"/>
            <div className="flex-col">
                <h4 className="font-medium font-mono text-blue-600">
                    Firstname
                </h4>
                <p className="text-gray-500 font-mono">
                user-email@example.com
                </p>
            </div>
            <Dropdown/>
          </div>
      </div>
    </>
  );
}


