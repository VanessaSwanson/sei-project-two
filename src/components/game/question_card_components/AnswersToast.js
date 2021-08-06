function AnswersToast( { correctAnswerShown, correctAnswer, tick } ) {
  return (
    <div className="field toast">
      {correctAnswerShown && 
      <div className="notification is-danger">
        <div><p>Oops! Nice try, but the correct answer is: <strong>{correctAnswer}</strong></p></div>
      </div>
      }
      {tick && 
      <div className="notification is-primary">
        <div><p>Correct!</p></div>
      </div>}
    </div>
  )
}

export default AnswersToast