import {handleSubmit} from './js/app';
import {dateString} from './js/dateString';
import {callServer} from './js/app';
import {updateUI} from './js/app';
import {checkLocalStorage} from './js/app';
import {clearLocalStorage} from './js/app';

import './styles/main.scss'
import './styles/footer.scss'
import './styles/header.scss'
import './styles/style.scss'


    // Add click listener on submit button
    const buttonSubmit = document.getElementById('button_submit')
    buttonSubmit.addEventListener('click', handleSubmit)

    // Add listener to update the UI from local storage if it exists
    window.addEventListener('load', checkLocalStorage)

    // Add click listener to Clear Data button to erase local storage
    const buttonClear = document.getElementById('button_clear')
    buttonClear.addEventListener('click', clearLocalStorage)

export {
    handleSubmit,
    dateString,
    callServer,
    updateUI,
    checkLocalStorage,
    clearLocalStorage

}