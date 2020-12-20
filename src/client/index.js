import {handleSubmit} from './js/app';
import {dateString} from './js/dateString';
import {updateUI} from './js/app';

import './styles/main.scss'
import './styles/footer.scss'
import './styles/header.scss'
import './styles/style.scss'



    const buttonSubmit = document.getElementById('button_submit')
    buttonSubmit.addEventListener('click', handleSubmit)

    // // Add listener to update the UI from local storage if it exists
    // window.addEventListener('load', checkLocalStorage)

    // // Add click listener to Clear Data button to erase local storage
    // const buttonRefresh = document.getElementById('button_delete')
    // buttonRefresh.addEventListener('click', clearLocalStorage)

export {
    handleSubmit,
    dateString,
    updateUI
}