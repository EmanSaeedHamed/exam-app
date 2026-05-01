import {
  ChevronLeft,
  CircleQuestionMark
} from "lucide-react";
import Link from "next/link";
import { BreadCrumb } from "@/features/diplomas/components/breed-crumb";
import { GetExamAndAllQues } from "@/shared/lib/api/exam/questions.api";
import PageProp from "@/shared/lib/types/pages-props";
import QuestionForm from "../components/question-form";

export default async function ExamScreen({ params }: PageProp) {
  const {examId, diplomaId} = await params;
  const {exam, questions} = await GetExamAndAllQues(examId);
  const {title} = exam.payload.exam;
  return <>
      <div className="bg-gray-50">
        {/* breedcrumb */}
      <div className="bg-white">
        <BreadCrumb diplomaTitle={title} />
      </div>
      <div className="bg-gray-50 p-6">
        {/* heading */}
        <div className="flex gap-2.5">
          {/* back */}
          <Link href={`/diplomas/${diplomaId}`} className="bg-white border border-blue-600 flex items-center justify-center w-9.5">
            <ChevronLeft className="size-6 text-blue-600"/>
            </Link>
        <div className="bg-blue-600 p-4 flex items-center gap-4 text-white flex-1">
          <CircleQuestionMark className="size-10" />
          <h2 className="font-inter text-[32px] font-semibold">{title ? `${title} Questions` : "Questions"}</h2>
        </div>
        </div>
      </div>
      {/* question form */}
       <QuestionForm exam={exam} questions={questions}/>
      </div>
    </>
}
