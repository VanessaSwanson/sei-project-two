import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import QuestionCard from './components/game/QuestionCard' 
import FinalPage from './components/common/FinalPage'

function App() {
  const [score, setScore] = React.useState(0)
  const resetScore = () => {
    setScore(0)
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <h1>I am the landing page</h1>
          <Link to="/game">Start game</Link>
        </Route>
        <Route path="/game">
          <QuestionCard 
            score = {score}
            setScore = {setScore} 
          />
        </Route>
        <Route path="/final">
          <FinalPage 
            resetScore = {resetScore}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
