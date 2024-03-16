import React from 'react';
import { connect } from 'react-redux';

const Leaderboard = ({ leaderboard }) => {
  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((entry, index) => (
          <li key={index}>{entry.username}: {entry.wins} wins</li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  leaderboard: state.leaderboard,
});

export default connect(mapStateToProps)(Leaderboard);
