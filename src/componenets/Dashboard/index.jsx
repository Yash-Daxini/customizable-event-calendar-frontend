import styles from './style.module.css'
import DraggableDiv from '../DraggableDiv';

const Dashboard = () => {
    return (
        <div className={`${styles.dashboardDiv}`}>
            <DraggableDiv bodyOfDiv={"Notifications"} />
            <DraggableDiv bodyOfDiv={"Upcomming Events"} />
        </div>
    )
}

export default Dashboard