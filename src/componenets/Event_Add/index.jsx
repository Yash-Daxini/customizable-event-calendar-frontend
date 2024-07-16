import React, { useState } from 'react'
import styles from './style.module.css'
import DateTimeInput from '../DateTimeInput'
import FrequencyDropdown from '../FrequencyDropdown'
import { useAuth } from '../../hooks/AuthProvider';
import HourDropdown from '../HourDropdown';
import { ToastContainer, toast } from 'react-toastify';

const EventAdd = () => {

    let auth = useAuth();

    const [eventObj, setEventObj] = useState({
        title: '',
        location: '',
        description: '',
        duration: {
            startHour: '',
            endHour: '',
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
            .then((res) => {
                if (res.status === 400) {
                    // res.body.json().then(x => console.log(x))
                    console.warn(res.json().then(console.log));
                    toast.error('Invalid input !', {
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
                <input
                    className={`${styles.stringInput}`}
                    value={`${eventObj.title}`}
                    type='text'
                    placeholder='Title'
                    onChange={(e) => setEventObj({ ...eventObj, title: e.target.value })}
                />
                <input
                    className={`${styles.stringInput}`}
                    value={`${eventObj.location}`}
                    type='text'
                    placeholder='Location'
                    onChange={(e) => setEventObj({ ...eventObj, location: e.target.value })}
                />
                <textarea
                    className={`${styles.textarea}`}
                    value={eventObj.description}
                    type='textarea'
                    rows={4}
                    placeholder='Description'
                    onChange={(e) => setEventObj({ ...eventObj, description: e.target.value })}
                />

                <div className={`${styles.dateTimeInputDiv}`}>
                    {eventObj.frequency !== 'None'
                        ?
                        <DateTimeInput
                            onDateChange={(e) => setEventObj({ ...eventObj, startDate: e.target.value })}
                            onHourChange={(e) => {

                                setEventObj({ ...eventObj, duration: { ...eventObj.duration, startHour: e } })
                                console.warn(eventObj);
                            }
                            }
                        />
                        :
                        <>
                            <DateTimeInput
                                onDateChange={(e) => setEventObj({ ...eventObj, eventDate: e.target.value })}
                                onHourChange={(e) => setEventObj({ ...eventObj, duration: { ...eventObj.duration, startHour: e } })}
                            />
                            <HourDropdown onChange={(e) => setEventObj({ ...eventObj, duration: { ...eventObj.duration, endHour: e } })} />
                        </>
                    }
                    {eventObj.frequency !== 'None'
                        ?
                        < DateTimeInput
                            onDateChange={(e) => setEventObj({ ...eventObj, endDate: e.target.value })}
                            onHourChange={(e) => setEventObj({ ...eventObj, duration: { ...eventObj.duration, endHour: e } })}
                        />
                        : <></>
                    }
                </div>

                <div className={`${styles.frequencySelectionDiv}`}>
                    <FrequencyDropdown onChange={(e) => setEventObj({ ...eventObj, frequency: e })} />
                </div>

                <button className={`${styles.addEventBtn}`} onClick={() => addEvent()}>Add</button>
            </div>
            <div className={`${styles.timelineDiv}`}>
            </div>
        </div>
    )
}

export default EventAdd