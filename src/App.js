import logo from './logo.svg';
import './App.css';
import Questions from './components/Questions';
import data from './components/data'
import {nanoid} from 'nanoid'
import React from 'react'
import Confetti from 'react-confetti';


function App() {

  // const [data, setData]= React.useState([])
  // React.useEffect(()=>{
  //   fetch('https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple')
  //     .then(res=>res.json())
  //     .then(data=>console.log(data))
  // }, [])
  // 
  //  The API was having an issue , so i had to use static data for questions !!!

  const [start, setStart] = React.useState(true)

  const [order, setOrder] = React.useState(-1)

  const [finish, setFinish] = React.useState(0)

  const [ques, setQues] = React.useState(data.results)

  const [select, setSelect] = React.useState({})

  console.log(select)

    function change(ord, opt){
        setSelect(select=>({
                ...select,
                [ord]:opt
            }
        ))
    }

    function score(){
      var cnt=0
      for(let i=0; i<ques.length; i++){
        if(select[i]===ques[i].correct_answer)  cnt++
      }
      return cnt
    }

    function reset(){
      setOrder(-1);
      setStart(true);
      setSelect({});
      setFinish(0);
    }

    function checkAnswers(){
      setFinish(1);
      setOrder(0);
    }

    return (
      <div className='cont'>
          {
            order == -1 ?
            <>
              <div className='blobhome'>
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#D4A373" d="M47.5,-17.6C54.6,6.3,48.5,32.4,32,44.6C15.4,56.8,-11.7,55.1,-28.7,42.1C-45.8,29.1,-52.8,4.9,-46.3,-18.3C-39.8,-41.4,-19.9,-63.5,0.1,-63.5C20.2,-63.6,40.4,-41.6,47.5,-17.6Z" transform="translate(100 100)" />
                </svg>
              </div>
              <div className='title'>Quizzle</div>
              <button onClick={()=>setOrder(o=>o+1)}>Start</button>
            </>
            :
          <>
            { order < 5 ?
              <>
                <div className='blob'>
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#d4a373" d="M51.7,-51.5C65.1,-38.2,72.9,-19.1,74.7,1.8C76.5,22.8,72.4,45.5,59,56.9C45.5,68.3,22.8,68.3,2.9,65.4C-17,62.5,-33.9,56.7,-46.8,45.3C-59.7,33.9,-68.5,17,-68,0.5C-67.6,-16,-57.7,-32,-44.9,-45.2C-32,-58.5,-16,-69,1.6,-70.6C19.1,-72.1,38.2,-64.7,51.7,-51.5Z" transform="translate(100 100)" />
                    </svg>
                </div>
                <div className='blob1'>
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#e9edc9" d="M51.6,-59C60.5,-42.8,56.7,-21.4,53.6,-3.1C50.5,15.2,48.1,30.5,39.3,46.4C30.5,62.2,15.2,78.8,-1.3,80.1C-17.8,81.4,-35.7,67.5,-43.9,51.6C-52.1,35.7,-50.6,17.8,-52.4,-1.7C-54.1,-21.3,-59,-42.6,-50.8,-58.7C-42.6,-74.9,-21.3,-86,0.1,-86C21.4,-86.1,42.8,-75.2,51.6,-59Z" transform="translate(100 100)" />
                  </svg>
                </div>
                <Questions 
                  question={ques[order].question} 
                  ans={ques[order].correct_answer} 
                  opt={ques[order].incorrect_answers} 
                  next={setOrder}
                  order={order}
                  // score={setScore}
                  select={select[order]}
                  change={change}
                  finish={finish}
                />
              </>
              :
              <>
                <div className='blobhome'>
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#D4A373" d="M47.5,-17.6C54.6,6.3,48.5,32.4,32,44.6C15.4,56.8,-11.7,55.1,-28.7,42.1C-45.8,29.1,-52.8,4.9,-46.3,-18.3C-39.8,-41.4,-19.9,-63.5,0.1,-63.5C20.2,-63.6,40.4,-41.6,47.5,-17.6Z" transform="translate(100 100)" />
                  </svg>
                </div>
                  <h1 className='score'>Your score : {score()}/5</h1>
                  <button onClick={()=>checkAnswers()}>Check answers</button>
                  <button onClick={()=>reset()}>Play again</button>
                  {score()==5 && <Confetti />}
              </>
            }
          </>
        }

    </div>
  );
}

export default App;
