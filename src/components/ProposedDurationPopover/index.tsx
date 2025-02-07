import React, { useState } from 'react'
import { FormLabel, OverlayTrigger, Popover } from 'react-bootstrap';
import styles from './style.module.css'
import { Send } from 'lucide-react';
import { Duration } from '../../models/Duration';
import HourDropdown from '../HourDropdown';

interface ProposedDurationPopoverProps {
  sentMayBeResponse: (proposedDuration: Duration) => void,
  overlapBody: any
}

const ProposedDurationPopover: React.FC<ProposedDurationPopoverProps> = ({ sentMayBeResponse, overlapBody }: ProposedDurationPopoverProps) => {

  const [proposedDuration, setProposedDuration] = useState<Duration>({
    startHour: 0,
    endHour: 1
  })

  const proposedDurationPopover = (
    <Popover id="popover-basic" className={`${styles.proposedDurationPopover}`}>
      <Popover.Header id={`${styles.proposedDurationPopoverHeader}`} as="h3" onMouseDown={(e) => e.stopPropagation()}></Popover.Header>
      <Popover.Body>
        <strong>What to proposed time ?</strong>
        <input type='checkbox' className={`${styles.checkbox}`} />
        <div className={`${styles.proposedDurationInputDiv}`}>
          <div>
            <FormLabel>Start Hour</FormLabel>
            <HourDropdown
              onHourChange={(e) => setProposedDuration({ ...proposedDuration, startHour: e })}
              initialValue={proposedDuration.startHour}
            />
          </div>
          <div>
            <FormLabel>End Hour</FormLabel>
            <HourDropdown
              onHourChange={(e) => setProposedDuration({ ...proposedDuration, endHour: e })}
              initialValue={proposedDuration.endHour} />
          </div>
        </div>
        <div className={`${styles.proposedDurationPopoverButtonDiv}`}>
          <button className={`${styles.actionBtn}`} onClick={() => {
            console.warn(proposedDuration)
            // sentMayBeResponse(proposedDuration)
          }}
          >
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
      rootClose={false}
      overlay={proposedDurationPopover}
      container={document.body}
    >
      {overlapBody}
    </OverlayTrigger>
  )
}

export default ProposedDurationPopover
