import styles from './style.module.css';
import { handleDragDrop, handleDragStart, handleDragOver, handleDragEnter, handleDragLeave, handleDragEnd } from '../../util/dragdropUtil';

const DraggableDiv = ({ title, bodyOfDiv, orderClass }) => {

    let previousPosition = localStorage.getItem(title);

    if (previousPosition === null) {
        previousPosition = orderClass
        localStorage.setItem(title, orderClass);
    }

    return (
        <div
            className={`${styles.draggableDiv} draggable ${previousPosition}`} draggable
            onDragOver={(e) => handleDragOver(e)}
            onDragStart={(e) => handleDragStart(e)}
            onDragEnter={(e) => handleDragEnter(e)}
            onDragLeave={(e) => handleDragLeave(e)}
            onDragEnd={(e) => handleDragEnd(e)}
            onDrop={(e) => handleDragDrop(e)}>
            <span className={`${styles.title}`}>{title}</span>
            <br />
            <span className={`${styles.draggableDivContent}`}>{bodyOfDiv}</span>
        </div>
    )
}

export default DraggableDiv
