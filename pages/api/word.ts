// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = { word: string }

const wordsDb = ['toxic', 'space', 'table', 'games'] // must always be 5 letters

const millisecondsToDays = (milliseconds: number) => Math.floor(milliseconds / 1000 / 60 / 60 / 24)

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  
  const dayStart = millisecondsToDays(new Date('2022-02-24').valueOf())
  const dayIncomingRequest = millisecondsToDays(new Date().valueOf())
  const daysSinceStart = dayIncomingRequest - dayStart
  const idx = daysSinceStart % wordsDb.length 
  const word = wordsDb[idx]

  res.status(200).json({ word })
}
