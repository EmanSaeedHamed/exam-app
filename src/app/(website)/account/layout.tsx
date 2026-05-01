import SideBar from "@/shared/components/shared/side-bar";
import { ChevronLeft, CircleQuestionMark, UserRound } from "lucide-react";
import Link from "next/link";

export default function layout({ children }: { children: React.ReactNode }) {
  return <>
     <div>
        <div className="bg-gray-50 p-6 absolute right-0 left-92.5 top-10">
        {/* heading */}
        <div className="flex gap-2.5">
          {/* back */}
          <Link href={`/`} className="bg-white border border-blue-600 flex items-center justify-center w-9.5">
            <ChevronLeft className="size-6 text-blue-600"/>
            </Link>
        <div className="bg-blue-600 p-4 flex items-center gap-4 text-white flex-1">
          <UserRound className="size-10" />
          <h2 className="font-inter text-[32px] font-semibold">Account Settings</h2>
        </div>
        </div>
      </div>
     <div className="w-70.5 bg-white left-98.5 top-42 bottom-6 fixed">
        <SideBar/>
     </div>
     <div>
        {children}
     </div>
     </div>
  </>
    

}
