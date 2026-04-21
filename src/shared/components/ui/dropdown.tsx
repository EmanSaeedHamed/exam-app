import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { EllipsisVertical, LogOutIcon, UserRound } from "lucide-react";
import { signOut } from "next-auth/react";

export default function Dropdown() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisVertical className="text-gray-500 size-5 cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 rounded-none">
          <DropdownMenuItem className="text-gray-800 p-4">
            <UserRound className="text-gray-400" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-200" />
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/login' })} className="text-red-600 p-4" variant="destructive">
            <LogOutIcon />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
