// @flow

import React from "react";
import { SectionType, ChoiceType } from "../../types";
import QuestionAdmin from "./QuestionAdmin";
import { Set } from "immutable";

type Props = {
  choice: ChoiceType,
  sectionId: string,
  questionId: string,
  setChoiceLabel: Function,
  moveChoice: Function
};

export default function ChoiceAdmin(props: Props) {
  const { choice, sectionId, questionId, setChoiceLabel, moveChoice } = props;

  return (
    <div>
      <div className="section">
        <button onClick={() => moveChoice(-1)}>Up</button>
        <button onClick={() => moveChoice(1)}>Down</button>
        <label>
          Option Name:
          <input
            type="text"
            value={choice.label}
            name="name"
            onChange={e =>
              setChoiceLabel(sectionId, questionId, choice.id, e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}
