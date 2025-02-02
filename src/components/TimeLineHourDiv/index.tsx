import styles from "./style.module.css";

interface TimeLineHourDivProps {
  hourValue: number,
  hourLabel: string,
  isOverlapping: boolean,
  isFilled: boolean,
  isFilledCurrent: boolean,
  heightOfDiv: number,
  divContent: any
}

const TimeLineHourDiv: React.FC<TimeLineHourDivProps> = ({
  hourValue,
  hourLabel,
  isOverlapping,
  isFilled,
  isFilledCurrent,
  heightOfDiv,
  divContent,
}: TimeLineHourDivProps) => {
  let styleOfFilledDiv;

  let classOfDiv: any;

  if (isOverlapping) classOfDiv = styles.overlapFilled;
  else if (isFilled) classOfDiv = styles.filled;
  else if (isFilledCurrent) classOfDiv = styles.filledCurrent;

  if (heightOfDiv === 0)
    styleOfFilledDiv = {
      border: "0px",
      height: "0px",
    };
  else styleOfFilledDiv = { height: `${heightOfDiv}px` };

  return (
    <div key={hourValue} className={`${styles.hourDiv}`}>
      <div className={`${styles.hourValue}`}>{hourLabel}</div>
      <div
        style={styleOfFilledDiv}
        className={`${styles.colorDiv} ${classOfDiv}`}
      >
        <div className={`${styles.title}`}>{divContent}</div>
      </div>
    </div>
  );
};

export default TimeLineHourDiv;
