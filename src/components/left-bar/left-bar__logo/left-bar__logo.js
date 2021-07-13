import React from 'react';

import styles from './left-bar__logo.module.css'

export default function Logo(){
    return(
        <div className={styles.logo}>
            <h1>NEUMAT</h1>
            <div className={styles.underline} />
        </div>
    )
}