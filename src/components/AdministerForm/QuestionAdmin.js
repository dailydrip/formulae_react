// @flow

import React from "react";
import { QuestionType } from "../../types";

type Props = {
  question: QuestionType
};

export default function QuestionAdmin(props: Props) {
  const { question } = props;
  return (
    <div>
      <input type="text" value={question.key} name="name" />
      <input type="text" value={question.label} name="label" />
    </div>
  );
}
