window.onload=function (){
    var nav = document.getElementById('pokedex');
    nav.classList.add('active');
    nav.setAttribute('aria-current', 'page');

    document.getElementById("submitForm").addEventListener('submit', function (event){
       event.preventDefault();
       const inputValue = document.getElementById('input').value.toLowerCase();
       console.log(inputValue);
       this.action = `/pokedex/${inputValue}`;

       this.submit();
    });
}