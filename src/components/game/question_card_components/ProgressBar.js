

function ProgressBar( { questionCount } ) {

  return (
    <progress className="progress is-warning" value={questionCount} max="10">10%</progress>
  )
}

export default ProgressBar