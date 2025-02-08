import React, { useState } from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap';
import styles from './style.module.css'
import { Send } from 'lucide-react';
import { Duration } from '../../models/Duration';
import HourDropdown from '../HourDropdown';

interface ProposedDurationPopoverProps {
  sentMayBeResponse: (proposedDuration: Duration | null) => void,
  overlapBody: any
}

const ProposedDurationPopover: React.FC<ProposedDurationPopoverProps> = ({ sentMayBeResponse, overlapBody }: ProposedDurationPopoverProps) => {

  const [proposedDuration, setProposedDuration] = useState<Duration>({
    startHour: 0,
    endHour: 1
  })

  const [isWantToProposeTime, setIsWantToProposeTime] = useState<boolean>(false)

  const proposedDurationPopover = (
    <Popover id="popover-basic" className={`${styles.proposedDurationPopover}`}>
      <Popover.Header id={`${styles.proposedDurationPopoverHeader}`} as="h3" onMouseDown={(e) => e.stopPropagation()}></Popover.Header>
      <Popover.Body>
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
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger="click"
      placement="right"
      rootClose={true}
      overlay={proposedDurationPopover}
    >
      {overlapBody}
    </OverlayTrigger>
  )
}

export default ProposedDurationPopover
