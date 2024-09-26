import { useEffect, useState } from "react";
import axios from "axios";
import Survey from "./components/Survey";

const serverURL = "http://localhost:3000";

type SurveyTypes = {
  surveyName: string
  surveyQuestions: string[]
  personName: string
}

function App() {
  const [surveyName, setSurveyName] = useState<string>("")
  const [surveyQuestions, setSurveyQuestions] = useState<string[]>([])
  const [personName, setPersonName] = useState<string>("")
  const [completeSurveys, setCompleteSurveys] = useState<SurveyTypes[]>([])

  const fetchSurveys = async () => {
    try {
      const res = await axios.get(`${serverURL}/surveys`)
      console.log(res.data);
      setCompleteSurveys(res.data)
    } catch (err) {
      console.error("Error fetching surveys", err);
    }
  }

  useEffect(() => {
    fetchSurveys();
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const surveyData = {
      surveyName,
      surveyQuestions,
      personName
    }

    axios
      .post(`${serverURL}/new/surveys`, surveyData)
      .then((res) => {
        console.log(res.data)
        setSurveyName("")
        setSurveyQuestions([])
        setPersonName("")
        fetchSurveys()
      })
      .catch((err) => console.error(err)
      )
  }

  const handleAddQuestion = () => {
    setSurveyQuestions([...surveyQuestions, ""])
  }

  const handleQuestionsChange = (index: number, value: string) => {
    const updatedQuestions = [...surveyQuestions]
    updatedQuestions[index] = value
    setSurveyQuestions(updatedQuestions)
  }

  return (
    <div>
      <h1>Survey App</h1>
      <Survey
        surveyName={surveyName}
        surveyQuestions={surveyQuestions}
        personName={personName}
        handleSurveyName={setSurveyName}
        handlePersonName={setPersonName}
        handleAddQuestion={handleAddQuestion}
        handleFormSubmit={handleFormSubmit}
        handleQuestionsChange={handleQuestionsChange}
      />
      <br />
      <h1>List of Surveys</h1>
      {completeSurveys.map((survey, index) => {
        return (
          <div key={index} style={{ marginBottom: "18px", padding: "4px 8px" }}>
            <strong>Survey Name: </strong>
            {survey.surveyName}
            <br />
            <strong>Survey Questions: </strong>
            <ul>
              {survey?.surveyQuestions?.map((question, indx) => (
                <li key={indx}>
                  {question}
                </li>
              ))}
            </ul>
            <br />
            <strong>Done by : </strong>
            {survey.personName}
            <br />
          </div>
        )
      })}
    </div>
  );
}

export default App;