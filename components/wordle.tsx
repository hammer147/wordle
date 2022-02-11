import { useEffect, useState } from 'react'
import { produce } from 'immer'
import styles from './wordle.module.css'
import EmptyGuess from './empty-guess'

const Wordle = () => {

  const [guess, setGuess] = useState<string[]>([])
  const [submittedGuesses, setSubmittedGuesses] = useState<string[][]>([])

  useEffect(() => {

    const handleKeyDown = ({ key }: KeyboardEvent) => {

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
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [guess.length])

  console.log(submittedGuesses)

  return (
    <div className={styles.wordle}>
      <EmptyGuess />
      <EmptyGuess />
      <EmptyGuess />
      <EmptyGuess />
      <EmptyGuess />
      <EmptyGuess />
      <div className={styles.word}>
        {/* {Array.from({ length: 5 }).map((_, i) => {
          return <span className={styles.char} key={i}>{guess[i] ?? ''}</span>
        })} */}

        {/* {guess.map((char, i) => (
          <span className={styles.char} key={i}>{char}</span>
        ))} */}
      </div>
    </div>
  )
}

export default Wordle
