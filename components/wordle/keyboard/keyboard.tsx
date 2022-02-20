import { memo } from 'react'
import styles from './keyboard.module.css'

const Keyboard = () => {

  const top = 'qwertyuiop'.split('').map(char => (
    <span className={styles.key} key={char}>{char}</span>
  ))
  const middle = 'asdfghjkl'.split('').map(char => (
    <span className={styles.key} key={char}>{char}</span>
  ))
  const bottom = 'zxcvbnm'.split('').map(char => (
    <span className={styles.key} key={char}>{char}</span>
  ))

  console.log('keyboard renders')

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>{top}</div>
      <div className={styles.row}>{middle}</div>
      <div className={styles.row}>{bottom}</div>
    </div>
  )
}

export default memo(Keyboard)
