import { PartProps } from "../types";

const Part = ({ part }: PartProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandles discriminated union member : ${JSON.stringify(value)}`
    );
  };

  switch (part.type) {
    case "normal":
      return (
        <p>
          <h4>
            {part.name} {part.exerciseCount}
          </h4>
          <em>{part.description}</em>
        </p>
      );
      break;
    case "groupProject":
      return (
        <>
          <h4>
            {part.name} {part.exerciseCount}
          </h4>
          <p>Group Project Exercises: {part.groupProjectCount}</p>
        </>
      );
      break;
    case "submission":
      return (
        <>
          <h4>
            {part.name} {part.exerciseCount}
          </h4>
          <em>{part.description}</em>
          <p>{part.exerciseSubmissionLink}</p>
        </>
      );
      break;
    case "special":
      return (
        <>
          <h4>
            {part.name} {part.exerciseCount}
          </h4>
          <em>{part.description}</em>
          <p>
            Required Skills:{" "}
            {part.requirements.map((item, index) => (index ? ", " : "") + item)}
          </p>
        </>
      );
    default:
      return assertNever(part);
  }
  // return (
  //   <>
  //     {part.name}
  //     {part.exerciseCount}
  //     {part.
  //   </>
  // );
};

export default Part;
