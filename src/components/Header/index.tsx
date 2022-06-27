import logoImg from '../../assets/logo.svg'

import styles from './styles.module.css'

export const Header = () => {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={logoImg} alt="" />
    </header>
  )
}