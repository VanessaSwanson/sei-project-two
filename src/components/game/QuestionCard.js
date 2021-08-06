import React from 'react'
import { useHistory } from 'react-router-dom'

import { getMovieQuestions } from '../../lib/api.js'
import Loading from '../common/Loading'
import ProgressBar from './question_card_components/ProgressBar'
import ClueToast from './question_card_components/ClueToast'
import AnswersToast from './question_card_components/AnswersToast'
import Error from '../common/Error.js'

function QuestionCard( { score, setScore }) {
  const [correctAnswer, setCorrectAnswer] = React.useState('')
  const [incorrectAnswer, setIncorrectAnswer] = React.useState('')
  const [quizQuestion, setQuizQuestion] = React.useState('')
  const [questionCount, setQuestionCount] = React.useState(0)

  const [cluesLeft, setCluesLeft] = React.useState(3)
  const [cluePhraseScroll, setCluePhraseScroll] = React.useState(-1)
  const [clue, setClue] = React.useState(false)

  const [correctAnswerShown, setCorrectAnswerShown] = React.useState(false)
  const [answerIsCorrect, setAnswerIsCorrect] = React.useState(null)
  const [userAnswer, setUserAnswer] = React.useState('')
  const [tick, setTick] = React.useState(false)

  const [isError, setIsError] = React.useState(false)
  const isLoading = !quizQuestion && !isError
  const history = useHistory()

  const clueToastData = {
    score: score, 
    setScore: setScore, 
    cluesLeft: cluesLeft, 
    setCluesLeft: setCluesLeft, 
    cluePhraseScroll: cluePhraseScroll, 
    setCluePhraseScroll: setCluePhraseScroll, 
    incorrectAnswer: incorrectAnswer, 
    correctAnswer: correctAnswer, 
    clue: clue, 
    setClue: setClue,
  }
  
  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMovieQuestions()
        setQuizQuestion(response.data[0].question)
        setCorrectAnswer(response.data[0].correctAnswer)
        setIncorrectAnswer(response.data[0].incorrectAnswers[0])
      } catch (err) {
        console.log(err)
        setIsError(true)
      }
    }
    getData()
  }, [questionCount])

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
      }, 3000)
    }
  }

  if (questionCount === 10) {
    history.push('/final')
  }

  return (
    <>
      <form>
        {/* Main form section */}
        <section className="section question-card">
          <div className="container box main">
            {isError && <Error />}
            {isLoading && <Loading />}
            {quizQuestion && questionCount <= 9 &&
              <>
                <div className="level">
                  <div className="level-item">
                    <p className="score subtitle is-4">Score:<span className={score < 0 && 'low'}>{score}</span></p>
                  </div>
                  <div className="level-item">
                    <p className="lives subtitle is-4">Clues left:<span className={cluesLeft === 0 && 'low'}> {cluesLeft}</span></p>
                  </div>
                </div>
                <p className="subtitle is-5"><strong>Question:</strong> {quizQuestion}</p>
                <div className="control">
                  <input
                    className="input correct"
                    placeholder="Type your answer here"
                    name="userAnswer"
                    onChange={checkAnswer}
                    value={userAnswer}
                  />
                </div>

                <AnswersToast correctAnswerShown={correctAnswerShown} correctAnswer={correctAnswer} tick={tick} />

                {/* Buttons */}
                <div className="controls">
                  <div className="field">
                    <button onClick={onSubmit} type="submit" className="button is-warning is-medium">
                      Submit
                    </button>
                  </div>
                  <ClueToast {...clueToastData}/>
                </div>
                <ProgressBar questionCount={questionCount}/>
              </>
            }
          </div>
        </section>
      </form>
    </>
  )
}

export default QuestionCard
