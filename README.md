# General Assembly Project 2: Movie Quiz

![](https://lh3.googleusercontent.com/CLmxhFlgE8wbqfPATPByPbXu1s-lYHQSnPKrLnbP9mgSFhpfFadRbznMJep_zVgXVebO9ebVwQVOgHl7KFDfl_K_X2QfTqvva11SAOzZKr1ua8VTFeUMn028kKsjZiLeZN4ohX8=s0)

Table of Contents
=================

1. [Overview](#overview) 

2. [Project Brief](#projectbrief)

3. [Movie Quiz](#moviequiz)

4. [Getting Started](#gettingstarted)

5. [Process](#process)

    1.[Public API](#publicapi)

    2.[Planning](#planning)

    3.[Game Logic](#gamelogic)
  
      1. [Questions and answers](#qa)

      2. [Clues](#clues)

      3. [End of Quiz](#end)

6. [Known Bugs](#bugs)

7. [Wins](#wins)

8. [Challenges](#challenges)

9. [Key Learnings](#learnings)

10. [Future Content](#futurecontent)


Overview <a name="overview"></a>
========

This was my second project as part of the General Assembly immersive Software Engineering course, in which I built a React quiz app.

Project Brief <a name="projectbrief"></a>
=============

In this 2-day pair-code hackathon, we were tasked with building a React app using an external API.

Timeframe: 48 hours

Partnered with: [Harry Evans](https://github.com/hatch9191)

Technologies used:

-   React.js

-   react-router-dom

-   JavaScript 

-   HTML

-   SCSS

-   Bulma

-   [Trivia API](https://trivia.willfry.co.uk/)

-   Axios

-   Insomnia

Movie Quiz <a name="moviequiz"></a>
==========

After investigating different public APIs, Harry and I decided to build a movie quiz app. Players are given 10 questions, which they answer by typing in their given answers. They can earn points for each correct answer, but will lose points for each clue used and each incorrect answer. They can use three clues to help them along the way.

You can play the deployed game [here](https://sei-movie-quiz.netlify.app/), or click on the link below to watch an overview of functionality.

[<img width="863" alt="Screenshot 2021-10-09 at 15 39 40" src="https://user-images.githubusercontent.com/78015278/136662591-5106ae4f-1bb2-46ed-b0ab-1f28e7631f7b.png">](https://www.youtube.com/watch?v=mcCPWHUw0Jw)



Getting Started <a name="gettingstarted"></a>
===============

-   Clone or download the repo

-   `npm i` to install any dependencies

-   `npm run dev` to run the development server

Process <a name="process"></a>
=======

Public API <a name="publicapi"></a>
----------

We knew that our decision of what app to build would largely depend on which public APIs were available to us, so our first port of call was to investigate various public APIs. We came across lots of trivia APIs and from this decided to build a quiz.

At first we landed on [jService API](http://jservice.io/), an API providing Jeopardy style questions and multiple choice answers. However, once we started pulling the data from jService for our initial test, we realised it would be difficult to work with due to the inconsistent phrasing of questions and answers, which would have considerably complicated our data preparation stage of the project, which we felt was unrealistic in the given timeframe.

We reverted to looking for other quiz APIs and found [Trivia API](https://trivia.willfry.co.uk/), which we quickly discovered was well presented, organised and perfect for our needs. By admitting defeat with jService API and allowing ourselves that little extra time to reassess, we ended up saving ourselves lots of time and pain in the long run.

We thought it would make for a more consistent theme to pick one style of question, so we went for movies, which we thought would lend itself well to styling and is a fun and accessible topic for many. Trivia API allows you to pull by question topic, so this was simply a matter of adjusting the query url.

Planning <a name="planning"></a>
--------

Once we had tested pulling the data from Trivia API, we got to planning. We started by brainstorming what features we wanted to include as an MVP vs what would be stretch goals, and then built a wireframe for each page of the quiz.

We decided to use Bulma CSS framework to help us achieve a neat, minimal and consistent styling within the short timeframe for the project.

MVP features:

-   Landing page.

-   10 questions, shown as individual pages that refresh with the new question on submission.

-   Users can answer by typing into an answer field.

-   A progress bar to show users how far into the quiz they are.

-   Points added for correct answers and points deducted for incorrect answers.

Stretch goals:

-   Countdown timer for each question.

-   Clues.

-   Local storage scoreboard.

## Game Logic <a name="gamelogic"></a>

### Questions and answers <a name="qa"></a>
-----------------------------------

First, we created an Axios get request to pull the data from Trivia API and set the relevant fields needed for the game logic in state (incorrect answers were also pulled as these would be used to build the clues later):

```

export  function  getMovieQuestions() {

 return  axios.get(`${baseUrl}movies&limit=1`)

}

  React.useEffect(() => {

   const  getData = async () => {

     try {

       const  response = await  getMovieQuestions()

       setQuizQuestion(response.data[0].question)

       setCorrectAnswer(response.data[0].correctAnswer)

       setIncorrectAnswer(response.data[0].incorrectAnswers[0])

} catch (err) {

       console.log(err)

       setIsError(true)

     }

   }

   getData()

 }, [questionCount])
 
 ```

We then needed to create a function that would check a player's answer against the correct answer returned by the Axios get request.

This was achieved quite simply by adding an onChange event listener to the player's input in the answer field. If the player's input matched the correct answer pulled from Trivia API, the answerIsCorrect variable would be set to True, else it was set to False.

```

function  checkAnswer (e) {

   e.preventDefault()

   if (e.target.value.toLowerCase() === correctAnswer.toLowerCase()) {

     setAnswerIsCorrect(true)

     setUserAnswer(e.target.value)

} else {

     setAnswerIsCorrect(false)

     setUserAnswer(e.target.value)

   }

 }
 
 ```

Using Bulma notifications, we built an AnswersToast component that either popped up with a green 'Correct!" or a red "Sorry, but the correct answer is {correctAnswer}" to let the player know how they fared in each question as they went along.

```

function  AnswersToast( { correctAnswerShown, correctAnswer, tick } ) {

 return (

   <div  className="field toast">

     {correctAnswerShown &&

     <div  className="notification is-danger">

       <div><p>Oops! Nice try, but the correct answer is: <strong>{correctAnswer}</strong></p></div>

     </div>

     }

     {tick &&

     <div  className="notification is-primary">

       <div><p>Correct!</p></div>

     </div>}

   </div>

 )

}

export  default  AnswersToast

```

On submission, the state would be checked to see whether answerIsCorrect was true or false, and the relevant AnswersToast would be shown, along with points added or deducted from the player's score.

### Clues <a name="clues"></a>
-------

The ability to give players three clues was a stretch goal, which we managed to achieve within the tight time frame. I personally wrote the logic for the clues function by manipulating the multiple choice answers for each question provided by Trivia API.

There are three types of clue:

-   It's definitely not... (one of the incorrect multiple choice options is given so players can rule that out as an answer)

-   50/50 (one of the examples given is correct)

-   Anagram (an anagram of the correct answer)

This was achieved by created an array of clues like so:

```

const  clues = [

   `You could try writing ${incorrectAnswer} but you'd be wrong`,

   `One of these is the correct answer: ${incorrectAnswer}; ${correctAnswer}`,

   `The following is an anagram of the correct answer: ${correctAnswer.split('').sort().join('')}`

 ]
```

When the clue button is clicked, the handleAddClue function is activated, which reduces the cluesLeft state by 1 and adds to the cluePhraseScroll state by 1 (this is originally set to -1 so it will align with the relevant clue's index in the clues array). Once cluesLeft reaches 0, the clue button is removed.

```

 const  handleAddClue = (e) => {

   e.preventDefault()

   setClue(true)

   setScore(score - 20)

   setCluesLeft(cluesLeft - 1)

   setCluePhraseScroll(cluePhraseScroll + 1)

   setClueShown(true)

 }
 ```

### End of Quiz <a name="end"></a>
-----------

```
function  FinalPage( { score, resetScore } ) {

 return (

   <section  className="section landing-page">

     <div  className="container has-text-centered">

       <div  className="landing-page-text">

         <div  className="box">

           <p  className="title">You have reached the end of the quiz!</p>

           <p  className="subtitle">Your final score is {  score  } points.</p>

         </div>

         <Link  to="/"  className="button is-warning is-medium"  onClick={resetScore}>Return to home</Link>

       </div>

     </div>

   </section>

 )

}
```

In the answer submission function, there is a condition which states that if the question count is on 10, the final page must load on the button click, which takes the player to the FinalPage component shown above. As you can see, players are shown their final score and are given a button to take them back to the homepage, which resets their score ready for a new game.

Known Bugs <a name="bugs"></a>
==========

-   It's not so much a bug as a known disadvantage of using a publicly sourced API, but a few answers within the API are spelled incorrectly, meaning a player can give the correct answer but still be marked wrong (apologies to anyone who comes up against Trivia API's insistence that Texas CHANsaw massacre is a thing while playing the quiz!).

-   If we had more time we could have overcome this by looking into fuzzy matching.

Wins <a name="wins"></a>
====

-   Pair coding was a really fun challenge, and a great learning opportunity to see how someone else codes on VSCode Liveshare. There were moments where either Harry or myself had suggestions for getting around problems and had to articulate our idea to one another, which was fantastic for solidifying our understanding.

-   It was incredible having just come from building my first project with Vanilla JavaScript to see how quickly and efficiently something of a similar complexity can be built using React.js. We were able to successfully make use of React components for many elements of the quiz. It was also really satisfying to see that my JavaScript fundamentals regarding the quiz logic came easily after the first few weeks of the course and to clearly see my progress.

Challenges <a name="challenges"></a>
==========

-   We successfully avoided a lot of the challenges our peers on the course encountered by being thorough with our selection of the public API that we used.

-   However we did encounter some minor issues around refactoring our code and passing data to different components. This was simply a case of getting used to React.js and re-reading our resources to remind ourselves of the fundamentals.

Key Learnings <a name="learnings"></a>
=============

-   This hackathon was a great first taste of building with React and it was really helpful to get stuck into fundamentals around state, asynchronous requests and unidirectional data flow.

Future Content <a name="futurecontent"></a>
==============

-   Fuzzy matching on player answers to avoid unnecessary frustrations around typos.

-   Countdown timers for each question to add an extra element of pressure to the game.

-   A scoreboard marking players' top scores.
