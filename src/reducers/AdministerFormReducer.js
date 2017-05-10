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
      return model.updateIn(["form", "sections"], sections => {
        return sections.push(
          new SectionType({
            name: "",
            content: ""
          })
        );
      });
    case "SET_SECTION_NAME":
      if (action.payload) {
        let { sectionId, name } = action.payload;
        return model.updateIn(["form", "sections"], sections => {
          return sections.map(s => {
            if (s.id == sectionId) {
              return s.set("name", name);
            } else {
              return s;
            }
          });
        });
      } else {
        return model;
      }
    case "ADD_QUESTION":
      if (action.payload) {
        let { sectionId } = action.payload;
        return model.updateIn(["form", "sections"], sections => {
          return sections.map(s => {
            if (s.id == sectionId) {
              return s.set("questions", s.questions.push(new QuestionType({})));
            } else {
              return s;
            }
          });
        });
      } else {
        return model;
      }
    default:
      return model;
  }
}
