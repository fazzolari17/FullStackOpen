import React from "react";


const Header = (props) => {
    return (
      <header>
        <h1>{props.course[0].name}</h1>
      </header>
    )
  }
const Total = (props) => {
    console.log(props.course)
    const totalSum = props.course.reduce((a, b) => a + b.exercises, 0)
  
    return (
      <section>
        <h4>Number of exercises {totalSum}</h4>
      </section>
    )
  }

function Course() {
    const course = [
        {
          name: 'Half Stack application development',
          id: 1,
          parts: [
            {
              name: 'Fundamentals of React',
              exercises: 10,
              id: 1
            },
            {
              name: 'Using props to pass data',
              exercises: 7,
              id: 2
            },
            {
              name: 'State of a component',
              exercises: 14,
              id: 3
            },
            {
              name: 'Redux',
              exercises: 11,
              id: 4
            }
          ]
        }, 
        {
          name: 'Node.js',
          id: 2,
          parts: [
            {
              name: 'Routing',
              exercises: 3,
              id: 1
            },
            {
              name: 'Middlewares',
              exercises: 7,
              id: 2
            }
          ]
        }
      ]

      const part1 = course[0].parts.map(item => <p>{item.name} {item.exercises}</p>)
      const part2 = course[1].parts.map(item => <p>{item.name} {item.exercises}</p>)
    return (
        <p>
            <h2>{course[0].name}</h2>
            {part1}
            <Total course={course[0].parts} />
            <h2>{course[1].name}</h2>
            {part2}
            <Total course={course[1].parts} />
        </p>

    )
}

export default Course