export interface UserAnswer {
  questionId: string;
  answerId: string;
}

export interface ExamAnswers {
  examId: string;
  answers: UserAnswer[];
  startedAt: string;
}

export interface SubmissionExam {
  id: string;
  title: string;
  duration: number;
}

export interface SubmissionDetails {
  id: string;
  userId: string;
  examId: string;
  examTitle: string;
  exam: SubmissionExam;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  startedAt: string;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubmissionAnalytics {
  questionId: string;
  questionText: string;
  selectedAnswer: Record<string, any>;
  isCorrect: boolean;
  correctAnswer: Record<string, any>;
}

export interface SubmitPayload {
  submission: SubmissionDetails;
  analytics: SubmissionAnalytics[];
}

export interface SubmitAnswersResponse {
  status: boolean;
  code: number;
  payload: SubmitPayload;
}
