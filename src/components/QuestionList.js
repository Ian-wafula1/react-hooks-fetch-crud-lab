import React, { useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, setQuestions, handleDelete, handleSelectChange}) {

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(res => res.json())
    .then(arr => 
      setQuestions(arr)
    )
  }, [])
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map(question => {
        return <QuestionItem handleSelectChange={handleSelectChange} handleDelete={handleDelete} key={question.id} question={question} />
      })}</ul>
    </section>
  );
}

export default QuestionList;
