async function Home() {
  loading(false);
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );

  let data = await response.json();
  displayHome(data.meals);
  loading(true);
}

function displayHome(x) {
  let box = "";
  for (let index = 0; index < x.length; index++) {
    box += `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
              <div class="card position-relative overflow-hidden border-black" onclick="Meal(this.id)" id="${x[index].idMeal}">
                <img src="${x[index].strMealThumb}" alt="..." />
                <div
                  class="card-body position-absolute top-0 end-0 start-0 bottom-0 align-items-center d-flex"
                >
                  <h2 class="card-title">${x[index].strMeal}</h2>
                </div>
              </div>
      </div>`;
  }

  $(".links ul li").animate({ top: "300px" }, 500);
  $(".side-nav").animate({ left: "-155" }, 500, function () {
    document.getElementById("rowData").innerHTML = box;
  });
  $(".menu").removeClass("fa-close");
  $(".menu").addClass("fa-align-justify");
}

async function Meal(id) {
  loading(false);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let data = await response.json();
  displayMeal(data.meals[0]);
  loading(true);
}

function displayMeal(x) {
  let box = "";
  let y = ``;
  for (let i = 1; i <= 20; i++) {
    if (x[`strIngredient${i}`] != "") {
      y += `<li class="alert alert-info m-2 p-1">${x[`strMeasure${i}`]} ${
        x[`strIngredient${i}`]
      }</li>`;
    }
  }
  box += `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${x.strMealThumb}" alt="">
                    <h2>${x.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${x.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${x.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${x.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap" id="resep">
                ${y}
              </ul>

                <h3>Tags :</h3>
               <ul class="list-unstyled d-flex g-3 flex-wrap">
                    
        <li class="alert alert-danger m-2 p-1">${x.strTags}</li>
                </ul>

              <a target="_blank" href="${x.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${x.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`;

  $(".links ul li").animate({ top: "300px" }, 500);
  $(".side-nav").animate({ left: "-155" }, 500, function () {
    document.getElementById("rowData").innerHTML = box;
  });
  $(".menu").removeClass("fa-close");
  $(".menu").addClass("fa-align-justify");
}
Home();
//serch
function Search() {
  let box = "";
  $("#search").removeClass("d-none");
  box = `
        <div class="col-6 ">
            <input oninput="searchByword(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-6">
            <input oninput="searchByLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    `;

  $(".links ul li").animate({ top: "300px" }, 500);
  $(".side-nav").animate({ left: "-155" }, 500, function () {
    document.getElementById("search").innerHTML = box;
  });
  $(".menu").removeClass("fa-close");
  $(".menu").addClass("fa-align-justify");
}

async function searchByLetter(search) {
  try {
    loading(false);
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`
    );
    let data = await response.json();

    displaySearch(data.meals);
    loading(true);
  } catch (error) {
    Home();
    loading(true);
  }
}
async function searchByword(search) {
  try {
    loading(false);
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    );
    let data = await response.json();
    displaySearch(data.meals);
    loading(true);
  } catch (error) {
    Home();
    loading(true);
  }
}
function displaySearch(x) {
  let box = "";
  for (let index = 0; index < x.length; index++) {
    box += `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
              <div class="card position-relative overflow-hidden border-black" onclick="Meal(this.id)" id="${x[index].idMeal}">
                <img src="${x[index].strMealThumb}" alt="..." />
                <div
                  class="card-body position-absolute top-0 end-0 start-0 bottom-0 align-items-center d-flex"
                >
                  <h2 class="card-title">${x[index].strMeal}</h2>
                </div>
              </div>
      </div>`;
  }

  $(".links ul li").animate({ top: "300px" }, 500);
  $(".side-nav").animate({ left: "-155" }, 500, function () {
    document.getElementById("rowData").innerHTML = box;
  });
  $(".menu").removeClass("fa-close");
  $(".menu").addClass("fa-align-justify");
}
//end search

//Category
async function Category() {
  loading(false);
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  let data = await response.json();
  displayCategory(data.categories);
  loading(true);
}

function displayCategory(x) {
  let box = "";
  for (let index = 0; index < x.length; index++) {
    box += `
   <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="card position-relative overflow-hidden border-black" onclick="Alphabet(this.id)" id="${
                  x[index].strCategory
                }">
                    <img class=" bg-black" src="${
                      x[index].strCategoryThumb
                    }" alt="" srcset="">
                    <div   class="card-body position-absolute top-0 end-0 start-0 bottom-0 text-center ">
                         <h3 class="card-title">${x[index].strCategory}</h3>
                        <p>${x[index].strCategoryDescription
                          .split(" ")
                          .splice(0, 20)
                          .join(" ")}</p>
                    </div>
                </div>
        </div>`;
  }

  $(".links ul li").animate({ top: "300px" }, 500);
  $(".side-nav").animate({ left: "-155" }, 500, function () {
    document.getElementById("rowData").innerHTML = box;
  });
  $(".menu").removeClass("fa-close");
  $(".menu").addClass("fa-align-justify");
}

async function Alphabet(id) {
  loading(false);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`
  );
  let data = await response.json();
  displayAlphabet(data.meals.splice(0, 20));
  loading(true);
}

function displayAlphabet(x) {
  let box = "";
  for (let index = 0; index < x.length; index++) {
    box += `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
              <div class="card position-relative overflow-hidden border-black" onclick="Meal(this.id)" id="${
                x[index].idMeal
              }">
                <img src="${x[index].strMealThumb}" alt="..." />
                <div
                  class="card-body position-absolute top-0 end-0 start-0 bottom-0 text-center"
                >
                  <h2 class="card-title">${x[index].strMeal
                    .split(" ")
                    .splice(0, 20)
                    .join(" ")}</h2>
                </div>
              </div>
      </div>`;
  }
  $(".links ul li").animate({ top: "300px" }, 500);
  $(".side-nav").animate({ left: "-155" }, 500, function () {
    document.getElementById("rowData").innerHTML = box;
  });
  $(".menu").removeClass("fa-close");
  $(".menu").addClass("fa-align-justify");
}
//end Category

//Area
async function Area() {
  loading(false);
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  let data = await response.json();
  displayArea(data.meals);
  loading(true);
}

function displayArea(x) {
  let box = "";
  for (let index = 0; index < x.length; index++) {
    box += `
   <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="card bg-black text-white text-center" onclick="Tag(this.id)" id="${x[index].strArea}">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${x[index].strArea}</h3>
                </div>
        </div>
        `;
  }

  $(".links ul li").animate({ top: "300px" }, 500);
  $(".side-nav").animate({ left: "-155" }, 500, function () {
    document.getElementById("rowData").innerHTML = box;
  });
  $(".menu").removeClass("fa-close");
  $(".menu").addClass("fa-align-justify");
}

async function Tag(id) {
  loading(false);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${id}`
  );
  let data = await response.json();
  displayTag(data.meals.splice(0, 20));
  loading(true);
}

function displayTag(x) {
  let box = "";
  for (let index = 0; index < x.length; index++) {
    box += `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
              <div class="card position-relative overflow-hidden border-black" onclick="Meal(this.id)" id="${
                x[index].idMeal
              }">
                <img src="${x[index].strMealThumb}" alt="..." />
                <div
                  class="card-body position-absolute top-0 end-0 start-0 bottom-0 text-center"
                >
                  <h4 class="card-title">${x[index].strMeal
                    .split(" ")
                    .splice(0, 20)
                    .join(" ")}</h4>
                </div>
              </div>
      </div>`;
  }
  $(".links ul li").animate({ top: "300px" }, 500);
  $(".side-nav").animate({ left: "-155" }, 500, function () {
    document.getElementById("rowData").innerHTML = box;
  });
  $(".menu").removeClass("fa-close");
  $(".menu").addClass("fa-align-justify");
}
//end Area

//Ingredient
async function Ingredient() {
  loading(false);
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  let data = await response.json();
  displayIngredient(data.meals.splice(0, 20));
  loading(true);
}

function displayIngredient(x) {
  let box = "";
  for (let index = 1; index < x.length; index++) {
    box += `
<div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="card bg-black text-white text-center" onclick="help(this.id)" id="${
                  x[index].strIngredient
                }">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${x[index].strIngredient}</h3>
                        <p>${x[index].strDescription
                          .split(" ")
                          .splice(0, 20)
                          .join(" ")}</p> 
                </div>
        </div>
        `;
  }

  $(".links ul li").animate({ top: "300px" }, 500);
  $(".side-nav").animate({ left: "-155" }, 500, function () {
    document.getElementById("rowData").innerHTML = box;
  });
  $(".menu").removeClass("fa-close");
  $(".menu").addClass("fa-align-justify");
}

async function help(id) {
  loading(false);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${id}`
  );
  let data = await response.json();
  displayhelp(data.meals.splice(0, 20));
  loading(true);
}

function displayhelp(x) {
  let box = "";
  for (let index = 0; index < x.length; index++) {
    box += `
   <div class="col-12 col-sm-6 col-md-4 col-lg-3">
              <div class="card position-relative overflow-hidden border-black" onclick="Meal(this.id)" id="${
                x[index].idMeal
              }">
                <img src="${x[index].strMealThumb}" alt="..." />
                <div
                  class="card-body position-absolute top-0 end-0 start-0 bottom-0 align-items-center d-flex"
                >
                  <h4 class="card-title">${x[index].strMeal
                    .split(" ")
                    .splice(0, 20)
                    .join(" ")}</h4>
                </div>
              </div>
      </div>`;
  }
  $(".links ul li").animate({ top: "300px" }, 500);
  $(".side-nav").animate({ left: "-155" }, 500, function () {
    document.getElementById("rowData").innerHTML = box;
  });
  $(".menu").removeClass("fa-close");
  $(".menu").addClass("fa-align-justify");
}
//end Ingredients

//ContactUs
function ContactUs() {
  let box = "";

  box += `
  <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input id="passwordInput" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input id="repasswordInput" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword
                </div>
            </div>
        </div>
        <button id="submitBtn"  class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div>`;

  $(".links ul li").animate({ top: "300px" }, 500);
  $(".side-nav").animate({ left: "-155" }, 500, function () {
    document.getElementById("rowData").innerHTML = box;
  });
  $(".menu").removeClass("fa-close");
  $(".menu").addClass("fa-align-justify");
}
// end ContactUs
function loading(x) {
  if (x == true) {
    $(document).ready(function () {
      $(".loading").fadeOut(500, function () {
        $("body").removeClass("overflow-hidden");
      });
    });
  } else {
    $(".loading").fadeIn(500);
    $("body").addClass("overflow-hidden");
  }
}
$(".menu").click(function () {
  if ($(".side-nav").css("left") == "-155px") {
    $(".side-nav").animate({ left: "0px" }, 500);
    $(".links ul li").eq(0).animate({ top: "0px" }, 300, function () {
        $(".links ul li")
          .eq(1)
          .animate({ top: "0px" }, 300, function () {
            $(".links ul li")
              .eq(2)
              .animate({ top: "0px" }, 300, function () {
                $(".links ul li")
                  .eq(3)
                  .animate({ top: "0px" }, 300, function () {
                    $(".links ul li")
                      .eq(4)
                      .animate({ top: "0px" }, 300, function () {});
                  });
              });
          });
      });

    $(this).addClass("fa-close");
    $(this).removeClass("fa-align-justify");
  } else {
    $(".links ul li").animate({ top: "300px" }, 500);
    $(".side-nav").animate({ left: "-155" }, 500);
    $(this).removeClass("fa-close");
    $(this).addClass("fa-align-justify");
  }
});
