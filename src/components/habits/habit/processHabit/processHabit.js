import React, {useState, useEffect} from 'react';
import equal from 'deep-equal'

import styles from '../habit.module.css'

import CheckBox from '../../../Checkbox/Checkbox';

import { withTranslation }  from 'react-i18next';

function ProcessHabit({habit, finish, progress, t}){
    
    const checkDay = dayNumber => {
        const clone = [...checkboxes]
        clone[dayNumber] = Number(!checkboxes[dayNumber])
        setCheckboxes(clone)
        progress(clone)
    }


    const [title, setTitle] = useState(habit.title || '')
    const [checkboxes, setCheckboxes] = useState(habit.completedDays || [])



    //Updates title and checkbox every time when props change
    const [oldProps, setOldProps] = useState(habit)         
    useEffect(()=>{

        console.log(habit)

        if(!equal(oldProps, habit)){
            console.log('s')
            setOldProps(habit)
            setTitle(habit.title || '')
            setCheckboxes(habit.completedDays || [])
        }
    })

    return(
        <div className={styles.container}>
            <div className={styles.checkBoxes}>
                {
                    checkboxes.map((el, i) => {
                        return <CheckBox key={i} onclick={() => {checkDay(i)}} pressed={el}/>
                    })
                }
            </div>
            <input className={styles.input} value={title} onChange={(el)=>{setTitle(el.target.value)}} placeholder={t('Your dream habit')}/>
            <div className={styles.finishButton} onClick={finish}>
                <h3>{t('FINISH')}</h3>
            </div>
        </div>
    )
}

export default withTranslation()(ProcessHabit)