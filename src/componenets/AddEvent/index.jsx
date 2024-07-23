import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import DateTimeInput from '../DateTimeInput'
import FrequencyDropdown from '../FrequencyDropdown'
import { useAuth } from '../../hooks/AuthProvider';
import { Captions, MapPin, NotebookTabs, Clock3 } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import TimelineView from '../TimelineView';
import RecurrencePatternInput from '../RecurrencePatternInput';
import { useLocation, useNavigate } from 'react-router-dom';

const AddEvent = () => {

    const navigate = useNavigate();

    const location = useLocation();
    let { event } = location.state || {};
    let { date } = location.state || {};

    const isUpdate = event !== undefined;

    let auth = useAuth();

    const [selectedDate, setSelectedDate] = useState(date)
    const [eventObj, setEventObj] = useState(isUpdate
        ? event
        : {
            title: '',
            location: '',
            description: '',
            duration: {
                startHour: 0,
                endHour: 0,
            },
            recurrencePattern: {
                frequency: 'None',
                startDate: selectedDate.toISOString().split("T")[0],
            },
            eventDate: selectedDate.toISOString().split("T")[0],
            eventCollaborators: [
                {
                    userId: auth.user.id,
                    eventCollaboratorRole: "Organizer",
                    confirmationStatus: "Accept"
                }
            ],
        })


    useEffect(() => {
        if (isUpdate) {
            setEventObj({
                ...eventObj, eventDate: date.toISOString().split("T")[0], eventCollaborators: [
                    {
                        userId: auth.user.id,
                        eventCollaboratorRole: "Organizer",
                        confirmationStatus: "Accept"
                    }]
            })
        }
    }, [])

    let handleClick = () => {

        if (eventObj.recurrencePattern.frequency !== 'None')
            delete eventObj.eventDate;


        let addApi = eventObj.recurrencePattern.frequency === 'None'
            ? `api/users/${auth.user.id}/events`
            : `api/users/${auth.user.id}/events/recurring-events`;

        let method = isUpdate ? 'PUT' : 'POST';

        addApi += isUpdate ? `/${eventObj.id}` : ``;


        console.warn(eventObj)

        fetch(`https://localhost:7149/${addApi}`, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${auth.user.token}`,
            },
            body: JSON.stringify(eventObj)
        })
            .then(res => {
                console.warn(res)
                if (res.status === 400) {
                    toast.error(`Invalid Input !`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
                else if (res.status === 201) {
                    toast.success('Successfully Added Event !', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                    navigate("/getEvents");
                }
                return res.json()
            })
            .then((res) => {
                console.warn(res)
            })
            .catch((err) => {
                console.warn(err)
                toast.error(`${err}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });
    }

    return (
        <div className={`${styles.eventAddDiv}`}>
            <ToastContainer />
            <div className={`${styles.addDiv}`}>
                <div className={`${styles.inputDiv}`}>
                    <Captions />
                    <input
                        className={`${styles.stringInput}`}
                        value={`${eventObj.title}`}
                        type='text'
                        placeholder='Add a title'
                        onChange={(e) => setEventObj({ ...eventObj, title: e.target.value })}
                    />
                </div>
                <div className={`${styles.inputDiv}`}>
                    <MapPin />
                    <input
                        className={`${styles.stringInput}`}
                        value={`${eventObj.location}`}
                        type='text'
                        placeholder='Add a location'
                        onChange={(e) => setEventObj({ ...eventObj, location: e.target.value })}
                    />
                </div>
                <div className={`${styles.inputDiv}`}>
                    <NotebookTabs />
                    <textarea
                        className={`${styles.textarea}`}
                        value={eventObj.description}
                        type='textarea'
                        rows={4}
                        placeholder='Add a description'
                        onChange={(e) => setEventObj({ ...eventObj, description: e.target.value })}
                    />
                </div>

                <div className={`${styles.inputDiv}`}>
                    <Clock3 />
                    <div className={`${styles.dateTimeInputDiv}`}>
                        <div>
                            {eventObj.recurrencePattern.frequency === 'None' ?
                                <DateTimeInput
                                    onDateChange={(e) => {
                                        setEventObj({ ...eventObj, eventDate: e.target.value })
                                        setSelectedDate(new Date(e.target.value));
                                    }}
                                    onHourChange={(e) => setEventObj({ ...eventObj, duration: { ...eventObj.duration, startHour: e } })}
                                    isDateDisable={false}
                                    initialDateValue={!eventObj.eventDate ? selectedDate : new Date(eventObj.eventDate)}
                                    initialHourValue={eventObj.duration.startHour}
                                />
                                :
                                <DateTimeInput
                                    onDateChange={(e) => {
                                        setEventObj({ ...eventObj, recurrencePattern: { ...eventObj.recurrencePattern, startDate: e.target.value } })
                                        setSelectedDate(new Date(e.target.value));
                                    }}
                                    onHourChange={(e) => setEventObj({ ...eventObj, duration: { ...eventObj.duration, startHour: e } })}
                                    isDateDisable={false}
                                    initialDateValue={!eventObj.recurrencePattern.startDate ? selectedDate : new Date(eventObj.recurrencePattern.startDate)}
                                    initialHourValue={eventObj.duration.startHour}
                                />
                            }
                        </div>
                        <div className={`${styles.dateTimeFrequencyDiv}`}>
                            <DateTimeInput
                                onDateChange={(e) => {
                                    setEventObj({ ...eventObj, recurrencePattern: { ...eventObj.recurrencePattern, endDate: e.target.value } })
                                }}
                                onHourChange={(e) => setEventObj({ ...eventObj, duration: { ...eventObj.duration, endHour: e } })}
                                isDateDisable={eventObj.recurrencePattern.frequency === 'None'}
                                initialDateValue={!eventObj.recurrencePattern.endDate ? selectedDate : new Date(eventObj.recurrencePattern.endDate)}
                                initialHourValue={eventObj.duration.endHour}
                            />
                            <FrequencyDropdown initialValue={eventObj.recurrencePattern.frequency} onChange={(e) => setEventObj({ ...eventObj, recurrencePattern: { ...eventObj.recurrencePattern, frequency: e } })} />
                        </div>

                        <RecurrencePatternInput eventObj={eventObj} date={selectedDate} updateEvent={setEventObj} />

                    </div>
                </div>

                <div className={`${styles.addBtnDiv}`}>
                    <button className={`${styles.addEventBtn}`} onClick={() => handleClick()}>{isUpdate ? "Update" : "Add"}</button>
                </div>

            </div>
            <TimelineView date={selectedDate} />
        </div>
    )
}

export default AddEvent