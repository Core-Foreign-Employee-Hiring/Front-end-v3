export interface InterviewSettingOptionType {
  job_type: JobType | null
  level: LevelType | null
  question_count: number | null
  title: string | null
}
export interface InterviewQuestionType {
  set_id: string
  questions: QuestionType[]
}

export type JobType = 'marketing' | 'it'
export type LevelType = 'intern' | 'entry' | 'experienced'

export interface QuestionType {
  id: string
  question: string
  order: number
  category: 'foreigner' | 'common' | 'job'
}
export interface CommonAnswerType {
  set_id: string | null
  question_id: string | null
  question_order: number | null
  user_answer: string
  audio: {
    data: string | null
    format: string | null
  } | null
  enable_follow_up: boolean
  ai_model: string | null
}

export interface FollowUpQuestionType {
  answer_id: string
  follow_up_question: string
  transcript: string
}

export interface FollowUpAnswerType {
  answer_id: string
  follow_up_answer: string
  audio: {
    data: string | null
    format: string | null
  } | null
}

export interface InterviewResultType {
  questions: QuestionType[]
  set: InterviewSetType
  answers: InterviewResultAnswerType[]
  evaluation: InterviewResultEvaluationType
  next_question_order: number
}

export interface InterviewResultAnswerType {
  id: string
  set_id: string
  question_id: string
  question_order: number
  user_answer: string
  follow_up_question: string
  follow_up_answer: string
  created_at: string
  question: InterviewResultQuestionType
}

export interface InterviewResultQuestionType {
  id: string
  question: string
  category: string
  job_type: string
  level: string
  model_answer: string
  reasoning: string
  created_at: string
  updated_at: string
}

export interface InterviewResultEvaluationType {
  id: string
  set_id: string
  logic: number
  evidence: number
  job_understanding: number
  formality: number
  completeness: number
  overall_feedback: string
  detailed_feedback: DetailedFeedBackType[]
  created_at: string
}

export interface DetailedFeedBackType {
  question_order: number
  question_id: string
  question: string
  user_answer: string
  follow_up_question: string
  follow_up_answer: string
  feedback: string
  improvements: string
}

export interface InterviewSetType {
  id: string
  user_id: string
  title: string
  job_type: JobType
  level: LevelType
  status: InterviewStatusType
  created_at: string
  completed_at: string
}

export type InterviewStatusType = 'completed' | 'in_progress'
