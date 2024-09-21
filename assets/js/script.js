let baseUrl = "https://fakestoreapi.com/products";
let endPoint = "categories";
async function getAllCategories(){
  let color = [
    {
      colorName:"#08f", 
    },
    {
      colorName:"#ffa233"
    },
    {
      colorName:"gray"
    },
    {
      colorName:"navy"
    }
  ]
  let fetchCategory_productApi = await fetch(`${baseUrl}/${endPoint}`);
  let getCategories = await fetchCategory_productApi?.json();
  let colors = getCategories?.concat(color?.map((i) => i?.colorName))
  let category = "<div class='row'>";
  for(let i = 0; i <= 3; i++){
    let escapedCategory = colors[i]?.replace(/'/g, "\\'")
    category += `<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
       <button 
         type="button" 
         class="btn-custom-responsive mt-2 ml-2 text-nowrap text-white"
         style="background-color:${color[i]?.colorName}"
         onclick="getInProductCategory('${escapedCategory}')"
        >
         ${colors[i]}
       </button>
     </div>
    `
   }
  category += "</div>";
  document.querySelector("#product_category").innerHTML = category;
  getInProductCategory(getCategories[0])
  return getCategories;
}

getAllCategories()

async function getInProductCategory(i) {
  let getInProductCategory_API = await fetch(`${baseUrl}/category/${i}`)
  let getInProductCategory = await getInProductCategory_API?.json()
  let product_category_list = "<div class='row p-2'>"
   getInProductCategory?.forEach(function(pro){
    product_category_list += `<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
      <div class="card p-2 mt-2">
        <img src="${pro?.image}" class='w-100 p-2' alt="" style="height:475px"/>
        <a href="#" class="text-decoration-none" title="${pro?.title}">
         <h2 class="text-center text-secondary text-truncate">${pro?.title}</h2>
        </a>
        <p class="text-center text-secondary text-truncate" title="${pro?.description}">${pro?.description}</p>
        <span class="text-center text-info">${"$" + pro?.price}</span>
      </div>
    </div>
    `
   })
  product_category_list += "</div>"
  document.querySelector("#product_category_list").innerHTML = product_category_list
  return getInProductCategory
}
