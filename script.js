document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    try {
        const response = await fetch('https://backend.gymlion-bmsd21a.bbzwinf.ch/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            alert('Login successful');
        } else {
            alert(data.errors.general);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('signup-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const firstname = document.getElementById('signup-firstname').value;
    const lastname = document.getElementById('signup-lastname').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    try {
        const response = await fetch('https://backend.gymlion-bmsd21a.bbzwinf.ch/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstname, lastname, email, password })
        });
        const data = await response.json();
        if (response.ok) {
            alert('Signup successful');
        } else {
            alert('Signup failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('logout-button').addEventListener('click', async function() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Not logged in');
        return;
    }
    try {
        const response = await fetch('https://backend.gymlion-bmsd21a.bbzwinf.ch/api/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            Authorization: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            localStorage.removeItem('token');
            alert('Logged out successfully');
        } else {
            alert('Logout failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});