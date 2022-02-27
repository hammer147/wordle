import { useCallback, useEffect, useMemo, useState } from 'react'
import { produce } from 'immer'
import EmptyGuess from './empty-guess'
import CurrentGuess from './current-guess'
import SubmittedGuess from './submitted-guess'
import { useCharCountMap, useWordOfTheDay } from '../../hooks'
import styles from '../../styles/wordle.module.css'
import Keyboard from './keyboard/keyboard'

const totalGuessMax = 6

const Wordle = () => {

  const puzzleWord = useWordOfTheDay()

  const [guess, setGuess] = useState<string[]>([])
  const [submittedGuesses, setSubmittedGuesses] = useState<string[][]>([])

  const handleKeyInput = useCallback((key: string) => {
    const isChar = /^[a-z]$/.test(key)
    const isBackspace = key === 'Backspace'
    const isSubmit = key === 'Enter'
    const isGuessFinished = guess.length === 5

    if (isBackspace) {
      // setGuess(prev => {
      //   const temp = [...prev]
      //   temp.pop()
      //   return temp
      // })
      setGuess(produce(draft => {
        draft.pop()
        return draft
      }))
    } else if (isChar && guess.length < 5) {
      setGuess(prev => [...prev, key])
    } else if (isGuessFinished && isSubmit) {
      setSubmittedGuesses(prev => [...prev, guess])
      setGuess([])
    }
  }, [guess])

  useEffect(() => {
    const handleKeyDown = ({ key }: KeyboardEvent) => {
      // console.log(key)
      handleKeyInput(key)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyInput])

  const isCorrect = submittedGuesses.length > 0
    && submittedGuesses[submittedGuesses.length - 1].join('') === puzzleWord

  const isFailure = !isCorrect && submittedGuesses.length === totalGuessMax

  const puzzleWordCharCount = useCharCountMap(puzzleWord)

  return (
    <div className={styles.wordle}>
      <h2>Wordle</h2>

      <div className={styles.boardPositioner}>

        <div className={styles.board}>
          {submittedGuesses.map((submittedGuess, i) => (
            <SubmittedGuess
              key={i}
              submittedGuess={submittedGuess}
              puzzleWord={puzzleWord}
              puzzleWordCharCount={puzzleWordCharCount}
            />
          ))}

          {!isCorrect && !isFailure && <CurrentGuess guess={guess} />}

          {Array.from({ length: totalGuessMax - submittedGuesses.length - (isCorrect ? 0 : 1) }).map((_, i) => (
            <EmptyGuess key={i} />
          ))}

          {isCorrect && (
            <div className={styles.message}>You did it. You are the best!</div>
          )}

          {isFailure && (
            <div className={styles.message}>Better luck next time.</div>
          )}
        </div>

      </div>

      <Keyboard handleKeyInput={handleKeyInput} />

    </div>
  )
}

export default Wordle
