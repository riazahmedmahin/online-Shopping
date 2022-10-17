const searchProducts=()=>{
    fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(data=>showDetails(data))

}


const showDetails=(products)=>{
   const details=document.getElementById('display-card');
   products.forEach(element => {
       const ratingStar=ratings(element.rating.rate);
       const div=document.createElement('div');
       div.classList.add('col')
       div.innerHTML=`
       
       
         <div class="card ms-4 border-0 boxshadow h-100 product">
           <div class="p-5">
           <img src="${element.image}" class="card-img-top" alt="..."  height=200 >
           </div>
           <div class="card-body text-center">
              <h5>${element.title}</h5>
              <h5>$ <span class="text-danger">${element.price}</span></h5>
              <h5><span>${ratingStar}</span></h5>
           </div>
           <div class="footer mx-auto">
              <button class="btn btn-primary" onclick="addToCard(${element.id},${element.price})">Add to Card</button>
           </div>
           
         </div>
       
    
       
       
       `
       details.appendChild(div);


   });
   

}

const ratings=(rate)=>{
   if(rate>=4){
     return star=` <h3><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i> ${rate}</h3>`
   }
  else if(rate>=3 && rate<4)
  {
    return star=` <h3><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i> ${rate}</h3>`
  }
  else if(rate>=2 && rate<3){
    return star=` <h3><i class="fas fa-star"></i><i class="fas fa-star"></i> ${rate}</h3>`
  }
  else{
   return star=` <h3><i class="fas fa-star"></i> ${rate}</h3>`
  }
  
 }

let count = 0;
const addToCard=(id,price,newPrice)=>{
   count = count + 1;
   document.getElementById('total-products').innerHTML = count;
   updatePrice(price);
   total();

}

const updatePrice=(price)=>{
   const oldprice = parseFloat(document.getElementById('price').innerText);
   const newprice = price + oldprice;
   document.getElementById('price').innerHTML = newprice.toFixed(2);
   deliveryCharge(newprice);
}


const deliveryCharge=(newprice)=>{
   if(newprice <= 500)
   {
      document.getElementById('delivery-charge').innerHTML = 0;
      document.getElementById('ship').innerHTML = 0;
   }
   else if(newprice > 500 && newprice <= 800)
   {
      document.getElementById('delivery-charge').innerHTML = 50;
      document.getElementById('ship').innerHTML = 50;
   }
   else
   {
      document.getElementById('delivery-charge').innerHTML = 100;
      document.getElementById('ship').innerHTML = 100;
   }
}

const total=()=>{
   const price = parseFloat(document.getElementById('price').innerText);
   const delivery = parseFloat(document.getElementById('delivery-charge').innerText);
   const shipping = parseFloat(document.getElementById('ship').innerText);
   const total = price + delivery + shipping;
   const tax = (total * 15) / 100;
   const total_pt = total + tax;
   document.getElementById('total').innerHTML = total;
   document.getElementById('tax').innerHTML = tax.toFixed(2);
   document.getElementById('total-tax').innerHTML = total_pt.toFixed(2);
}

const orderProducts=()=>{
   const details = document.getElementById('details');
   const totalprice = document.getElementById('total-tax').innerText;

   const div = document.createElement('div');
   div.classList.add('shopping');
   div.innerHTML = `
   <h4>Your total Shopping : $${totalprice}</h4>
    <p>Thanks for Shopping With Us!!!!!</p>
   `
   details.appendChild(div);

}
  
  searchProducts()
