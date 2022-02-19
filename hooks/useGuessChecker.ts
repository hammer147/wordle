export function useGuessChecker(submittedGuess: string[], puzzleWord: string, puzzleWordCharCount: Record<string, number>) {
  const charMap = { ...puzzleWordCharCount }

  // remove the correct characters from the charMap
  submittedGuess.forEach((guessChar, i) => {
    const isCorrect = guessChar === puzzleWord[i]
    if (isCorrect) {
      charMap[guessChar] -= 1
    }
  })

  const checkedGuess = submittedGuess.map(
    (guessChar, i): { status: 'correct' | 'incorrect' | 'present', guessChar: string } => {
      const isCorrect = guessChar === puzzleWord[i]
      let isPresent = false
      // charMap only holds chars that are present but not in the right position
      if (!isCorrect && !!charMap[guessChar]) {
        isPresent = true
        charMap[guessChar] -= 1
      }
      return {
        status: isCorrect ? 'correct' : isPresent ? 'present' : 'incorrect',
        guessChar
      }
    })

  return checkedGuess
}
