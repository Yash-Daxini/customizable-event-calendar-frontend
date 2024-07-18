import React, { useState } from 'react'
import styles from './style.module.css'

const Dashboard = () => {

    var dragSrcEl;

    return (
        <div className={`${styles.dashboardDiv}`}>
            <div className={`${styles.draggableDiv}`} draggable
                onDragOver={(e) => e.preventDefault()}
                onDragStart={(e) => {
                    dragSrcEl = e;
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('text/html', e.target.innerHTML);
                }}
                onDrop={(e) => {
                    e.stopPropagation();

                    if (dragSrcEl !== this) {
                        dragSrcEl.target.innerHTML = e.target.innerHTML;
                        e.target.innerHTML = e.dataTransfer.getData('text/html');
                    }

                    return false;
                }}>
                Notifications
            </div>
            <div className={`${styles.draggableDiv}`} draggable
                onDragOver={(e) => e.preventDefault()}
                onDragStart={(e) => {
                    dragSrcEl = e;
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('text/html', e.target.innerHTML);
                }}
                onDrop={(e) => {
                    e.stopPropagation();

                    if (dragSrcEl !== this) {
                        dragSrcEl.target.innerHTML = e.target.innerHTML;
                        e.target.innerHTML = e.dataTransfer.getData('text/html');
                    }

                    return false;
                }}>
                Upcomming events
            </div>
        </div>
    )
}

export default Dashboard