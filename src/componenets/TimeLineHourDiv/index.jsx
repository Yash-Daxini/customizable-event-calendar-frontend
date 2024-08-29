import styles from "./style.module.css";

const TimeLineHourDiv = ({
  hourValue,
  hourLabel,
  isOverlapping,
  isFilled,
  isFilledCurrent,
  heightOfDiv,
  divContent,
}) => {
  let styleOfFilledDiv;

  let classOfDiv;

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
        {divContent}
      </div>
    </div>
  );
};

export default TimeLineHourDiv;
