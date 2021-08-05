import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import QuestionCard from './components/game/QuestionCard'
import questionCount from './components/game/QuestionCard'
import FinalPage from './components/common/FinalPage'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <h1>I am the landing page</h1>
          <Link to="/game">Start game</Link>
        </Route>
        <Route path="/game">
          <h1>I am the game page</h1>
          <QuestionCard />
        </Route>
        {questionCount === 3 && 
          <Route path="/final">
            <FinalPage />
          </Route>
        }
      </Switch>
    </BrowserRouter>
  )
}

export default App
