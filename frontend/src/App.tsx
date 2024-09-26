import { useEffect, useState } from "react";
import axios from "axios";

const serverURL = "http://localhost:3000";

type Survey = { name: string, question: string, answer: string };

function App() {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [questions, setQuestions] = useState<Survey[]>([]);

  const onFormSubmit = () => {
    axios.post(serverURL + "/new/surveys", { name: name, question: question, answer: answer });
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(serverURL + "/surveys");
      console.log(res.data);
      setQuestions(res.data);
    };

    // make request
    fetch();
  }, []);

  return (
    <div>
      <h1>Survey App</h1>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onFormSubmit}
      >
        Name:
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        Question:
        <input value={question} onChange={(e) => setQuestion(e.target.value)} />
        <br />
        Answer:
        <input value={answer} onChange={(e) => setAnswer(e.target.value)} />
        <br />
        <button type="submit">Create Survey</button>
      </form>
      <br />
      {questions.map((qs) => {
        return (
          <div style={{ marginBottom: "8px", padding: "8px", border: "1px solid" }}>
            <strong>By: </strong>
            {qs.name}
            <br />
            <strong>Question: </strong>
            {qs.question}
            <br />
            <strong>Answer: </strong>
            {qs.answer}
            <br />
          </div>
        );
      })}
    </div>
  );
}

export default App;