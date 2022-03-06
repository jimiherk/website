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
    let name = document.getElementById('contactName').value;
    let email = document.getElementById('contactEmail').value;
    let message = document.getElementById('contactMessage').value;

    if (name !== '' && email !== '' && message !== '') {
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
                console.log(response);
            }
        });
    } else {
        document.getElementById('contactResponse').innerHTML = '<error>Please fill out all fields.</error>';
    }
}