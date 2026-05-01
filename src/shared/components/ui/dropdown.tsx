import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Bolt, EllipsisVertical, LogOutIcon, UserRound } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Dropdown() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisVertical className="text-gray-500 size-5 cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 rounded-none">
          <Link href={'/account/profile'}>
            <DropdownMenuItem className="text-gray-800 p-4 cursor-pointer">
            <UserRound className="text-gray-400" />
            Account
          </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator className="bg-gray-200" />
          <Link href={'/dashboard/diplomas'}>
            <DropdownMenuItem className="text-gray-800 p-4 cursor-pointer">
            <Bolt className="text-gray-400" />
            Dashboard
          </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator className="bg-gray-200" />
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/login' })} className="text-red-600 p-4 cursor-pointer" variant="destructive">
            <LogOutIcon />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
