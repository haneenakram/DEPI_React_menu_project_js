var base_url ="https://forkify-api.herokuapp.com/api";
var options = ['carrot','broccoli','asparagus','cauliflower','corn','cucumber','green pepper', 'lettuce','mushrooms', 'onion','potato','pumpkin','red pepper','tomato','beetroot','brussel sprouts','peas','zucchini','radish','sweet potato','artichoke','leek','cabbage','celery','chili','garlic','basil','coriander','parsley','dill','rosemary','oregano','cinnamon','saffron','green bean','bean','chickpea','lentil','apple','apricot','avocado','banana','blackberry','blackcurrant','blueberry','boysenberry','cherry','coconut','fig','grape','grapefruit','kiwifruit','lemon','lime','lychee','mandarin','mango','melon','nectarine','orange','papaya','passion fruit','peach','pear','pineapple','plum','pomegranate','quince','raspberry','strawberry','watermelon','salad','pizza','pasta','popcorn','lobster','steak','bbq','pudding' ,'hamburger','pie','cake','sausage' ,'tacos' ,'kebab' ,'poutine' ,'seafood' ,'chips' ,'fries' ,'masala','paella','som tam','chicken','toast','marzipan','tofu','ketchup','hummus','chili','maple syrup','parma ham','fajitas','champ','lasagna','poke','chocolate','croissant','arepas','bunny chow','pierogi','donuts','rendang','sushi','ice cream','duck','curry','beef','goat','lamb','turkey','pork','fish','crab','bacon','ham','pepperoni','salami','ribs'];
function getAPI(endpoint){
    fetch(base_url+"/search?q="+endpoint)
    .then(function (response) {
    return response.json();
    }).then(function(data){
        // console.log(data);
        // console.log(data.recipes);
        displayRecipes(data.recipes);
    })

}
getAPI('pizza');
var recipesContainer=document.getElementById("resipes-container");
var menuList = document.querySelector('#menu ul');
var controlMenu = document.getElementById("control-menu");
var menu = document.getElementById("menu");
var Query = "pizza";

function changemenu(){
        // console.log("clicked");
    if(menu.style.left === '-100%'){
        menu.style.left = '0';
        controlMenu.classList.replace('text-white-50', 'text-white')
    }else{
        menu.style.left = '-100%';
        controlMenu.classList.replace('text-white', 'text-white-50')
    }
}
for (let i = 0; i < options.length; i++) {
    var optionEle = document.createElement('li');
    optionEle.classList.add('py-3', 'ps-3', 'border-bottom', 'fs-3');
    optionEle.setAttribute('id', options[i]);
    optionEle.innerHTML =`<span></span> <p>${options[i]}</p>`;
    menuList.appendChild(optionEle);
}
menuList.addEventListener('click', function(e){
    if(e.target.innerText != ''){
        getAPI(e.target.innerText)
    }
    menu.style.left = '-100%';
})

function displayRecipes(recipes){
    var str="";
    for (let i = 0; i < recipes.length; i++) {
        str+=`
        <div class="col-md-4" id=${recipes[i].recipe_id } onclick="recipeContainerwindow('${recipes[i].recipe_id}')">
            <div class="resipe-box make-pointer bg-light shadow-lg border rounded">
            <div class="resipe-img">
            <img src=${recipes[i].image_url} class='w-100 img-fluid' alt="">
            </div>
            <div class="content px-2">
                <h3 class="my-3 fs-5">${recipes[i].title}</h3>
                <p>${recipes[i].publisher}</p>
            </div>
            </div>
        </div>
        `
    }
    recipesContainer.innerHTML = str;
}

var resipeOrederContainer = document.querySelector('#resipe-oreder-container')
function recipeContainerwindow(recipeid){
    resipeOrederContainer.classList.replace("d-none","d-flex");
    GETAPI(recipeid);
}


var resipeOrederBox = document.querySelector('#resipeOreder-box')
function closewindow(){
    // console.log("close");
    resipeOrederContainer.classList.replace('d-flex', 'd-none')
}

var respiBoxImg = document.querySelector('#respi-box-img');
var respiTitle = document.querySelector('#respi-title');
var respiPuplsher = document.querySelector('#respi-puplesher');
var ingredinetsMenu = document.querySelector('#ingredinets-menu');
var source=document.getElementById("source");
var publisher=document.getElementById("publisher");

function GETAPI(recipeid){
    fetch(base_url+"/get?rId="+recipeid)
    .then(function (response) {
    return response.json();
    }).then(function(data){
        displayRecipeDetails(data.recipe)
        console.log(data.recipe);
    })
}

function displayRecipeDetails(recipe){
    for(var i = 0; i < recipe.ingredients.length; i++){
        var li = document.createElement('li');
        li.innerHTML = recipe.ingredients[i];
        li.classList.add('py-2','border-bottom', 'border-1', 'border-black');
        ingredinetsMenu.appendChild(li);
    }
    source.href=recipe.source_url;
    publisher.href=recipe.publisher_url;
    // console.log(source);
    respiBoxImg.src = recipe.image_url;
    respiTitle.innerText = recipe.title;
    respiPuplsher.innerText = recipe.publisher;
}

