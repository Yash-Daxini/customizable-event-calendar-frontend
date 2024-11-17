export var draggedItem: DragEvent | null = null;


export const handleDragOver = (e: DragEvent): void => {
    e.preventDefault();
}

export const handleDragStart = (e: DragEvent): void => {
    const target = e.target as HTMLElement;

    if (target) {
        target.style.opacity = '0.4';
    }

    draggedItem = e;
    e.dataTransfer!.effectAllowed = 'move';
    e.dataTransfer!.setData('text/html', target.innerHTML);
}

export const handleDragEnd = (e: DragEvent): void => {
    const target = e.target as HTMLElement;

    if (target) {
        target.style.opacity = '1';
    }

    const draggableDivs = document.querySelectorAll<HTMLDivElement>('.draggableDiv');

    draggableDivs.forEach((ele) => {
        ele.style.border = 'none';
    })
}

export const handleDragEnter = (e: DragEvent) => {
    const target = e.target as HTMLElement;

    if (target && target.classList.contains("draggable")) {
        target.style.border = '3px dotted #666';
    }
}

export const handleDragLeave = (e: DragEvent) => {
    const target = e.target as HTMLElement;

    if (target && target.classList.contains("draggable")) {
        target.style.border = 'none';
    }
}

export const handleDragDrop = (e: DragEvent) => {
    e.stopPropagation();

    const target = e.target as HTMLElement;

    if (target && target.classList.contains("draggable")) {
        target.style.border = 'none';
    }

    if (draggedItem && draggedItem.target !== e.target && e.target instanceof HTMLElement && e.target.classList.contains('draggable')) {
        const positionOfDraggedElement: string | undefined = getPosition(draggedItem.target as HTMLElement);
        const positionOfDroppedElement: string | undefined = getPosition(e.target as HTMLElement);

        const draggedElementTitle: string | undefined = getTitleOfElement(draggedItem.target as HTMLElement);
        const droppedElementTitle: string | undefined = getTitleOfElement(e.target as HTMLElement);

        setPositionToLocalStorage(draggedElementTitle, positionOfDroppedElement);
        setPositionToLocalStorage(droppedElementTitle, positionOfDraggedElement);

        (draggedItem.target as HTMLElement).innerHTML = e.target.innerHTML;
        e.target.innerHTML = e.dataTransfer!.getData('text/html');
    }
}

const setPositionToLocalStorage = (key: string | undefined, value: string | undefined): void => {
    if (!key || !value)
        return;
    localStorage.setItem(key, value);
}

const getPosition = (element: HTMLElement): string | undefined => {
    return [...element.classList].find(ele => ele.startsWith("order"));
}

const getTitleOfElement = (element: HTMLElement): string | undefined => {
    return element.children[0].textContent?.toString();
}