export var draggedItem;


export const handleDragOver = (e) => {
    e.preventDefault();
}

export const handleDragStart = (e) => {
    e.target.style.opacity = '0.4';
    draggedItem = e;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.innerHTML);
}

export const handleDragEnd = (e) => {
    e.target.style.opacity = '1';

    const draggableDivs = document.querySelectorAll('.draggableDiv');
    draggableDivs.forEach((ele) => {
        ele.target.style.border = 'none';
    })
}

export const handleDragEnter = (e) => {
    if (e.target.classList.contains("draggable"))
        e.target.style.border = '3px dotted #666';
}

export const handleDragLeave = (e) => {
    if (e.target.classList.contains("draggable"))
        e.target.style.border = 'none';
}

export const handleDragDrop = (e) => {
    e.stopPropagation();

    if (e.target.classList.contains("draggable"))
        e.target.style.border = 'none';

    if (draggedItem.target !== e && e.target.classList.contains('draggable')) {
        draggedItem.target.innerHTML = e.target.innerHTML;
        e.target.innerHTML = e.dataTransfer.getData('text/html');
    }
}