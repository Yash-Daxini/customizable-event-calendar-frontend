import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { CalendarArrowUp } from "lucide-react";
import { useAuth } from "../../hooks/AuthProvider";
import {
  formatDate,
  getMonthName,
  getShorterDayName,
} from "../../util/dateUtil";
import { isHourOverlaps, convertTo12HourFormat } from "../../util/timeUtil";
import { fetchApi } from "../../util/fetchApi";

const TimelineView = ({ date, currentDuration }) => {
  const [eventList, setEventList] = useState([]);

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

  let skipDuration;

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

    if (
      !(
        skipDuration &&
        isHourOverlaps(skipDuration.startHour, skipDuration.endHour, hour.value)
      )
    ) {
      const currentHourDivClass = isSelectedHour ? styles.filledCurrent : "";
      let heightOfDiv = 50;
      let overlapDivHeight = 0;
      let currentStartHour = convertTo12HourFormat(currentDuration.startHour);
      let currentEndHour = convertTo12HourFormat(currentDuration.endHour);
      if (event) {
        let startHour = Math.max(event.duration.startHour);
        let endHour = event.duration.endHour;
        heightOfDiv = (endHour - startHour) * heightOfDiv;
        skipDuration = event.duration;
        overlapDivHeight =
          (event.duration.endHour - event.duration.startHour) * 50;
      }

      return !event ? (
        <div key={hour.value} className={`${styles.hourDiv}`}>
          <div className={`${styles.hourValue}`}>{hour.label}</div>
          <div className={`${styles.colorDiv} ${currentHourDivClass}`}></div>
        </div>
      ) : (
        <div key={hour.value} className={`${styles.hourDiv}`}>
          <div className={`${styles.hourValue}`}>{hour.label}</div>
          <div
            style={{ height: `${heightOfDiv}px` }}
            className={`${styles.colorDiv} ${styles.filled}`}
          >
            {event.title}
          </div>
          {isSelectedDurationOverlap ? (
            <div
              style={{ height: `${overlapDivHeight}px` }}
              className={`${styles.colorDiv} ${styles.overlapFilled}`}
            >
              <span>{currentStartHour} to {currentEndHour}</span>
            </div>
          ) : (
            <></>
          )}
        </div>
      );
    } else
      return (
        <div key={hour.value} className={`${styles.hourDiv}`}>
          <div className={`${styles.hourValue}`}>{hour.label}</div>
          <div className={`${styles.colorDiv}`}></div>
        </div>
      );
  });

  return (
    <div className={`${styles.timelineDiv}`}>
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
