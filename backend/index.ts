import express from "express";
import path from "path";
import cors from "cors";

const app = express();
const PORT = 3000


const getNestedValue = (obj: any, path: string): any => {
  return path.split(".").reduce((acc, key) => acc && acc[key], obj);
};

const processIfStatements = (
  template: string,
  variables: Record<string, any>
): string => {
  const ifRegex = /{%\s*if\s+([.\w]+)\s*%}([\s\S]*?){%\s*endif\s*%}/g;
  return template.replace(ifRegex, (match, condition, content) => {
    const value = getNestedValue(variables, condition);
    return value ? content : "";
  });
};

const processForLoops = (
  template: string,
  variables: Record<string, any>
): string => {
  const forRegex =
    /{%\s*for\s+(\w+)\s+in\s+([.\w]+)\s*%}([\s\S]*?){%\s*endfor\s*%}/g;
  return template.replace(forRegex, (match, item, list, content) => {
    const listValue = getNestedValue(variables, list);
    if (Array.isArray(listValue)) {
      return listValue
        .map((itemValue: any) => {
          return processVariables(content, { [item]: itemValue });
        })
        .join("");
    }
    return "";
  });
};

const processVariables = (
  template: string,
  variables: Record<string, any>
): string => {
  const variableRegex = /{{([\s\S]*?)}}/g;
  return template.replace(variableRegex, (match, path) => {
    const trimmedPath = path.trim();
    const value = getNestedValue(variables, trimmedPath);
    return value !== undefined ? String(value) : "";
  });
};

const injectTemplateVariables = (
  template: string,
  variables: Record<string, any>
): string => {
  let result = template;
  result = processIfStatements(result, variables);
  result = processForLoops(result, variables);
  result = processVariables(result, variables);
  return result;
};

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json())
app.use(cors());

// In-memory storage for surveys
let surveys: { name: string; question: string; answer: string }[] = [];

app.get("/", (_req, res) => {
  res.send("<h1>I am alive</h1>")
})


app.get("/home", (_req, res) => {
  const templatePath = path.join(__dirname, "templates", "index.html");
  const fs = require("fs");

  const template = fs.readFileSync(templatePath, "utf8");

  const html = injectTemplateVariables(template, {
    title: "Survey App",
    heading: "Welcome to the Survey App",
    surveys,
  });
  res.send(html);
});


app.get("/surveys/:name", (req, res) => {
  const surveysFromName = surveys.filter((survey) => {
    return survey.name === req.params.name;
  });

  res.json(surveysFromName);
});

app.get("/surveys/", (_req, res) => {
  res.json(surveys);
});

app.post("/new/surveys", (req, res) => {
  const { name, question, answer } = req.body;

  surveys.push({ name, question, answer });

  res.redirect("/");
});

app.listen(PORT, () => console.log(`Server running on port: http:localhost:${PORT}`));