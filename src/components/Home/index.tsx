import React from 'react'
import styles from './style.module.css';
import { Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_URL, SIGNUP_URL } from '../../constants/RouteConstants';

const Home: React.FC = () => {

    const navigate = useNavigate();

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
                    <button className={`${styles.actionButton} ${styles.loginButton}`}
                        onClick={() => navigate(LOGIN_URL)}>Sign in</button>
                    <button className={`${styles.actionButton} ${styles.signUpButton}`} onClick={() => navigate(SIGNUP_URL)}>Get started</button>
                </div>
            </div>
            <div className={`${styles.body}`}>
                <div className={`${styles.bodyContentDiv}`}>
                    <div className={`d-flex flex-column`}>
                        <div className={`${styles.titleDiv}`}>
                            The better way to schedule your events
                        </div>
                        <div>
                            A fully customizable scheduling software for individuals, businesses taking calls and developers building scheduling platforms where users meet users.
                        </div>
                    </div>
                    <div className={`d-flex flex-column`}>
                        <div className={`border-1 border-dark`}></div>
                        <div className={``}></div>
                    </div>
                </div>
                <div className={`d-flex justify-content-center align-items-center gap-3`}>
                    <div className={`${styles.bodyContentDiv} m-5`}></div>
                    <div className={`${styles.bodyContentDiv} m-5`}></div>
                    <div className={`${styles.bodyContentDiv} m-5`}></div>
                </div>

                <h3 className='text-center'>Features</h3>
                <div className={`d-flex justify-content-center align-items-center gap-3 flex-wrap`}>
                    <div className={`${styles.bodyContentDiv} m-5`}></div>
                    <div className={`${styles.bodyContentDiv} m-5`}></div>
                    <div className={`${styles.bodyContentDiv} m-5`}></div>
                    <div className={`${styles.bodyContentDiv} m-5`}></div>
                    <div className={`${styles.bodyContentDiv} m-5`}></div>
                    <div className={`${styles.bodyContentDiv} m-5`}></div>
                </div>
            </div>
        </div>
    )
}
export default Home