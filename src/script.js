function init() {
    fetch('https://jimiswebsite-api.herokuapp.com/discord', {
        method: 'GET'
    }).then(async (request) => {
        let response = await request.json();

        if (response.success) {
            document.getElementById('discordName').innerHTML = `${response.user.username}#${response.user.discriminator}`;
        } else {
            console.log(response);
        }
    });
}

function submitContactForm() {
    if (document.getElementById('contactName').value !== '' && document.getElementById('contactEmail').value !== '' && document.getElementById('contactMessage').value !== '') {
        let regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (regex.test(document.getElementById('contactEmail').value)) {
            fetch('https://jimiswebsite-api.herokuapp.com/contact', {
                method: 'POST',
                body: JSON.stringify({
                    name: document.getElementById('contactName').value,
                    email: document.getElementById('contactEmail').value,
                    message: document.getElementById('contactMessage').value
                })
            }).then(async (request) => {
                let response = await request.json();

                if (response.success) {
                    document.getElementById('contactName').value = '';
                    document.getElementById('contactEmail').value = '';
                    document.getElementById('contactMessage').value = '';

                    document.getElementById('contactResponse').innerHTML = '<success>Your contact form has been sent! I will get back to you soon.</success>';
                } else {
                    document.getElementById('contactResponse').innerHTML = '<error>There was an error sending your contact form. Please try again later.</error>';
                }
            });
        } else {
            document.getElementById('contactResponse').innerHTML = '<error>Please enter a valid email address.</error>';
        }
    } else {
        document.getElementById('contactResponse').innerHTML = '<error>Please fill out all fields.</error>';
    }
}