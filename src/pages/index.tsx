import CompletedChallenges from "../components/CompletedChallenges";
import Countdown from "../components/Countdown";
import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";

import Head from 'next/head';

import styles from '../styles/pages/Home.module.css';
import ChallengeBox from "../components/ChallengeBox";

import { Container } from '../styles/mainStyles';
import { CountdownProvider } from "../contexts/CountdownContext";

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Início | move.it</title>
      </Head>
      <ExperienceBar />

      <section>
      <CountdownProvider>
        <div>
          <Profile />
          <CompletedChallenges />
          <Countdown />
        </div>
        <div>
          <ChallengeBox />
        </div>
        </CountdownProvider>
      </section>
    </Container>
  )
}
