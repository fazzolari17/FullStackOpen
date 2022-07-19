import React from "react"

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
} 

const Header = (props) => {
  return (
    <header>
      <h1>{props.course}</h1>
    </header>
  )
}

const Content = (props) => {

  let mapped = props.parts.map((item, index )=> {
    return (
    <Part key={index} name={item.name} exercises={item.exercises} />
    )
  })

  return (
    <section>
      {mapped}
    </section>
  )
}

const Total = (props) => {

  return (
    <section>
      <p>Number of exercises {props.part[0].exercises + props.part[1].exercises + props.part[2].exercises}</p>
    </section>
  )
}

function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
      name: 'Fundamentals of React', 
      exercises: 10
      }, 
      {
      name: 'Using props to pass data',
      exercises: 7
      }, 
      {
      name: 'State of a component', 
      exercises: 14, 
      }
    ]
  }



  

  return (
    <div className="App">
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total part={course.parts} />
    </div>
  );
}

export default App;

