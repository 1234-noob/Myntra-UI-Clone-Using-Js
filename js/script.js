
let displayItemOnHomePage = () =>{
    let itemContainerElement = document.querySelector(".items-container");
if (!itemContainerElement){     
    return;
        
 }
    let innerHTML =" ";

    items.forEach(item =>{
    innerHTML += `
                <div class="item-container">
                    <img class="item-img" src="${item.image}" alt="img">
                    <div class="rating">${item.rating.stars} &#11088; ${item.rating.count}</div>
                    <div class="company">${item.company}</div>
                    <div class="item-name">${item.item_name}</div>
                    <div class="price">
                    <span class="current-price">Rs ${item.current_price}</span>
                    <span class="original-price">Rs ${item.original_price}</span>
                    <span class="discount">(${item.discount}% OFF)</span>
                    </div>
                    <button class="btn-add-bag" onclick = "addToBag (${item.id})">Add to Bag</button>
                    </div>`;

})



itemContainerElement.innerHTML = innerHTML;

};



const displayBagIcon = () =>{
    let bagItemsCountElement = document.querySelector(".bag-item-count");
    if(bagItems.length>0){
        bagItemsCountElement.style.visibility = "visible";
        bagItemsCountElement.innerText = bagItems.length;
        
    }   
    else{
        bagItemsCountElement.style.visibility = "hidden";
        
 }

}

let bagItems =[];
function addToBag(itemId){
    bagItems.push(itemId);
    displayBagIcon();
    localStorage.setItem('bagItems',JSON.stringify(bagItems));

}
function onLoad() {
    let bagItemsStr = localStorage.getItem('bagItems');
    bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
    displayItemOnHomePage();
    displayBagIcon();
}
onLoad();











