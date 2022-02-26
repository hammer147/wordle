import { memo } from 'react'
import styles from './keyboard.module.css'

type KeyboardProps = {
  handleKeyInput: (key: string) => void
}

const Keyboard = ({ handleKeyInput }: KeyboardProps) => {

  const top = 'q w e r t y u i o p'.split(' ').map(char => (
    <Key key={char} keyName={char} handleKeyInput={handleKeyInput} />
  ))
  const middle = 'a s d f g h j k l'.split(' ').map(char => (
    <Key key={char} keyName={char} handleKeyInput={handleKeyInput} />
  ))
  const bottom = 'Enter z x c v b n m Back'.split(' ').map(char => (
    <Key key={char} keyName={char} handleKeyInput={handleKeyInput} />
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
  keyName: string,
  handleKeyInput: (key: string) => void
}

const Key = ({ keyName, handleKeyInput }: KeyProps) => (
  <span
    className={`${styles.key} ${keyName.length > 1 ? styles.small : ''}`}
    onClick={() => handleKeyInput(keyName)}
  >
    {keyName}
  </span>
)

export default memo(Keyboard)
