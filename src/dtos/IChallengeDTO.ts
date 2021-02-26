export default interface IChallengeDTO {
  type: "body" | "eye" | string;
  description: string;
  amount: number;
}
