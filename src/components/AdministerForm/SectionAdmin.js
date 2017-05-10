// @flow

import React from "react";
import { SectionType } from "../../types";

type Props = {
  section: SectionType,
  addQuestion: Function
};

export default function SectionAdmin(props: Props) {
  const { section, addQuestion } = props;
  return (
    <div>
      <button onClick={() => addQuestion(section.id)}>
        Add Question
      </button>
      <input type="text" value={section.name} name="name" />
      <input type="text" value={section.content} name="content" />
    </div>
  );
}
