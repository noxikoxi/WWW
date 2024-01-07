window.onload=function (){
    document.getElementById("submitForm").addEventListener('submit', function (event){
       event.preventDefault();
       const inputValue = document.getElementById('input').value;

       this.action = `/pokedex/${inputValue}`;

       this.submit();
    });
}