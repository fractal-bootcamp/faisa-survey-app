import { useState, useEffect } from "react"
import axios from "axios"
import SurveyResults from "./SurveyResults"

type Survey = {
    surveyName: string
    surveyQuestions: string[]
    personName: string
}

interface SurveyListItemsProps {
    survey: Survey
}

const serverURL = "http://localhost:3000"

const SurveyListItem: React.FC<SurveyListItemsProps> = ({ survey }) => {
    const [surveySubmission, setSurveySubmission] = useState<string[]>([])
    const [surveyResults, setSurveyResults] = useState<Survey[]>([])
    const [activeComponent, setActiveComponent] = useState<string | null>(null)

    const fetchSubmissions = async () => {
        try {
            const res = await axios.get(`${serverURL}/surveys/submissions`)
            console.log(res.data);
            setSurveyResults(res.data)
        } catch (err) {
            console.error("Error fetching survey submissions", err);
        }
    }

    useEffect(() => {
        if (activeComponent === "surveyResults") {
            fetchSubmissions()
        }
    }, [activeComponent])

    const handleSurveySubmition = () => (e: React.FormEvent) => {
        e.preventDefault()

        const surveyData = { surveySubmission }

        try {
            axios
                .post(`${serverURL}/new/surveys/submissions`, surveyData)
                .then((res) => {
                    console.log(res.data)
                    setSurveySubmission([])
                    setActiveComponent("surveyResults")
                    fetchSubmissions()
                })

        } catch (err) {
            console.error("Error submitting survey", err)
        }

    }

    const handleAnswerChange = (index: number, value: string) => {
        const updatedAnswers = [...surveySubmission]
        updatedAnswers[index] = value
        setSurveySubmission(updatedAnswers)
    }

    const showSurveySubmission = () => setActiveComponent("surveySubmission")
    const showSurveyResults = () => setActiveComponent("surveyResults")

    return (
        <div className="my-4 p-4 border rounded-lg bg-white">
            <h2 className="text-xl font-bold mb-2">
                {survey.surveyName}
            </h2>
            <div className="flex ">
                <p className="text-base font-semibold mb-2 mr-2">
                    Done by:
                </p>
                <p className="text-base  ">
                    {survey.personName}
                </p>

            </div>
            <button
                className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-800 mr-2"
                onClick={showSurveySubmission}
            >
                Take Survey
            </button>

            <button
                className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-800 mr-2"
                onClick={showSurveyResults}
            >
                View Results
            </button>

            <div>
                {activeComponent === "surveySubmission" && (
                    <form id="surveySubmission" onSubmit={handleSurveySubmition} className="mt-4">
                        {survey.surveyQuestions.map((question, index) => (
                            <div key={index} className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    {question}
                                </label>
                                <input
                                    type="text"
                                    value={surveySubmission[index]}
                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        ))}

                        <button
                            type="submit"
                            className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-800 mr-2"
                        >
                            Submit
                        </button>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-800 mr-2"
                        //onClick={}
                        >
                            Cancel
                        </button>
                    </form>
                )}

                {activeComponent === "surveyResults" && (
                    <section >
                        <SurveyResults
                            surveryResults={surveyResults}
                        />
                    </section>
                )}
            </div>
        </div>
    )
}

export default SurveyListItem