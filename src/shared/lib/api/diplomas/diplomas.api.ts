'use server';
import type { IDiplomasResponse } from "@/shared/lib/types/diplomas";
import type { IDiplomaExamsResponse } from "@/shared/lib/types/diploma-exams";
import { getNextAuthToken } from "../../utils/get-token.util";

// get diplomas
export async function getDiplomas({ pageParam = 1 }): Promise<IDiplomasResponse> {
  const token = await getNextAuthToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/diplomas?page=${pageParam}&limit=6`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token?.token}`,
      },
    },
  );
  const payload = (await response.json()) as IDiplomasResponse;
  return payload;
}

//   get diploma by id
export async function getDiplomaById(
  id: string
): Promise<IDiplomaExamsResponse> {
  const token = await getNextAuthToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/diplomas/${id}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token?.token}`,
      },
    },
  );
  const payload = (await response.json()) as IDiplomaExamsResponse;
  return payload;
}


// Get all exams
export async function getAllExams({ pageParam = 1,diplomaId }: { pageParam?: number,diplomaId:string }): Promise<IDiplomaExamsResponse> {
  const token = await getNextAuthToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/exams?page=${pageParam}&limit=2&diplomaId=${diplomaId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token?.token}`,
      },
    },
  );
  const payload = (await response.json()) as IDiplomaExamsResponse;
  return payload;
}