import axios from 'axios';

import { BASE_URL } from '../config';

const getQuiz = (token) => {
    
    var data = '';

    var config = {
        method: 'get',
        url: BASE_URL + '/api/game/quiz',
        //crossdomain: true,
        headers: { 
            'x-access-token': token
        },
        data : data
    };
    return new Promise((resolve, reject) => {
        axios(config)
            .then(function (response) {
                resolve(response.data.quiz)    
            })
            .catch(function (error) {
                reject(error)
            });
    })
}

export { getQuiz };