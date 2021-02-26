import React, { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengeContext';
import { Container } from './styles';

const Profile: React.FC = () => {
  const { level } = useContext(ChallengesContext);
  return (
    <Container>
      <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80" alt="Guy"/>
      <div>
        <strong>Guy BR</strong>
        <p>
          <img src="icons/level.svg" alt="level"/>
          Level {level}
        </p>
      </div>
    </Container>
  );
};

export default Profile;
