import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js.cookie';
import challenges from '../../challenges.json';
import { CompletedChallengesModal } from '../components/CompletedChallengesModal';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  challengesCompleted: number;
  activeChallenge: Challenge;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  challengesCompleted : number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);


export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const [isModalOpen, setModalOpen] = useState(false)

  const [activeChallenge, setActiveChallenge] = useState(null);


  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [challengesCompleted])

  function closeModal() {
    setModalOpen(false)
  }


  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}XP!`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
    setModalOpen(true)
    setTimeout(function() {
      setModalOpen(false)
    }, 2000);

  }

  return (
    <ChallengesContext.Provider
      value={{
        challengesCompleted,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        completeChallenge,
        closeModal
      }}
    >
      {children}
      { isModalOpen && <CompletedChallengesModal />}
    </ChallengesContext.Provider>
    )
}
