'use client';
import { BreadCrumb } from "../components/breed-crumb";
import { getAllExams } from "@/shared/lib/api/diplomas/diplomas.api";
import {
  BookOpenCheck,
  ChevronDown,
  ChevronLeft
} from "lucide-react";
import ExamItem from "../components/exam-item";
import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import ExamsSkeleton from "@/shared/skeletons/exams.skeleton";
import { useParams } from "next/navigation";

interface PageProp {
  params: {
    diplomaId: string;
  };
};
export default function ExamsScreen() {
  const { diplomaId } = useParams() as { diplomaId: string };
  console.log(typeof diplomaId);
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['diplomaExams', diplomaId],
    queryFn: ({ pageParam }:{ pageParam: number }) => getAllExams({ pageParam, diplomaId}),
    initialPageParam: 1,
    enabled: !!diplomaId,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.payload?.metadata?.page;
      const totalPages = lastPage?.payload?.metadata?.totalPages;

      return currentPage < totalPages
        ? currentPage + 1
        : undefined;
    },
  });
  const loadMoreRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
  
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
  
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);
  
    // Flatten all pages into a single list of diplomas
    const exams = data?.pages.flatMap((page) => page?.payload?.data ?? []);
    console.log(data);
    console.log(exams);
    
    

  return (
    <>
      {/* breedcrumb */}
      <div className="bg-white">
        <BreadCrumb diplomaTitle={exams?.[0]?.diploma?.title} />
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
          <span className="font-inter text-[32px] font-semibold">{exams?.[0]?.diploma?.title ?? "Diploma"}</span>
        </div>
        </div>
        {/* content */}
        <div className="bg-white p-6">
          {
             !exams?.length ?
                        <ExamsSkeleton hasNextPage={hasNextPage} /> :
                        <>
                                  {/* diplomas */}
          <div className="my-6 grid grid-cols-1 gap-2.5 mt-0 bg-white">
            {exams?.map((exam) => (
              <ExamItem payload={exam} diplomaId={diplomaId} key={exam.id} />
            ))}
          </div>
            
          {/* footer */}
          <div ref={loadMoreRef} className="text-gray-600 flex flex-col items-center py-2.5">
  {hasNextPage ? (
    <>
      <span className="font-mono">Scroll to view more</span>
      <ChevronDown className="size-4.5" />
    </>
  ) : (
    <span className="font-mono text-gray-400">
      End of list
    </span>
  )}
</div>
       </>}

        </div>
      </div>
    </>
  );
}
