import React from "react";
import ReactDOM from "react-dom";

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    },
  ];
  return (
    <div className="App">
      <Header title={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescritpion extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartDescritpion {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartDescritpion {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartOwn extends CoursePartDescritpion {
  name: "Own";
  otherProperty: string;
}

type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartOwn;

const Header: React.FC<{ title: string }> = ({ title }) => {
  return <h1>{title}</h1>;
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  // Helper function for exhaustive type checking
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  switch (part.name) {
    case "Fundamentals":
      return (
        <p>
          {part.name}, {part.exerciseCount}, {part.description}
        </p>
      );
    case "Using props to pass data":
      return (
        <p>
          {part.name}, {part.exerciseCount}, {part.groupProjectCount}
        </p>
      );
    case "Deeper type usage":
      return (
        <p>
          {part.name}, {part.exerciseCount}, {part.description},{" "}
          {part.exerciseSubmissionLink}
        </p>
      );
    case "Own":
      return (
        <p>
          {part.name}, {part.exerciseCount}, {part.description},
          {part.otherProperty}
        </p>
      );
    default:
      return assertNever(part);
  }
};

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <ul>
      {courseParts.map((coursePart) => {
        return (
          <li key={coursePart.name}>
            <Part part={coursePart} />
          </li>
        );
      })}
    </ul>
  );
};
const Total: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
