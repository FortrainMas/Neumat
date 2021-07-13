import React, {useEffect, useState} from 'react';

import styles from './habits.module.css'

import CreateHabit from './habit/createHabit/createHabit';
import ProcessHabit from './habit/processHabit/processHabit'
import CompletedHabit from './habit/completedHabit/completedHabit'

import { withTranslation }  from 'react-i18next';

function Habits({t}){


    const [habits, setHabits] = useState([])
    const [finishedHabits, setFinishedHabits] = useState([])

    //Creates new habit and saves it to localstorage
    const onCreate = (title) => {
        
        const completedDays = []
        for(let i = 0; i < 30; i++){
            completedDays[i] = 0;
        }

        const habit = {
            completedDays,
            title
        }

        const copy = [ habit, ...habits]

        console.log(copy)

        localStorage.setItem('habits', JSON.stringify(copy))

        setHabits(copy)
    }


    //daily progress variable in habit to save it
    const habitProgress = (position, updatedProgress) => {
        const copy = [...habits]
        copy[position].completedDays = updatedProgress
        setHabits(copy)
        localStorage.setItem('habits', JSON.stringify(copy))
    }
    

    //Finish button on habit
    const finishHabit = position => {
        const copy = [...habits]
        const finished = copy.splice(position, 1)
        setHabits(copy)
        localStorage.setItem('habits', JSON.stringify(copy))

        setFinishedHabits([...finished, ...finishedHabits])
        localStorage.setItem('finished', JSON.stringify([ ...finished, ...finishedHabits]))
    }

    //Deletes finished habits
    const deleteHabit = position => {
        const copy = [...finishedHabits]
        copy.splice(position, 1)
        setFinishedHabits(copy)
        localStorage.setItem('finished', JSON.stringify(copy))
    }

    const [isOnstart, setIsOnstart] = useState(true)
    useEffect(()=>{
        if(isOnstart){
            setIsOnstart(false)
            setHabits(JSON.parse(localStorage.getItem('habits')) || [])
            setFinishedHabits(JSON.parse(localStorage.getItem('finished')) || [])
        }
    })


    return(
        <div className={styles.container}>
            <h1>{t('Actual')}</h1>
            <div className={styles.actualHabits}>
                {
                    habits.map((habit, i) => {
                        return <ProcessHabit 
                                habit={habit} 
                                key={i} 
                                finish={
                                    () => {finishHabit(i)}
                                }
                                progress={
                                    (update) => {
                                        habitProgress(i, update)
                                    }
                                }/>
                    })
                }
                <CreateHabit onCreate={onCreate}/>
            </div>
            <h1>{t('Finished')}</h1>
            <div className={styles.actualHabits}>
                {
                    finishedHabits.map((habit, i)=>{
                        return <CompletedHabit habit={habit} key={i} onDel={()=>{deleteHabit(i)}}/>
                    })
                }
            </div>
        </div>
    )
}


export default withTranslation()(Habits)