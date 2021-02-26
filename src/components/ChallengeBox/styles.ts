import styled, { css } from 'styled-components';

export const ChallengeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  height: 100%;
  background: var(--white);
  border-radius: 5px;
  box-shadow: 0 0 60px rgba(0,0,0,0.6);
  padding: 1.5rem 2rem;
`;

export const NotActiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  strong {
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1.4;
  }

  p {
    display: flex;
    gap: 2rem;
    flex-direction: column;
    align-items: center;
    line-height: 1.4;
    max-width: 70%;
    margin-top: 3rem;

    image {
      margin-bottom: 1rem;
    }
  }
`;


export const ActiveChallenge = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  gap: 3rem;

  header {
    color: var(--blue);
    font-weight: 600;
    font-size: 1.25rem;
    border-bottom: 1px solid var(--gray-line);
  }

  main {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 3rem;

    strong {
      font-weight: 600;
      font-size: 2rem;
      color: var(--title);
      margin: 1.5rem 0 1rem;
    }

    p {
      line-height: 1.5;
    }

    footer {
      display: flex;
      gap: 1rem;
    }
  }
`;

interface IResultProps {
  failed: boolean;
  succeeded: boolean;
}

export const ResultButton = styled.button<IResultProps>`
  height: 3rem;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  border: none;
  border-radius: 5px;

  box-shadow: 1px 2px 6px 2px rgba(0,0,0,0.5);

  transition: 0.3s;

  ${props =>
    props.succeeded &&
    css`
      font-weight: 600;
      background: var(--green);
      &:hover {
        filter: brightness(0.8);
        box-shadow: 1px 1px 4px 1px rgba(0,0,0,0.5);
      }
    `}

  ${props =>
    props.failed &&
    css`
      font-weight: 600;
      background: var(--red);
      &:hover {
        filter: brightness(0.8);
        box-shadow: 1px 1px 4px 1px rgba(0,0,0,0.45);
      }
    `}
`;
