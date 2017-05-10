import { Form, Section, FormSubmission } from "./api";
import { FormType } from "./types";

export function setQuestionSubmission(key, value, questionType) {
  return {
    type: "SET_QUESTION_SUBMISSION",
    payload: {
      key: key,
      value: value,
      questionType: questionType
    }
  };
}

export function loadExampleForm() {
  return {
    type: "LOAD_EXAMPLE_FORM"
  };
}

export function getForm(id) {
  return dispatch => {
    Form.get(id).then(formType => dispatch(gotForm(formType)));
  };
}

export function submitForm(formSubmissionType) {
  return dispatch => {
    FormSubmission.post(formSubmissionType).then(console.log);
  };
}

export function gotForm(form: FormType) {
  return {
    type: "GOT_FORM",
    payload: {
      form: form
    }
  };
}

export function addSection(section: SectionType, form_id: number) {
  return {
    type: "ADD_SECTION"
  };
  // return dispatch => {
  // Section.create((section: section), (form_id: form_id)).then(console.log);
  //};
}
