import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../../contexts/ChallengeContext';
import { CountdownContext } from '../../contexts/CountdownContext';

import { Container, CountdownFinished, CountdownButton, ResetButton } from './styles';

const Countdown: React.FC = () => {
  const {
    hasFinished,
    minutes,
    seconds,
    isActive,
    startCountdown,
    resetCountdown
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  return (
    <>
      <Container>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </Container>
        {hasFinished && (
          <CountdownFinished>
            Ciclo Encerrado
          </CountdownFinished>
        )}
        {!isActive ? (
          <CountdownButton  isActive={false} onClick={startCountdown}>
            Iniciar ciclo
          </CountdownButton>
        ) : (
          <ResetButton onClick={resetCountdown}>
            Resetar ciclo
          </ResetButton>
        )}
      </>
    );
};

export default Countdown;
