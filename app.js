const loadMenu=()=>{

const url=`https://openapi.programming-hero.com/api/news/categories`

fetch(url)

.then(res =>res.json())

.then(data =>displaymenu(data.data.news_category))

.catch(e=>{ console.log(e,'data not found')
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
//not found
const notFound=document.getElementById('not-found')

if(cardShow.length===0){
  notFound.classList.remove('d-none')
}
else{
  notFound.classList.add('d-none')
}

//not found end



//sort

//cardShow=cardShow.slice(0,5)

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
     <h6 class="card-text mt-5"><small>${user.author.name?user.author.name:'No data found'}</small></h6>
     <i class="fa-solid fa-eye ms-5 mt-5"></i>
     <h6 class="mt-5" >${user.total_view? user.total_view:'No data found'}</h6>
     <button type="button"  onclick="loadModal('${user._id}')"  href="#" class="btn btn-primary h-25 w-25 mx-5 mt-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    Details
  </button>

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


//stop spin toggle





    

}




const loadModal=(news_id)=>{

const url=` https://openapi.programming-hero.com/api/news/${news_id}`

//const url=` https://openapi.programming-hero.com/api/news/category/${category_id}`

fetch(url)
.then(res=> res.json())

.then(data=>displayModal(data.data))

.catch(error=>console.log(error))


}

const displayModal=(modal)=>{

console.log(modal)

const modalContainer=document.getElementById('staticBackdrop')


modalContainer.innerHTML=`


<div class="modal-dialog  ">
      <div class="modal-content">
        <div class="modal-header">
          <p class="modal-title" id="staticBackdropLabel">${modal[0]}</p>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h5>Jimmiy Dane</h5>
          <h6>Total view:488</h6>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          
        </div>
      </div>
    </div>




`






}

loadModal()

loadMenuDetails('01')
loadMenu()
displayDetails()