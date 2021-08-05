
import Axios from 'axios'
import React from 'react'
import FinalPage from './FinalPage'

function QuestionCard() {
  const [correctAnswer, setCorrectAnswer] = React.useState('')
  const [question, setQuestion] = React.useState('')
  const [questionCount, setQuestionCount] = React.useState(0)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const randomIndex = Math.floor(Math.random() * 50)
        const response = await Axios.get('https://trivia.willfry.co.uk/api/questions?limit=50')
        setQuestion(response.data[randomIndex].question)
        setCorrectAnswer(response.data[randomIndex].correctAnswer)
        console.log(response.data[randomIndex])
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [questionCount])

  let answerIsCorrect = null

  function checkAnswer (e) {
    e.preventDefault()
    if ( e.target.value.toLowerCase() === correctAnswer.toLowerCase()) {
      console.log('You did it!')
      return answerIsCorrect = true
    } else {
      console.log('Oops!')
      return answerIsCorrect = false
    }
  }

  function onSubmit(e) {
    e.preventDefault()
    if (answerIsCorrect && questionCount < 3) {
      setQuestionCount(questionCount + 1)
      answerIsCorrect = null
      console.log(answerIsCorrect)
      console.log('Move onto new page')
      window.confirm('Yay! Move onto next question')
    } else if (!answerIsCorrect && questionCount < 3) {
      setQuestionCount(questionCount + 1)
      answerIsCorrect = null
      console.log(answerIsCorrect)
      console.log('wrong - show correct answer')
      window.confirm(`Oops, sorry that is wrong, the correct answer is ${correctAnswer}`)
    }
  }

  console.log(questionCount)

  return (
    <form>
      <section className="section">
        <div className="container">
          <div className="columns">

            {questionCount <= 2 &&
        <>
          <h1>Question: {question}</h1>
          <div className="field">
            <label className="label">Answer</label>
          </div>
          <div className="control">
            <input
              className="input correct"
              placeholder="Type your answer here"
              name="userAnswer"
              onChange={checkAnswer}
            />
          </div>
          <div className="field">
            <button onClick={onSubmit} type="submit" className="button is-warning is-fullwidth">
                Submit
            </button>
          </div>
        </>
            }

            {questionCount === 3 && 
          <>
            <FinalPage />
          </>
            }

          </div>
        </div>
      </section>
    </form>
  )
}

export default QuestionCard
