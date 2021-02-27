import React, { useCallback, useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengeContext';
import { CountdownContext } from '../../contexts/CountdownContext';

import {
  ChallengeContainer,
  NotActiveContainer,
  ActiveChallenge,
  ResultButton
} from './styles';

const ChallengeBox: React.FC = () => {
  const {
    activeChallenge,
    resetChallenge,
    completeChallenge,
    resetMemory,
  } = useContext(ChallengesContext);
  const { resetCountdown } = useContext(CountdownContext);

  const handleChallengeSucceeded = useCallback(() => {
    completeChallenge();
    resetCountdown();
  }, [resetCountdown, completeChallenge]);

  const handleChallengeFailed = useCallback(() => {
    resetChallenge();
    resetCountdown();
  }, [resetCountdown, resetChallenge]);

  const handleReset = useCallback(() => {
    resetMemory();
    resetCountdown();
  }, [resetCountdown, resetMemory]);

  return (
    <ChallengeContainer>
      <ResultButton
        type="button"
        onClick={handleReset}
        failed
        succeeded={false}
      >
        Resetar
      </ResultButton>
      {!!activeChallenge && activeChallenge.amount ? (
        <ActiveChallenge>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img
              src={`icons/${activeChallenge.type}.svg`}
              alt={activeChallenge.type}
            />
            <strong>Novo Desafio</strong>
            <p>{activeChallenge.description}</p>
            <footer>
              <ResultButton
                type="button"
                onClick={handleChallengeFailed}
                failed
                succeeded={false}
              >
                Falhei
              </ResultButton>
              <ResultButton
                type="button"
                failed={false}
                succeeded
                onClick={handleChallengeSucceeded}
              >
                Completei
              </ResultButton>
            </footer>
          </main>
        </ActiveChallenge>
      ) : (
        <NotActiveContainer>
          <strong>Finalize 1 Ciclo para receber 1 Desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up"/>
            Avance de level completando desafios!
          </p>
        </NotActiveContainer>
      )}
    </ChallengeContainer>
  );
};

export default ChallengeBox;
