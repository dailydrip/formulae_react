import { createFormApi, createFormSubmissionApi } from "../api";
import { List } from "immutable";

function setQuestionSubmission(key, values: List<string>, questionType) {
  return {
    type: "SET_QUESTION_SUBMISSION",
    payload: {
      key: key,
      values: values,
      questionType: questionType
    }
  };
}

function loadExampleForm() {
  return {
    type: "LOAD_EXAMPLE_FORM"
  };
}

function getForm(apiKey, id) {
  return dispatch => {
    const Form = createFormApi(apiKey);
    Form.get(id).then(formType => dispatch(gotForm(formType)));
  };
}

function submitForm(apiKey, formSubmissionType) {
  return dispatch => {
    const FormSubmission = createFormSubmissionApi(apiKey);
    FormSubmission.post(formSubmissionType).then(response => {
      dispatch(setAsSubmitted());
    });
  };
}

function setAsSubmitted() {
  return {
    type: "SET_AS_SUBMITTED"
  };
}

function gotForm(form: formtype) {
  return {
    type: "GOT_FORM",
    payload: {
      form: form
    }
  };
}

function setCurrentStep(currentStep: number) {
  return {
    type: "SET_CURRENT_STEP",
    payload: {
      currentStep: currentStep
    }
  };
}

function nextStep() {
  return {
    type: "NEXT_STEP"
  };
}

function prevStep() {
  return {
    type: "PREV_STEP"
  };
}

function addError(id: string | number, message: string) {
  return {
    type: "ADD_ERROR",
    payload: {
      id,
      message
    }
  };
}

function removeError(id: number) {
  return {
    type: "REMOVE_ERROR",
    payload: {
      id
    }
  };
}
export default {
  loadExampleForm,
  getForm,
  gotForm,
  submitForm,
  setCurrentStep,
  setQuestionSubmission,
  nextStep,
  prevStep,
  addError,
  removeError,
  setAsSubmitted
};
