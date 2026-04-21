import type { IDiploma } from "./diplomas";

export interface IDiplomaExam {
    id: string;
    title: string;
    description: string;
    image: string;
    duration: number;
    createdAt: string;
}

export interface IDiplomaWithExams extends IDiploma {
    exams: IDiplomaExam[];
}

export interface IDiplomaExamsPayload {
    diploma: IDiplomaWithExams;
}

export interface IDiplomaExamsResponse {
    status: boolean;
    code: number;
    payload: IDiplomaExamsPayload;
}
