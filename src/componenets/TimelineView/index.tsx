import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { CalendarArrowUp } from "lucide-react";
import { useAuth } from "../../hooks/AuthProvider";
import {
  formatDate,
  getMonthName,
  getShorterDayName,
} from "../../util/dateUtil";
import {
  isHourOverlaps,
  convertTo12HourFormat,
  isDurationOverlaps,
} from "../../util/timeUtil";
import { fetchApi } from "../../util/fetchApi";
import TimeLineHourDiv from "../TimeLineHourDiv";

interface TimelineViewProps {
  date: Date,
  currentDuration: any
}

const TimelineView: React.FC<TimelineViewProps> = ({ date, currentDuration }: TimelineViewProps) => {
  const [eventList, setEventList] = useState([]);

  let [currentDate, setCurrentDate] = useState<Date>(date);
  useEffect(() => {
    setCurrentDate(date);
  }, [date]);

  const auth = useAuth();

  useEffect(() => {
    let apiEndPoint = `/api/users/${auth!.user.id}/events/eventsBetweenDates?startDate=${formatDate(currentDate.toString())}&endDate=${formatDate(currentDate.toString())}`;

    fetchApi(apiEndPoint, auth!.user.token)
      .then((res) => setEventList(res.data))
      .catch((err) => console.warn(err));
  }, [currentDate, date, auth!.user]);

  const hours = [];

  hours.push({ value: 0, label: `12:00 AM` });

  for (let i = 1; i < 12; i++) {
    const hour = i < 10 ? `0${i}:00 AM` : `${i}:00 AM`;
    hours.push({ value: i, label: hour });
  }

  hours.push({ value: 12, label: `12:00 PM` });

  for (let i = 1; i <= 11; i++) {
    const hour = i < 10 ? `0${i}:00 PM` : `${i}:00 PM`;
    hours.push({ value: i + 12, label: hour });
  }

  let getEventsWithinDuration = (startHour: number, endHour: number) => {
    return eventList.find((event: any) =>
      isDurationOverlaps(
        event.duration.startHour,
        event.duration.endHour,
        startHour,
        endHour,
      ),
    );
  };

  let getEventAtHour = (hour: number) => {
    return eventList.find((event: any) =>
      isHourOverlaps(event.duration.startHour, event.duration.endHour, hour),
    );
  };

  let skipOverlapDuration: any;

  let timelineDivContent = hours.map((hour) => {
    const event: any = getEventAtHour(hour.value);

    const isEventOverlappingCurrentDuration = getEventsWithinDuration(
      currentDuration.startHour,
      currentDuration.endHour,
    );

    const isEventAtHour = isHourOverlaps(
      currentDuration.startHour,
      currentDuration.endHour,
      hour.value,
    );

    const isSelectedDurationOverlap =
      isEventOverlappingCurrentDuration &&
      (!skipOverlapDuration ||
        (skipOverlapDuration &&
          !isHourOverlaps(
            skipOverlapDuration.startHour,
            skipOverlapDuration.endHour,
            hour.value,
          ))) &&
      currentDuration.endHour - currentDuration.startHour > 0 &&
      currentDuration.startHour === hour.value;

    const currentHourDivClass = isEventAtHour ? styles.filledCurrent : "";
    let heightOfDiv = 0;
    let overlapDivHeight = 0;
    let currentStartHour = currentDuration.startHour;
    let currentEndHour = currentDuration.endHour;

    if (event && event.duration.startHour === hour.value) {
      let startHour = event.duration.startHour;
      let endHour = event.duration.endHour;
      heightOfDiv = (endHour - startHour) * 50;
    }

    if (isSelectedDurationOverlap) {
      overlapDivHeight = (currentEndHour - currentStartHour) * 50;
      skipOverlapDuration = currentDuration;
    }

    let styleOfFilledDiv;

    if (heightOfDiv === 0)
      styleOfFilledDiv = {
        border: "0px",
        height: "0px",
      };
    else styleOfFilledDiv = { height: `${heightOfDiv}px` };

    if (isSelectedDurationOverlap)
      //Overlap occur
      return (
        <div key={hour.value} className={`${styles.hourDiv}`}>
          <div className={`${styles.hourValue}`}>{hour.label}</div>
          <div className={`${styles.colorDiv} ${currentHourDivClass}`}></div>
          {event ? (
            <div
              style={styleOfFilledDiv}
              className={`${styles.colorDiv} ${styles.filled}`}
            >
              {event.title}
            </div>
          ) : (
            <></>
          )}
          <div
            style={{ height: `${overlapDivHeight}px` }}
            className={`${styles.colorDiv} ${styles.overlapFilled}`}
          >
            <span>
              {convertTo12HourFormat(currentDuration.startHour)} to
              {" " + convertTo12HourFormat(currentDuration.endHour)}
            </span>
          </div>
        </div>
      );

    if (!event)
      //Event & Overlap not occur
      return (
        <TimeLineHourDiv
          key={hour.value}
          hourValue={hour.value}
          hourLabel={hour.label}
          isFilledCurrent={isEventAtHour} isOverlapping={false} isFilled={false} heightOfDiv={0} divContent={undefined} />
      );

    return (
      //Event occur
      <TimeLineHourDiv
        key={hour.value}
        hourValue={hour.value}
        hourLabel={hour.label}
        isFilled={true}
        heightOfDiv={heightOfDiv}
        divContent={event.title} isOverlapping={false} isFilledCurrent={false} />
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
