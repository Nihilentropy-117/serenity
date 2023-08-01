document.addEventListener('DOMContentLoaded', async () => {
    const modes = {};

    try {
        const response = await fetch('https://cattle-advanced-serval.ngrok-free.app/api/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: "JohnDoe",
                token: "abc1234",
                mode: "API",
                modifier: "List",
                command: "List",
            }),
        });

        const data = await response.json();
        const parsedData = JSON.parse(data.text);

        parsedData.forEach(item => {
            const option = new Option(item.mode, item.mode);
            document.getElementById('mode').append(option);
            modes[item.mode] = item.submenus;
        });

        document.getElementById('mode').dispatchEvent(new Event('change'));

    } catch (err) {
        console.error('Error:', err);
    }

    document.getElementById('mode').addEventListener('change', function() {
        const selectedMode = this.value;
        const modifiers = modes[selectedMode];

        const modifierElement = document.getElementById('modifier');
        modifierElement.innerHTML = '';

        modifiers.forEach(modifier => {
            modifierElement.append(new Option(modifier.modifier, modifier.modifier));
        });

        modifierElement.dispatchEvent(new Event('change'));
    });

    document.getElementById('modifier').addEventListener('change', function() {
        const selectedMode = document.getElementById('mode').value;
        const selectedModifier = this.value;
        const commands = modes[selectedMode].find(modifier => modifier.modifier === selectedModifier).submenus;

        const commandElement = document.getElementById('command');
        commandElement.innerHTML = '';

        commands.forEach(command => {
            commandElement.append(new Option(command.command, command.command));
        });
    });

    document.getElementById('submit').addEventListener('click', async () => {
        try {
            const response = await fetch('https://cattle-advanced-serval.ngrok-free.app/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: document.getElementById('username').value,
                    token: document.getElementById('token').value,
                    mode: document.getElementById('mode').value,
                    modifier: document.getElementById('modifier').value,
                    command: document.getElementById('command').value,
                    message: document.getElementById('message').value,
                }),
            });

            const data = await response.json();
            document.getElementById('response').value = data.text;

        } catch (err) {
            console.error('Error:', err);
        }
    });
    
});

$(document).ready(function() {
    $('#clear').click(function() {
        $('#response').val('');
    });
});

$(document).ready(function() {
    $("#copyUp").click(function() {
        var responseText = $("#response").val();
        $("#message").val(responseText);
    });
});

