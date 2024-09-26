import express from "express";
import path from "path";
import cors from "cors";

const app = express();
const PORT = 3000

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json())
app.use(cors());

// In-memory storage for surveys
let surveys: { surveyName: string; surveyQuestions: string[]; personName: string }[] = [];

app.get("/", (_req, res) => {
  res.send("<h1>I am alive</h1>")
})

app.get("/surveys/", (_req, res) => {
  res.json(surveys);
});

app.get("/surveys/:name", (req, res) => {
  const surveysFromName = surveys.filter((survey) => {
    return survey.personName === req.params.name;
  });

  res.json(surveysFromName);
});


app.post("/new/surveys", (req, res) => {
  console.log(req.body)
  const { surveyName, surveyQuestions, personName } = req.body;

  surveys.push({ surveyName, surveyQuestions, personName });

  res.redirect("/");
});

app.listen(PORT, () => console.log(`Server running on port: http:localhost:${PORT}`));