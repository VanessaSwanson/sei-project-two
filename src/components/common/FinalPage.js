import { Link } from 'react-router-dom'

function FinalPage( { score, resetScore }) { 

  
  return (
    <>
      <h1>You have reached the end of the quiz!</h1>
      <p>Your final score is {score}</p>
      <button onClick={resetScore}>
        <Link to="/">Return to home</Link>
      </button>
    </>
  )
}

export default FinalPage