import { useEffect, useState, useRef } from "react";
import styles from "./style.module.css";
import { CalendarArrowUp } from "lucide-react";
import { useAuth } from "../../hooks/AuthProvider";
import {
  formatDate,
  getMonthName,
  getShorterDayName,
} from "../../util/dateUtil";
import { isHourOverlaps } from "../../util/timeUtil";
import { fetchApi } from "../../util/fetchApi";

const TimelineView = ({ date, currentDuration }) => {

  const [eventList, setEventList] = useState([]);

  if (!currentDuration) currentDuration = { startHour: 0, endHour: 1 };

  let [currentDate, setCurrentDate] = useState(date);
  useEffect(() => {
    setCurrentDate(date);
  }, [date]);

  const auth = useAuth();

  useEffect(() => {
    let apiEndPoint = `/api/users/${auth.user.id}/events/eventsBetweenDates?startDate=${formatDate(currentDate)}&endDate=${formatDate(currentDate)}`;

    fetchApi(apiEndPoint, auth.user.token)
      .then((res) => setEventList(res.data))
      .catch((err) => console.warn(err));
  }, [currentDate, date]);

  const hours = [];

  hours.push({ value: 0, label: `12:00 AM` });

  for (let i = 1; i < 12; i++) {
    const hour = i < 10 ? `0${i}:00 AM` : `${i}:00 AM`;
    hours.push({ value: i, label: hour });
  }

  hours.push({ value: 12, label: `12:00 PM` });

  for (let i = 1; i <= 11; i++) {
    const hour = i < 10 ? `0${i}:00 PM` : `${i}:00 PM`;
    hours.push({ value: parseInt(i + 12), label: hour });
  }

  let timelineDivContent = hours.map((hour) => {
    const event = eventList.find((event) =>
      isHourOverlaps(
        event.duration.startHour,
        event.duration.endHour,
        hour.value,
      ),
    );

    const isSelectedHour = isHourOverlaps(
      currentDuration.startHour,
      currentDuration.endHour,
      hour.value,
    );

    const isSelectedDurationOverlap = event && isSelectedHour;

    const classNameForFilled = isSelectedDurationOverlap
      ? styles.overlapFilled
      : styles.filled;

    const currentHourDivClass = isSelectedHour ? styles.filledCurrent : "";

    if (isSelectedHour)
      return (
        <div key={hour.value} className={`${styles.hourDiv}`}>
          <div className={`${styles.hourValue}`}>{hour.label}</div>
          <div
            className={`${styles.colorDiv} ${currentHourDivClass}`}
          ></div>
        </div>
      );

    return !event ? (
      <div key={hour.value} className={`${styles.hourDiv}`}>
        <div className={`${styles.hourValue}`}>{hour.label}</div>
        <div className={`${styles.colorDiv} ${currentHourDivClass}`}></div>
      </div>
    ) : (
      <div key={hour.value} className={`${styles.hourDiv}`}>
        <div className={`${styles.hourValue}`}>{hour.label}</div>
        <div className={`${styles.colorDiv} ${classNameForFilled}`}>
          {event.title}
        </div>
      </div>
    );
  });

  return (
    <div
      className={`${styles.timelineDiv}`}
    >
      <div className={`${styles.header}`}>
        <div className={`${styles.control}`}>
          <div
            className={`${styles.prev}`}
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setDate(newDate.getDate() - 1);
              setCurrentDate(newDate);
            }}
          >
            &#10094;
          </div>
          <div
            className={`${styles.todayBtn}`}
            onClick={() => {
              setCurrentDate(new Date());
            }}
          >
            <CalendarArrowUp />
          </div>
          <div
            className={`${styles.next}`}
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setDate(newDate.getDate() + 1);
              setCurrentDate(newDate);
            }}
          >
            &#10095;
          </div>
        </div>
        <div
          className={`${styles.monthName}`}
        >{`${getShorterDayName(currentDate)}, 
           ${getMonthName(currentDate)} ${currentDate.getDate()}, 
           ${currentDate.getFullYear()}`}</div>
      </div>
      <div className={`${styles.timelineBody}`}>{timelineDivContent}</div>
    </div>
  );
};

export default TimelineView;
