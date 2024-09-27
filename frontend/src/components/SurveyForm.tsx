interface SurveyFormProps {
    surveyName: string
    surveyQuestions: string[]
    personName: string
    handleSurveyName: (value: string) => void
    handlePersonName: (value: string) => void
    handleAddQuestion: () => void
    handleFormSubmit: (e: React.FormEvent) => void
    handleQuestionsChange: (index: number, value: string) => void
}

const SurveyForm: React.FC<SurveyFormProps> = ({
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
        <div className="p-6 bg-slate-50 rounded-lg shadow-md max-w-lg mx-auto my-8">
            <form onSubmit={handleFormSubmit} className="space-y-4">
                <h3 className="text-2xl font-semibold">
                    Survey Name
                </h3>
                <input
                    type="text"
                    value={surveyName}
                    placeholder="Enter survey name"
                    onChange={e => handleSurveyName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
                <h3 className="text-2xl font-semibold">
                    Done by
                </h3>
                <input
                    type="text"
                    value={personName}
                    placeholder="Enter your name"
                    onChange={e => handlePersonName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />

                <h3 className="text-2xl font-semibold">
                    Survey Questions
                </h3>
                {surveyQuestions.map((question, index) => (
                    <div key={index}>
                        <p className="text-base font-medium mb-2">
                            Q{index + 1}:
                        </p>
                        <input
                            type="text"
                            value={question}
                            placeholder={`Enter question ${index + 1}`}
                            onChange={(e) => handleQuestionsChange(index, e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                ))}

                <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-800"
                >
                    +
                </button>
                <br />
                <button type="submit" className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-800">
                    Publish Survey
                </button>
            </form>
        </div>
    )
}

export default SurveyForm