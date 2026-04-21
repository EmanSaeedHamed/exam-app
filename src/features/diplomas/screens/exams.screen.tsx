import { BreadCrumb } from "../components/breed-crumb";
import { getDiplomaById } from "@/shared/lib/api/diplomas/diplomas.api";
import {
  BookOpenCheck,
  ChevronDown,
  ChevronLeft
} from "lucide-react";
import ExamItem from "../components/exam-item";
import Link from "next/link";

export type DiplomaByIdPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ExamsScreen(props: DiplomaByIdPageProps) {
  const { id } = await props.params;
  const diplomasPayload = await getDiplomaById(id);
  console.log(diplomasPayload);
  console.log(id);

  return (
    <>
      {/* breedcrumb */}
      <div className="bg-white">
        <BreadCrumb />
      </div>
      <div className="bg-gray-50 p-6">
        {/* heading */}
        <div className="flex gap-2.5 mb-6">
          {/* back */}
          <Link href={'/'} className="bg-white border border-blue-600 flex items-center justify-center w-9.5">
            <ChevronLeft className="size-6 text-blue-600"/>
            </Link>
        <div className="bg-blue-600 p-4 flex items-center gap-4 text-white flex-1">
          <BookOpenCheck className="size-10" />
          <span className="font-inter text-[32px] font-semibold">{diplomasPayload?.payload?.diploma?.title}</span>
        </div>
        </div>
        {/* content */}
        <div className="bg-white p-6">
          {/* diplomas */}
          <div className="my-6 grid grid-cols-1 gap-2.5 mt-0 bg-white">
            {diplomasPayload?.payload?.diploma?.exams.map((exam) => (
              <ExamItem payload={exam} diplomaId={id} key={exam.id} />
            ))}
          </div>

          {/* footer */}
          <div className="text-gray-600 flex flex-col items-center py-2.5">
            <span className="font-mono">Scroll to view more</span>
            <ChevronDown className="size-4.5" />
          </div>
        </div>
      </div>
    </>
  );
}
