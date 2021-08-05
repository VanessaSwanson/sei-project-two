import React from 'react'
import FinalPage from '../common/FinalPage.js'
import { getMovieQuestions } from '../../lib/api.js'
import Loading from '../common/Loading'
import ProgressBar from './ProgressBar.js'

function QuestionCard( { score, setScore }) {
  const [correctAnswer, setCorrectAnswer] = React.useState('')
  const [incorrectAnswer, setIncorrectAnswer] = React.useState('')
  const [quizQuestion, setQuizQuestion] = React.useState('')
  const [questionCount, setQuestionCount] = React.useState(0)

  const [clue, setClue] = React.useState(false)
  // const cluePhrase = [`Don't even think about writing ${incorrectAnswer}`, `It's definitely not ${incorrectAnswer}`, `You could try ${incorrectAnswer} but you'd be wrong.`]
  const clues = [
    `You could try writing ${incorrectAnswer} but you'd be wrong`, 
    `One of these is the correct answer: ${incorrectAnswer}; ${correctAnswer}`, 
    `The following is an anagram of the correct answer: ${correctAnswer.split('').sort().join('')}` 
  ]

  const [cluesLeft, setCluesLeft] = React.useState(3)
  const [cluePhraseScroll, setCluePhraseScroll] = React.useState(-1)
  const [clueShown, setClueShown] = React.useState(false)

  const [correctAnswerShown, setCorrectAnswerShown] = React.useState(false)
  const [answerIsCorrect, setAnswerIsCorrect] = React.useState(null)
  const [userAnswer, setUserAnswer] = React.useState('')
  const [tick, setTick] = React.useState(false)

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
      setUserAnswer(e.target.value)
    } else {
      setAnswerIsCorrect(false)
      setUserAnswer(e.target.value)
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
        setUserAnswer('')
      }, 1000)
    } else if (!answerIsCorrect && questionCount < 10) {
      setScore(score - 50)
      setCorrectAnswerShown(true)
      setTimeout(() => {
        setCorrectAnswerShown(false)
        setQuestionCount(questionCount + 1)
        setAnswerIsCorrect(null)
        setClue(false)
        setUserAnswer('')
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

  return (
    <>
      {/* Loading */}
      {!quizQuestion && <Loading />}
      <form>

        {/* Main form section */}
        <section className="section">
          <div className="container">
            {quizQuestion && questionCount <= 9 &&
              <>
                {score < 0 &&
                <div className="score low">Score: {score}</div>
                }
                {score >= 0 && 
                <div className="score">Score: {score}</div>
                }
                {cluesLeft === 0 &&
                  <div className="lives low">Clues left: {cluesLeft}</div>
                }
                {cluesLeft > 0 &&
                  <div className="lives">Clues left: {cluesLeft}</div>
                }
                  
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
                    value={userAnswer}
                  />
                </div>

                {/* Correct and incorrect popups */}
                <div className="field">
                  {correctAnswerShown && 
                  <div className="notification is-danger">
                    <div><p>Oops! Nice try, but the correct answer is: {correctAnswer}</p></div>
                  </div>
                  }
                  {tick && 
                  <div className="notification is-primary">
                    <div><p>Correct!</p></div>
                  </div>}

                  {/* Submit button */}
                  <button onClick={onSubmit} type="submit" className="button is-warning is-fullwidth">
                      Submit
                  </button>
                </div>
                  
                {/* Clue popup */}
                {!clue && cluesLeft > 0 && <button className="button is-info" onClick={handleAddClue}>Clue</button>}

                {/* Multiple clues */}
                {clue && clueShown && <div className="notification is-info">
                  <button className="delete" onClick={handleRemoveClue}></button>
                  <div><p>{clues[cluePhraseScroll]}</p></div>
                </div>}
                
                {/* It's not... clue */}
                {/* {clue && clueShown && <div className="notification is-primary">
                  <button className="delete" onClick={handleRemoveClue}></button>
                  <div><p>{cluePhrase[cluePhraseScroll]}</p></div>
                </div>} */}

                <ProgressBar 
                  questionCount = {questionCount}
                />
              </>
            }

            {questionCount === 10 && 
          <>
            <FinalPage 
              score = {score}
            />
          </>
            }
            
          </div>
        </section>
      </form>
    </>
  )
}

export default QuestionCard
