import React from 'react'
import axios from 'axios'
import './App.css'

function App() {

  const [Data, setData] = React.useState([])

  // Function to shuffle options so that the correct answer is not always in the same position
  function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
  }


  React.useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('https://the-trivia-api.com/v2/questions');

      // Transform the API response to match the required format
      const formatResponse = response.data.map(item => (
        {
          question: item.question.text,
          options: shuffle([item.correctAnswer, ...item.incorrectAnswers]),
          answer: item.correctAnswer
        }
      ))

      setData(formatResponse);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, []);


  const [ SelectedAnswer , setSelectedAnswer ] = React.useState({})
  const [ score , setScore ] = React.useState(0)

  // Submit button function
  function HandleSubmit() {
    let count =0

    Data.forEach((item,index) => {
      if(SelectedAnswer[index] === item.answer) {
        count +=1
      }
    })
    setScore(count)
  }

  function ReloadPage() {
    window.location.reload();
  }
  
  return (
    <>

    <div className="App">
      <h1>Quiz App</h1>

      {
      Data.map((item,index) => (
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
      
      ))
      }

      <button className="submit-button" onClick={HandleSubmit}>Submit</button>
      <h2>Score :{score}</h2>

      <button className='reload-button' onClick={ReloadPage}>Refresh Question</button>
      </div>
    </>
  )
}

export default App
