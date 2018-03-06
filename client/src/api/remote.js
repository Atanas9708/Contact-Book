const appKey = 'kid_HyU1_P28f';
const appSecret = '6f2e74cc078b492fa131b739853c0ca4';
const url = 'http://localhost:2000/';

function fetchContacts(page) {
  return fetch(url + 'contacts/' + page, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(res => {
      return res.json();
    })
}

function register(username, password, repeatPass) {
  return fetch(url + 'register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password,
      repeatPass
    })
  })
    .then(res => {
      return res.json();
    })
}

function login(username, password) {
  return fetch(url + 'login', {
    method: 'POST',
    headers: {
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
  return fetch(url + 'create', {
    method: 'POST',
    headers: {
      'Authorization': 'bearer  ' + localStorage.getItem('authtoken'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(res => {
      return res.json();
    })
}

function edit(contactId, payload) {
  return fetch(url + 'edit/' + contactId, {
    method: 'POST',
    headers: {
      Authorization: 'bearer ' + localStorage.getItem('authtoken'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(res => {
      return res.json();
    })
}

function deleteContact(contactId, userId) {
  return fetch(url + 'delete/' + contactId, {
    method: 'POST',
    headers: {
      Authorization: 'bearer ' + localStorage.getItem('authtoken'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId })
  })
    .then(res => {
      return res.json();
    })
}

export {
  fetchContacts,
  create,
  edit,
  deleteContact,
  register,
  login
}