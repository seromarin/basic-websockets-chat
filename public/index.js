
console.log('New Session opened');

const username = document.getElementById('username');

function newUser() {
    alert('Welcome home!' + username.value)
    console.log('Username', username.value);
    document.cookie = `username=${username.value}; expires=${new Date().setHours(3)}`
}