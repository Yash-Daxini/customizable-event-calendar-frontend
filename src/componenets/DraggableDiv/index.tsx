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

interface DraggableDivProps {
  title: string,
  bodyOfDiv: any,
  orderClass: string
}

const DraggableDiv: React.FC<DraggableDivProps> = ({ title, bodyOfDiv, orderClass }: DraggableDivProps) => {
  let previousPosition = localStorage.getItem(title);

  if (previousPosition === null) {
    previousPosition = orderClass;
    localStorage.setItem(title, orderClass);
  }

  return (
    <div
      className={`${styles.draggableDiv} draggable ${previousPosition}`}
      draggable
      onDragOver={(e: any) => handleDragOver(e)}
      onDragStart={(e: any) => handleDragStart(e)}
      onDragEnter={(e: any) => handleDragEnter(e)}
      onDragLeave={(e: any) => handleDragLeave(e)}
      onDragEnd={(e: any) => handleDragEnd(e)}
      onDrop={(e: any) => handleDragDrop(e)}
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
