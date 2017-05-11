import { Form, Section, FormSubmission } from "../api";
import { FormType } from "../types";

function addSection(section: SectionType, form_id: number) {
  return {
    type: "ADD_SECTION"
  };
}

function setSectionName(sectionId: number, name: string) {
  return {
    type: "SET_SECTION_NAME",
    payload: {
      sectionId,
      name
    }
  };
}

function setSectionContent(sectionId: number, content: string) {
  return {
    type: "SET_SECTION_CONTENT",
    payload: {
      sectionId,
      content
    }
  };
}

function addQuestion(sectionId: number) {
  return {
    type: "ADD_QUESTION",
    payload: {
      sectionId
    }
  };
}

function setQuestionKey(sectionId: number, questionId: number, key: string) {
  return {
    type: "SET_QUESTION_KEY",
    payload: {
      sectionId,
      questionId,
      key
    }
  };
}

function setQuestionLabel(
  sectionId: number,
  questionId: number,
  label: string
) {
  return {
    type: "SET_QUESTION_LABEL",
    payload: {
      sectionId,
      questionId,
      label
    }
  };
}

export default {
  addSection,
  setSectionName,
  setSectionContent,
  addQuestion,
  setQuestionKey,
  setQuestionLabel
};
