import IChallengeDTO from "./IChallengeDTO";

export default interface IChallengeContextDTO {
  level: number;
  experienceToNextLevel: number;
  activeChallenge: IChallengeDTO;
  currentExperience: number;
  challengesCompleted: number;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  resetMemory: () => void;
  closeLevelUpModal: () => void;
};
