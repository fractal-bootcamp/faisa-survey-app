import { useEffect, useState } from "react";
import axios from "axios";
import SurveyForm from "./components/SurveyForm";
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
  const [successMessage, setSuccessMessage] = useState<boolean>(false)

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
        setSuccessMessage(true)
        setActiveComponent(null)
        setTimeout(() => {
          setSuccessMessage(false)
        }, 5000);
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
  const showSurveyForm = () => setActiveComponent("survey")

  return (
    <div className="flex flex-col min-h-screen">
      <header className="text-center my-10">
        <h1 className="text-6xl font-semibold">
          Survey App
        </h1>
      </header>

      <main className="flex-grow">
        {successMessage && (
          <div className="bg-green-200 text-green-700 p-8 mb-4 rounded-md text-center">
            Survey submitted successfully
          </div>
        )}

        <section id="surveyList" className="mb-10">
          <SurveyList
            completeSurveys={completeSurveys}
            handleCreateNewSurvey={showSurveyForm}
          />
        </section>

        {activeComponent === "survey" && (
          <section id="survey" className="mb-10">
            <SurveyForm
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
      </main>
    </div>
  );
}

export default App;