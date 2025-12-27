import React from 'react'
import Data from './data.jsx'
import './App.css'

function App() {

  const [ SelectedAnswer , setSelectedAnswer ] = React.useState({})
  const [ score , setScore ] = React.useState(0)

  function HandleSubmit() {
    let count =0

    Data.forEach((item,index) => {
      if(SelectedAnswer[index] === item.answer) {
        count +=1
      }
    })
    setScore(count)
  }
  
  return (
    <>
    <div className="App">
      <h1>Quiz App</h1>

      {Data.map((item,index) => (
        <div key={index} className="question-block">
          <h2>{item.question}</h2>
          <div className="options">
            {item.options.map((option,indexOption) => (
              <label key={indexOption} className="option">
                <input type="radio" name={`question-${index}`} value={option} onChange={(event) => {
                  setSelectedAnswer({...SelectedAnswer, [index]: event.target.value})
                }} />
                {option}
              </label>
            ))}
          </div>
        </div>
      
      ))}

      <button className="submit-button" onClick={HandleSubmit}>Submit</button>
      <h2>Score :{score}</h2>

      </div>
    </>
  )
}

export default App
