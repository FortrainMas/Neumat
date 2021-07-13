import React from 'react';

import styles from './menu-button.module.css'

import { Link } from 'react-router-dom';

export default function MenuButton({content, active, link}){
    return(
        <Link to={link} className={styles.container}>
            <h2 className={active?styles.active:''}>{content}</h2>
        </Link>
    )
}