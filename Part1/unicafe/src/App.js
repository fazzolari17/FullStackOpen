import { useState } from 'react';
import Feedback from "./components/Feedback"
import Statistics from './components/Statistics';
import './App.css';

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  console.log(good)
  console.log(bad)
  console.log(neutral)
  return (
   <div>
    <Feedback setGood={setGood} setNeutral={setNeutral} setBad={setBad}/> 
    <Statistics good={good} neutral={neutral} bad={bad} />
   </div>
  );
}

export default App;
