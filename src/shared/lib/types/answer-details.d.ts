export interface IAnswerDetailsResponse {
  status: boolean;
  code: number;
  payload: IAnswerDetailsPayload;
}

export interface IAnswerDetailsPayload {
  submission: ISubmission;
  analytics: IQuestionAnalytic[];
}

export interface ISubmission {
  id: string;
  examId: string;
  examTitle: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  startedAt: string;
  submittedAt: string;
}

export interface IQuestionAnalytic {
  questionId: string;
  questionText: string;
  selectedAnswer: IAnswerOption;
  isCorrect: boolean;
  correctAnswer: IAnswerOption;
}

export interface IAnswerOption {
  id: string;
  text: string;
}