import React from 'react';

import styles from './dairy.module.css'

import DayCard from './day-card/dayCard';


export default function Dairy(){

    const cards = JSON.parse(localStorage.getItem('diary')) || []

    return(
        <div className={styles.container}>
            <div className={styles.recent}>
                    <DayCard 
                        date={Number(new Date().setHours(24,0,0,0))} 
                        tomorrow    
                    />

                    <DayCard 
                        date={Number(new Date().setHours(0,0,0,0))} 
                        today
                    />

                    <DayCard 
                        date={Number(new Date().setHours(-24,0,0,0))} 
                        yesterday
                    />
            </div>
            <div className={styles.line} />
            <div className={styles.old}>
                {
                    cards.map((el, i)=>{
                        return <DayCard date={el.date} key = {i}/>
                    })
                }
            </div>
        </div>
    )
}