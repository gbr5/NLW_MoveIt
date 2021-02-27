import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import ICountdownContextDTO from '../dtos/ICountdownContextDTO';
import { ChallengesContext } from './ChallengeContext';

export const CountdownContext = createContext({} as ICountdownContextDTO);

interface CountdownProviderProps {
  children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownProvider: React.FC<CountdownProviderProps> = ({ children }: CountdownProviderProps) => {
  const { startNewChallenge } = useContext(ChallengesContext);
  const startTime = 0.1 * 60;
  const [time, setTime] = useState(startTime);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const startCountdown = useCallback(() => {
    setIsActive(true);
  }, []);

  const resetCountdown = useCallback(() => {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(startTime);
    setHasFinished(false);
  }, []);

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        isActive,
        hasFinished,
        startCountdown,
        resetCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  )
}
