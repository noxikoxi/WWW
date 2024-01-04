fetch('footer.html')
    .then(response=> response.text())
    .then(text=> document.body.insertAdjacentHTML('beforeend', text));