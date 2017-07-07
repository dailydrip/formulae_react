// @flow

import React from "react";
import { List } from "immutable";
import { ChoiceType } from "../../../types";

type Props = {
  id: string,
  value: string,
  content: string,
  choices: List<ChoiceType>,
  onChange: Function
};

export default function Select(props: Props) {
  const { id, value, content, choices, onChange } = props;
  let newChoices = choices.unshift(
    new ChoiceType({ label: "Select", value: "", disabled: true })
  );
  const options = newChoices.map((choice, i) => {
    return (
      <option
        key={i}
        name={choice.get("label")}
        value={choice.get("id")}
        disabled={choice.get("disabled")}
        checked={value === choice.get("id")}
      >
        {choice.get("label")}
      </option>
    );
  });
  return (
    <div>
      <select id={id} onChange={onChange}>{options}</select>
      <p>{content}</p>
    </div>
  );
}
