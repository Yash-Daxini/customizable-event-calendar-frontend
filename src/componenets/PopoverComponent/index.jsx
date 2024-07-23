import { OverlayTrigger } from 'react-bootstrap';
import Popover from 'react-bootstrap/Popover';
import styles from './style.module.css'

const PopoverComponent = ({ placement, displayValue, className, body }) => {
    const PopOver = (
        <Popover id="popover-contained" className={styles.popOverDiv}>
            <Popover.Header as="h3">Calendar</Popover.Header>
            <Popover.Body>
                {body}
            </Popover.Body>
        </Popover>
    )

    return (
        <div>
            <OverlayTrigger
                trigger={'click'}
                placement={placement}
                containerPadding={20}
                overlay={PopOver}
                rootClose
            >
                <div className={className}><span>{displayValue}</span></div>
            </OverlayTrigger>
        </div>
    );
}

export default PopoverComponent;