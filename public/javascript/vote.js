async function voteClickHandler(event) {
    event.preventDefault();

    const radiobtns = document.querySelectorAll('input[name="choice"]');
    let selectedValue;
    for (const rb of radiobtns) {
        if(rb.checked) {
            selectedValue = rb.Value;
            break;
        }
    }

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch('/api/posts/vote', {
        method: 'PUT',
        body: JSON.stringify({
            post_id: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.vote-btn').addEventListener('click', voteClickHandler);