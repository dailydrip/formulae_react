// @flow

import { Record, List } from "immutable";
import QuestionType from "./QuestionType";
const uuidV4 = require("uuid/v4");

// FIXME: Flow isn't checking these record types sigh
export default class SectionType
  extends Record({
    id: uuidV4(),
    name: "",
    content: "",
    order: 0,
    questions: List()
  }) {
  id: string;
  name: string;
  content: string;
  order: number;
  questions: List<QuestionType>;
}
