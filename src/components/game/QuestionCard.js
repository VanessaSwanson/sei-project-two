import React from 'react'
import FinalPage from '../common/FinalPage.js'
import { getMovieQuestions } from '../../lib/api.js'
import Loading from '../common/Loading'

function QuestionCard() {
  const [correctAnswer, setCorrectAnswer] = React.useState('')
  const [quizQuestion, setQuizQuestion] = React.useState('')
  const [incorrectAnswer, setIncorrectAnswer] = React.useState('')
  const [questionCount, setQuestionCount] = React.useState(0)
  const [clue, setClue] = React.useState(false)
  const cluePhrase = [`Don't even think about writing ${incorrectAnswer}`, `It's definitely not ${incorrectAnswer}`, `You could try ${incorrectAnswer} but you'd be wrong.`]


  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMovieQuestions()
        setQuizQuestion(response.data[0].question)
        setCorrectAnswer(response.data[0].correctAnswer)
        setIncorrectAnswer(response.data[0].incorrectAnswers[0])
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [questionCount])

  let answerIsCorrect = null

  console.log(quizQuestion)

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
    if (answerIsCorrect && questionCount < 10) {
      setQuestionCount(questionCount + 1)
      answerIsCorrect = null
      setClue(false)
      console.log(answerIsCorrect)
      console.log('Move onto new page')
      window.confirm('Yay! Move onto next question')
    } else if (!answerIsCorrect && questionCount < 10) {
      setQuestionCount(questionCount + 1)
      answerIsCorrect = null
      setClue(false)
      console.log(answerIsCorrect)
      console.log('wrong - show correct answer')
      window.confirm(`Oops, sorry that is wrong, the correct answer is ${correctAnswer}`)
    }
  }

  const handleClue = (e) => {
    e.preventDefault()
    setClue(true)
  }

  return (
    <>
      {!quizQuestion && <Loading />}
      <form>
        <section className="section">
          <div className="container">
            {quizQuestion && questionCount <= 2 &&
                <>
                  <h1>Question: {quizQuestion}</h1>
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
                  <progress className="progress is-primary" value={questionCount} max="10">10%</progress>
                  <section className="clue-toast">

                  </section>
                  <button className="clue" onClick={handleClue}>Clue</button>
                  {clue && <div>
                    <p>{cluePhrase[Math.floor(Math.random() * 3)]}</p>
                  </div>}
                </>
            }

            {questionCount === 3 && 
            <>
              <FinalPage />
            </>
            }
            
          </div>
        </section>
      </form>
    </>
  )
}

export default QuestionCard
