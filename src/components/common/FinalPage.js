import { Link } from 'react-router-dom'


function FinalPage( { score, resetScore } ) {  
  return (
    <section className="section landing-page">
      <div className="container has-text-centered">
        <div className="landing-page-text">
          <div className="box">
            <p className="title">You have reached the end of the quiz!</p>
            <p className="subtitle">Your final score is { score } points.</p>
          </div>
          <Link to="/" className="button is-warning is-medium" onClick={resetScore}>Return to home</Link>
        </div>
      </div>
    </section>
  )
}

export default FinalPage