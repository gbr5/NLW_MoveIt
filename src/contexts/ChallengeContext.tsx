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
  const [level, setLevel] = useState((Number(Cookies.get('level')) || rest.level) ?? 1);
  const [currentExperience, setCurrentExperience] = useState((Number(Cookies.get('currentExperience')) || rest.currentExperience) ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState((Number(Cookies.get('challengesCompleted')) || rest.challengesCompleted) ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModelOpen, setIsLevelUpModelOpen] = useState(false);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  const levelUp = useCallback(() => {
    const thisLevel = Number(Cookies.get('level'));
    Cookies.set('level', String(thisLevel + 1));
    setLevel(thisLevel + 1);
    setIsLevelUpModelOpen(true);
  }, [])

  const updateChallengesCompleted = useCallback(() => {
    const thisChallengesCompleted = Number(Cookies.get('challengesCompleted'));
    Cookies.set('challengesCompleted', String(thisChallengesCompleted + 1));
    setChallengesCompleted(thisChallengesCompleted + 1);
  }, []);

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
    const challenge = Cookies.get('challenge');
    if (challenge === null || challenge === undefined) {
      return;
    }
    const thisChallenge: IChallengeDTO = JSON.parse(challenge);
    const { amount } = thisChallenge;
    const thisLevel = Number(Cookies.get('level'));
    const experienceToNextLevel = Math.pow((thisLevel + 1) * 4, 2);
    const currentExperienceUpdated = Number(Cookies.get('currentExperience'));
    const finalExperience = currentExperienceUpdated + amount;

    if (finalExperience >= experienceToNextLevel) {
      Cookies.set('currentExperience', String(finalExperience - experienceToNextLevel));
      setCurrentExperience(finalExperience - experienceToNextLevel);
      levelUp();
    } else {
      Cookies.set('currentExperience', String(finalExperience));
      setCurrentExperience(finalExperience);
    }
    updateChallengesCompleted();
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
        experienceToNextLevel: Math.pow((level + 1) * 4, 2),
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
