import SurveyListItem from "./SurveyListItem"

type Survey = {
    surveyName: string,
    surveyQuestions: string[]
    personName: string
}

interface SurveyResultsProps {
    surveryResults: Survey[]

}

const SurveyResults: React.FC<SurveyResultsProps> = ({ surveryResults }) => {
    return (
        <div className="p-6 bg-slate-100 rounded-lg shadow-md max-w-lg mx-auto my-8">
            <h1 className="text-xl font-semibold">
                Survey Submissions
            </h1>
            <div>
                {surveryResults.map((survey, index) => (
                    <SurveyListItem
                        key={index}
                        survey={survey}
                    />
                ))}
            </div>
        </div>
    )
}

export default SurveyResults