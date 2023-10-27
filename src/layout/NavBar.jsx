import { Link } from "react-router-dom";
import styles from './NavBar.module.css'
export function NavBar () {
    return (
        
        <nav className={styles.navbar}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link to="/">Home</Link>
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link to="concluido">Concluido</Link>
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link to="tarefas">Tarefas</Link>
                </li>
            </ul>
        </nav>
        
    )
}