export var draggedItem;


export const handleDragOver = (e) => {
    e.preventDefault();
}

export const handleDragStart = (e) => {
    draggedItem = e;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.innerHTML);
}

export const handleDragDrop = (e) => {
    e.stopPropagation();

    if (draggedItem !== this) {
        draggedItem.target.innerHTML = e.target.innerHTML;
        e.target.innerHTML = e.dataTransfer.getData('text/html');
    }
}