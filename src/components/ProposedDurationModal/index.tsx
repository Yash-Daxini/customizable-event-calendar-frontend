import React, { useState } from 'react'
import styles from './style.module.css'
import { Send } from 'lucide-react';
import { Duration } from '../../models/Duration';
import HourDropdown from '../HourDropdown';
import { useModal } from '../../hooks/ModalProvider';

interface ProposedDurationModalProps {
  sentMayBeResponse: (proposedDuration: Duration | null) => void
}

const ProposedDurationModal: React.FC<ProposedDurationModalProps> = ({ sentMayBeResponse }: ProposedDurationModalProps) => {

  const modal = useModal();

  const [proposedDuration, setProposedDuration] = useState<Duration>({
    startHour: 0,
    endHour: 1
  })

  const [isWantToProposeTime, setIsWantToProposeTime] = useState<boolean>(false)

  return (
    <>
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
          modal.hideModal();
        }}>
          <span className={`${styles.icon} ${styles.sentResponseIcon}`}>
            <Send size={20} strokeWidth={1} />
          </span>
          Sent Response
        </button>
      </div>
    </>
  )
}

export default ProposedDurationModal
