import React from 'react'
import styles from './style.module.css';
import { Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_URL, SIGNUP_URL } from '../../constants/RouteConstants';

const Home: React.FC = () => {

    const navigate = useNavigate();

    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.header} ${styles.calendar}`}>
                <div className={`${styles.headerTitle}`}>
                    <span className={`${styles.icon}`}>
                        <Calendar />
                    </span>
                    <span className={`${styles.title}`}>Event Calendar</span>
                </div>
                <div className={`${styles.actionSection}`}>
                    <button className={`${styles.actionButton} ${styles.loginButton}`}
                    onClick={() => navigate(LOGIN_URL)}>Sign in</button>
                    <button className={`${styles.actionButton} ${styles.signUpButton}`}onClick={() => navigate(SIGNUP_URL)}>Get started</button>
                </div>
            </div>
            <div className={`${styles.body}`}>
                <div className={`${styles.calendarSquareDiv}`}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit saepe dolorum ipsa vitae fuga harum, magni nihil reprehenderit, repellat tenetur a magnam ratione dolore aliquam id cupiditate impedit quia. Possimus.
                </div>
            </div>
        </div>
    )
}
export default Home