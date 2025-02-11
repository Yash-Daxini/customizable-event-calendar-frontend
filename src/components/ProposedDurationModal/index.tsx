import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import styles from './style.module.css'
import { Send } from 'lucide-react';
import { Duration } from '../../models/Duration';
import HourDropdown from '../HourDropdown';

interface ProposedDurationModalProps {
  sentMayBeResponse: (proposedDuration: Duration | null) => void,
  isShowModal: boolean,
  setIsShowModal: (isShowModal: boolean) => void
}

const ProposedDurationModal: React.FC<ProposedDurationModalProps> = ({ sentMayBeResponse, isShowModal, setIsShowModal }: ProposedDurationModalProps) => {

  const [proposedDuration, setProposedDuration] = useState<Duration>({
    startHour: 0,
    endHour: 1
  })

  const [isWantToProposeTime, setIsWantToProposeTime] = useState<boolean>(false)

  return (
    <Modal
      show={isShowModal}
      backdrop="static"
      id="proposedDurationModal"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={`${styles.checkboxDiv}`}>
          <strong>What to proposed time ?</strong>
          <input type="checkbox" className={`${styles.checkbox}`} checked={isWantToProposeTime} onChange={(e) => {
            if (e.target.checked) {
              setIsWantToProposeTime(true);
            }
            else {
              setIsWantToProposeTime(false);
            }
          }} />
        </div>
        <div className={`${styles.proposedDurationInputDiv}`}>
          {isWantToProposeTime &&
            <>
              <div>
                <div className={`${styles.label}`}>Start Hour</div>
                <HourDropdown
                  onHourChange={(e) => setProposedDuration({ ...proposedDuration, startHour: e })}
                  initialValue={proposedDuration.startHour}
                />
              </div>
              <div>
                <div className={`${styles.label}`}>End Hour</div>
                <HourDropdown
                  onHourChange={(e) => setProposedDuration({ ...proposedDuration, endHour: e })}
                  initialValue={proposedDuration.endHour} />
              </div>
            </>
          }
        </div>
        <div className={`${styles.proposedDurationPopoverButtonDiv}`}>
          <button className={`${styles.actionBtn}`} onClick={() => {
            sentMayBeResponse(isWantToProposeTime ? proposedDuration : null)
          }}>
            <span className={`${styles.icon} ${styles.sentResponseIcon}`}>
              <Send size={20} strokeWidth={1} />
            </span>
            Sent Response
          </button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ProposedDurationModal
