// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


const wordsDb = ['proxy','space','table','games']
const getIndexFromDate = () => 0 // TODO

type Data = {
  word: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ word: wordsDb[getIndexFromDate()] })
}
