import React, { useRef, useState } from 'react'
import './Quizz.css'
import { data } from '../assets/data';
import { useEffect } from 'react';
import QuestionList from './QuestionList';
const Quizz = () => {
    let [index,setIndex] = useState(0);
    let [question,setQuestion] = useState(data[index]);
    let [lock,setLock] = useState(false);
    let [score,setScore] = useState(0);
    let [result,setResult] = useState(false);
    let [selectedOption, setSelectedOption] = useState(null);
    let [seconds, setSeconds] = useState(10);
    let [minutes, setMinutes] = useState(0);
    // let [currentIndex, setCurrentIndex] = useState(data);

    
    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let optionArray = [Option1,Option2,Option3,Option4];

    const [timerInterval, setTimerInterval] = useState(null);
    
    const checkAnswer = (element, answer) =>{
        if (lock === false) {
            if (question.answer===answer) {
                element.target.classList.add("correct");
                setLock(true);
                setScore(score+1);
            }else{
                element.target.classList.add("wrong");
                setLock(true);
                optionArray[question.answer-1].current.classList.add("correct");
            }
        }
    }

    useEffect(() => {
        if (!result) { 
            const timeInterval = setInterval(() => {
                if (seconds === 0 && minutes === 0) {
                    clearInterval(timeInterval);
                    if (index === data.length -1) {
                        setResult(true);
                    }else{
                        setIndex(prevIndex => prevIndex + 1);
                        setQuestion(data[index + 1]);
                        setSeconds(10);
                        setMinutes(0);
                    }
                } else if (seconds === 0) {
                    setMinutes(prevMinutes => prevMinutes - 1);
                    setSeconds(59);
                } else {
                    setSeconds(prevSeconds => prevSeconds - 1);
                }
                if (minutes === 0 && seconds === 0)  {
                    setIndex(++index);
                    setQuestion(data[index]);
                }
            }, 1000);
            
            return () => clearInterval(timeInterval);
        }
});

    const next = () =>{
        if (lock === true) {
            if (index === data.length-1) {
                setResult(true)
                return 0;
            }
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);
            setMinutes(0);
            setSeconds(10);
            optionArray.map((option)=>{
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            })
        }
    }

    const previous = () => {
        if (index > 0) {
            clearInterval(timerInterval);
            setTimerInterval(null);
    
            setSelectedOption(question.answer);
    
            setIndex(--index);
            setQuestion(data[index]);
            setLock(false);
            setMinutes(0);
            setSeconds(10);

            if (selectedOption !== null) {
                optionArray[selectedOption - 1].current.classList.add("correct");
                optionArray[selectedOption - 1].current.classList.add("wrong");
            }
    
            optionArray.forEach((option, i) => {
                if (i !== selectedOption - 1) {
                    option.current.classList.remove("correct");
                    option.current.classList.remove("wrong");
                }
            });
    
        }
    };
    
    
    
        
    const reset = () => {
        setIndex(0);
        setQuestion(data[0]);
        setLock(false);
        setScore(0);
        setResult(false);
        setMinutes(0);
        setSeconds(10);

    }

    const QuestionClick = (clickedIndex) => {
        setIndex(clickedIndex);
        setQuestion(data[clickedIndex]);
        setLock(false);
        setMinutes(0);
        setSeconds(10);
    }

    
  return (
    <>
    <h1 className="quiz-app">Quizyy</h1>
    <div className="main">
            <div className="quiz">
                <div className="watch">{minutes<10?"0"+minutes:minutes}:{seconds<10?"0"+seconds:seconds}</div>
                {result?<></>:<><h2 className="question-box">{index+1} . {question.question}</h2>
                <ul>
                    <li className="row" ref={Option1} onClick={(element)=>{checkAnswer(element,1)}}>
                       {question.option1}
                    </li>
                    <li className="row" ref={Option2}  onClick={(element)=>{checkAnswer(element,2)}}>
                       {question.option2}
                    </li>
                    <li className="row" ref={Option3}  onClick={(element)=>{checkAnswer(element,3)}}>
                        {question.option3}
                    </li >
                    <li className="row" ref={Option4}  onClick={(element)=>{checkAnswer(element,4)}}>
                      {question.option4}
                    </li>
                </ul>
                
                {index > 0 && <button className="btn btn-pre" onClick={previous}>
                    Previous
                </button>}
                <button className="btn btn-nxt" id="Next" onClick={next}>
                    Next
                </button>
                <div className="index"> {index+1} of {data.length} Question</div>
                </>}
                {result?<>
                <h2 class="finalScore">Final Score</h2>
                <hr />
                <h3>You Got {score} out of {data.length}</h3>
                <button class="btn btn-reset" onClick={reset}>Reset</button>
                </>:<></>}
            </div>
        </div>
        <div className="Showquestion">
         <QuestionList data={data} currentIndex={index} onQuestionClick={QuestionClick} />
        </div>
    </>
  )

  

}


export default Quizz
