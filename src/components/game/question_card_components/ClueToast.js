import React from 'react'

function ClueToast( { score, setScore, cluesLeft, setCluesLeft, cluePhraseScroll, setCluePhraseScroll, incorrectAnswer, correctAnswer, clue, setClue } ) {
  
  const [clueShown, setClueShown] = React.useState(false)
  const clues = [
    `You could try writing ${incorrectAnswer} but you'd be wrong`, 
    `One of these is the correct answer: ${incorrectAnswer}; ${correctAnswer}`, 
    `The following is an anagram of the correct answer: ${correctAnswer.split('').sort().join('')}` 
  ]

  const handleAddClue = (e) => {
    e.preventDefault()
    setClue(true)
    setScore(score - 20)
    setCluesLeft(cluesLeft - 1)
    setCluePhraseScroll(cluePhraseScroll + 1)
    setClueShown(true)
  }

  const handleRemoveClue = (e) => {
    e.preventDefault()
    setClueShown(false)
  }
  
  return (
    <>
      {!clue && cluesLeft > 0 && <button className="button is-info is-medium" onClick={handleAddClue}>Clue</button>}
      
      {clue && clueShown && <div className="notification is-info">
        <button className="delete" onClick={handleRemoveClue}></button>
        <div><p>{clues[cluePhraseScroll]}</p></div>
      </div>}
    </>
  )
}

export default ClueToast
