import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import IChallengeContextDTO from '../dtos/IChallengeContextDTO';
import Cookies from 'js-cookie';

import challenges from '../../challenges.json';
import IChallengeDTO from '../dtos/IChallengeDTO';
import ICookiesDTO from '../dtos/ICookieDTO';
import LevelUpModal from '../components/LevelUpModal';

export const ChallengesContext = createContext({} as IChallengeContextDTO);

interface ChallengesProviderProps extends ICookiesDTO {
  children: ReactNode;
}

export const ChallengesProvider: React.FC<ChallengesProviderProps> = (
  {
    children,
    ...rest
  }: ChallengesProviderProps) => {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [experienceToNextLevel, setExperienceToNextLevel] = useState(Math.pow((level + 1) * 4, 2));
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModelOpen, setIsLevelUpModelOpen] = useState(false);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
    setExperienceToNextLevel(Math.pow((level + 1) * 4, 2));
  }, [level, currentExperience, challengesCompleted]);

  const levelUp = useCallback(() => {
    Cookies.set('level', String(level + 1));
    setLevel(level + 1);
    setIsLevelUpModelOpen(true);
  }, [level])

  const closeLevelUpModal = useCallback(() => {
    setIsLevelUpModelOpen(false);
  }, []);

  const startNewChallenge = useCallback(() => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    Cookies.set('challenge', challenge);

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio ', {
        body: `Valendo ${challenge.amount}xp !`
      });
    }
  }, [])

  const resetChallenge = useCallback(() => {
    Cookies.remove('challenge');
    setActiveChallenge(null);
  }, []);

  const completeChallenge = useCallback(() => {
    const completedChallenge = Cookies.get('challenge');
    const completedChallenges = Cookies.get('challengesCompleted');
    if (completedChallenge === null || completedChallenge === undefined) {
      return;
    }
    const thisChallenge: IChallengeDTO = JSON.parse(completedChallenge);
    const { amount } = thisChallenge;
    const experience = Cookies.get('currentExperience');
    const finalExperience = Number(experience) + amount;

    if (finalExperience >= experienceToNextLevel) {
      Cookies.set('challengesCompleted', String(Number(completedChallenges) + 1));
      setChallengesCompleted(Number(completedChallenges) + 1);
      Cookies.set('currentExperience', String(finalExperience - experienceToNextLevel));
      setCurrentExperience(finalExperience - experienceToNextLevel);
      levelUp();
    } else {
      Cookies.set('challengesCompleted', String(Number(completedChallenges) + 1));
      setChallengesCompleted(Number(completedChallenges) + 1);
      Cookies.set('currentExperience', String(finalExperience));
      setCurrentExperience(finalExperience);
    }
    resetChallenge();
  }, []);

  const resetMemory = useCallback(() => {
    Cookies.remove('level');
    Cookies.remove('currentExperience');
    Cookies.remove('challengesCompleted');
    Cookies.set('level', '1');
    Cookies.set('currentExperience', '0');
    Cookies.set('challengesCompleted', '0');
    setCurrentExperience(0);
    setLevel(1);
    setChallengesCompleted(0);
    resetChallenge();
  }, []);


  return (
    <ChallengesContext.Provider
      value={{
        closeLevelUpModal,
        resetMemory,
        experienceToNextLevel,
        level,
        activeChallenge,
        currentExperience,
        challengesCompleted,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
      }}
    >
      {children}
      {isLevelUpModelOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}
