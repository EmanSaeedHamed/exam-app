import Image from "next/image";
import folderCodeIcon from "@/assets/images/folder-code.svg";
export default function Logo() {
  return <>
  <div className="flex items-center gap-2.5">
            <Image src={folderCodeIcon} alt="folder code icon" />
            <span className="font-mono text-xl font-semibold text-blue-600">
              Exam App
            </span>
          </div>
  </>
}
