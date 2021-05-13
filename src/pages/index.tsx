import Head from 'next/head'
import { GetServerSideProps } from 'next'

import { CompletedChallenges } from '../components/CompletedChallenges'
import { ChallengeBox } from '../components/ChallengeBox'
import { Countdown } from '../components/Countdown'

import styles from '../styles/pages/Home.module.css'
import { CountdownProvider } from '../contexts/CountdownContext'
import { ChallengesProvider } from '../contexts/ChallengesContext'

interface HomeProps {
  challengesCompleted: number;
}


export default function Home(props: HomeProps) {

  return (
    <ChallengesProvider
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | PomodoroTime</title>
        </Head>
        <CountdownProvider>
          <section>
            <div>
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox/>
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
