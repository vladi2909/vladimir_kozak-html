const getBtn = document.getElementById('getBtn');
const postBtn = document.getElementById('postBtn');
const putBtn = document.getElementById('putBtn');
const delBtn = document.getElementById('delBtn');

const requestURL = 'https://jsonplaceholder.typicode.com/users';
const item = '/1';


// CREATE

const sendHttpRequest = (method, url, data) => {
    return fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: data ? {'Content-Type': 'application/json'} : {}
    }).then(res => {
        if (res.status >= 400) {
            // !response.ok
            return res.json().then(errResData => {
                const error = new Error('Something went wrong...');
                error.data = errResData;
                throw error;
            });
        }
        return res.json();
    });
};


// GET 

const getData = () => {
    sendHttpRequest('GET', requestURL)
        .then(res => {
            res.map(user => {
                console.log(`${user.id}: ${user.name},  ${user.address.street}`);
            });
        });
};


// POST

const sendData = () => {
    sendHttpRequest('POST', requestURL, {
        name: 'Vladimir',
        username: 'Kozak'
    })
    .then(resData => {
        console.log(resData);
    })
    .catch(err => {
        console.log(err, err.data);
    });
};


// PUT

const putData = () => {
    sendHttpRequest('PUT', requestURL + item, {
        name: 'Vladimir',
        username: 'Kozak',
        job: 'student'
    }).then(res => {
        console.log('put: ', res);
    })
};


// DELETE

const delData = () => {
    sendHttpRequest('DELETE', requestURL + item)
    .then(res => {
        console.log('data deleted');
    })
};


getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sendData);
putBtn.addEventListener('click', putData);
delBtn.addEventListener('click', delData);