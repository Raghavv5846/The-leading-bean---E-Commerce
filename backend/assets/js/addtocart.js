
var cartButtons = document.querySelectorAll('.cart-button');
var card_value = document.querySelector(".added");
var pqtplus = document.querySelectorAll(".pqt-plus");
var pqtminus = document.querySelectorAll(".pqt-minus");
var cartvalue = 0;
cartButtons.forEach(button => {
  button.addEventListener('click', cartClick);
});
function cartClick() {
  let button = this;
  let cartval=button.querySelector('.added');;
  button.classList.add('clicked');
  if(cartval.textContent===""){
    cartval.textContent = 1;
  }
  else{
    cartval.textContent = parseInt(cartval.textContent)+ 1;
  }
}
console.log(pqtplus);
pqtplus.forEach((button)=>{
  button.addEventListener('click', function(){
    let self =this;
    
    let cartval=self.parentNode.querySelector('.added');
      if(parseInt(cartval.textContent) >= 0 && cartval.textContent!=""){
        
        cartval.textContent = parseInt(cartval.textContent)+ 1;
      }
  });
})
pqtminus.forEach((button)=>{
  button.addEventListener('click', function(){
    let self =this;
  
  let cartval=self.parentNode.querySelector('.added');

    if(Number(cartval.innerText) - 1 >= 0){
      cartval.textContent = parseInt(cartval.textContent)- 1;
      }
  });
})


// pqtminus.addEventListener('click', function(){
//   let self =this;
  
//   let cartval=self.parentNode.querySelector('.added');

//     if(Number(cartval.innerText) - 1 >= 0){
//       cartval.textContent = parseInt(cartval.textContent)- 1;
// }
// });
