import React, { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengeContext';

import { Container, CurrentExperience, ExperienceBarDiv } from './styles';

const ExperienceBar: React.FC = () => {
  const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);

  const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;

  return (
    <Container>
      <span>0 xp</span>
      <div >
        <ExperienceBarDiv left={`${percentToNextLevel}%`} />

        <CurrentExperience
          left={`${percentToNextLevel}%`}
        >
          {currentExperience} xp
        </CurrentExperience>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </Container>
  );
};

export default ExperienceBar;
