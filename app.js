const loadMenu=()=>{

const url=`https://openapi.programming-hero.com/api/news/categories`

fetch(url)

.then(res =>res.json())

.then(data =>displaymenu(data.data.news_category))
}
const displaymenu=menus=>{

 const navMenu=document.getElementById('nav-menu')   

menus.forEach(menu=>{

//console.log(menu)
const menuDiv=document.createElement('div')

menuDiv.classList.add('mnudiv')

menuDiv.innerHTML=`

<button type="button" " class="btn" onclick="loadMenuDetails('${menu.category_id}')" >${menu.category_name}</button>

`
navMenu.appendChild(menuDiv)

})

}
//console.log(menus)

const loadMenuDetails=(category_id)=>{

    const url=` https://openapi.programming-hero.com/api/news/category/${category_id}`
    //console.log('details')
//console.log(url)
fetch(url)
.then(res=>res.json())
.then(data =>displayDetails(data.data))
}

const displayDetails=cardShow=>{

console.log(cardShow)

const card=document.getElementById('card')

for(const user of cardShow){
  console.log(user)

  const cardDiv=document.createElement('div')

  cardDiv.innerHTML=`
   <div class="border border-dark d-flex m-5 ">
    <div class="col-md-4">
    <img src="${user.image_url}" class="img-fluid rounded-start h-100" alt="...">
 </div>
 <div class="col-md-8">
   <div class="card-body">
   <h3>  ${user.title}</h3>
     <p class="card-title">${user.details}</p>
     
    <div class="d-flex">
    <img src="${user.author.img}" class="img-fluid rounded-circle w-25  h-25" alt="...">
     <p class="card-text"><small></small></p>
</div>

    </div>
  </div>
    </div>
  `
card.appendChild(cardDiv)




}





    

}

//https://openapi.programming-hero.com/api/news/category/{category_id}

//loadMenuDetails()
loadMenu()