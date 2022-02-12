import styles from './wordle.module.css'

type Props = {
  submittedGuess: string[]
  puzzleWord: string
  puzzleWordCharCount: Record<string, number>
}

const SubmittedGuess = ({ submittedGuess, puzzleWord, puzzleWordCharCount }: Props) => {
  return (
    <div className={`${styles.word} ${styles.submittedGuess}`}>

      {submittedGuess.map((char, i) => {
        const isCorrect = char === puzzleWord[i]
        const isPresent = !isCorrect && !!puzzleWordCharCount[char]
        return (
          <span
            key={i}
            className={`${styles.char} ${isCorrect ? styles.correctChar : ''} ${isPresent ? styles.presentChar: ''}`}
          >
            {char}
          </span>
        )
      })}

    </div>
  )
}

export default SubmittedGuess
