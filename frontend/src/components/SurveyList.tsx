import SurveyListItem from "./SurveyListItem"

type Survey = {
    surveyName: string
    surveyQuestions: string[]
    personName: string
}
interface SurveyListProps {
    completeSurveys: Survey[]
    handleCreateNewSurvey: () => void
    handleSurveySubmission: () => void
}

const SurveyList: React.FC<SurveyListProps> = ({ completeSurveys, handleCreateNewSurvey, handleSurveySubmission }) => {

    return (
        <div className="p-6 bg-slate-100 rounded-lg shadow-md max-w-lg mx-auto my-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    Survey Lists
                </h1>
                <button
                    className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-800"
                    onClick={handleCreateNewSurvey}
                >
                    Create Survey
                </button>
            </div>

            <div>
                {completeSurveys.map((survey, index) => {
                    return (
                        <section>
                            <SurveyListItem
                                key={index}
                                survey={survey}
                                handleSurveySubmition={handleSurveySubmission}
                            />
                        </section>
                    )
                })}
            </div>
        </div>
    )
}

export default SurveyList