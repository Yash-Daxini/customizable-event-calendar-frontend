import styles from "./style.module.css";
import {
  handleDragDrop,
  handleDragStart,
  handleDragOver,
  handleDragEnter,
  handleDragLeave,
  handleDragEnd,
} from "../../util/dragdropUtil";
import { Grip } from "lucide-react";

const DraggableDiv = ({ title, bodyOfDiv, orderClass }) => {
  let previousPosition = localStorage.getItem(title);

  if (previousPosition === null) {
    previousPosition = orderClass;
    localStorage.setItem(title, orderClass);
  }

  return (
    <div
      className={`${styles.draggableDiv} draggable ${previousPosition}`}
      draggable
      onDragOver={(e) => handleDragOver(e)}
      onDragStart={(e) => handleDragStart(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
      onDragEnd={(e) => handleDragEnd(e)}
      onDrop={(e) => handleDragDrop(e)}
    >
      <div className={`${styles.header}`}>
        <div className={`${styles.title}`}>{title}</div>
        <div className={styles.headerIcon}>
          <Grip />
        </div>
      </div>
      <br />
      <div className={`${styles.draggableDivContent}`}>{bodyOfDiv}</div>
    </div>
  );
};

export default DraggableDiv;
