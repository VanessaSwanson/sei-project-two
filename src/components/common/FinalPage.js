import { Link } from 'react-router-dom'

function FinalPage() {  
  return (
    <>
      <h1>You have reached the end of the quiz!</h1>
      <p>Your final score is X</p>
      <Link to="/">Return to home</Link>
    </>
  )
}

export default FinalPage