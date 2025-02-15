import React, { useContext } from 'react'
import styles from './style.module.css';
import DateWrapper from '../../util/DateUtil';
import { EventResponse } from '../../models/EventResponse';
import { Frequency } from '../../enums/Frequency';
import { Repeat } from 'lucide-react';
import PopoverComponent from '../PopoverComponent';
import EventPopOverBody from '../EventPopOverBody';
import { CalendarContext, CalendarContextType } from '../../hooks/context';
import { convertTo12HourFormat } from '../../util/TimeUtil';

const EventInfo: React.FC = () => {
    const calendarContext: CalendarContextType | null = useContext(CalendarContext);

    if (!calendarContext)
        return;

    const events: EventResponse[] = calendarContext.events;
    const date: DateWrapper = calendarContext.date;
    const setEvents: (event: EventResponse[]) => void = calendarContext.setEvents;

    const isRecurringEvent = (event: EventResponse): boolean => {
        return event.recurrencePattern.frequency !== Frequency.None;
    }

    const updateEventStateOnDelete = (eventId: number): void => {
        setEvents(events.filter((eventObj: EventResponse) => eventObj.id !== eventId));
    };

    const getEventForGivenDate = (date: DateWrapper): EventResponse[] => {
        return events.filter((e: EventResponse) =>
            e.occurrences.some((eventDate: DateWrapper) => eventDate.isEqualDates(date))
        );
    };

    let eventsJSXForGivenDay: any = getEventForGivenDate(date).map((e: EventResponse) => {
        return (
            <PopoverComponent
                placement={"left"}
                key={e.id}
                displayValue={e.title}
                className={`${styles.eventBar}`}
                body={
                    <EventPopOverBody
                        onDelete={updateEventStateOnDelete}
                        event={e}
                        eventDate={date.formatDate()} />
                }
                icon={isRecurringEvent(e) && <Repeat size={12} />}
                overlayBody={
                    <div key={e.id} className={`${styles.eventInfoBar}`}>
                        <div className={`${styles.eventBarBodyDiv}`}>
                            <div className={`${styles.title}`}>{e.title}</div>
                            <div className={`${styles.duration}`}>{convertTo12HourFormat(e.duration.startHour)} - {convertTo12HourFormat(e.duration.endHour)}</div>
                        </div>
                        {isRecurringEvent(e) && <Repeat size={18} />}
                    </div>}
            />
        )
    });

    return (
        <>
            <div className={`${styles.dateInfo}`} >
                <span>{date.getWeekDayName()},
                    &nbsp;{date.getFullMonthName()} {date.getDate()}</span>
            </div>
            <hr />
            <div className={`${styles.eventInfo}`}>
                {eventsJSXForGivenDay}
            </div>
        </>
    )
}

export default EventInfo