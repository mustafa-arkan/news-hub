const loadCategories = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayCategories(data.data.news_category))
    .catch((error) => console.log(error));
};

const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("catagories-container");
  categories.forEach((category) => {
    const categoriesLi = document.createElement("li");
    categoriesLi.classList.add("nav-item");

    categoriesLi.innerHTML = `
          <a onclick="loadNews('${category.category_id}')" class="nav-link text-white rounded-pill" href="#"
                >${category.category_name}</a
          >
      `;

    categoriesContainer.appendChild(categoriesLi);
  });
};

// Display category wise news in card
const loadNews = (category_id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayNews(data.data))
    .catch((error) => console.log(error));
};

const displayNews = (newsCards) => {
  //Show Spinner
  toggleSpinner(true);
  // sort by value
  newsCards.sort(function (a, b) {
    return b.total_view - a.total_view;
  });

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = ``;

  newsCards.forEach((card) => {
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
   <div class="card mb-3 shadow-lg rounded">
              <div class="row g-0 p-3">
                <div class="col-md-4">
                  <img src="${
                    card.image_url
                  }" class="img-fluid rounded-5 h-100" alt="..." />
                </div>
                <div class="col-md-8">
                  <div class="card-body m-3">
                    <h5 class="card-title">${card.title}</h5>
                    <p class="card-text text-justify">
                      ${card.details.slice(0, 400) + "..."}
                    </p>
                    <div
                      class="card-text d-flex justify-content-between align-items-center"
                    >
                      <div
                        class="d-flex align-items-center justify-content-start w-25"
                      >
                        <img
                          class="rounded-circle w-25 h-25"
                          src="${card.author.img}"
                          alt=""
                        />
                        <p class="mb-0 mx-2">${
                          card.author.name
                            ? card.author.name
                            : "No Author Found"
                        }</p>
                      </div>
                      <div
                        class="d-flex justify-content-center align-items-center"
                      >
                        <i class="fa-solid fa-eye"></i>
                        <p class="mb-0 mx-2">${
                          card.total_view
                            ? card.total_view
                            : "No Views Available"
                        }</p>
                      </div>
                      <div class="d-none d-lg-block">
                        <i class="fa-solid fa-star-half-stroke"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                      </div>
                      <div>
                          <button
                          onclick = "loadModal('${card._id}')"
                          class="btn btn-danger rounded-pi'll" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                          Details</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
      `;

    cardContainer.appendChild(cardDiv);

    const newsCountText = document.getElementById("news-count");
    newsCountText.innerText = `${newsCards.length} items found for this category`;
  });
  //stop spinner
  toggleSpinner(false);

  newsCards.sort((a, b) => {
    return a.total_view - b.total_view;
  });
};

// Display News Details in a Modal
const loadModal = (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayModal(data.data[0]))
    .catch((error) => console.log(error));
};

const displayModal = (modal) => {
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
      <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="card-title text-danger fw-bold">${
                            modal.title
                          }</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                          <div>
                              <img
                                  class=" w-100 img-fluid"
                                  src="${modal.image_url}"
                                  alt=""
                                />
                              <div class="my-3 row ">
                                <div class="col-6">
                                <img style =" width: 50%;"
                                  class=" img-fluid rounded-circle col-6"
                                  src="${modal.author.img}"
                                  alt=""
                                />
                                </div>
                                <div class="col-6 align-self-center">
                                <p class=" mb-0">${
                                  modal.author.name
                                    ? modal.author.name
                                    : "No Author Found"
                                }</p>
                                <p class="mb-0">${
                                  modal.author.published_date
                                }</p>
                                </div>
                                </div>
                                <div>
                                <p> ${modal.details}</p>
                                </div>
                                </div>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-danger rounded-pill" data-bs-dismiss="modal">Close</button>
                              </div>
                  </div>


     `;
};

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

loadCategories();
loadNews("01");
loadModal();
