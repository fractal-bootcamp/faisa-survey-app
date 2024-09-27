import SurveyListItem from "./SurveyListItem"

type Survey = {
    surveyName: string
    surveyQuestions: string[]
    personName: string
}
interface SurveyListProps {
    completeSurveys: Survey[]
}

const SurveyList: React.FC<SurveyListProps> = ({ completeSurveys }) => {

    return (
        <div className="p-6 bg-slate-100 rounded-lg shadow-md max-w-lg mx-auto my-8">
            <h1 className="text-2xl font-bold">
                Survey Lists
            </h1>

            <div>
                {completeSurveys.map((survey, index) => {
                    return (
                        <section>
                            <SurveyListItem
                                key={index}
                                survey={survey}
                            />
                        </section>
                    )
                })}
            </div>
        </div>
    )
}

export default SurveyList