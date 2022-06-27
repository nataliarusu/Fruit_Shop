const cartAmountEl = document.querySelector('.cart-main-btn span');
const totalQuantityEl = document.querySelector('.cart-total--q span');
const totalPriceEl = document.querySelector('.cart-total--p span');
const buyBtn = document.querySelector('#buy');


export class BasketRenderer {
  constructor(basketItemsList) {
   this.basketList=basketItemsList;
   this.emptyBasketDisplay = document.querySelector('.cart-empty');
  } 

  renderTotal(totalAmount) {
    cartAmountEl.innerHTML = totalAmount.toFixed(2); //because it is get! it is a property and we don't need to add this.totalAmount()
    totalPriceEl.innerHTML = totalAmount.toFixed(2);
  }

  renderNewItem(item, totalAmount, totalQuantity) {
    this.renderItem(item);
    this.renderTotal(totalAmount);
    this.renderTotalQuantity(totalQuantity);
  }

  renderItem(item) {
    const template = document
      .querySelector('.item-template')
      .content.cloneNode(true);
    const li = template.querySelector('li');
    li.setAttribute('id', item.id);
    const imgEl = li.querySelector('img');
    imgEl.src = item.src;
    const title = li.querySelector('.title');
    title.innerHTML = item.title;
    const count = li.querySelector('.count span');
    count.innerHTML = item.quantity;
    const price = li.querySelector('.item-price span');
    price.innerHTML = item.price;
    this.basketList.insertBefore(li, this.basketList.lastElementChild);
  }

  renderTotalQuantity(totalQuantity) {
    totalQuantityEl.innerHTML = totalQuantity;
  }

  updateQuantity(item, totalAmount, totalQuantity) {
    const id = item.id;
    const itemEl = document.getElementById(`${id}`);
    const count = itemEl.querySelector('.count span');
    count.innerHTML = item.quantity;
    this.renderTotal(totalAmount);
    this.renderTotalQuantity(totalQuantity);
  }



  removeItem(id, totalAmount,totalQuantity) {
    const el=document.getElementById(id);
    el.parentNode.removeChild(el);
    this.renderTotal(totalAmount);
    this.renderTotalQuantity(totalQuantity);
    if(totalQuantity===0){
        this.emptyBasketDisplay.classList.remove('hidden');
        document.querySelector('.cart-buy-btn').setAttribute('disabled', 'true');
    }
  }

  removeAllItems(totalAmount,totalQuantity){
    document.querySelectorAll('.item').forEach(el => el.remove());  
    this.renderTotal(totalAmount);
    this.renderTotalQuantity(totalQuantity);
  }
  

}