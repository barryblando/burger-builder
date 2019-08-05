import React from 'react';

import { Quiz } from '../components/Quiz';

class Quizzes extends React.Component {
  state = {
    counter: 0,
    questions: [],
    results: [],
    btnTypes: [{ type: 'True', disabled: false }, { type: 'False', disable: false }],
    loading: true,
    viewResults: false,
    begin: false,
  };

  componentDidMount() {
    const { data } = this.props;
    this.setState({ questions: data, loading: false });
  }

  setNextQuestion = () => {
    this.setState(prevState => ({
      counter: prevState.counter + 1,
      btnTypes: [{ type: 'True', disabled: false }, { type: 'False', disable: false }],
    }));
  };

  handlerAnswerSelected = answer => {
    const { questions, counter } = this.state;
    if (counter < 9) {
      if (questions[counter].correct_answer === answer) {
        this.setState(prevState => ({
          ...prevState,
          results: [...prevState.results, 'correct'],
          btnTypes: [{ type: 'True', disabled: false }, { type: 'False', disable: false }],
          counter: prevState.counter + 1,
        }));
      } else {
        this.setState(prevState => ({
          ...prevState,
          results: [...prevState.results, 'incorrect'],
          btnTypes: [{ type: 'True', disabled: false }, { type: 'False', disable: false }],
          counter: prevState.counter + 1,
        }));
      }
    } else {
      this.setState(prevState => ({
        ...prevState,
        viewResults: true,
      }));
    }
  };

  onBegin = () => {
    this.setState(prevState => ({
      ...prevState,
      begin: true,
    }));
  };

  onReset = () => {
    this.setState(prevState => ({
      ...prevState,
      btnTypes: [{ type: 'True', disabled: false }, { type: 'False', disable: false }],
      counter: 0,
      results: [],
      viewResults: false,
      begin: false,
    }));
  };

  renderQuiz = () => {
    const { counter, questions, btnTypes, loading, viewResults, results, begin } = this.state;
    if (loading) {
      return <p>Loading...</p>;
    }

    if (!begin) {
      return (
        <div>
          <h1>Welcome to the Trivia Challenge!</h1>
          <p>You will be presented with 10 True or False questions.</p>
          <p>Can you score 100%?</p>
          <button type="button" onClick={() => this.onBegin()}>
            BEGIN
          </button>
        </div>
      );
    }

    if (viewResults) {
      /* eslint-disable */
      return (
        <div>
          You Scored: {results.filter(answer => answer === 'correct').length} / 10
          <ul>
            {questions.map(({ question, correct_answer }, index) => (
              <li key={question}>
                 {index + 1} {question} Correct Answer: {correct_answer}
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => this.onReset()}>Play Again ?</button>
        </div>
      );
      /* eslint-enable */
    }

    return (
      <Quiz
        onAnswerSelected={this.handlerAnswerSelected}
        questionData={questions[counter]}
        btnTypes={btnTypes}
        counter={counter}
      />
    );
  };

  render() {
    return this.renderQuiz();
  }
}

export const DebugQuizzes = props => console.log('Quizzes: ', props) || <Quizzes {...props} />;
