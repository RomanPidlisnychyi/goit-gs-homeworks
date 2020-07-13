import './styles.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import 'material-design-icons/iconfont/material-icons.css';
import '@pnotify/core/dist/BrightTheme.css';

import surchTemplate from './surchTemplate.hbs';
import countryTemplate from './countryTemplate.hbs';

import debounce from 'lodash.debounce';
import { alert, notice, info, success, error } from '@pnotify/core';

const refs = {
    country: document.querySelector('.js-country'),
    input: document.querySelector('input[name="queryCountry"]'),
};

refs.input.addEventListener('input', debounce(onInputQuery, 500));

function onInputQuery(element) {
    let query = element.target.value;
    const basedUrl = 'https://restcountries.eu/rest/v2';

    if (query === '') {
        refs.country.innerHTML = '';
        return;
    }

    fetch(`${basedUrl}/name/${query}`)
        .then(response => response.json())
        .then(data => {
            refs.country.innerHTML = '';

            if (data.length === 1) {
                const markup = countryTemplate(data);

                refs.country.insertAdjacentHTML('beforeend', markup);
            }

            if (data.length > 1 && data.length <= 10) {
                const markup = surchTemplate(data);

                refs.country.insertAdjacentHTML('beforeend', markup);
            }

            if (data.length > 10) {
                // Manually set the type.
                // const myAlert = alert({
                //     text: "I'm an alert.",
                //     type: 'info',
                // });

                // Automatically set the type.
                // const myNotice = notice({
                //     text: "I'm a notice.",
                // });

                //   const myInfo = info({
                //     text: "I'm an info message."
                //   });

                // const mySuccess = success({
                //     text: "I'm a success message.",
                // });

                const myError = error({
                    text: 'Too many matches found. Please enter a more specific query!',
                });
            }
        })
        .catch(error => console.error(error));
}