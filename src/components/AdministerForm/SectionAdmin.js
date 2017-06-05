// @flow

import React from "react";
import { SectionType } from "../../types";
import QuestionAdmin from "./QuestionAdmin";
import { Set } from "immutable";

type Props = {
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
  deleteQuestion: Function,
  expandedQuestions: Set<string>,
  toggleExpandQuestion: Function
};

export default function SectionAdmin(props: Props) {
  const {
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
    deleteQuestion,
    expandedQuestions,
    toggleExpandQuestion
  } = props;
  const questionsToRender = section.questions.map((q, i) => (
    <QuestionAdmin
      addQuestion={addQuestion}
      setQuestionType={setQuestionType}
      setQuestionKey={setQuestionKey}
      setQuestionLabel={setQuestionLabel}
      setQuestionRequired={setQuestionRequired}
      setQuestionContent={setQuestionContent}
      setQuestionPlaceholder={setQuestionPlaceholder}
      deleteQuestion={deleteQuestion}
      question={q}
      section={section}
      key={i}
      expanded={expandedQuestions.get(q.id) !== undefined}
      toggleExpandQuestion={() => toggleExpandQuestion(q.id)}
    />
  ));

  return (
    <div>
      <div className="section">
        <h6>{section.name}</h6>
        <label>
          Name:
          <input
            type="text"
            value={section.name}
            name="name"
            onChange={e => setSectionName(section.id, e.target.value)}
          />
        </label>
        <label>
          Content:
          <input
            type="text"
            value={section.content}
            name="content"
            onChange={e => setSectionContent(section.id, e.target.value)}
          />
        </label>
        <button className="pure-button" onClick={() => addQuestion(section.id)}>
          Add Question
        </button>
      </div>
      <div className="question-container">
        {questionsToRender}
      </div>
    </div>
  );
}
