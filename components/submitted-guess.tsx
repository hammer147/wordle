import styles from './wordle.module.css'

type Props = {
  submittedGuess: string[]
  puzzleWord: string
  puzzleWordCharCount: Record<string, number>
}

const SubmittedGuess = ({ submittedGuess, puzzleWord, puzzleWordCharCount }: Props) => {

  // clone because we don't want to mutate props
  // remove the correct characters from the charMap
  const charMap = {...puzzleWordCharCount}
  submittedGuess.forEach((guessChar,i) => {
    const isCorrect =  guessChar === puzzleWord[i]
    if (isCorrect) {
      charMap[guessChar] -= 1
    }
  })

  return (
    <div className={`${styles.word} ${styles.submittedGuess}`}>

      {submittedGuess.map((guessChar, i) => {
        const isCorrect = guessChar === puzzleWord[i]

        let isPresent = false
        // charMap only holds chars that are present but not in the right position
        if (!isCorrect && !!charMap[guessChar]) {
          isPresent = true
          charMap[guessChar] -= 1
        }

        return (
          <span
            key={i}
            className={`${styles.char} ${styles.guessedChar} ${isCorrect ? styles.correctChar : ''} ${isPresent ? styles.presentChar: ''}`}
          >
            {guessChar}
          </span>
        )
      })}

    </div>
  )
}

export default SubmittedGuess
