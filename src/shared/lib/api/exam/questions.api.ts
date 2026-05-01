'use server';
import { getNextAuthToken } from "../../utils/get-token.util";
import { AllQuestionsResponse } from '../../types/all-questions';
import { ExamResponse } from "../../types/exam";
//* Get all questions for an exam
export async function GetAllQuestions(id:string){
    const token = await getNextAuthToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/exam/${id}`,
        {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token?.token}`,
      },
    },
    );
    const payload = await response.json();
    return payload;
}


//* Get all question $ exam details  parallel
export async function GetExamAndAllQues(examId: string) : Promise<{ exam: ExamResponse; questions: AllQuestionsResponse; }> { 
  const token = await getNextAuthToken();
  console.log("examId:", examId);

  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${token?.token}`,
  };

  const [examRes, questionsRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/exams/${examId}`, {
      method: "GET",
      headers,
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/questions/exam/${examId}`, {
      method: "GET",
      headers,
    }),
  ]);

  const [exam, questions] = await Promise.all([
    examRes.json(),
    questionsRes.json(),
  ]);

  return { exam, questions };
}