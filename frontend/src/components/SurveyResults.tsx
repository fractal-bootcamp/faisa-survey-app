import type { SurveyResultsType } from "./SurveyListItem"


interface SurveyResultsProps {
    surveyResults: SurveyResultsType

}

const SurveyResults: React.FC<SurveyResultsProps> = ({ surveyResults }: SurveyResultsProps) => {
    return (
        <div className="px-4 py-3 bg-slate-100 rounded-lg shadow-md max-w-lg mx-auto my-2">
            <h1 className="text-xl font-semibold mb-2">
                Survey Submissions
            </h1>
            {surveyResults.length > 0
                ? (
                    <ul className="list-disc my-4 p-4 border rounded-lg bg-white">
                        {surveyResults.map((result, index) => (
                            <div className="mb-2">
                                <div key={index} className="text-md font-semibold">
                                    {result.personName}
                                </div>
                                <div className="mb-2">
                                    {result.surveyAnswer.map((answer, index) => {
                                        return (
                                            <div className="block text-sm font-medium text-gray-700 mb-2">
                                                Q{index + 1}: {answer}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </ul>
                )
                : (
                    <p className="pt-2">
                        No submissions yet.
                    </p>
                )}
        </div>
    )
}

export default SurveyResults