'use server';
import { getNextAuthToken } from "../../utils/get-token.util";
import { ExamAnswers, SubmitAnswersResponse } from "../../types/exam-answers";
import { IAnswerDetailsResponse } from "../../types/answer-details";

// ^Submit exam answers
export async function submitAnswers(payload: ExamAnswers): Promise<SubmitAnswersResponse> {
    const token = await getNextAuthToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submissions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: `Bearer ${token?.token}`
        },
        body: JSON.stringify(payload),
      });
      const data: SubmitAnswersResponse = await response.json();
      return data;
}

//^Get submission details with analytics 
export async function GetAnswersDetails(id:string): Promise<IAnswerDetailsResponse> {
    const token = await getNextAuthToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submissions/${id}`,
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

