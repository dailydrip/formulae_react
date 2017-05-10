// @flow

import React from "react";
import { SectionType } from "../../types";

type Props = {
  section: SectionType
};

function addQuestion() {}
export default function SectionAdmin(props: Props) {
  const { section } = props;
  return (
    <div>
      <button onClick={() => addQuestion()}>
        Add Question
      </button>
      <input type="text" value={section.name} name="name" />
      <input type="text" value={section.content} name="content" />
    </div>
  );
}
