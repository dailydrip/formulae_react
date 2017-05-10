// @flow

import {
  Model,
  FormType,
  SectionType,
  QuestionType,
  QuestionSubmissionType
} from "../types";
import { List } from "immutable";

const init = new Model();

type Action = "ADD_SECTION";

export default function AdministerFormReducer(
  model: Model = init,
  action: { type: Action }
) {
  switch (action.type) {
    case "ADD_SECTION":
      let sections = model.get("form").sections.push(
        new SectionType({
          name: "",
          content: ""
        })
      );

      let newForm = new FormType({
        sections: sections
      });
      return new Model({ form: newForm });
    default:
      return model;
  }
}
