import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import QuestionPage from './components/game/QuestionPage' 
import FinalPage from './components/common/FinalPage'
import LandingPage from './components/common/LandingPage'
import Footer from './components/common/Footer'
import Header from './components/common/Header'

function App() {
  const [score, setScore] = React.useState(0)
  const resetScore = () => {
    setScore(0)
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Header />
          <LandingPage />
          <Footer />
        </Route>
        <Route path="/game">
          <Header />
          <QuestionPage 
            score = {score}
            setScore = {setScore} 
          />
          <Footer />
        </Route>
        <Route path="/final">
          <Header />
          <FinalPage 
            score = {score}
            resetScore = {resetScore}
          />
          <Footer />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
