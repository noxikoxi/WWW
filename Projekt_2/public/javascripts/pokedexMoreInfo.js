window.addEventListener('load', () =>{
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
});