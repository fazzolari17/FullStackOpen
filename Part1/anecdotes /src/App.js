import { useState, useEffect } from 'react';
import Button from "./components/Button"
import MostVoted from "./components/MostVoted"
import './App.css';

const anecdotes = [
  "Adding manpower to a late software project makes it later!",
  "The best way to get a project done faster is to start sooner",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Even the best planning is not so omniscient as to get it right the first time.", 
  "How does a project get to be a year late?... One day at a time.", 
  "The bearing of a child takes nine months, no matter how many women are assigned. Many software tasks have this characteristic because of the sequential nature of debugging.", 
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", 
  "The belief that complex systems require armies of designers and programmers is wrong. A system that is not understood in its entirety, or at least to a significant degree of detail by a single individual, should probably not be built.", 
  "A primary cause of complexity is that software vendors uncritically adopt almost any feature that users want.", 
  "Prolific programmers contribute to certain disaster.", 
  "Documentation is the castor oil of programming. Managers think it is good for programmers and programmers hate it!", 
  "Programming can be fun, so can cryptography; however they should not be combined.", 
  "Good code is its own best documentation. As you’re about to add a comment, ask yourself, ‘How can I improve the code so that this comment isn’t needed?’ Improve the code and then document it to make it even clearer.", 
  "It's OK to figure out murder mysteries, but you shouldn't need to figure out code. You should be able to read it."
]

function App() {
  const randomQuote = () => Math.floor(Math.random()*anecdotes.length)
  const [selected, setSelected] = useState(randomQuote)
  const [ count, setCount] = useState(new Array(14).fill(0))

  function vote(currentQuote) {
    setCount(previousState => previousState = previousState.map((item, index) => {
      if(index === selected) {
        return item += 1
      } else {
        return item
      }
    }))
  }

  return (
    <div className="App">
      <h1>Anecdote Of The Day</h1>
      {anecdotes[selected]}
      <div className='btn-container'>
        <Button handleClick={()=>setSelected(randomQuote)} title="next anecdote" />
        <Button handleClick={()=>vote(selected)} title="vote" />   
      </div>
      <MostVoted count={count} quoteArray={anecdotes} />
    </div>
  );
}

export default App;
