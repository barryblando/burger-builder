import React from 'react';
import axios from 'axios';

class Fetcher extends React.Component {
  state = {
    data: null,
    isLoading: false,
    error: null,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });

    const { url } = this.props;
    await axios
      .get(url)
      .then(response =>
        this.setState({
          data: response.data.results,
          isLoading: false,
        })
      )
      .catch(error =>
        this.setState({
          error,
          isLoading: false,
        })
      );
  }

  render() {
    const { children } = this.props;

    return children(this.state);
  }
}

export default Fetcher;
