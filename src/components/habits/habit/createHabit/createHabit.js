import React, {useState} from 'react';

import styles from './createHabit.module.css'

import CheckBox from '../../../Checkbox/Checkbox';

import { withTranslation }  from 'react-i18next';

function CreateHabit({onCreate, t}){
    
    const checkboxes = []
    for(let i = 0; i < 30; i++){
        checkboxes.push(<CheckBox key={i}/>)
    }

    const [title, setTitle] = useState('')
    
    return(
        <div className={styles.container}>
            <div className={styles.checkBoxes}>
                {
                    checkboxes
                }
            </div>
            <input className={styles.input} value={title} onChange={(el)=>{setTitle(el.target.value)}} placeholder={t("Habit for the next 30 days")} />
            <div className={styles.createButton} onClick={()=>{setTitle('');onCreate(title)}}>
                <h3>{t('CREATE')}</h3>
            </div>
        </div>
    )
}

export default withTranslation()(CreateHabit)