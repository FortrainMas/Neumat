import React from 'react';

import { format } from 'date-format-parse';

import styles from './dayCard.module.css'
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

export default function DayCard({date, today, tomorrow, yesterday}){

    const {t, i18n} = useTranslation()

 

    let cardContent = format(date, 'DD/MM/YYYY')
    if(today){
        cardContent = 'TODAY'
    }else if(tomorrow){
        cardContent = 'TOMORROW'
    }else if(yesterday){
        cardContent = 'YESTERDAY'
    }

    

    return(
        <div className={styles.container}>
            <h2>{t(cardContent)}</h2>
            <Link to={`/day/${date}`}>
                <div className={styles.button}>
                    <h3>{t('OPEN')}</h3>
                </div>
            </Link>
        </div>
    )
}