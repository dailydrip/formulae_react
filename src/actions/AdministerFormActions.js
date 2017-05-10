import { Form, Section, FormSubmission } from "../api";
import { FormType } from "../types";

function addSection(section: SectionType, form_id: number) {
  return {
    type: "ADD_SECTION"
  };
}

export default {
  addSection
};
