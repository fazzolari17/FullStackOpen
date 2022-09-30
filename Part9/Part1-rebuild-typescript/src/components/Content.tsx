import { ContentProps } from "../types";
import Part from "./Part";
import { v1 as uuid } from "uuid";

const Content = ({ courseParts }: ContentProps) => {
  // const assertNever = (value: never): never => {
  //   throw new Error(
  //     `Unhandled discriminated union member: ${JSON.stringify(value)}`
  //   );
  // };

  // courseParts.forEach(part => {
  //   switch (part.type) {
  //   case "normal":
  //     break;
  //   case "groupProject":
  //     break;
  //   case "submission":
  //     break;
  //   case "special":
  //     break;
  //   default:
  //     return assertNever(part);
  //   }
  // });

  return (
    <>
      {courseParts.map((part) => (
        <Part key={uuid()} part={part} />
      ))}
    </>
  );
};

export default Content;
