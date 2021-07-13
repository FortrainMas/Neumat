import React, { useRef, useState } from 'react';

import styles from './checkbox.module.css'

export default function CheckBox({onclick, pressed}){
    
    const fill = useRef(null)

    const [isFilled, setIsFilled] = useState(true)


    const onPress = (q) => {
        if(isFilled){
            fill.current.classList.add(styles.none)
            setIsFilled(false)
        }else{
            fill.current.classList.remove(styles.none)
            setIsFilled(true)
        }

        //It is just callback so it can be incallable
        if(onclick){onclick()}
        
    }
    
    return(
        <div className={styles.container} onClick={onPress}>
            <div className={pressed?styles.none:styles.fill} onClick={onPress} ref={fill}/>
        </div>
    )
}