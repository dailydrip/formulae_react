import { connect } from "react-redux";
import * as components from "../components";
import {
  getForm,
  addSection
} from "../actions";

export const AdministerForm = connect(
  function mapStateToProps(state) {
    return {
      form: state.get("form"),
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      getForm: id => dispatch(getForm(id)),
      addSection: (section, form_id) => dispatch(addSection(section, form_id)),
    };
  }
)(components.AdministerForm);
