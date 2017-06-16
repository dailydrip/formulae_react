// @flow

import React from "react";
import { QuestionType } from "../../types";
import ChoiceAdmin from "./ChoiceAdmin";

type Props = {
  sectionId: string,
  question: QuestionType,
  addChoice: Function,
  moveChoice: Function,
  setChoiceLabel: Function,
  deleteChoice: Function
};

export default function ChoicesAdmin(props: Props) {
  const {
    sectionId,
    question,
    addChoice,
    moveChoice,
    setChoiceLabel,
    deleteChoice
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
        deleteChoice={deleteChoice}
        moveChoice={(choiceId, direction) =>
          moveChoice(sectionId, question.id, choiceId, direction)}
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
        {choicesToRender}
        <hr />
      </div>
    </div>
  );
}
