import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getRanking } from '../services/localStorage';
import Button from '../Components/Button';
import './Ranking.css';

export default class Ranking extends Component {
  tableBody() {
    return getRanking().map((a, index) => (
      <tr key={ a.score }>
        <td><img className="profile-img" src={ a.picture } alt={ a.name } /></td>
        <td data-testid={ `player-name-${index}` }>{a.name}</td>
        <td data-testid={ `player-score-${index}` }>{a.score}</td>
      </tr>
    ));
  }

  render() {
    const { history } = this.props;
    return (
      <div className="ranking-page">
        <h1 data-testid="ranking-title">Ranking</h1>
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {this.tableBody()}
          </tbody>
        </table>
        <Button
          testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Home
        </Button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
