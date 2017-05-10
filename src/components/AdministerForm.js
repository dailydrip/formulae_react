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
  addSection: Function
};

function createSection(addSection) {
  addSection();
}

export default function AdministerForm(props: Props) {
  const {
    form,
    addSection
  } = props;
  const sectionsToRender = form.sections ? form.sections.toString() : "";
  return (
    <div>
      <h2> Administer Form </h2>
      <div>
        <h3> Sections </h3>
        <button onClick={() => addSection()}>
          Add Section
        </button>
        {sectionsToRender}
      </div>
      <hr />
    </div>
  );
}
