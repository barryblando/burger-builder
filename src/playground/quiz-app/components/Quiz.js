import React from 'react';

export const Quiz = ({ onAnswerSelected, questionData, btnTypes, counter }) => {
  const { category, question } = questionData;

  return (
    <div>
      <h1>Category: {category}</h1>
      <p>Question: {question} </p>
      {btnTypes.map(btnType => (
        <p key={btnType.type}>
          <button type="button" onClick={() => onAnswerSelected(btnType.type)} disabled={btnType.disable}>
            {btnType.type}
          </button>
        </p>
      ))}
      <p>{counter + 1} of 10</p>
    </div>
  );
};
