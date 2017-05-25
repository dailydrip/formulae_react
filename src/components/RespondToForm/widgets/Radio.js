// @flow

import React from "react";
import { List } from "immutable";
import { ChoiceType } from "../../../types";

type Props = {
  value: string,
  name: string,
  content: string,
  choices: List<ChoiceType>,
  onChange: Function
};

export default function Radio(props: Props) {
  const { name, value, content, choices, onChange } = props;

  const options = choices.map((choice, i) => {
    const choiceId = `${name}-${choice.get("id")}`;
    return (
      <label key={i} htmlFor={choiceId}>
        <input
          type="radio"
          name={name}
          id={choiceId}
          value={choice.get("id")}
          checked={value === choice.get("id")}
          onChange={() => onChange(choiceId)}
        />
        {choice.get("label")}
      </label>
    );
  });

  return (
    <div>
      {options}
      <p>{content}</p>
    </div>
  );
}
