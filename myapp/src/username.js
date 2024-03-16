import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setUsername } from './actions';

const UsernameInput = ({ setUsername }) => {
  const [username, setUsernameLocal] = useState('');

  const handleChange = (event) => {
    setUsernameLocal(event.target.value);
  };

  const handleSubmit = () => {
    setUsername(username);
  };

  return (
    <div>
      <input type="text" value={username} onChange={handleChange} placeholder="Enter your username" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

const mapDispatchToProps = {
  setUsername,
};

export default connect(null, mapDispatchToProps)(UsernameInput);
