import React, {useState, useEffect, useRef} from 'react';

import styles from './dairyDay.module.css'

import { useLocation } from 'react-router-dom'
import { format } from 'date-format-parse'

import CheckBox from '../Checkbox/Checkbox.js'

import { withTranslation }  from 'react-i18next';

function DairyDay({t}){


    //Init and make the title
    const location = useLocation().pathname.split('/')
    let date = Number(location[location.length - 1])

    let cardTitle = format(date, 'DD/MM/YYYY')
    if(date === new Date().setHours(0,0,0,0)){
        cardTitle = 'TODAY'
    }else if(date === new Date().setHours(24,0,0,0)){
        cardTitle = 'TOMORROW'
    }else if(date === new Date().setHours(-24,0,0,0)){
        cardTitle = 'YESTERDAY'
    }



    //Init simple state
    const [schedule, setSchedule] = useState('')
    const [resume, setResume] = useState('')
    const [tasks, setTasks] = useState(['', '' , ''])
    const [tasksCompleteness, setTasksCompleteness] = useState(['', '' , ''])

    //This socciety needs componentdidmount for functional components
    const [isOnLoad, setIsOnLoad] = useState(true)


    const scheduleTextarea = useRef(null)
    const resumeTextarea = useRef(null)


    useEffect(()=>{
        if(isOnLoad){
            const diary = JSON.parse(localStorage.getItem('diary'))
            if(diary){
                diary.forEach(day => {
                    if(day.date === date){
                        console.log(`date: ${date}`)
                        setSchedule(day.schedule)
                        setResume(day.resume)
                        setTasks(day.tasks)
                        setTasksCompleteness(day.tasksCompleteness)
                        setTimeout(()=>{
                            blur({target: scheduleTextarea.current})
                            blur({target: resumeTextarea.current})
                        }, 10)
                    }
                });
            }
            setIsOnLoad(false)
        }
    })
    


    
    //This function changes size of textarea. Is being called when textarea call callback onInput
    const input = (el) => {
        const lines = el.target.value.split('\n').length
        if(lines >= 5){
            el.target.style.minHeight = `${lines * 1.5}vw`           
        }
        if(lines < 5){
            el.target.style.minHeight ='10vw'
        }
    }
    
    //This function changes size of textarea. Is being called when textarea call callback onFocus
    const focus = (el) => {
        const lines = el.target.value.split('\n').length
        if(lines < 5){
            el.target.style.minHeight ='10vw'
        }
    }

    //This function changes size of textarea. Is being called when textarea call callback onBlur
    const blur = (el) => {
        console.log(el)
        console.log(el.value)
        const lines = el.target.value.split('\n').length
        el.target.style.minHeight = `${lines * 1.5}vw`    
    }

    const updateTaskCompletness = number => {
        const copy = [...tasksCompleteness]
        copy[number] = !copy[number]
        setTasksCompleteness(copy)
    }


    //Saves or updates day in the diary
    const saveDay = el => {

        const day = {
            date,
            schedule,
            tasks,
            resume,
            tasksCompleteness
        }


        const days = JSON.parse(localStorage.getItem('diary'))
        if(days){

            let flag = true
            for(let i = 0; i < days.length; i++){
                if(days[i].date === day.date){
                    days[i] = day
                    flag = false
                    break
                }
                if(days[i].date < days.date) {break}
            }

            if(flag){
                days.unshift(day)
            }

            localStorage.setItem('diary', JSON.stringify(days))
        }else{
            localStorage.setItem('diary', JSON.stringify([day]))
        }
    }

    return(
        <div className={styles.container}>
            <h1>{t(cardTitle)}</h1>
            <div className={styles.content}>
                
                {/* Schedule */}
                <h2>{t('Schedule')}</h2>
                <textarea 
                    onFocus={focus} 
                    onBlur={blur} 
                    onInput={
                        el => { 
                            setSchedule(el.target.value)
                            input(el)
                        }}
                    placeholder={t('Your daily schedule')}
                    value={schedule}
                    ref={scheduleTextarea}
                />
                
                {/* 3 most important tasks */}
                <h2>{t('3 most important tasks')}</h2>
                <div className={styles.tasks}>
                    <div className={styles.task}>
                        <CheckBox pressed={tasksCompleteness[0]} onclick={() => {updateTaskCompletness(0)}}/>
                        <input 
                            placeholder={t("First task")}
                            value={tasks[0]}
                            onChange={el=>{
                                setTasks([el.target.value, tasks[1],  tasks[2]])
                            }}
                        />
                    </div>
                    <div className={styles.task}>
                        <CheckBox pressed={tasksCompleteness[1]} onclick={() => {updateTaskCompletness(1)}}/>
                        <input 
                            placeholder={t("Another one")}
                            value={tasks[1]}
                            onChange={el=>{
                                setTasks([tasks[0], el.target.value, tasks[2]])
                            }}
                        />
                    </div>
                    <div className={styles.task}>
                        <CheckBox pressed={tasksCompleteness[2]} onclick={() => {updateTaskCompletness(2)}}/>
                        <input 
                            placeholder={t("One more task")}
                            value={tasks[2]}
                            onChange={el=>{
                                setTasks([tasks[0], tasks[1], el.target.value])
                            }}
                        />
                    </div>
                </div>
                

                {/* Daily resume */}
                <h2>{t("Daily resume")}</h2>
                <textarea 
                    onFocus={focus} 
                    onBlur={blur} 
                    onInput={
                        el => {
                            setResume(el.target.value)
                            input(el)
                    }} 
                    placeholder={t("Your daily resume. Unpredictable")}
                    value={resume}
                    ref={resumeTextarea}
                />

                <div className={styles.saveButton} onClick={saveDay}>
                    <h3>{t("Save")}</h3>
                </div>
            </div>
        </div>
    )
}

export default withTranslation()(DairyDay)