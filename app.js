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

<button type="button" " class="btn"  onclick="loadMenuDetails('${menu.category_id}')" >${menu.category_name}</button>

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

const displayDetails=data=>{

console.log(data)

const card=document.getElementById('card')


     const cardDiv=document.createElement('div')

   cardDiv.innerHTML=`
    
    
     <div class="col-md-4">
     <img src="${data[0].author.img}" class="img-fluid rounded-start" alt="...">
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title">${data[0].author.name}</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
     </div>
   </div>
    
    
    
    
    
   `

card.appendChild(cardDiv)


    






}






//https://openapi.programming-hero.com/api/news/category/{category_id}

//loadMenuDetails()
loadMenu()