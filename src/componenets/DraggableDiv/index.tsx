import styles from "./style.module.css";
import {
  handleDragDrop,
  handleDragStart,
  handleDragOver,
  handleDragEnter,
  handleDragLeave,
  handleDragEnd,
} from "../../util/DragdropUtil";
import { Grip } from "lucide-react";

interface DraggableDivProps {
  title: string,
  bodyOfDiv: any,
  orderClass: string
}

const DraggableDiv: React.FC<DraggableDivProps> = ({ title, bodyOfDiv, orderClass }: DraggableDivProps) => {
  let previousPosition: any = localStorage.getItem(title);

  if (previousPosition === null) {
    previousPosition = orderClass;
    localStorage.setItem(title, orderClass);
  }

  return (
    <div
      className={`${styles.draggableDiv} draggable ${previousPosition}`}
      draggable
      onDragOver={(e: React.DragEvent<HTMLDivElement>) => handleDragOver(e)}
      onDragStart={(e: React.DragEvent<HTMLDivElement>) => handleDragStart(e)}
      onDragEnter={(e: React.DragEvent<HTMLDivElement>) => handleDragEnter(e)}
      onDragLeave={(e: React.DragEvent<HTMLDivElement>) => handleDragLeave(e)}
      onDragEnd={(e: React.DragEvent<HTMLDivElement>) => handleDragEnd(e)}
      onDrop={(e: React.DragEvent<HTMLDivElement>) => handleDragDrop(e)}
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
