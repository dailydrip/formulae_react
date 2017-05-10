// @flow

import { Model, FormType, SectionType, QuestionType } from "../types";
import { List } from "immutable";

const init = new Model();

type Action = "ADD_SECTION" | "ADD_QUESTION";

export default function AdministerFormReducer(
  model: Model = init,
  action: { type: Action, payload: ?Object }
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
    case "ADD_QUESTION":
      if (action.payload) {
        let { sectionId } = action.payload;
        let sections = model.get("form").sections.map(s => {
          if (s.id == sectionId) {
            return s.questions.push(new QuestionType({}));
          } else {
            return s;
          }
        });

        return model.updateIn(["form"], f => {
          return f.set("sections", sections);
        });
      } else {
      }
    default:
      return model;
  }
}
