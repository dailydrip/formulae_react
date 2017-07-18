// @flow

import React from "react";
import { SectionType } from "../../types";
import QuestionAdmin from "./QuestionAdmin";
import { Set } from "immutable";

type Props = {
  form: Object,
  section: SectionType,
  setSectionName: Function,
  setSectionContent: Function,
  addQuestion: Function,
  setQuestionType: Function,
  setQuestionKey: Function,
  setQuestionRequired: Function,
  setQuestionContent: Function,
  setQuestionPlaceholder: Function,
  setQuestionLabel: Function,
  setQuestionValidateAs: Function,
  deleteQuestion: Function,
  expandedQuestions: Set<string>,
  expandedSections: Set<string>,
  toggleExpandQuestion: Function,
  moveQuestion: Function,
  reorderQuestion: Function,
  moveSection: Function,
  addChoice: Function,
  moveChoice: Function,
  setChoiceLabel: Function,
  deleteChoice: Function,
  deleteSection: Function,
  addQuestionDependency: Function,
  createQuestionDependency: Function,
  deleteQuestionDependency: Function,
  setDisplayQuestionDependency: Function,
  setAndQuestionDependency: Function,
  setChoiceMetadata: Function,
  toggleExpandSection: Function
};

export default function SectionAdmin(props: Props) {
  const {
    form,
    section,
    setSectionName,
    setSectionContent,
    addQuestion,
    setQuestionType,
    setQuestionKey,
    setQuestionRequired,
    setQuestionContent,
    setQuestionPlaceholder,
    setQuestionLabel,
    setQuestionValidateAs,
    deleteQuestion,
    expandedQuestions,
    expandedSections,
    toggleExpandQuestion,
    moveQuestion,
    reorderQuestion,
    moveSection,
    addChoice,
    moveChoice,
    setChoiceLabel,
    deleteChoice,
    deleteSection,
    addQuestionDependency,
    createQuestionDependency,
    deleteQuestionDependency,
    setDisplayQuestionDependency,
    setAndQuestionDependency,
    setChoiceMetadata,
    toggleExpandSection
  } = props;

  const expanded = expandedSections.get(String(section.id)) !== undefined;
  const expandedClass = expanded ? "" : "hide";
  const caretClass = expanded ? "fa-caret-down" : "fa-caret-up";

  const questionsToRender = section.questions
    .sortBy(q => q.order)
    .filter(q => !q.deleted)
    .map((q, i) => (
      <QuestionAdmin
        form={form}
        addQuestion={addQuestion}
        setQuestionType={setQuestionType}
        setQuestionKey={setQuestionKey}
        setQuestionLabel={setQuestionLabel}
        setQuestionRequired={setQuestionRequired}
        setQuestionContent={setQuestionContent}
        setQuestionPlaceholder={setQuestionPlaceholder}
        setQuestionValidateAs={setQuestionValidateAs}
        deleteQuestion={deleteQuestion}
        question={q}
        section={section}
        key={i}
        expanded={expandedQuestions.get(String(q.id)) !== undefined}
        toggleExpandQuestion={() => toggleExpandQuestion(q.id)}
        moveQuestion={direction => moveQuestion(q.id, direction)}
        reorderQuestion={(questionId, order) =>
          reorderQuestion(questionId, order)}
        addChoice={addChoice}
        moveChoice={moveChoice}
        setChoiceLabel={setChoiceLabel}
        deleteChoice={deleteChoice}
        addQuestionDependency={addQuestionDependency}
        createQuestionDependency={createQuestionDependency}
        deleteQuestionDependency={deleteQuestionDependency}
        setDisplayQuestionDependency={setDisplayQuestionDependency}
        setAndQuestionDependency={setAndQuestionDependency}
        setChoiceMetadata={setChoiceMetadata}
      />
    ));

  return (
    <section className="admin-formsection">
      <header className="section-header">
        <i className="fa fa-bars grippy" />
        <button onClick={() => moveSection(-1)}>Up</button>
        <button onClick={() => moveSection(1)}>Down</button>
        <label>
          <input
            type="text"
            value={section.name}
            name="name"
            placeholder="Name"
            onChange={e => setSectionName(section.id, e.target.value)}
          />
        </label>
        <label>
          <input
            type="text"
            value={section.content}
            name="content"
            placeholder="Content"
            onChange={e => setSectionContent(section.id, e.target.value)}
          />
        </label>
        <div className="controls">
          <i
            id={`edit-${section.id}`}
            onClick={() => toggleExpandSection(section.id)}
            className={`expand fa ${caretClass}`}
          />
          <i
            onClick={e => deleteSection(section.id)}
            className="fa fa-times-circle-o delete"
          />
        </div>
      </header>
      <div className={`question-container ${expandedClass}`}>
        {questionsToRender}
        <button className="pure-button" onClick={() => addQuestion(section.id)}>
          Add Question
        </button>
      </div>
    </section>
  );
}
