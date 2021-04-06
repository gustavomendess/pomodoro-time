import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/CompletedChallengesModal.module.css'

export function CompletedChallengesModal() {
const { challengesCompleted } = useContext(ChallengesContext)
const { closeModal } = useContext(CountdownContext)
  return (

    <div className={styles.overlay}>
      <div className={styles.container}>
      <header>{challengesCompleted}</header>
        <strong>Parabéns</strong>
        <p>Você completou um ciclo completo de pomodoro, descanse 30 minutos e volte com todo gás!!!</p>

        <button type="button" onClick={closeModal}>
          <img src="/icons/close.svg" alt="Fechar modal"/>
        </button>
      </div>
    </div>
  )
}
