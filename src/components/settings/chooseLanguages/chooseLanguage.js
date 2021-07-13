import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';

import styles from './chooseLanguage.module.css'

export default function ChooseLanguage(){

    const languages=['English', 'Deutsch']
    const languageCode = ['en', 'de']

    const [isOnStart, setIsOnStart] = useState(true)
    const [activeLanguage, setActiveLanguage] = useState(0)

    const history = useHistory()

    useEffect(()=>{
        if(isOnStart){
            //Load current settings and sets current active language
            const currentLanguage = JSON.parse(localStorage.getItem('settings')).language
            console.log(languageCode.findIndex(code=>code == currentLanguage))
            setActiveLanguage(languageCode.findIndex(code=>code == currentLanguage))
            setIsOnStart(false)
        }
    })

    const setLanguage = num => {
        setActiveLanguage(num)

        //Updates current settings in local storage
        const currentSettings = JSON.parse(localStorage.getItem('settings'))
        currentSettings.language = languageCode[num]
        localStorage.setItem('settings', JSON.stringify(currentSettings))

        //Reloads the page 
        history.go(0)
    }

    return(
        <div className={styles.container}>
            {
                languages.map((lang, i) => {
                    console.log(activeLanguage)
                    return <div 
                            className={`${styles.languageContainer} ${i==activeLanguage?styles.active:''}`}
                            onClick={() => {setLanguage(i)}}
                            >
                        <h2>{lang}</h2>
                    </div>
                })
            }
        </div>
    )
}