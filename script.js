function toggleMenu(){
    document.getElementById("navLinks").classList.toggle("active");
}
let slides = document.querySelectorAll(".slide");
let index = 0;

function changeSlide(){

slides[index].classList.remove("active");

index++;

if(index >= slides.length){
index = 0;
}

slides[index].classList.add("active");

}

setInterval(changeSlide,5000);

document.querySelector(".repair-form").addEventListener("submit",function(e){

e.preventDefault();

alert("تم إرسال طلب الصيانة بنجاح، سنتواصل معك قريباً.");

});
  function filterPrinters(type){

let printers = document.querySelectorAll(".printer-card");

printers.forEach(function(card){

if(type === "all"){
card.style.display = "block";
}

else if(card.classList.contains(type)){
card.style.display = "block";
}

else{
card.style.display = "none";
}

});

}
let cart = [];

function addToCart(product){

cart.push(product);

alert(product + " تم إضافتها إلى الطلب");

console.log(cart);

}function showCart(){

alert("الطلبات: " + cart.join(" , "));

}
  