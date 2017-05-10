// @flow

import React from "react";
import Section from "./RespondToForm/Section";
import SectionAdmin from "./AdministerForm/SectionAdmin";
import { List, Map } from "immutable";
import {
  SectionType,
  FormType,
  QuestionSubmissionType,
  FormSubmissionType
} from "../types";

type Props = {
  form: FormType,
  getForm: Function,
  addSection: Function,
  addQuestion: Function,
  setSectionName: Function
};

function createSection(addSection) {
  addSection();
}

export default function AdministerForm(props: Props) {
  const { form, addSection, setSectionName, addQuestion } = props;
  const sectionsToRender = form.sections.map((s, i) => (
    <SectionAdmin
      addQuestion={addQuestion}
      setSectionName={setSectionName}
      section={s}
      key={i}
    />
  ));
  return (
    <div>
      <h2>Administer Form</h2>
      <div>
        <h3>Sections</h3>
        {sectionsToRender}
        <button onClick={() => addSection()}>
          Add Section
        </button>
      </div>
      <hr />
    </div>
  );
}
