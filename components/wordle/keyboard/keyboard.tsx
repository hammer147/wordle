import { memo } from 'react'
import styles from './keyboard.module.css'

type KeyboardProps = {
  handleKeyInput: (key: string) => void
}

const Keyboard = ({ handleKeyInput }: KeyboardProps) => {

  const top = 'q w e r t y u i o p'.split(' ').map(item => (
    <Key key={item} keyDisplay={item} handleKeyInput={handleKeyInput} />
  ))
  const middle = 'a s d f g h j k l'.split(' ').map(item => (
    <Key key={item} keyDisplay={item} handleKeyInput={handleKeyInput} />
  ))
  const bottom = 'Enter z x c v b n m Back'.split(' ').map(item => (
    <Key key={item} keyDisplay={item} handleKeyInput={handleKeyInput} />
  ))

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>{top}</div>
      <div className={styles.row}>{middle}</div>
      <div className={styles.row}>{bottom}</div>
    </div>
  )
}

type KeyProps = {
  keyDisplay: string,
  handleKeyInput: (key: string) => void
}

const Key = ({ keyDisplay, handleKeyInput }: KeyProps) => {
  let key: string // the value we would get from a real keyboard event
  if (keyDisplay === 'Back') {
    key = 'Backspace'
  } else {
    key = keyDisplay
  }

  return (
    <span
      className={`${styles.key} ${keyDisplay.length > 1 ? styles.small : ''}`}
      onClick={() => handleKeyInput(key)}
    >
      {keyDisplay}
    </span>
  )
}

export default memo(Keyboard)
