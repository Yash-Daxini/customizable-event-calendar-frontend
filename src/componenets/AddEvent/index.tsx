import { useState } from "react";
import styles from "./style.module.css";
import DateTimeInput from "../DateTimeInput";
import FrequencyDropdown from "../FrequencyDropdown";
import { useAuth } from "../../hooks/AuthProvider";
import { Captions, MapPin, NotebookTabs, Clock3, UserPlus } from "lucide-react";
import { ToastContainer } from "react-toastify";
import TimelineView from "../TimelineView";
import RecurrencePatternInput from "../RecurrencePatternInput";
import { useLocation, useNavigate } from "react-router-dom";
import { showErrorToaster, showSuccessToaster } from "../../util/toaster";
import { GET_EVENTS_URL } from "../../constants/RouteConstants";
import { APIService } from "../../services/APIService";

const AddEvent: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();
  let { event } = location.state || {};
  let { date } = location.state || {};

  const isUpdate = event !== undefined;

  let auth = useAuth();

  const [selectedDate, setSelectedDate] = useState<Date>(date);
  const [eventObj, setEventObj] = useState(
    isUpdate
      ? {
        ...event,
        eventDate: date.toISOString().split("T")[0],
        eventCollaborators: [
          {
            userId: auth!.user.id,
            eventCollaboratorRole: "Organizer",
            confirmationStatus: "Accept",
          },
        ],
      }
      : {
        title: "",
        location: "",
        description: "",
        duration: {
          startHour: 0,
          endHour: 0,
        },
        recurrencePattern: {
          frequency: "None",
          startDate: selectedDate.toISOString().split("T")[0],
        },
        eventDate: selectedDate.toISOString().split("T")[0],
        eventCollaborators: [
          {
            userId: auth!.user.id,
            eventCollaboratorRole: "Organizer",
            confirmationStatus: "Accept",
          },
        ],
      },
  );

  const getApiEndPoint = () =>
    isRecurringEvent()
      ? `/users/${auth!.user.id}/events/recurring-events`
      : `/users/${auth!.user.id}/events`;

  const isRecurringEvent = () =>
    eventObj.recurrencePattern.frequency !== "None";

  let handleClick = () => {
    if (isRecurringEvent()) delete eventObj.eventDate;

    let endPoint = getApiEndPoint();
    endPoint += isUpdate ? `${eventObj.id}` : ``;

    if (isUpdate)
      updateEvent(endPoint, eventObj);
    else
      insertEvent(endPoint, eventObj);
  };

  const insertEvent = (endpoint: string, event: any) => {
    APIService.post(endpoint, event).then((res) => {
      if (res.statusCode === 400) showErrorToaster("Invalid Input !");
      else if (res.statusCode === 201) {
        navigate(GET_EVENTS_URL);
        setTimeout(() => {
          showSuccessToaster("Event added successfully !");
        }, 50);
      }
    })
      .catch(() => showErrorToaster("Some error occurred !"));
  }

  const updateEvent = (endpoint: string, event: any) => {
    APIService.put(endpoint, event).then((res) => {
      if (res.statusCode === 400) showErrorToaster("Invalid Input !");
      else if (res.statusCode === 201) {
        navigate(GET_EVENTS_URL);
        setTimeout(() => {
          showSuccessToaster("Event updated successfully !");
        }, 50);
      }
    })
      .catch(() => showErrorToaster("Some error occurred !"));
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
            type="text"
            placeholder="Add a title"
            onChange={(e) =>
              setEventObj({ ...eventObj, title: e.target.value })
            }
          />
        </div>
        <div className={`${styles.inputDiv}`}>
          <MapPin />
          <input
            className={`${styles.stringInput}`}
            value={`${eventObj.location}`}
            type="text"
            placeholder="Add a location"
            onChange={(e) =>
              setEventObj({ ...eventObj, location: e.target.value })
            }
          />
        </div>
        <div className={`${styles.inputDiv}`}>
          <NotebookTabs />
          <textarea
            className={`${styles.textarea}`}
            value={eventObj.description}
            typeof={"textarea"}
            rows={4}
            placeholder="Add a description"
            onChange={(e) =>
              setEventObj({ ...eventObj, description: e.target.value })
            }
          />
        </div>

        <div className={`${styles.inputDiv}`}>
          <UserPlus />
          <input
            className={`${styles.stringInput}`}
            type="text"
            placeholder="Add a invitees"
          />
        </div>

        <div className={`${styles.inputDiv}`}>
          <Clock3 />
          <div className={`${styles.dateTimeInputDiv}`}>
            <div>
              {!isRecurringEvent() ? (
                <DateTimeInput
                  onDateChange={(e: any) => {
                    setEventObj({ ...eventObj, eventDate: e.target.value });
                    setSelectedDate(new Date(e.target.value));
                  }}
                  onHourChange={(e: any) =>
                    setEventObj({
                      ...eventObj,
                      duration: { ...eventObj.duration, startHour: e },
                    })
                  }
                  isDateDisable={false}
                  initialDateValue={
                    !eventObj.eventDate
                      ? selectedDate
                      : new Date(eventObj.eventDate)
                  }
                  initialHourValue={eventObj.duration.startHour}
                />
              ) : (
                <DateTimeInput
                  onDateChange={(e: any) => {
                    setEventObj({
                      ...eventObj,
                      recurrencePattern: {
                        ...eventObj.recurrencePattern,
                        startDate: e.target.value,
                      },
                    });
                    setSelectedDate(new Date(e.target.value));
                  }}
                  onHourChange={(e: any) =>
                    setEventObj({
                      ...eventObj,
                      duration: { ...eventObj.duration, startHour: e },
                    })
                  }
                  isDateDisable={false}
                  initialDateValue={
                    !eventObj.recurrencePattern.startDate
                      ? selectedDate
                      : new Date(eventObj.recurrencePattern.startDate)
                  }
                  initialHourValue={eventObj.duration.startHour}
                />
              )}
            </div>
            <div className={`${styles.dateTimeFrequencyDiv}`}>
              <DateTimeInput
                onDateChange={(e: any) => {
                  setEventObj({
                    ...eventObj,
                    recurrencePattern: {
                      ...eventObj.recurrencePattern,
                      endDate: e.target.value,
                    },
                  });
                }}
                onHourChange={(e: any) =>
                  setEventObj({
                    ...eventObj,
                    duration: { ...eventObj.duration, endHour: e },
                  })
                }
                isDateDisable={eventObj.recurrencePattern.frequency === "None"}
                initialDateValue={
                  !eventObj.recurrencePattern.endDate
                    ? selectedDate
                    : new Date(eventObj.recurrencePattern.endDate)
                }
                initialHourValue={eventObj.duration.endHour}
              />
              <FrequencyDropdown
                initialValue={eventObj.recurrencePattern.frequency}
                onChange={(e: any) =>
                  setEventObj({
                    ...eventObj,
                    recurrencePattern: {
                      ...eventObj.recurrencePattern,
                      frequency: e,
                    },
                  })
                }
              />
            </div>

            <RecurrencePatternInput
              eventObj={eventObj}
              date={selectedDate}
              updateEvent={setEventObj}
            />
          </div>
        </div>

        <div className={`${styles.addBtnDiv}`}>
          <button
            className={`${styles.addEventBtn}`}
            onClick={() => handleClick()}
          >
            {isUpdate ? "Update" : "Add"}
          </button>
        </div>
      </div>
      <TimelineView date={selectedDate} currentDuration={eventObj.duration} />
    </div>
  );
};

export default AddEvent;
