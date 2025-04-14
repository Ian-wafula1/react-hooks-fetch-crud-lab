import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  function handleAddQuestion(question) {
    setQuestions([...questions, question])
    setPage('List')
  }

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json)
    .then(q => {
      setQuestions(questions.filter(question => question.id !== id))
    })
  }

  function handleSelectChange(newIndex, id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        correctIndex: newIndex
      })
    })
    setQuestions(questions.map(question => question.id !== id ? question: {...question, correctIndex: newIndex}))
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm handleAddQuestion={handleAddQuestion} /> : <QuestionList handleSelectChange={handleSelectChange} handleDelete={handleDelete} setQuestions={setQuestions} questions={questions} />}
    </main>
  );
}

export default App;
