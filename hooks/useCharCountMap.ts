import { useMemo } from 'react'

export function useCharCountMap(puzzleWord: string) {
  return useMemo(() => {
    return puzzleWord.split('').reduce<Record<string, number>>((acc, char) => {
      if (!acc.hasOwnProperty(char)) {
        acc[char] = 1
      } else {
        acc[char] += 1
      }
      return acc
    }, {})
  }, [puzzleWord])
}