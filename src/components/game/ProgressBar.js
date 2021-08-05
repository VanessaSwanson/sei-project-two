import [questionCount] from './QuestionCard'

function ProgressBar() {

  return (
    <progress className="progress is-primary" value={questionCount} max="10">10%</progress>
  )
}

export default ProgressBar