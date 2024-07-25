import { useContext } from 'react';
import { formatDate, getMonthName } from '../../util/dateUtil.js';
import CalendarDay from '../CalendarDay/index.jsx';
import styles from './style.module.css'
import { CalendarContext } from '../../hooks/context.jsx';

const Calendar = ({ isFullSizeCalendar, setIsFullSizeCalendar }) => {

    const { events } = useContext(CalendarContext);
    const { date } = useContext(CalendarContext);
    const { setCurrentDate } = useContext(CalendarContext);
    const { setEvents } = useContext(CalendarContext);

    const currentDate = date;

    const updateEventStateOnDelete = (eventId) => {
        setEvents(events.filter((eventObj) => eventObj.id !== eventId));
    }

    const renderCalendar = () => {
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

        const days = [];

        let column = 0;

        for (let i = 0; i < firstDay; i++) {
            days.push(<CalendarDay key={i} isEmptyDay={true} />);
            column++;
        }

        for (let day = 1; day <= daysInMonth; day++) {
            days.push(<CalendarDay key={day} column={column} isEmptyDay={false} day={day} updateEventStateOnDelete={updateEventStateOnDelete} />)
            column = (column + 1) % 7;
        }

        return days;
    };

    const prevMonth = () => {
        let newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setCurrentDate(newDate);
    };

    const nextMonth = () => {
        let newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setCurrentDate(newDate);
    };

    return (
        <div className={`${styles.calendar} ${isFullSizeCalendar ? styles.width100Percent : styles.width80Percent}`}>
            <div className={`${styles.calendarHeader}`}>
                <div className={`${styles.todayBtn}`} onClick={() => {
                    setCurrentDate(new Date())
                }}>Today</div>
                <div className={`${styles.prev}`} onClick={prevMonth}>&#10094;</div>
                <div className={`${styles.next}`} onClick={nextMonth}>&#10095;</div>
                <div className={`${styles.month - name}`}>{`${getMonthName(currentDate)} ${currentDate.getFullYear()}`}</div>
                <input type="date" id={`${styles.date}`} value={formatDate(currentDate)} required onChange={(e) => setCurrentDate(new Date(e.target.value))} />
            </div>
            <div className={`${styles.weekdays}`}>
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
            </div>
            <div className={`${styles.days}`}>
                {renderCalendar()}
            </div>
            <div className={`${styles.calendarFooter}`} onClick={() => setIsFullSizeCalendar(!isFullSizeCalendar)}>
                <ion-icon name="expand-outline"></ion-icon>
            </div>
        </div>
    )
}

export default Calendar