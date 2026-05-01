import { BreadCrumb } from "@/features/diplomas/components/breed-crumb";
import ChangePasswordForm from "../components/change-password-form";

export default function ChangePassword() {
  return <>
          {/* breedcrumb */}
                    <div className="bg-white">
                      <BreadCrumb diplomaTitle="diploma" />
                    </div>
                    {/* change password form */}
                    <div className=" bg-white ml-82.5 mr-6 mt-30 p-6">
                      <ChangePasswordForm/>
                    </div>
  </>
}
