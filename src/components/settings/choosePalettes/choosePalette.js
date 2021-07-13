import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import styles from './choosePalette.module.css'

export default function ChoosePalett(){
    
    const [palettes, setpalettes] = useState(['#212529', '#e63946', '#3d405b'])

    const currentPalette = JSON.parse( localStorage.getItem('settings') ).colorPalette
    const [activePalette, setActivePalette] = useState(currentPalette || 0)

    const history = useHistory()

    const setPalette = number => {
        setActivePalette(number)
        const currentSettings = JSON.parse( localStorage.getItem('settings') )
        currentSettings.colorPalette = number
        localStorage.setItem('settings', JSON.stringify(currentSettings))

        history.go(0)
    }

    return(
        <div className={styles.container}>
            {
                palettes.map((bg_color, i)=>{
                    if(i == activePalette){
                        return  <div 
                                    className={`${styles.palette} ${styles.active}`} 
                                    style={{backgroundColor: bg_color}}
                                    onClick={()=>{setPalette(i)}}
                                    key={i}/>
                    }
                    return <div 
                            className={`${styles.palette}`} 
                            style={{backgroundColor: bg_color}}
                            onClick={()=>{setPalette(i)}} 
                            key={i}/>
                })
            }
        </div>
    )
}
