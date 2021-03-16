import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/CompletedChallengesModal.module.css'

export function CompletedChallengesModal() {
const { closeModal, challengesCompleted } = useContext(ChallengesContext)
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
      <header>{challengesCompleted}</header>
        <strong>Parabéns</strong>
        <p>Você completou mais um exercicio</p>

        <button type="button" onClick={closeModal}>
          <img src="/icons/close.svg" alt="Fechar modal"/>
        </button>
      </div>
    </div>
  )
}
