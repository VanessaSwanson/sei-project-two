import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <section className="section landing-page">
      <div className="container has-text-centered">
        <div className="landing-page-text">
          <p className="box title">Welcome to the Hardest Pub Quiz Movie Round You&apos;ve Ever Played...</p>
          <Link to="/game" className="button is-warning is-medium">Start Game</Link>
        </div>
      </div>
    </section>
  )
}

export default LandingPage