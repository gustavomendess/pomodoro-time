import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'

export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/gustavomendess.png" alt="Gustavo Mendes"/>
      <div>
        <strong>Gustavo Mendes</strong>
      </div>
    </div>
  )
}
