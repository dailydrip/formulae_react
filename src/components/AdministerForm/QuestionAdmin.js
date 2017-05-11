// @flow

import React from "react";
import { QuestionType } from "../../types";

type Props = {
  section: Object,
  question: QuestionType,
  setQuestionType: Function,
  setQuestionKey: Function,
  setQuestionLabel: Function
};

export default function QuestionAdmin(props: Props) {
  const {
    section,
    question,
    setQuestionType,
    setQuestionKey,
    setQuestionLabel
  } = props;
  return (
    <div className="question">
      <input
        type="text"
        value={question.key}
        name="key"
        onChange={e => setQuestionKey(section.id, question.id, e.target.value)}
      />
      <input
        type="text"
        value={question.label}
        name="label"
        onChange={e =>
          setQuestionLabel(section.id, question.id, e.target.value)}
      />
    </div>
  );
}
