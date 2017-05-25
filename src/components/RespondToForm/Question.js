// @flow

import React from "react";
import { ChoiceType, QuestionType, QuestionSubmissionType } from "../../types";
import {
  String,
  Text,
  Boolean,
  Select,
  MultiSelect,
  Checkboxes,
  Radio
} from "./widgets";
import { List, Map } from "immutable";

type Props = {
  question: QuestionType,
  submission: QuestionSubmissionType,
  submissions: Map<string, QuestionSubmissionType>,
  setSubmission: Function
};

function renderQuestion(props: Props) {
  const { question, submission, submissions, setSubmission } = props;
  const id = `question-${question.get("id")}`;
  const questionWidget = getQuestionWidget(
    question.get("type"),
    id,
    question.get("content"),
    submission,
    setSubmission,
    question.get("choices")
  );

  let required;
  if (question.required) {
    required = <small>* required</small>;
  } else {
    required = "";
  }

  return (
    <div>
      {required}
      <label htmlFor={id}>
        {question.get("label")}
      </label>
      {questionWidget}
    </div>
  );
}

function shouldDisplayQuestion(props: Props) {
  const { question, submissions } = props;
  const dependency = question.questionDependency;
  if (dependency) {
    const dependentChoicesSelected =
      // for each dependency choice
      dependency.choices.map(choice => {
        return submissions.find((submission, key) => {
          // FIXME: We need to know it's THIS choice this is answering,
          // eventually
          return submission.value === choice.id;
        });
      });
    if (dependentChoicesSelected.size > 0) {
      return dependency.display;
    } else {
      return !dependency.display;
    }
  } else {
    return true;
  }
}

export default function Question(props: Props) {
  if (shouldDisplayQuestion(props)) {
    return renderQuestion(props);
  } else {
    return <div />;
  }
}

function getQuestionWidget(
  type: string,
  id: string,
  content: string,
  submission: QuestionSubmissionType,
  setSubmission: Function,
  choices: List<ChoiceType>
) {
  const onChange = e => setSubmission(id, e.target.value, type);
  const onChangeCheckBox = e => setSubmission(id, e.target.checked, type);
  switch (type) {
    case "string":
      return (
        <String
          id={id}
          content={content}
          value={submission.get("value")}
          onChange={onChange}
        />
      );
    case "text":
      return (
        <Text
          id={id}
          content={content}
          value={submission.get("value")}
          onChange={onChange}
        />
      );
    case "boolean":
      return (
        <Boolean
          id={id}
          content={content}
          value={submission.get("value")}
          onChange={onChangeCheckBox}
        />
      );
    case "select":
      // FIXME: Need to get the choices for a given select somehow
      return (
        <Select
          content={content}
          id={id}
          value={submission.get("value")}
          onChange={onChange}
          choices={choices}
        />
      );
    case "multi_select":
      return (
        <MultiSelect
          content={content}
          id={id}
          value={submission.get("value")}
          onChange={onChange}
          choices={choices}
        />
      );
    case "checkboxes":
      return <Checkboxes choices={choices} />;
    case "radio":
      return (
        <Radio
          name={"radio-1"}
          content={content}
          id={id}
          value={submission.get("value")}
          onChange={onChange}
          choices={choices}
        />
      );
    default:
      return <div />;
  }
}
