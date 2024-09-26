import { useEffect, useState } from "react";
import axios from "axios";
import Survey from "./components/Survey";
import SurveyList from "./components/SurveyList";

const serverURL = "http://localhost:3000"

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
  const [activeComponent, setActiveComponent] = useState<string | null>(null)

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

  const showSurvey = () => setActiveComponent("survey")
  const showSurveyList = () => setActiveComponent("surveyList")

  return (
    <div className="flex flex-col min-h-screen">
      <header className="text-center my-10">
        <h1 className="text-6xl font-semibold">
          Survey App
        </h1>
      </header>

      <nav className="flex justify-center space-x-4">
        <button
          className="bg-slate-500 text-white px-8 py-2 rounded-full hover:bg-slate-700"
          onClick={showSurvey}
        >
          Create Survey
        </button>

        <button
          className="bg-slate-500 text-white px-8 py-2 rounded-full hover:bg-slate-700"
          onClick={showSurveyList}
        >
          Survey List
        </button>
      </nav>

      <main className="flex-grow">
        {activeComponent === "survey" && (
          <section id="survey" className="mb-10">
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
          </section>
        )}

        {activeComponent === "surveyList" && (
          <section id="surveyList" className="mb-10">
            <SurveyList
              completeSurveys={completeSurveys}
            />
          </section>
        )}

      </main>
    </div>
  );
}

export default App;