import React from 'react';
import { useLocation } from 'react-router-dom'

import styles from './left-bar.module.css'
import Logo from './left-bar__logo/left-bar__logo';
import MenuButton from './left-bar__menu-button/menu-button';

import { withTranslation }  from 'react-i18next';

function LeftBar({t}){

    const location = useLocation()

    const activeLocation = location.pathname


    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Logo />
                <nav className={styles.navigation}>
                    <MenuButton 
                        content={t("Long time plans" )}
                        active={activeLocation === "/ltp"}
                        link="/ltp"
                    />
                    <MenuButton 
                        content={t("Diary")}
                        active={activeLocation === "/" || 'day' === activeLocation.split('/')[1]}
                        link="/"
                    />
                    <MenuButton 
                        content={t("Habits")}
                        active={activeLocation === "/habits"}
                        link="/habits"
                    />
                    <MenuButton 
                        content={t("Settings")}
                        active={activeLocation === "/settings"}
                        link="/settings"
                    />
                </nav>
            </div>
        </div>
    )
}

export default withTranslation()(LeftBar)