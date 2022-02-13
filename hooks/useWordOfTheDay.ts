import { useEffect, useState } from 'react'

type Data = {
  word: string
}

export function useWordOfTheDay () {

  const [word, setWord] = useState('')

  useEffect(() => {
    (async () => {
      const response = await fetch('./api/word')
      if (response.ok) {
        const data = await response.json() as Data
        setWord(data.word)
      }
    })()
  }, [])

  return word // we could return a second value for a possible error
}