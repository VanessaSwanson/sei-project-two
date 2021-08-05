import { Link } from 'react-router-dom'
import score from '../game/QuestionCard'

function FinalPage() {  
  return (
    <>
      <h1>You have reached the end of the quiz!</h1>
      <p>Your final score is { score }</p>
      <Link to="/">Return to home</Link>
    </>
  )
}

export default FinalPage