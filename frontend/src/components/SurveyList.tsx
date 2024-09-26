interface SurveyListProps {
    completeSurveys: {
        surveyName: string
        surveyQuestions: string[]
        personName: string
    }[]
}

const SurveyList: React.FC<SurveyListProps> = ({ completeSurveys }) => {

    return (
        <div className="p-6 bg-slate-50 rounded-lg shadow-md max-w-lg mx-auto my-8">
            <h1 className="text-2xl font-semibold">
                Survey Lists
            </h1>
            {completeSurveys.map((survey, index) => {
                return (
                    <div key={index} style={{ marginBottom: "18px", padding: "4px 8px" }}>
                        <p className="text-base font-medium mb-2">
                            Survey Name:
                        </p>
                        {survey.surveyName}
                        <br />
                        <p className="text-base font-medium mb-2">
                            Survey Questions:
                        </p>
                        <ul className="list-disc list-inside">
                            {survey?.surveyQuestions?.map((question, indx) => (
                                <li key={indx} className="text-md">
                                    {question}
                                </li>
                            ))}
                        </ul>
                        <br />
                        <p className="text-base font-medium mb-2">
                            Done by :
                        </p>
                        {survey.personName}
                        <br />
                    </div>
                )
            })}
        </div>
    )
}

export default SurveyList