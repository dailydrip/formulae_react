// @flow

import React from "react";
import { List, Map } from "immutable";
import { SectionType, QuestionSubmissionType } from "../../types";
import Section from "./Section";
import type {
  QuestionSubmissionsMapType
} from "../../types/QuestionSubmissionsMapType";

type Props = {
  sections: List<SectionType>,
  submissions: QuestionSubmissionsMapType,
  setSubmission: Function,
  nextStep: Function,
  prevStep: Function,
  currentStep: number
};

type StepProps = {
  section: SectionType,
  setSubmission: Function,
  submissions: QuestionSubmissionsMapType
};

export function Step(props: StepProps) {
  const { section, setSubmission, submissions } = props;
  return (
    <Section
      section={section}
      submissions={submissions}
      setSubmission={setSubmission}
    />
  );
}

// - Add a 'currentStep' integer to the RespondToForm props that's passed down
// - Add a 'nextStep/prevStep' action
// - Render each section in some `Step` component
// - The step component takes a 'currentStep' param, and if
//   currentStep is 0, shows no prev, if currentStep == totalSteps, shows no
//   next
// - clicking next/prev fires nextStep/prevStep action
// - only show current section
export default function SectionsWithSteps(props: Props) {
  const {
    sections,
    submissions,
    setSubmission,
    currentStep,
    nextStep,
    prevStep
  } = props;

  const totalSteps = sections.size;

  let previous, next;

  if (currentStep > 0) {
    previous = <button onClick={prevStep}> Previous </button>;
  } else {
    previous = <div />;
  }
  if (currentStep < totalSteps - 1) {
    next = <button onClick={nextStep}> Next </button>;
  } else {
    next = <div />;
  }

  if (!sections.isEmpty()) {
    const section = sections.get(currentStep);
    return (
      <div>
        <Step
          section={section}
          submissions={submissions}
          setSubmission={setSubmission}
        />
        {previous}
        {next}
      </div>
    );
  } else {
    return <div />;
  }
}
