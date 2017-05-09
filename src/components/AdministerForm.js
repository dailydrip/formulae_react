// @flow

import React from "react";
import Section from "./RespondToForm/Section";
import { List, Map } from "immutable";
import {
  SectionType,
  FormType,
  QuestionSubmissionType,
  FormSubmissionType,
} from "../types";

type Props = {
  form: FormType,
  addSection: Function
};

function createSection(name, content, addSection, formId){
  let section = new SectionType(name, content)
  addSection(section, formId)
}

export default function AdministerForm(props: Props) {
  const {
    form,
    addSection,
  } = props;

  const sections = form.get("sections")

  return (
    <div>
      <h2> Administer Form </h2>
      <div>
        <input type="text" name="name" />
        <input type="text" name="content" />
        <button onClick={() => createSection(name, content, addSection, form.id)}>Add Section</button>
      </div>
      <hr />
      {sections}
    </div>
  );
}
