import React from 'react';

import styles from './settings.module.css'

import ChoosePalett from './choosePalettes/choosePalette';
import ChooseLanguage from './chooseLanguages/chooseLanguage'

import { withTranslation }  from 'react-i18next';

function Settings({t}){

    return(
        <div className={styles.container}>
            <h1>{t('Color theme')}</h1>
            <ChoosePalett />
            <h1>{t('Language')}</h1>
            <ChooseLanguage />
        </div>
    )
}

export default withTranslation()(Settings)