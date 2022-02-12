import { useEffect, useMemo, useState } from 'react'
import { produce } from 'immer'
import styles from './wordle.module.css'
import EmptyGuess from './empty-guess'
import CurrentGuess from './current-guess'
import SubmittedGuess from './submitted-guess'

const totalGuessMax = 6

type Props = {
  puzzleWord: string
}

const Wordle = ({ puzzleWord }: Props) => {

  if (puzzleWord.length !== 5) {
    throw new Error(`Puzzle word length must be 5 characters. ${puzzleWord} is not valid.`)
  }

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

  const isCorrect = submittedGuesses.length > 0
    && submittedGuesses[submittedGuesses.length - 1].join('') === puzzleWord

  const puzzleWordCharCount = useMemo(() => {
    return puzzleWord.split('').reduce<Record<string, number>>((acc, char) => {
      if (!acc.hasOwnProperty(char)) {
        acc[char] = 1
      } else {
        acc[char] += 1
      }
      return acc
    }, {})
  }, [puzzleWord])

  return (
    <div className={styles.wordle}>

      {submittedGuesses.map((submittedGuess, i) => (
        <SubmittedGuess
          key={i}
          submittedGuess={submittedGuess}
          puzzleWord={puzzleWord}
          puzzleWordCharCount={puzzleWordCharCount}
        />
      ))}

      {!isCorrect && <CurrentGuess guess={guess} />}

      {Array.from({ length: totalGuessMax - submittedGuesses.length - (isCorrect ? 0 : 1) }).map((_, i) => (
        <EmptyGuess key={i} />
      ))}

    </div>
  )
}

export default Wordle
