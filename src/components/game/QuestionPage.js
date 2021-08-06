import QuestionCard from './QuestionCard.js'

function QuestionPage( { score, setScore } ) {
  return (
    
    <>
      <section className="section landing-page">
        <div className="container has-text-centered">
          <QuestionCard 
            score = {score}
            setScore = {setScore}/>
        </div>
      </section>
    </>
  )
}

export default QuestionPage