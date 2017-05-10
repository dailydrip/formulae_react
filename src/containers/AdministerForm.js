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
        dispatch(AdministerFormActions.addSection(section, form_id))
    };
  }
)(components.AdministerForm);
