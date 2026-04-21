import Logo from "@/shared/components/ui/logo";
import { BookOpenCheck, Brain, RectangleEllipsis } from "lucide-react";

export default function AuthHero() {
  return (
    <>
      <div className="bg-[rgba(239,246,255,0.75)] backdrop-blur-[200px] py-20">
        <div className="max-w-[459px] mx-auto">
          {/* info */}
          <div className="pl-2">
            <Logo />
          </div>
          {/* details */}
          <div>
            <h2 className="text-3xl font-bold font-inter mt-24 gray-800 mb-14">
              Empower your learning journey with our smart exam platform.
            </h2>
            {/* List */}
            <ul className="flex flex-col gap-9">
              <li className="flex gap-5">
                <div>
                  <div className="size-9 border-[1.5px] border-blue-600 flex items-center justify-center ">
                    <Brain className="text-blue-600 text-2xl" />
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-xl font-semibold font-mono text-blue-600">
                    Tailored Diplomas
                  </h3>
                  <p className="font-mono text-gray-700">
                    Choose from specialized tracks like Frontend, Backend, and
                    Mobile Development.
                  </p>
                </div>
              </li>
              <li className="flex gap-5">
                <div>
                  <div className="size-9 border-[1.5px] border-blue-600 flex items-center justify-center ">
                    <BookOpenCheck className="text-blue-600 text-2xl" />
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-xl font-semibold font-mono text-blue-600">
                    Focused Exams
                  </h3>
                  <p className="font-mono text-gray-700">
                    Access topic-specific tests including HTML, CSS, JavaScript,
                    and more.
                  </p>
                </div>
              </li>
              <li className="flex gap-5">
                <div>
                  <div className="size-9 border-[1.5px] border-blue-600 flex items-center justify-center ">
                    <RectangleEllipsis className="text-blue-600 text-2xl" />
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-xl font-semibold font-mono text-blue-600">
                    Smart Multi-Step Forms
                  </h3>
                  <p className="font-mono text-gray-700">
                    Choose from specialized tracks like Frontend, Backend, and
                    Mobile Development.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
