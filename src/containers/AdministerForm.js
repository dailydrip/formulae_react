import { connect } from "react-redux";
import * as components from "../components";
import { AdministerFormActions } from "../actions";

export const AdministerForm = connect(
  function mapStateToProps(state) {
    return {
      form: state.get("form")
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      addSection: (section, form_id) =>
        dispatch(AdministerFormActions.addSection(section, form_id)),
      addQuestion: sectionId =>
        dispatch(AdministerFormActions.addQuestion(sectionId)),
      setSectionName: (sectionId, name) =>
        dispatch(AdministerFormActions.setSectionName(sectionId, name)),
      setSectionContent: (sectionId, content) =>
        dispatch(AdministerFormActions.setSectionContent(sectionId, content)),
      setQuestionKey: (sectionId, questionId, key) =>
        dispatch(
          AdministerFormActions.setQuestionKey(sectionId, questionId, key)
        ),
      setQuestionLabel: (sectionId, questionId, label) =>
        dispatch(
          AdministerFormActions.setQuestionLabel(sectionId, questionId, label)
        )
    };
  }
)(components.AdministerForm);
