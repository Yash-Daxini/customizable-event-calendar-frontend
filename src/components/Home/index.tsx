import React from 'react'
import styles from './style.module.css';
import { Calendar } from 'lucide-react';

const Home: React.FC = () => {
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.header}`}>
                <div className={`${styles.headerTitle}`}>
                    <span className={`${styles.icon}`}>
                        <Calendar />
                    </span>
                    <span className={`${styles.title}`}>Event Calendar</span>
                </div>
                <div className={`${styles.actionSection}`}>
                    <button className={`${styles.actionButton} ${styles.loginButton}`}>Sign in</button>
                    <button className={`${styles.actionButton} ${styles.signUpButton}`}>Get started</button>
                </div>
            </div>
        </div>
    )
}
export default Home