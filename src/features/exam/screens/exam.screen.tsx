'use client';
import {
  BookOpenCheck,
  ChevronDown,
  ChevronLeft,
  CircleQuestionMark
} from "lucide-react";

import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import ExamsSkeleton from "@/shared/skeletons/exams.skeleton";
import { useParams } from "next/navigation";
import { BreadCrumb } from "@/features/diplomas/components/breed-crumb";
export default function ExamScreen() {
  const params = useParams();
  return (
    <>
      {/* breedcrumb */}
      <div className="bg-white">
        <BreadCrumb diplomaTitle="Diploma" />
      </div>
      <div className="bg-gray-50 p-6">
        {/* heading */}
        <div className="flex gap-2.5 mb-6">
          {/* back */}
          <Link href={'/'} className="bg-white border border-blue-600 flex items-center justify-center w-9.5">
            <ChevronLeft className="size-6 text-blue-600"/>
            </Link>
        <div className="bg-blue-600 p-4 flex items-center gap-4 text-white flex-1">
          <CircleQuestionMark className="size-10" />
          <span className="font-inter text-[32px] font-semibold">Diploma</span>
        </div>
        </div>
      </div>
    </>
  );
}
