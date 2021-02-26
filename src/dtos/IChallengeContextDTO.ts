import IChallengeDTO from "./IChallengeDTO";

export default interface IChallengeContextDTO {
  level: number;
  experienceToNextLevel: number;
  activeChallenge: IChallengeDTO;
  currentExperience: number;
  challengesCompleted: number;
  levelUp: Function;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
};
