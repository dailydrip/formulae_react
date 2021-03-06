// @flow

import {
  FormType,
  FormResponseType,
  SectionType,
  ChoiceType,
  QuestionType,
  QuestionDependencyType,
  QuestionDependencyChoiceType,
  QuestionSubmissionType,
  FormSubmissionResponseType
} from "./types";
import { List, Map } from "immutable";

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
  order: number,
  maximum_chosen: number,
  label: string
};

type ApiQuestionDependencyChoice = {
  id: string,
  question_dependency_id: number,
  choice_id: number
};

type ApiQuestionDependency = {
  id: string,
  display: boolean,
  question_dependency_choices: Array<ApiQuestionDependencyChoice>,
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
    id: section.id,
    name: section.name,
    content: section.content,
    order: section.order,
    questions: List(
      questions.filter(question => {
        return question.get("sectionId") === section.id;
      })
    ),
    persisted: true
  });
}

function decodeQuestion(apiQuestion: ApiQuestion): QuestionType {
  const questionDependency = decodeQuestionDependency(
    apiQuestion.question_dependency
  );
  let question = new QuestionType({
    id: apiQuestion.id,
    key: apiQuestion.key,
    label: apiQuestion.label,
    content: apiQuestion.content,
    type: apiQuestion.question_type,
    validateAs: apiQuestion.validate_as,
    order: apiQuestion.order,
    required: apiQuestion.required,
    placeholder: apiQuestion.placeholder,
    sectionId: apiQuestion.section_id,
    choices: decodeChoices(apiQuestion.choices),
    questionDependency: questionDependency,
    persisted: true
  });
  // Add metadata fields by looking at all choice metadata
  let metadataFields = question.choices
    .flatMap(choice => choice.metadata.keys())
    .toSet()
    .toList();
  return question.set("metadataFields", metadataFields);
}

function decodeQuestionDependency(
  questionDependency: ApiQuestionDependency
): ?QuestionDependencyType {
  if (questionDependency === null) {
    return null;
  }
  return new QuestionDependencyType({
    id: questionDependency.id,
    display: questionDependency.display,
    questionDependencyChoices: decodeQuestionDependencyChoices(
      questionDependency.question_dependency_choices
    ),
    and: questionDependency.and,
    persisted: true
  });
}

function decodeQuestionDependencyChoices(
  questionDependencyChoices: Array<ApiQuestionDependencyChoice>
): List<QuestionDependencyChoiceType> {
  return List(
    questionDependencyChoices.map(choice => {
      return new QuestionDependencyChoiceType({
        id: choice.id,
        questionDependencyId: choice.question_dependency_id,
        choiceId: choice.choice_id,
        persisted: true
      });
    })
  );
}

function decodeChoices(choices: Array<ApiChoice>): List<ChoiceType> {
  return List(
    choices.map(choice => {
      return new ChoiceType({
        id: choice.id,
        question_id: choice.question_id,
        question_dependency_id: choice.question_dependency_id,
        metadata: new Map(maybeParse(choice.metadata)),
        maximum_chosen: choice.maximum_chosen,
        order: choice.order,
        label: choice.label,
        persisted: true
      });
    })
  );
}

function maybeParse(stringOrObject) {
  if (typeof stringOrObject === "string") {
    return JSON.parse(stringOrObject);
  } else {
    return stringOrObject;
  }
}

function decodeForm(data: ApiForm): FormType {
  // Decode the questions on their own
  const questions = List(data.questions.map(decodeQuestion));
  return new FormType({
    id: data.id,
    applicationId: data.application.id,
    completionContent: data.completion_content,
    sections: List(
      data.sections.map(section => {
        return decodeSection(section, questions);
      })
    ),
    persisted: true
  });
}

function decodeFormResponse(data: ApiFormResponse): FormResponseType {
  return new FormResponseType({
    id: data.id,
    applicationId: data.application_id,
    persisted: true
  });
}

function decodeQuestionSubmissions(data: Array<ApiQuestionSubmissionResponse>) {
  return data.map(
    qs =>
      new QuestionSubmissionType({
        id: qs.id,
        value: qs.value,
        questionType: qs.question_type,
        persisted: true
      })
  );
}

function decodeFormSubmissionResponse(
  data: ApiFormSubmissionResponse
): FormSubmissionResponseType {
  return new FormSubmissionResponseType({
    id: data.id,
    formResponse: decodeFormResponse(data.form),
    questionSubmissions: decodeQuestionSubmissions(data.question_submissions),
    persisted: true
  });
}

export { decodeForm, decodeSection, decodeFormSubmissionResponse };
