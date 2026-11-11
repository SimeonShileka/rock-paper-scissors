import styles from './Header.module.css'

export default function Header({ mode, score }) {
  return (
    <header className={`${styles.header} ${mode === 'normal' ? styles.normal : styles.bonus}`}>
      <img
        src={mode === 'normal' ? '/images/logo.svg' : '/images/logo-bonus.svg'}
        alt="logo"
        className={styles.logo}
      />
      <div className={styles.scoreBox}>
        <span className={styles.scoreLabel}>SCORE</span>
        <span className={styles.scoreValue}>{score}</span>
      </div>
    </header>
  )
}
