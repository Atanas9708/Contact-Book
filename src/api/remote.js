const appKey = 'kid_HyU1_P28f';
const appSecret = '6f2e74cc078b492fa131b739853c0ca4';
const url = 'https://baas.kinvey.com/';

function fetchContacts() {
  return fetch(url + `appdata/${appKey}/contacts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('Admin' + ':' + 'admin')
    }
  })
    .then(res => {
      return res.json();
    })
}

function register(username, password) {
  return fetch(url + 'user/' + appKey, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(appKey + ':' + appSecret),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
    .then(res => {
      return res.json();
    })
}

function login(username, password) {
  return fetch(url + 'user/' + appKey + '/login', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(appKey + ':' + appSecret),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
    .then(res => {
      return res.json();
    })
}

function create(payload) {
  return fetch(url + 'appdata/' + appKey + '/contacts', {
    method: 'POST',
    headers: {
      'Authorization': 'Kinvey ' + localStorage.getItem('authtoken'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(res => {
      return res.json();
    })
}

function edit(contactId, payload) {
  return fetch(url + 'appdata/' + appKey + '/contacts/' + contactId, {
    method: 'PUT',
    headers: {
      Authorization: 'Kinvey ' + localStorage.getItem('authtoken'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(res => {
      return res.json();
    })
}

export {
  fetchContacts,
  create,
  edit,
  register,
  login
}