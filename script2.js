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