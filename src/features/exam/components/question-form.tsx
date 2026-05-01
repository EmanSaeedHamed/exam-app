"use client";

import CircularProgressBar from "@/components/ui/circular-progress-bar";
import { AllQuestionsResponse } from "@/shared/lib/types/all-questions";
import { ExamResponse } from "@/shared/lib/types/exam";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/shared/components/ui/button";
import { ChevronLeft, ChevronRight, FolderSearch, RotateCcw } from "lucide-react";
import { GetAnswersDetails, submitAnswers } from "@/shared/lib/api/submissions/submit-answers.api";
import { Progress } from "@/components/ui/progress";
import { IAnswerDetailsResponse } from "@/shared/lib/types/answer-details";
import ChartPieDonut from "@/shared/components/shared/pie-chart";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function QuestionForm({
  exam,
  questions,
}: {
  exam: ExamResponse;
  questions: AllQuestionsResponse;
}) {
  const [showResult, setShowResult] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startedAt] = useState(new Date().toISOString());
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [visitedCount, setVisitedCount] = useState(0);
  const [answersDetails, setAnswersDetails] = useState<IAnswerDetailsResponse | null>(null);
  const allQuestion = questions.payload;
  const { questionsCount, duration } = exam.payload.exam;
  const currentQuestion = allQuestion.questions[currentIndex];
  const { title, diploma } = exam.payload.exam;
  const { examId } = questions.payload.questions[0];
  const progress = (visitedCount / questionsCount) * 100;
  const wrongAnswers = answersDetails?.payload?.analytics?.filter((q) => !q.isCorrect);
  const pathname = usePathname();
  const diplomaId = pathname.split("/")[2];
  


  const handleNext = () => {
    if (currentIndex < allQuestion.questions.length - 1) {
      if (visitedCount === currentIndex) {
        setVisitedCount((prev) => prev + 1);
      }
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (visitedCount === currentIndex) {
    setVisitedCount(prev => prev + 1);
  }
    const formattedAnswers = Object.entries(answers).map(
      ([questionId, answerId]) => ({
        questionId,
        answerId,
      }),
    );

    const payload = {
      examId,
      answers: formattedAnswers,
      startedAt,
    };
    console.log(payload);
    
    const subRes = await submitAnswers(payload);
    console.log("subRes", subRes);
    const {id} =subRes.payload.submission;
    
    console.log("id res", id);
    const resAnswerDetails = await GetAnswersDetails(id);
    console.log(resAnswerDetails);
    setAnswersDetails(resAnswerDetails)
    setShowResult(true);
    
  };
  const handleRestart = () => {
  setShowResult(false);
  setCurrentIndex(0);
  setAnswers({});
  setVisitedCount(0);
  setAnswersDetails(null);
};

  return (
    <div className="bg-white py-6 px-6 mx-6 space-y-4">
      {/* header */}
      <div className="flex justify-between items-center gap-6">
        {/* info */}
        <div className="flex-1">
          {/* title */}
          <div className="flex justify-between items-center mb-1.5">
            <h3 className="font-mono text-gray-800">
              <span>{diploma.title} - </span>
              <span>{title}</span>
            </h3>
            <span className="font-mono text-sm text-gray-500">
              Question <span className="text-blue-600">{currentIndex + 1}</span>{" "}
              of {questionsCount}
            </span>
          </div>
          {/* progress line */}
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
          </div>
        </div>
        {!showResult? <>
           {/* line up */}
        <div className="border-r border-r-gray-200 self-stretch"></div>
        {/* duration */}
        <div className="w-16">
          <CircularProgressBar duration={duration * 60} onTimeEnd={handleSubmit} />
        </div>
        </> : ""}
      </div>
      {!showResult? <div>
        {/* question header */}
      <div>
        <h4 className="font-mono font-semibold text-2xl text-blue-600">
          {currentQuestion.text}
        </h4>
      </div>
      {/* question list */}
      <div>
        <RadioGroup
          value={answers[currentQuestion.id] || ""}
          onValueChange={(value) => {
            setAnswers((prev) => ({
              ...prev,
              [currentQuestion.id]: value,
            }));
          }}
          className="w-full"
        >
          {currentQuestion.answers.map((answer) => (
            <label
              key={answer.id}
              htmlFor={answer.id}
              className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer"
            >
              <RadioGroupItem value={answer.id} id={answer.id} />
              <span>{answer.text}</span>
            </label>
          ))}
        </RadioGroup>
      </div>
      {/* question footer */}
      <div className="flex items-center justify-between gap-4">
        <Button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          variant={"outline"}
          type="submit"
          className="mt-10 flex-1 bg-gray-200 text-gray-400 hover:bg-gray-300 border-none"
        >
          {" "}
          <ChevronLeft /> Previous{" "}
        </Button>

        {currentIndex === allQuestion.questions.length - 1 ? (
          <Button
            onClick={handleSubmit}
            className="mt-10 flex-1 bg-blue-600 text-white"
          >
            Submit
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={!answers[currentQuestion.id]}
            className="mt-10 flex-1 bg-blue-600 text-white"
          >
            Next <ChevronRight />
          </Button>
        )}
      </div>
      </div> :
      // result screen
      <div>
        <h4 className="font-mono font-semibold text-2xl text-blue-600 mb-4">Results:</h4>
        {/* result */}
        <div className=" grid grid-cols-6 gap-4">
          {/* result chart */}
         <div className="border border-blue-200 col-span-2">
           <div className="flex flex-col justify-center h-full">
            {/* percentage */}
            <div>
              <ChartPieDonut correct={answersDetails?.payload?.submission?.correctAnswers || 0}
               incorrect={answersDetails?.payload?.submission?.wrongAnswers || 0}/>
            </div>
            {/* data */}
            <div className="w-full flex justify-center">
              <div className="p-2.5 space-y-2.5 ">
              {/* items */}
                 {/* item */}
              <div className="flex items-center gap-2.5">
                <div className="size-4 bg-emerald-500"></div>
                <span className="font-mono font-medium text-sm text-black">Correct:</span>
                <span className="font-mono font-medium text-sm text-black">{answersDetails?.payload.submission.correctAnswers}</span>
              </div>
                               {/* item */}
              <div className="flex items-center gap-2.5">
                <div className="size-4 bg-red-500"></div>
                <span className="font-mono font-medium text-sm text-black">Incorrect:</span>
                <span className="font-mono font-medium text-sm text-black">{answersDetails?.payload.submission.wrongAnswers}</span>
              </div>
            </div>
            </div>
          </div>
         </div>
          {/* answers */}
          <div className=" col-span-4 border border-dashed border-blue-200 h-128.5 overflow-auto">
             
           {wrongAnswers?.map((q) => (
  <div key={q.questionId} className="p-4 space-y-2.5">
    <p className="font-semibold font-mono text-xl text-blue-600">{q.questionText}</p>

    <div className="flex items-center gap-2.5 bg-red-50 p-4">
      <div className="border border-red-600 size-4 rounded-full flex items-center justify-center">
        <div className="size-2.5 bg-red-600 rounded-full"></div>
      </div>
      <p className="text-gray-800 text-sm font-mono">
        {q.selectedAnswer.text}
    </p>
    </div>
     
     <div className="flex items-center gap-2.5 bg-emerald-50 p-4">
      <div className="border border-emerald-600 size-4 rounded-full"></div>
      <p className="text-gray-800 text-sm font-mono">
        {q.correctAnswer.text}
    </p>
    </div>
  </div>
))}
          </div>
          </div>
        {/* question footer */}
      <div className="flex items-center justify-between gap-4">
          <Button
          onClick={handleRestart}
            className="mt-10 flex-1 bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            <RotateCcw /> Restart
          </Button>
          
          <Button asChild className="mt-10 flex-1 bg-blue-600 text-white hover:bg-blue-700">
           <Link href={`/diplomas/${diplomaId}`}>
             <FolderSearch className="mr-2" />
               Explore
           </Link>
         </Button>

      </div>
      </div>
      }
    </div>
  );
}
