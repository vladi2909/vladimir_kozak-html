const requestURL = 'https://jsonplaceholder.typicode.com/users';
const item = '/1';

const module = (function () {
    
    return {

        privateClass: class Singleton {
            constructor() {
                const instance = this.constructor.instance;
                if (instance) {
                    return instance;
                }

                this.constructor.instance = this;
            }


            // CREATE

            sendHttpRequest(method, url, data) {
                return fetch(url, {
                    method: method,
                    body: JSON.stringify(data),
                    headers: data ? {'Content-Type': 'application/json'} : {}
                }).then(res => {
                    if (res.status >= 400) {
                        // !response.ok
                        return res.json().then(errResData => {
                            const  error = new Error('Something went wrong...');
                            error.data = errResData;
                            throw error;
                        });
                    }
                    return res.json();
                });
            }


            // GET

            getData() {
                return this.sendHttpRequest('GET', requestURL)
                    .then(res => {
                        res.map(user => {
                            resultDiv.innerHTML += `<p>${user.id}: Name: ${user.name}, Surname: ${user.username}, Address: ${user.address.street}</p>`;
                        });
                    });
            } 
        

            // POST

            sendData() {
                return this.sendHttpRequest('POST', requestURL, {
                    name: 'Vladimir',
                    username: 'Kozak'
                })
                .then(resData => {
                    resultDiv.innerHTML += `<p> POST DATA: ${resData.id}: ${resData.name}, ${resData.username} </p>`;
                })
                .catch(err => {
                    console.log(err, err.data);
                });
            }


            // PUT

            putData() {
                return this.sendHttpRequest('PUT', requestURL + item, {
                    name: 'Vladimir',
                    username: 'Kozak',
                    job: 'student'
                }).then(res => {
                    resultDiv.innerHTML += `<p> PUT: Name: ${res.name}, Job: ${res.job} </p>`;
                });
            }


            // DELETE

            delData() {
                return this.sendHttpRequest('DELETE', requestURL + item)
                    .then(() => {
                        resultDiv.innerHTML += 'DATA DELETED';
                    })
                }
            }
    }
})();

let user = new module.privateClass();
let user2 = new module.privateClass();
console.log(user === user2); //true


// BUTTONS

const getBtn = document.getElementById('getBtn');
getBtn.onclick = function() {
    user.getData();
}

const sendBtn = document.getElementById('sendBtn');
sendBtn.onclick = function() {
    user.sendData();
}

const putBtn = document.getElementById('putBtn');
putBtn.onclick = function() {
    user.putData();
}

const delBtn = document.getElementById('delBtn');
delBtn.onclick = function() {
    user.delData();
}

const resultDiv = document.getElementById('resultDiv');

