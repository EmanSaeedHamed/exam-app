'use client';
import { BreadCrumb } from "../components/breed-crumb";
import { getDiplomas } from "@/shared/lib/api/diplomas/diplomas.api";
import { ChevronDown, GraduationCap } from "lucide-react";
import DiplomaItem from "../components/diploma-item";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function DiplomasScreen() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['diplomas'],
    queryFn: ({ pageParam }) => getDiplomas({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.payload?.metadata?.page;
      const totalPages = lastPage?.payload?.metadata?.totalPages;

      return currentPage < totalPages
        ? currentPage + 1
        : undefined;
    },
  });

  // Flatten all pages into a single list of diplomas
  const diplomas = data?.pages.flatMap((page) => page?.payload?.data ?? []);

  return (
    <>
      {/* breedcrumb */}
      <div className="bg-white">
        <BreadCrumb />
      </div>
      {/* content */}
      <div className="bg-gray-50 p-6">
        {/* heading */}
        <div className="bg-blue-600 p-4 flex items-center gap-4 text-white">
          <GraduationCap className="size-10" />
          <span className="font-inter text-[32px] font-semibold">Diplomas</span>
        </div>
        {/* diplomas */}
        <div className="my-6 grid grid-cols-3 gap-2.5">
          {diplomas?.map((diploma) => (
            <DiplomaItem diploma={diploma} key={diploma.id} />
          ))}
        </div>

        {/* footer */}
        <div className="text-gray-600 flex flex-col items-center py-2.5">
          <span className="font-mono">Scroll to view more</span>
          <ChevronDown className="size-4.5" />
        </div>
      </div>
    </>
  );
}
