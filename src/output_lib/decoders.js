// @flow

import {
  FormType,
  FormResponseType,
  SectionType,
  ChoiceType,
  QuestionType,
  QuestionDependencyType,
  QuestionSubmissionType,
  FormSubmissionResponseType
} from "./types";
import { List } from "immutable";

type ApiApplication = {
  id: number,
  created_at: string,
  updated_at: string
};

type ApiSection = {
  id: number,
  form_id: number,
  name: string,
  order: number,
  content: string,
  created_at: string,
  updated_at: string
};

type ApiChoice = {
  id: string,
  question_id: number,
  question_dependency_id: number,
  metadata: string,
  maximum_chosen: number,
  label: string
};

type ApiQuestionDependency = {
  id: string,
  display: boolean,
  choices: Array<ApiChoice>,
  and: boolean
};

type ApiQuestion = {
  id: number,
  key: string,
  label: string,
  content: string,
  order: number,
  placeholder: string,
  required: boolean,
  hidden: boolean,
  question_type: string,
  validate_as: string | null,
  created_at: string,
  choices: Array<ApiChoice>,
  question_dependency: ApiQuestionDependency,
  updated_at: string,
  section_id: number
};

type ApiForm = {
  id: number,
  application: ApiApplication,
  completion_content: string,
  sections: Array<ApiSection>,
  questions: Array<ApiQuestion>
};

type ApiFormResponse = {
  id: number,
  application_id: number
};

type ApiQuestionSubmissionResponse = {
  id: number,
  value: string | Object,
  question_type: string
};

type ApiFormSubmissionResponse = {
  id: number,
  form: ApiFormResponse,
  question_submissions: Array<ApiQuestionSubmissionResponse>
};

function decodeSection(
  section: ApiSection,
  questions: List<QuestionType>
): SectionType {
  return new SectionType({
    name: section.name,
    content: section.content,
    order: section.order,
    questions: List(
      questions.filter(question => {
        return question.get("section_id") === section.id;
      })
    )
  });
}

function decodeQuestion(question: ApiQuestion): QuestionType {
  const questionDependency = decodeQuestionDependency(
    question.question_dependency
  );
  return new QuestionType({
    id: `${question.id}`,
    key: question.key,
    label: question.label,
    content: question.content,
    type: question.question_type,
    validateAs: question.validate_as,
    order: question.order,
    required: question.required,
    placeholder: question.placeholder,
    section_id: question.section_id,
    choices: decodeChoices(question.choices),
    questionDependency: questionDependency
  });
}

function decodeQuestionDependency(
  questionDependency: ApiQuestionDependency
): ?QuestionDependencyType {
  if (questionDependency === null || questionDependency === undefined) {
    return null;
  }
  return new QuestionDependencyType({
    display: questionDependency.display,
    choices: decodeChoices(questionDependency.choices),
    and: questionDependency.and
  });
}

function decodeChoices(choices: Array<ApiChoice>): List<ChoiceType> {
  return List(
    choices.map(choice => {
      return new ChoiceType({
        id: choice.id,
        question_id: choice.question_id,
        question_dependency_id: choice.question_dependency_id,
        metadata: choice.metadata,
        maximum_chosen: choice.maximum_chosen,
        label: choice.label
      });
    })
  );
}

function decodeForm(data: ApiForm): FormType {
  // Decode the questions on their own
  const questions = List(data.questions.map(decodeQuestion));
  return new FormType({
    id: data.id,
    completionContent: data.completion_content,
    sections: List(
      data.sections.map(section => {
        return decodeSection(section, questions);
      })
    )
  });
}

function decodeFormResponse(data: ApiFormResponse): FormResponseType {
  return new FormResponseType({
    id: data.id,
    applicationId: data.application_id
  });
}

function decodeQuestionSubmissions(data: Array<ApiQuestionSubmissionResponse>) {
  return data.map(
    qs =>
      new QuestionSubmissionType({
        id: qs.id,
        value: qs.value,
        questionType: qs.question_type
      })
  );
}

function decodeFormSubmissionResponse(
  data: ApiFormSubmissionResponse
): FormSubmissionResponseType {
  return new FormSubmissionResponseType({
    id: data.id,
    formResponse: decodeFormResponse(data.form),
    questionSubmissions: decodeQuestionSubmissions(data.question_submissions)
  });
}

export { decodeForm, decodeSection, decodeFormSubmissionResponse };
