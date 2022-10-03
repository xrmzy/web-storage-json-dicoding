const storageKey = 'STORAGE_KEY';
const submitAction = document.getElementById('form-data-user');

// fungsi untuk memeriksa fitur web storage didukung browser
function checkForStorage() {
  return typeof Storage !== 'undefined';
}

// membuat item storage, nilai awal dan juga memodifikasi nilai pada item storage
function putUserList(data) {
  if (checkForStorage()) {
    let userData = [];
    if (localStorage.getItem(storageKey) !== null) {
      userData = JSON.parse(localStorage.getItem(storageKey));
    }

    userData.unshift(data);
    if (userData.length > 5) {
      userData.pop();
    }

    localStorage.setItem(storageKey, JSON.stringify(userData));
  }
}

// mendapatkan semua data pada item storage dari input user
function getUserList() {
  if (checkForStorage()) {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  } else {
    return [];
  }
}

// render data user pada tabel HTML
function renderUserList() {
  const userData = getUserList();
  const userList = document.querySelector('#user-list-detail');

  userList.innerHTML = '';
  for (let user of userData) {
    let row = document.createElement('tr');
    row.innerHTML = '<td>' + user.nama + '</td>';
    row.innerHTML += '<td>' + user.umur + '</td>';
    row.innerHTML += '<td>' + user.domisili + '</td>';

    userList.appendChild(row);
  }
}

// event listener tombol submit yang gunananya ambil semua data yang sudah di input ke field form
// lalu disimpan datanya ke putUserList() kemudian di tampilkan melalu fungsi renderUserList()
submitAction.addEventListener('submit', function (event) {
  const inputNama = document.getElementById('nama').value;
  const inputUmur = document.getElementById('umur').value;
  const inputDomisili = document.getElementById('domisili').value;
  const newUserData = {
    nama: inputNama,
    umur: inputUmur,
    domisili: inputDomisili,
  };

  putUserList(newUserData);
  renderUserList();
});

// event listener window untuk event 'load'
// perintah untuk menampilkan semau data yang sudah di input ke dalam item storage
window.addEventListener('load', function () {
  if (checkForStorage) {
    if (localStorage.getItem(storageKey) !== null) {
      renderUserList();
    }
  } else {
    alert('Browser yang Anda gunakan tidak mendukung Web Storage');
  }
});
