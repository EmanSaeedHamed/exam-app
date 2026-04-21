"use client";

import { IDiplomaExam } from "@/shared/lib/types/diploma-exams";
import { CircleQuestionMark, MoveRight, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function ExamItem({
  payload,
  diplomaId,
}: {
  payload: IDiplomaExam;
  diplomaId: string;
}) {
  const { id, image, description, title, duration } = payload;
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <div
        className="bg-blue-50 flex items-center gap-4 p-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* exam image */}
        <div className="size-25 border border-blue-300 bg-blue-100 flex items-center justify-center">
          <div className="relative size-3/4">
            <Image
              src={image}
              alt={title}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </div>
        {/* exam text */}
        <div className="flex-1 flex flex-col gap-1.5">
          {/* exam title */}
          <div className="flex justify-between items-center">
            <h3 className="font-mono font-semibold text-xl text-blue-600">
              {title}
            </h3>
            {/* info */}
            <div className="flex items-center gap-1.5">
              {/* question */}
              <div className="flex justify-between items-center gap-1.5 text-gray-800 font-mono text-sm">
                <CircleQuestionMark className="size-4.5" />
                <span>25</span>
                <span>Questions</span>
              </div>
              {/* duration */}
              <div className="flex justify-between items-center gap-1.5 text-gray-800 font-mono text-sm border-l border-gray-300 pl-1.5">
                <Timer className="size-4.5" />
                <span>{duration}</span>
                <span>minutes</span>
              </div>
            </div>
          </div>
          {/* description */}
          <div className="relative pr-7">
            <p className="text-gray-500 font-mono text-sm line-clamp-4">
              {description}
            </p>
            {isHovered ? (
              <Link href={`/diplomas/${diplomaId}/${id}`}>
                <button
                  type="button"
                  className="px-4 py-1.5 bg-blue-600 flex items-center gap-2.5 font-mono text-white absolute -bottom-3 right-0 cursor-pointer"
                >
                  <span>START</span>
                  <MoveRight className="size-4.5" />
                </button>
              </Link>
            ) : (
              <span className="font-mono font-semibold text-sm text-gray-800 absolute bottom-0 right-0">
                See More
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
