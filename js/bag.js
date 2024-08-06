const bagItemContainer = document.querySelector(".bag-items-container");
let bagItemObjects;



const loadBagItemObject = () =>{
    bagItemObjects= bagItems.map((itemId) =>{
        for(let i=0;i<items.length;i++){     
        if(itemId == items[i].id){
            
            return items[i];
            
        }
        
    }});
    
}


const displayBagitemInfo = () =>{
    let innerHTMLTag = ``;
    bagItemObjects.forEach(bagItems => {
        innerHTMLTag += generateBagItemHTML(bagItems);
        
    });
    bagItemContainer.innerHTML = innerHTMLTag;

}
function removeFromBag(itemId) {
    bagItems = bagItems.filter(bagItemId => bagItemId!=itemId);
    localStorage.setItem('bagItems',JSON.stringify(bagItems));
    loadBagItemObject();
    displayBagIcon();
    displayBagitemInfo();
   
};


const displayBagSummary =() =>{
    let totalItem = 0;
    let totalMRP = 0;
    let totalDiscount = 0;
    let convenienceFee = 99;
   
    let bagSummary = document.querySelector(".bag-summary");
    bagItemObjects.forEach(bagItem =>{
        totalMRP += bagItem.original_price;
        totalDiscount += bagItem.original_price - bagItem.current_price;

    });
    let totalAmount = totalMRP - totalDiscount + convenienceFee;
    if(totalMRP == totalDiscount){
        convenienceFee = 0;
        totalAmount =0;
    }
    bagSummary.innerHTML = ` <div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">Rs ${totalMRP}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-Rs ${totalDiscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">Rs ${convenienceFee}</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">Rs ${totalAmount}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="Button">PLACE ORDER</div>
          </button>`;

}


const generateBagItemHTML = (item) =>{
    return `<div class="bag-item-container">
            <div class="item-left-part">
            <img class="bag-item-img" src="${item.image}">
            </div>
            <div class="item-right-part">
            <div class="company">${item.company}</div>
            <div class="item-name">${item.item_name}</div>
            <div class="price-container">
            <span class="current-price">Rs ${item.current_price}</span>
            <span class="original-price">Rs ${item.original_price}</span>
            <span class="discount-percentage">(${item.discount}% OFF)</span>
            </div>
            <div class="return-period">
            <span class="return-period-days">${item.return_period}</span> return available
            </div>
            <div class="delivery-details">
            Delivery by
            <span class="delivery-details-days">${item.delivery_date}</span>
            </div>
            </div>
            <div class="remove-from-cart" onclick = removeFromBag(${item.id})>X</div>
            </div>`;
}


function onLoad () {
    loadBagItemObject();
    displayBagitemInfo();
    displayBagSummary();
}
onLoad();
