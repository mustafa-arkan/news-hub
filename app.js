const loadMenu=()=>{

const url=`https://openapi.programming-hero.com/api/news/categories`

fetch(url)

.then(res =>res.json())

.then(data =>displaymenu(data.data.news_category))

.catch(e=>{

  console.log(e)
})



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

card.textContent=' '

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
     <p class="card-title">${user.details.slice(0,400)+'...'}</p>
     
    <div class="d-flex">
    <img src="${user.author.img}" class="img-fluid rounded-circle w-25  h-15" alt="...">
     <h6 class="card-text mt-5"><small>${user.author.name}</small></h6>
     <i class="fa-solid fa-eye ms-5 mt-5"></i>
     <h6 class="mt-5" >${user.total_view}</h6>
     <button type="button" class="btn btn-primary mx-5 mt-5 h-25 w-25" >Details</button>

</div>

    </div>
  </div>
    </div>
  `
card.appendChild(cardDiv)

const newsCountText=document.getElementById('news-count')

newsCountText.innerText=`${cardShow.length} items found `

// datas.sort((a, b) => {
//return b.propertyName - a.propertyName;
//});


}





    

}

//https://openapi.programming-hero.com/api/news/category/{category_id}

//loadMenuDetails()
loadMenu()