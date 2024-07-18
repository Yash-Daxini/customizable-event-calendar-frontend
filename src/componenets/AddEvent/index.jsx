import React, { useState } from 'react'
import styles from './style.module.css'
import DateTimeInput from '../DateTimeInput'
import FrequencyDropdown from '../FrequencyDropdown'
import { useAuth } from '../../hooks/AuthProvider';
import { Captions, MapPin, NotebookTabs, Clock3 } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import TimelineView from '../TimelineView';
import RecurrencePatternInput from '../RecurrencePatternInput';

const AddEvent = () => {

    let auth = useAuth();

    const [selectedDate, setSelectedDate] = useState(new Date())
    const [eventObj, setEventObj] = useState({
        title: '',
        location: '',
        description: '',
        duration: {
            startHour: 0,
            endHour: 0,
        },
        frequency: 'None',
        eventCollaborators: [
            {
                userId: auth.user.id,
                eventCollaboratorRole: "Organizer",
                confirmationStatus: "Accept"
            }
        ],
    })

    let addEvent = () => {
        fetch(`https://localhost:7149/api/users/${auth.user.id}/events`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${auth.user.token}`,
            },
            body: JSON.stringify(eventObj)
        })
            .then(res => res.json())
            .then((res) => {
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
                }
                else if (res.errorMessage !== null) {
                    //Add div to show overlap error
                }
            })
            .catch((err) => {
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
                            {eventObj.frequency === 'None' ?
                                <DateTimeInput
                                    onDateChange={(e) => {
                                        setEventObj({ ...eventObj, eventDate: e.target.value })
                                        setSelectedDate(new Date(e.target.value));
                                    }}
                                    onHourChange={(e) => setEventObj({ ...eventObj, duration: { ...eventObj.duration, startHour: e } })}
                                    isDateDisable={false}
                                />
                                :
                                <DateTimeInput
                                    onDateChange={(e) => {
                                        setEventObj({ ...eventObj, startDate: e.target.value })
                                        setSelectedDate(new Date(e.target.value));
                                    }}
                                    onHourChange={(e) => setEventObj({ ...eventObj, duration: { ...eventObj.duration, startHour: e } })}
                                    isDateDisable={false}
                                />
                            }
                        </div>
                        <div className={`${styles.dateTimeFrequencyDiv}`}>
                            < DateTimeInput
                                onDateChange={(e) => setEventObj({ ...eventObj, endDate: e.target.value })}
                                onHourChange={(e) => setEventObj({ ...eventObj, duration: { ...eventObj.duration, endHour: e } })}
                                isDateDisable={eventObj.frequency === 'None'}
                            />
                            <FrequencyDropdown onChange={(e) => setEventObj({ ...eventObj, frequency: e })} />
                        </div>

                        <RecurrencePatternInput eventObj={eventObj} />

                    </div>
                </div>

                <div className={`${styles.addBtnDiv}`}>
                    <button className={`${styles.addEventBtn}`} onClick={() => addEvent()}>Add</button>
                </div>

            </div>
            <TimelineView date={selectedDate} />
        </div>
    )
}

export default AddEvent