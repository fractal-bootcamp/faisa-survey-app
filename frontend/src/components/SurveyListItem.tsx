import React, { useState, useEffect } from "react"
import axios from "axios"
import SurveyResults from "./SurveyResults"

type Survey = {
    surveyName: string
    surveyQuestions: string[]
    personName: string
}

interface SurveyListItemsProps {
    survey: Survey
    handleSurveySubmition: (e: React.FormEvent) => void
}

export type SurveyResultsType = {
    personName: string
    surveyAnswer: string[]
}[]

const serverURL = "http://localhost:3000"

const SurveyListItem: React.FC<SurveyListItemsProps> = ({ survey }) => {
    const [surveySubmission, setSurveySubmission] = useState<string[]>([])
    const [surveyResults, setSurveyResults] = useState<SurveyResultsType>([])
    const [activeComponent, setActiveComponent] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<boolean>(false)
    const [submissionPersonName, setSubmissionPersonName] = useState<string>("")

    const fetchSubmissions = async () => {
        try {
            const res = await axios.get(`${serverURL}/surveys/submissions`)
            const data: SurveyResultsType = res.data as SurveyResultsType
            console.log(data);
            setSurveyResults(data)
        } catch (err) {
            console.error("Error fetching survey submissions", err);
        }
    }

    useEffect(() => {
        if (activeComponent === "surveyResults") {
            fetchSubmissions()
        }
    }, [activeComponent])

    const handleSurveySubmition = (e: React.FormEvent) => {
        e.preventDefault()

        const surveyData = { personName: submissionPersonName, surveyAnswer: surveySubmission }

        try {
            axios
                .post(`${serverURL}/new/surveys/submissions`, surveyData)
                .then((res) => {
                    console.log(res.data)
                    setSurveySubmission([])
                    setSubmissionPersonName("")
                    setActiveComponent("surveyResults")
                    fetchSubmissions()
                    setSuccessMessage(true)
                    setTimeout(() => {
                        setSuccessMessage(false)
                    }, 5000);
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

    const showSurveyQuestions = () => setActiveComponent("surveyQuestions")
    const showSurveySubmission = () => setActiveComponent("surveySubmission")
    const showSurveyResults = () => setActiveComponent("surveyResults")

    return (
        <div className="my-4 p-4 border rounded-lg bg-white">
            <h2 className="text-xl font-bold mb-2 mt-2">
                {survey.surveyName}
            </h2>

            {successMessage && (
                <div className="bg-green-200 text-green-700 p-6 mb-4 rounded-md text-center">
                    Survey submitted successfully
                </div>
            )}

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
                onClick={showSurveyQuestions}
            >
                View Survey
            </button>

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
                {activeComponent === "surveyQuestions" && (
                    <section id="surveyQuestions" className="px-4 py-3 bg-slate-100 rounded-lg shadow-md max-w-lg mx-auto my-2">
                        <h1 className="text-xl font-semibold mb-2">
                            Survey Questions
                        </h1>
                        {survey.surveyQuestions.map((question, index) => (
                            <div className="flex  mt-2 mb-2">
                                <p className="block text-sm font-medium text-gray-700 ml-1">
                                    Q{index + 1}: {question}
                                </p>
                            </div>
                        ))}
                        <button
                            className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-800 mr-2"
                        //onClick={() => setActiveComponent(null)}
                        >
                            Edit
                        </button>
                        <button
                            className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-800 mr-2"
                            onClick={() => setActiveComponent(null)}
                        >
                            Close
                        </button>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-800 mr-2"
                        //onClick={() => setActiveComponent(null)}
                        >
                            Delete
                        </button>
                    </section>
                )}

                {activeComponent === "surveySubmission" && (
                    <form id="surveySubmission" onSubmit={handleSurveySubmition} className="px-4 py-3 bg-slate-100 rounded-lg shadow-md max-w-lg mx-auto my-2">
                        <input
                            type="text"
                            value={submissionPersonName}
                            placeholder="Enter your name"
                            onChange={(e) => setSubmissionPersonName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-3"
                            required
                        />
                        {survey.surveyQuestions.map((question, index) => (
                            <div key={index} className="mb-2 mb-3 mr-2">
                                <label className="block text-sm font-medium text-gray-700 ml-1">
                                    Q{index + 1}: {question}
                                </label>
                                <input
                                    type="text"
                                    value={surveySubmission[index] || ""}
                                    placeholder="Answer"
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
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-800 mr-2"
                            onClick={() => setActiveComponent(null)}
                        >
                            Cancel
                        </button>
                    </form>
                )}

                {activeComponent === "surveyResults" && (
                    <section id="surveyResults">
                        <SurveyResults
                            surveyResults={surveyResults}
                        />
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-800 mr-2"
                            onClick={() => setActiveComponent(null)}
                        >
                            Cancel
                        </button>
                    </section>
                )}
            </div>
        </div>
    )
}

export default SurveyListItem