import styles from './style.module.css';
import { handleDragDrop, handleDragStart, handleDragOver , draggedItem } from '../../util/dragdropUtil';

const DraggableDiv = ({ bodyOfDiv }) => {

    return (
        <div ref={draggedItem} className={`${styles.draggableDiv}`} draggable
            onDragOver={(e) => handleDragOver(e)}
            onDragStart={(e) => handleDragStart(e)}
            onDrop={(e) => handleDragDrop(e)}>
            {bodyOfDiv}
        </div>
    )
}

export default DraggableDiv
