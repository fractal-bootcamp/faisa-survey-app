import SurveyList from "./SurveyList"

interface SurveySubmissionProps {
    surveyAnswers: string[]
}

const SurveySubmission: React.FC<SurveySubmissionProps> = ({ surveyAnswers }) => {

    return (
        <div className="p-6 bg-slate-100 rounded-lg shadow-md max-w-lg mx-auto my-8">
            <h1 className="text-xl font-semibold">
                Survey Questions
            </h1>
            <div>
                <p className="text-base font-medium mb-2">
                    {surveyAnswers.map((answer, index) => {
                        return (
                            <div key={index} className="p-6 bg-slate-50 rounded-lg shadow-md max-w-lg mx-auto my-8">
                                <ul className="list-disc list-inside mb-2">
                                    {answer}
                                </ul>
                            </div>
                        )
                    })}
                </p>
            </div>
        </div>
    )
}

export default SurveySubmission