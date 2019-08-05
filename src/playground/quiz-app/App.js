import React from 'react';

import Fetcher from './helpers/Fetcher';

import Quizzes, { DebugQuizzes } from './containers/Quizzes';

export const QuizApp = props => (
  <Fetcher url="https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean">
    {({ data, isLoading, error }) => {
      if (!data) {
        return <p>No data yet...</p>;
      }

      if (error) {
        return <p>{error.message}</p>;
      }

      if (isLoading) {
        return <p>Loading...</p>;
      }

      return <DebugQuizzes data={data} />;
    }}
  </Fetcher>
);
