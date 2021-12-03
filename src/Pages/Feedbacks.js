import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import Button from '../Components/Button';
import './Feedback.css';

class Feedback extends Component {
  feedback() {
    const { assertions } = this.props;
    const tres = 3;
    if (assertions < tres) {
      return 'It could have been better... 😅';
    }
    return 'Well done! 🥳';
  }

  render() {
    const { assertions, history } = this.props;
    return (
      <>
        <Header />
        <div className="feedback-page">
          <p data-testid="feedback-text">{ this.feedback() }</p>
          <p data-testid="feedback-total-question">{ `You got ${assertions}` }</p>
          <div className="feedback-buttons">
            <Button
              testid="btn-play-again"
              onClick={ () => history.push('/') }
            >
              Play Again
            </Button>
            <Button
              testid="btn-ranking"
              onClick={ () => history.push('/ranking') }
            >
              Ranking
            </Button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProp = (state) => ({
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProp)(Feedback);
