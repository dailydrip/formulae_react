// @flow

import React from "react";
import { QuestionType } from "../../types";
import QuestionAdmin from "./QuestionAdmin";
import { Set } from "immutable";
import ChoiceAdmin from "./ChoiceAdmin";

type Props = {
  sectionId: string,
  question: QuestionType,
  addChoice: Function,
  moveChoice: Function,
  setChoiceLabel: Function
};

export default function ChoicesAdminister(props: Props) {
  const {
    sectionId,
    question,
    addChoice,
    moveChoice,
    setChoiceLabel
  } = props;
  const choicesToRender = question.choices
    .sortBy(c => c.order)
    .map((c, i) => (
      <ChoiceAdmin
        key={i}
        addChoice={addChoice}
        setChoiceLabel={setChoiceLabel}
        choice={c}
        sectionId={sectionId}
        questionId={question.id}
        moveChoice={direction => moveChoice(sectionId, question.id, direction)}
      />
    ));

  return (
    <div>
      <div className="section">
        <h6>Choice Name</h6>
        <button
          className="pure-button"
          onClick={() => addChoice(sectionId, question.id)}
        >
          Add Choice
        </button>
        <hr />
        {choicesToRender}
      </div>
    </div>
  );
}
