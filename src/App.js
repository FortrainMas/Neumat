import './App.css';

import {useState, useEffect} from 'react'

import LeftBar from './components/left-bar/left-bar';
import Dairy from './components/dairy/dairy';
import Day from './components/day/Day'
import Habits from './components/habits/habits'
import Settings from './components/settings/settings';

import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

import en_translation from './assets/locales/en/translation.json'
import de_translation from './assets/locales/de/translation.json'

import styles from './colors.module.css'


function App() {


  const [isInitted, setIsInitted] = useState(true)



  // const currentSettings = JSON.parse( localStorage.getItem('settings') )
  // currentSettings.language = 'de'
  // console.log(JSON.stringify(currentSettings))
  // localStorage.setItem('settings', JSON.stringify(currentSettings))


  const paletteNumber = JSON.parse( localStorage.getItem('settings') ).colorPalette
  const palette = paletteNumber==0?styles.palette1:paletteNumber==1?styles.palette2:styles.palette3

  const language =  JSON.parse(localStorage.getItem('settings')).language
  console.log(language)

  useEffect(()=>{
    if(isInitted){
      i18n
        .use(initReactI18next)
        .use(HttpApi).init({
        lng: language, 
        debug: true,
        resources:{
          en: {
            translation:en_translation
          },
          de: {
            translation: de_translation
          }
        }
      })
      setIsInitted(false)
    }
  })






  return (
    <div className={`App ${palette}`}>
      <Router>
        <LeftBar />
        <Switch >
          <Route path='/day/*'>
            <Day />
          </Route>
          <Route path='/habits'>
            <Habits />
          </Route>
          <Route path='/settings'>
            <Settings />
          </Route>
          <Route path='/'>
            <Dairy />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}


export default App;
