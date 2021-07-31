import { create } from 'domain';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ChallengesContext } from './ChallengesContext';
import { CompletedChallengesModal } from '../components/CompletedChallengesModal';

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
  closeModal: () => void;
  openModal: () => void;
}

interface CountdownProviderProps {
  children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout;
let count = 0;

export function CountdownProvider({children}: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [isModalOpen, setModalOpen] = useState(false)

  const twentyFiveMinutes = (25 * 60);

  const fiveMinutes = (5 * 60);

  const [isActiveTimeRest, setActiveTimeRest] = useState(false)
  const [time, setTime] = useState(twentyFiveMinutes);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function closeModal() {
    setModalOpen(false)
  }

  function openModal() {
    setModalOpen(true)
      setTimeout(function() {
        setModalOpen(false)
        new Audio('/notification.mp3').play();
      }, 300000);
  }

  function resetCountdown() {
    count ++;
    if (count === 4) {
      openModal()
      count = 0;
    }
    clearTimeout(countdownTimeout);
    setIsActive(false)
    setTime(twentyFiveMinutes);
    setHasFinished(false)
  }

  function startCountdown() {
    setIsActive(true)
  }

  useEffect(() => {
    if (isActiveTimeRest && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActiveTimeRest && time === 0) {
      setActiveTimeRest(false)
      resetCountdown()
    }
  }, [isActiveTimeRest, time])

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge();
      setTime(fiveMinutes);
      setActiveTimeRest(true);
    }
  }, [isActive, time])

  return (
    <CountdownContext.Provider value = {{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown,
      openModal,
      closeModal
    }}>
      {children}
      { isModalOpen && <CompletedChallengesModal />}
    </CountdownContext.Provider>
  )
}
