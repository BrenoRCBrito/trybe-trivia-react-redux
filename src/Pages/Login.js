import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginAct, saveTokenAct, updateScoreAct } from '../Redux/Actions';
import { savePlayerInfo } from '../services/localStorage';
import './Login.css';
import Button from '../Components/Button';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClickConfig = this.handleClickConfig.bind(this);
    this.fetchToken = this.fetchToken.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
  }

  componentDidMount() {
    const { updateScore } = this.props;
    updateScore(0, 0);
  }

  handleClickConfig() {
    const { history } = this.props;
    history.push('/settings');
  }

  fetchToken() {
    const { saveToken } = this.props;
    return fetch('https://opentdb.com/api_token.php?command=request')
      .then((res) => res.json()
        .then((json) => {
          saveToken(json.token);
          localStorage.setItem('token', json.token);
        }));
  }

  handleClick(e) {
    const { history, login } = this.props;
    const { name, email } = this.state;
    e.preventDefault(e);
    this.fetchToken();
    login(name, email);

    savePlayerInfo({ name, gravatarEmail: email, score: 0, assertions: 0 });

    history.push('/game');
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  renderButtons() {
    const { name, email } = this.state;

    return (
      <div className="login-buttons">
        <Button
          type="submit"
          buttonStyle="btn-primary"
          testid="btn-play"
          onClick={ this.handleClick }
          disabled={ name === '' || email === '' }
        >
          Play
        </Button>
        <Button
          buttonStyle="btn-outline"
          testid="btn-settings"
          onClick={ this.handleClickConfig }
        >
          Configurations
        </Button>
      </div>
    );
  }

  render() {
    const { name, email } = this.state;
    return (
      <div className="login-page">
        <label htmlFor="name" className="login-label">
          Name:
          <input
            autoComplete="off"
            name="name"
            id="name"
            type="text"
            className="login-input"
            value={ name }
            onChange={ this.handleInputChange }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email" className="login-label">
          Email:
          <input
            autoComplete="off"
            name="email"
            id="email"
            type="email"
            className="login-input"
            value={ email }
            onChange={ this.handleInputChange }
            data-testid="input-gravatar-email"
          />
        </label>
        { this.renderButtons() }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  saveToken: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  updateScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveToken: (token) => dispatch(saveTokenAct(token)),
  login: (name, email) => dispatch(loginAct(name, email)),
  updateScore: (score, assertions) => dispatch(updateScoreAct(score, assertions)),
});

export default connect(null, mapDispatchToProps)(Login);
