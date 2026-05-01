import { Button } from "@/shared/components/ui/button";
import { deleteAccount } from "@/shared/lib/api/account-setting/delete-account.api";
import { TriangleAlert } from "lucide-react";
import { signOut } from "next-auth/react";
type Props = {
  setIsDeleteAccount: (value: boolean) => void;
};
export default function DeleteAccount({setIsDeleteAccount}:Props) { 
   async function handleDeleteAccount() {
        const res = await deleteAccount()
        console.log(res);
        signOut({ callbackUrl: "/login" });   
    }
  return <>
        <div className="mt-5 text-center flex flex-col items-center gap-7.5">
             {/* header */}
             <div className="size-27.5 bg-red-50 rounded-full flex items-center justify-center"><div className="size-20 bg-red-100 rounded-full flex items-center justify-center"><TriangleAlert className="text-red-600 size-12.5"/></div></div>
             {/* text */}
             <div className="px-9">
                <h4 className="font-mono text-lg font-medium text-red-600">Are you sure you want to delete your account?</h4>
                <p className="font-mono text-sm font-normal text-gray-500">This action is permanent and cannot be undone.</p>
             </div>
             {/* footer */}
       <div className="border border-gray-200 w-full mt-4">
        <div className="flex items-center gap-2.5 w-full py-6 mx-0 px-9">
        <Button onClick={()=>{setIsDeleteAccount(false)}} className="flex-1 bg-gray-200 text-gray-800 text-sm font-mono font-medium hover:bg-gray-300">Cancel</Button>
        <Button onClick={handleDeleteAccount} className="flex-1 text-sm bg-red-600 font-mono font-medium hover:bg-red-700">Yes, delete</Button>
       </div>
       </div>
            </div>
  </>
}
