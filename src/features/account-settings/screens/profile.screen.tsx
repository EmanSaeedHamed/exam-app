import { BreadCrumb } from "@/features/diplomas/components/breed-crumb";
import ProfileData from "../components/profile-data";
export default function ProfileScreen() {
  return <>
       {/* breedcrumb */}
          <div className="bg-white">
            <BreadCrumb diplomaTitle="diploma" />
          </div>
          {/* profile data */}
          <div className=" bg-white ml-82.5 mr-6 mt-30 p-6">
            <ProfileData/>
          </div>
          
  </>
}
