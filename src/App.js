import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import QuestionCard from './components/QuestionCard'
import questionCount from './components/QuestionCard'
import FinalPage from './components/FinalPage'

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
