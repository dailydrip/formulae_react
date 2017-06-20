import {
  RespondToForm,
  AdministerForm,
  ViewFormSubmission
} from "./containers";
import { Form, FormSubmission } from "./api";
import {
  RespondToFormStore,
  AdministerFormStore,
  ViewFormSubmissionStore
} from "./stores";
import {
  SectionType,
  FormType,
  FormResponseType,
  FormSubmissionType,
  FormSubmissionResponseType,
  QuestionType,
  QuestionDependencyType,
  QuestionSubmissionType,
  FormQuestionSubmissionType,
  Model,
  AdministerFormModel,
  ViewFormSubmissionModel,
  ChoiceType,
  AddressType
} from "./types";

import {
  decodeForm,
  decodeSection,
  decodeFormSubmissionResponse
} from "./decoders.js";

const Api = {
  Form: Form,
  FormSubmission: FormSubmission
};

const Stores = {
  RespondToFormStore,
  AdministerFormStore,
  ViewFormSubmissionStore
};

const Types = {
  SectionType,
  FormType,
  FormResponseType,
  FormSubmissionType,
  FormSubmissionResponseType,
  QuestionType,
  QuestionDependencyType,
  QuestionSubmissionType,
  FormQuestionSubmissionType,
  Model,
  AdministerFormModel,
  ViewFormSubmissionModel,
  ChoiceType,
  AddressType
};

const Decoders = {
  decodeForm,
  decodeSection,
  decodeFormSubmissionResponse
};

export {
  RespondToForm,
  AdministerForm,
  ViewFormSubmission,
  Api,
  Stores,
  Types,
  Decoders
};
