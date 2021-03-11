import { CompletedChallenges } from '../components/CompletedChallenges'
import { CountDown } from '../components/CountDown'
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'

import Head from 'next/head'

import styles from '../styles/pages/Home.module.css'
import { ChallengeBox } from '../components/ChallengeBox'
import { CountdownProvider } from '../contexts/CountdownContext'

function App() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Inicio | PomodoroTime</title>
      </Head>
      <ExperienceBar />
      <CountdownProvider>
        <section>
          <div>
            <Profile />
            <CompletedChallenges />
            <CountDown />
          </div>
          <div>
            <ChallengeBox/>
          </div>
        </section>
      </CountdownProvider>
    </div>
  );
}

export default App;
