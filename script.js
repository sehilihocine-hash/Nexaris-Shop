const products=[
{id:1,name:"Runner Nexaris",category:"Chaussures",price:79.99,emoji:"👟",sizes:["38","39","40","41","42","43","44"]},
{id:2,name:"Urban Hoodie",category:"Vêtements",price:49.99,emoji:"🧥",sizes:["XS","S","M","L","XL"]},
{id:3,name:"Street Sneaker",category:"Chaussures",price:89.99,emoji:"👟",sizes:["39","40","41","42","43","44"]},
{id:4,name:"Nexaris T-Shirt",category:"Vêtements",price:29.99,emoji:"👕",sizes:["XS","S","M","L","XL"]},
{id:5,name:"Classic Runner",category:"Chaussures",price:69.99,emoji:"👟",sizes:["38","39","40","41","42","43"]},
{id:6,name:"Oversize Sweat",category:"Vêtements",price:54.99,emoji:"🧥",sizes:["S","M","L","XL"]},
{id:7,name:"Daily Sneaker",category:"Chaussures",price:74.99,emoji:"👟",sizes:["40","41","42","43","44"]},
{id:8,name:"Basic Tee",category:"Vêtements",price:24.99,emoji:"👕",sizes:["XS","S","M","L","XL"]}
];
let filter="Tous",cart=JSON.parse(localStorage.getItem("nexarisCart")||"[]");
const euro=n=>n.toLocaleString("fr-FR",{style:"currency",currency:"EUR"});
function setFilter(f,btn){filter=f;document.querySelectorAll(".filters button").forEach(x=>x.classList.remove("active"));btn.classList.add("active");renderProducts()}
function renderProducts(){
 const q=document.getElementById("search").value.toLowerCase();
 const list=products.filter(p=>(filter==="Tous"||p.category===filter)&&p.name.toLowerCase().includes(q));
 document.getElementById("productGrid").innerHTML=list.map(p=>`<article class="card"><div class="pic">${p.emoji}</div><div class="info"><span class="category">${p.category}</span><h3>${p.name}</h3><div class="price">${euro(p.price)}</div><select class="size" id="size-${p.id}">${p.sizes.map(s=>`<option>${s}</option>`).join("")}</select><button class="add" onclick="add(${p.id})">Ajouter au panier</button></div></article>`).join("");
}
function add(id){
 const p=products.find(x=>x.id===id),size=document.getElementById("size-"+id).value;
 const item=cart.find(x=>x.id===id&&x.size===size);
 if(item)item.qty++; else cart.push({id,size,qty:1});
 save();showToast("Produit ajouté au panier");openCart();
}
function save(){localStorage.setItem("nexarisCart",JSON.stringify(cart));renderCart()}
function renderCart(){
 document.getElementById("cartCount").textContent=cart.reduce((a,x)=>a+x.qty,0);
 const box=document.getElementById("cartItems");
 if(!cart.length){box.innerHTML="<p style='color:#777'>Ton panier est vide.</p>";document.getElementById("total").textContent=euro(0);return}
 let total=0;
 box.innerHTML=cart.map((x,i)=>{const p=products.find(y=>y.id===x.id);total+=p.price*x.qty;return `<div class="cart-item"><div class="mini">${p.emoji}</div><div><b>${p.name}</b><div style="color:#777;font-size:13px">Taille ${x.size} · ×${x.qty}</div><div>${euro(p.price*x.qty)}</div></div><button class="remove" onclick="removeItem(${i})">Supprimer</button></div>`}).join("");
 document.getElementById("total").textContent=euro(total);
}
function removeItem(i){cart.splice(i,1);save()}
function openCart(){document.getElementById("cart").classList.add("open");document.getElementById("overlay").classList.add("show");renderCart()}
function closeCart(){document.getElementById("cart").classList.remove("open");document.getElementById("overlay").classList.remove("show")}
function checkout(){
 if(!cart.length)return showToast("Ton panier est vide");
 alert("Page de commande à connecter au paiement. Pour l'instant, le panier fonctionne localement.");
}
function showToast(t){const x=document.getElementById("toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),1800)}
renderProducts();renderCart();