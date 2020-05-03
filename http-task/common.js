function toString(o) {
    return Object.prototype.toString.call(o);
  }
  
  function isString(o) {
    return typeof o === 'string';
  }
  
  function isBlob(o) {
    return toString(o) === '[object Blob]';
  }
  
  function isFormData(o) {
    return toString(o) === '[object FormData]';
  }
  
  function isURLSearchParams(o) {
    return toString(o) === '[object URLSearchParams]';
  }
  
  function isRequest(o) {
    return o && o instanceof Request;
  }
  
const module = (function() {

    return {

      privateFetchClient: class FetchClient {
          
          constructor(options = {}) {
             
              const instance = this.constructor.instance;
              if (instance) {
                  return instance;
              }

              this.constructor.instance = this;
              this.options = options;
              this.middlewares = [];
          }
        
        
          createRequest(url, options, method, data) {
        
              options = { ...this.options, ...options };
        
              options.method = method || options.method;
              if (!options.method) {
                  options.method = !data && !options.body ? 'GET' : 'POST';
              }
        
              if (data) {
                  if (isString(data) ||
                  isFormData(data) ||
                  isURLSearchParams(data) ||
                  isBlob(data)) {
                      options.body = data;
              } else {
                  try {
                      options.body = JSON.stringify(data);
                  } catch (e) {
                      options.body = data;
                  }
               }
              }
        
            return new Request(url, options);
          }
        
          request(urlOrRequest, ...args) {
        
            const req = isRequest(urlOrRequest)
              ? urlOrRequest
              : this.createRequest(urlOrRequest, ...args);
        
            let promise = Promise.resolve(req);
        
            let chains   = [fetch, null];
            let sequence = this.middlewares;
            let reversed = [];
        
            sequence.forEach(middleware => reversed.unshift(middleware));
        
            reversed.forEach(({ request, requestError }) => {
        
              if (requestError) {
                chains.unshift(null, requestError);
              }
        
              if (request) {
                chains.unshift(request, null);
              }
            });
        
            sequence.forEach(({ response, responseError }) => {
        
              if (response) {
                chains.push(response, null);
              }
        
              if (responseError) {
                chains.push(null, responseError);
              }
            });
        
            while (chains.length) {
              promise = promise.then(chains.shift(), chains.shift());
            }
        
            return promise;
          }
        
          fetch(url, options) {
            return this.request(url, options);
          }
        
          get(url, options) {
            return this.request(url, options, 'GET');
          }
        
          delete(url, options) {
            return this.request(url, options, 'DELETE');
          }
        
          put(url, data, options) {
            return this.request(url, options, 'PUT', data);
          }
        
          post(url, data, options) {
            return this.request(url, options, 'POST', data);
          }
        }
    }
})();
  
  
const user = new module.privateFetchClient();
const user2 = new module.privateFetchClient();
console.log(user === user2); //true


user.get('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => console.log(json))
   

user.post('https://jsonplaceholder.typicode.com/users', {
    param1: 'param1',
    param2: 'param2'
}).then((responce) => responce.json())
  .then(json => console.log(json))
  .catch((error) => console.log(error));


user.put('https://jsonplaceholder.typicode.com/users/1', {
    param2: 'param2',
    param3: 'param3'
    }).then((responce) => responce.json())
    .then(json => console.log(json))
    .catch((error) => console.log(error));
    


user.delete('https://jsonplaceholder.typicode.com/users/1')
    .then((response) => console.log(response));



let fetchClient = new module.privateFetchClient({
    headers: {
      'X-Custom-Header': 'foobar'
    }
  });

fetchClient.get('https://jsonplaceholder.typicode.com/users')
  .then((response) => { console.log(response) });