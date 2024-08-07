import { useEffect, useState, useRef } from "react";
import styles from "./style.module.css";
import { CalendarArrowUp } from "lucide-react";
import { useAuth } from "../../hooks/AuthProvider";
import { formatDate } from "../../util/dateUtil";
import { isHourOverlaps } from "../../util/timeUtil";

const monthNames = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const TimelineView = ({ date, currentDuration }) => {
  const [eventList, setEventList] = useState([]);

  let [currentDate, setCurrentDate] = useState(date);
  const [height, setHeight] = useState(150);
  const [top, setTop] = useState(0);
  const [isResizingTop, setIsResizingTop] = useState(false);
  const [isResizingBottom, setIsResizingBottom] = useState(false);
  const ref = useRef();

  const startResizeTop = (e) => {
    setIsResizingTop(true);
    e.target.addEventListener("mousemove", resize);
    e.target.addEventListener("mouseup", stopResize);
    e.preventDefault();
  };

  const startResizeBottom = (e) => {
    setIsResizingBottom(true);
    e.target.addEventListener("mousemove", resize);
    e.target.addEventListener("mouseup", stopResize);
    e.preventDefault();
  };

  let styleObj = { height: height, backgroundColor: "red" };

  const resize = (e) => {
    console.warn("Called", isResizingTop);
    if (isResizingTop) {
      const newHeight = height + (top - e.clientY);
      const newTop = e.clientY;
      if (newHeight > 50) {
        // Minimum height condition
        setHeight(newHeight);
        setTop(newTop);
      }
      ref.current.style.height = "500px";
      ref.current.style.backgroundColor = "red";
      ref.current.value = "abc";
    }

    if (isResizingBottom) {
      const newHeight = e.clientY - top;
      if (newHeight > 50) {
        // Minimum height condition
        setHeight(newHeight);
      }
    }
  };

  const stopResize = () => {
    setIsResizingTop(false);
    setIsResizingBottom(false);
  };

  useEffect(() => {
    setCurrentDate(date);
  }, [date]);

  const auth = useAuth();

  useEffect(() => {
    fetch(
      `https://localhost:7149/api/users/${auth.user.id}/events/eventsBetweenDates?startDate=${formatDate(currentDate)}&endDate=${formatDate(currentDate)}`,
      {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        setEventList(data);
      })
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

    return !event ? (
      <>
        <div className={styles.handleTop} onMouseDown={startResizeTop}></div>
        <div ref={ref} key={hour.value} className={`${styles.hourDiv}`}>
          <div className={`${styles.hourValue}`}>{hour.label}</div>
          <div className={`${styles.colorDiv} ${currentHourDivClass}`}></div>
        </div>
        <div
          className={styles.handleBottom}
          onMouseDown={startResizeBottom}
        ></div>
      </>
    ) : (
      <>
        <div key={hour.value} className={`${styles.hourDiv}`}>
          <div className={`${styles.hourValue}`}>{hour.label}</div>
          <div className={`${styles.colorDiv} ${classNameForFilled}`}></div>
        </div>
      </>
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
        >{`${currentDate.toString().split(" ")[0]}, ${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`}</div>
      </div>
      <div className={`${styles.timelineBody}`}>{timelineDivContent}</div>
    </div>
  );
};

export default TimelineView;
