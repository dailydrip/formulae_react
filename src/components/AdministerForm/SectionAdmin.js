// @flow

import React from "react";
import { SectionType } from "../../types";

type Props = {
  section: SectionType,
  addQuestion: Function,
  setSectionName: Function
};

export default function SectionAdmin(props: Props) {
  const { section, addQuestion, setSectionName } = props;
  return (
    <div>
      <button onClick={() => addQuestion(section.id)}>
        Add Question
      </button>
      <input
        type="text"
        value={section.name}
        name="name"
        onChange={e => setSectionName(section.id, e.target.value)}
      />
      <input type="text" value={section.content} name="content" />
    </div>
  );
}
