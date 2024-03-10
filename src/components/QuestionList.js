// QuestionList.js
import React from 'react';

const QuestionList = ({ data, currentIndex, onQuestionClick }) => {
  return (
    <div className="question-list">
      <h3>Question List</h3>
      <ul>
        {data.map((question, index) => (
          <li
            key={index}
            className={index === currentIndex ? 'active' : ''}
            onClick={() => onQuestionClick(index)}>
            {index + 1}. {question.question}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
