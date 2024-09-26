interface SurveyProps {
    surveyName: string
    surveyQuestions: string[]
    personName: string
    handleSurveyName: (value: string) => void
    handlePersonName: (value: string) => void
    handleAddQuestion: () => void
    handleFormSubmit: (e: React.FormEvent) => void
    handleQuestionsChange: (index: number, value: string) => void
}

const Survey: React.FC<SurveyProps> = ({
    surveyName,
    surveyQuestions,
    personName,
    handleSurveyName,
    handlePersonName,
    handleAddQuestion,
    handleFormSubmit,
    handleQuestionsChange
}) => {
    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <h3>Survey Name:</h3>
                <input
                    type="text"
                    value={surveyName}
                    placeholder="Enter survey name"
                    onChange={e => handleSurveyName(e.target.value)}
                />
                <h3>Survey Questions:</h3>
                {surveyQuestions.map((question, index) => (
                    <div key={index}>
                        <p>Q {index + 1}: </p>
                        <input
                            type="text"
                            value={question}
                            placeholder={`Enter question ${index + 1}`}
                            onChange={(e) => handleQuestionsChange(index, e.target.value)}
                        />
                    </div>
                ))}

                <button type="button" onClick={handleAddQuestion}>
                    +
                </button>

                <h3>Survey done by:</h3>
                <input
                    type="text"
                    value={personName}
                    placeholder="Enter your name"
                    onChange={e => handlePersonName(e.target.value)}
                />
                <button type="submit">
                    Publish Survey
                </button>
            </form>
        </div>
    )
}

export default Survey