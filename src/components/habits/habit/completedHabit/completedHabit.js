import React, {useState, useEffect} from 'react';
import equal from 'deep-equal'

import styles from '../habit.module.css'

import CheckBox from '../../../Checkbox/Checkbox';

import { withTranslation }  from 'react-i18next';

function CompletedHabit({habit, onDel, t}){

    const [title, setTitle] = useState(habit.title || '')


    //Updates title and checkbox every time when props change
    const [oldProps, setOldProps] = useState(habit)         
    useEffect(()=>{
    
        console.log(habit)
    
        if(!equal(oldProps, habit)){
            setOldProps(habit)
            setTitle(habit.title || '')
        }
    })

    return(
        <div className={styles.container}>
            <div className={styles.checkBoxes}>
                {
                    habit.completedDays.map((el, i) => {
                        return <CheckBox key={i} pressed={el}/>
                    })
                }
            </div>
            <input className={styles.input} value={title} placeholder={t('Your dream habit')}/>
            <div className={styles.finishButton} onClick={onDel}>
                <h3>{t('DELETE')}</h3>
            </div>
        </div>
    )
}

export default withTranslation()(CompletedHabit)