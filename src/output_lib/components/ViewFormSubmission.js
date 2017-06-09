// @flow
import React from "react";
import { FormSubmissionType } from "../types";

type Props = {
  formSubmission: ?FormSubmissionType,
  formSubmissionId: string,
  getFormSubmission: Function
};

export default function ViewFormSubmission(props: Props) {
  const {
    formSubmissionId,
    formSubmission,
    getFormSubmission
  } = props;

  if (formSubmission !== null) {
    const questionSubmissions = formSubmission.questionSubmissions.map(
      (qs, i) => <li key={i}>qs.value</li>
    );
  }

  return (
    <div>
      <ul>
        {questionSubmissions}
      </ul>
      <button
        onClick={() => {
          getFormSubmission(1);
        }}
      >
        Get API FormSubmission 1
      </button>
    </div>
  );
}
