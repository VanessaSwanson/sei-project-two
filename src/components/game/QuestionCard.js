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
  const [score, setScore] = React.useState(0)
  const [cluesLeft, setCluesLeft] = React.useState(3)
  const [cluePhraseScroll, setCluePhraseScroll] = React.useState(-1)
  const [clueShown, setClueShown] = React.useState(false)
  const [correctAnswerShown, setCorrectAnswerShown] = React.useState(false)
  const [tick, setTick] = React.useState(false)
  const [answerIsCorrect, setAnswerIsCorrect] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMovieQuestions()
        setQuizQuestion(response.data[0].question)
        setCorrectAnswer(response.data[0].correctAnswer)
        setIncorrectAnswer(response.data[0].incorrectAnswers[0])
        
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [questionCount])

  console.log(correctAnswer)

  function checkAnswer (e) {
    e.preventDefault()
    if (e.target.value.toLowerCase() === correctAnswer.toLowerCase()) {
      setAnswerIsCorrect(true)
    } else {
      setAnswerIsCorrect(false)
    }
  }

  function onSubmit(e) {
    e.preventDefault()  
    if (answerIsCorrect && questionCount < 10) {
      setScore(score + 100)
      setTick(true)
      setTimeout(() => {
        setQuestionCount(questionCount + 1)
        setAnswerIsCorrect(null)
        setClue(false)
        setTick(false)
      }, 1000)
    } else if (!answerIsCorrect && questionCount < 10) {
      setScore(score - 50)
      setCorrectAnswerShown(true)
      setTimeout(() => {
        setCorrectAnswerShown(false)
        setQuestionCount(questionCount + 1)
        setAnswerIsCorrect(null)
        setClue(false)
      }, 2000)
    }

  }

  const handleAddClue = (e) => {
    e.preventDefault()
    setClue(true)
    setScore(score - 20)
    setCluesLeft(cluesLeft - 1)
    setCluePhraseScroll(cluePhraseScroll + 1)
    setClueShown(true)
  }

  const handleRemoveClue = (e) => {
    e.preventDefault()
    setClueShown(false)
  }

  // const handleRemoveCorrectAnswer = (e) => {
  //   e.preventDefault()
  //   setCorrectAnswerShown(false)
  //   setQuestionCount(questionCount + 1)
  //   setScore(score - 50)
  //   setAnswerIsCorrect(null)
  //   setClue(false)
  // }

  return (
    <>
      {!quizQuestion && <Loading />}
      <form>
        <section className="section">
          <div className="container">
            {quizQuestion && questionCount <= 9 &&
                <>
                  <div className="score">Score: {score}</div>
                  <div className="lives">Clues left: {cluesLeft}</div>
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
                    {correctAnswerShown && 
                    <div className="notification is-danger">
                      <div><p>Oops! Nice try, the correct answer is: {correctAnswer}</p></div>
                      {/* <button className="delete" onClick={handleRemoveCorrectAnswer}></button> */}
                    </div>
                    }
                    {tick && 
                    <div className="notification is-primary">
                      <div><p>Correct!</p></div>
                    </div>}
                    <button onClick={onSubmit} type="submit" className="button is-warning is-fullwidth">
                        Submit
                    </button>
                  </div>

                  <progress className="progress is-primary" value={questionCount} max="10">10%</progress>
                  <section className="clue-toast">

                  </section>
                  {!clue && cluesLeft > 0 && <button className="clue" onClick={handleAddClue}>Clue</button>}
                  {clue && clueShown && <div className="notification is-primary">
                    <button className="delete" onClick={handleRemoveClue}></button>
                    <div><p>{cluePhrase[cluePhraseScroll]}</p></div>
                  </div>}
                </>
            }

            {questionCount === 10 && 
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
