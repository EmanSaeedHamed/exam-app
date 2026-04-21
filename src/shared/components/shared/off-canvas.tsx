"use client";
import Image from "next/image";
import logoApp from "@/assets/images/Final Logo 1.svg";
import userAvatar from "@/assets/images/user-image.jpg"
import Link from "next/link";
import { GraduationCap, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import Dropdown from "../ui/dropdown";
import Logo from "../ui/logo";
import { useSession } from "next-auth/react";


export default function OffCanvas() {
  const {data: session, status} = useSession();
  const pathname = usePathname();
  const isDiplomasActive =
    pathname === "/" || pathname.startsWith("/diplomas");
  const isAccountActive = pathname.startsWith("/account");

  return (
    <>
      <div className="bg-blue-50 fixed top-0 bottom-0 w-[370px] p-8 flex flex-col justify-between">
        {/* Exam App Logo */}
        <div>
          <Image src={logoApp} alt="elavate logo app" className="mb-2.5" />
          <Logo/>
           {/*  Navigation  */}
          {/* Links */}
          <ul className="mt-14">
            <li className={`${isDiplomasActive ? "text-blue-600 border-blue-500" : "text-gray-500 border-transparent"} p-4 border hover:text-blue-600 transition-colors duration-200`}>
              <Link
                href="/"
                className={`flex gap-2.5`}>
                <GraduationCap />
                <span className="font-mono">Diplomas</span>
              </Link>
            </li>
            <li className={`${isAccountActive ? "text-blue-600 border-blue-500" : "text-gray-500 border-transparent"} p-4 border hover:text-blue-600 transition-colors duration-200`}>
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
          <div><Image src={userAvatar} width={54} height={54} alt='User Avatar' className='aspect-square object-cover object-top border-2 border-blue-600' /></div>
            <div className="flex-col">
                <h4 className="font-medium font-mono text-blue-600">
                    {session?.user.firstName}
                </h4>
                <p className="text-gray-500 font-mono">
                {session?.user.email}
                </p>
            </div>
            <Dropdown/>
          </div>
      </div>
    </>
  );
}


