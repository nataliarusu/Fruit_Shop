const cartAmountEl = document.querySelector('.cart-main-btn span'); // to display total amount on the header => button
const totalQuantityEl = document.querySelector('.cart-total--q span');
const totalPriceEl = document.querySelector('.cart-total--p span');
const buyBtn = document.querySelector('#buy');


export class BasketRenderer {
  constructor(basketItemsList) {
   this.basketList=basketItemsList;//ul
   this.emptyBasketDisplay = document.querySelector('.cart-empty');// second li from index.html
  } 

  renderTotal(totalAmount) {
    cartAmountEl.innerHTML = totalAmount.toFixed(2);//on the header total price
    totalPriceEl.innerHTML = totalAmount.toFixed(2);//inside the basket total price
  }

  renderNewItem(item, totalAmount, totalQuantity) {
    this.renderItem(item);
    this.renderTotal(totalAmount);//update total, the method above will be called and total in two places will be updated
    this.renderTotalQuantity(totalQuantity);//display/update total quantity
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
    this.basketList.insertBefore(li, this.basketList.lastElementChild);//insert this li before li with total info
    //method of the Node interface inserts a node before a reference node
    //reference node is lastElementChild here and it contains total info and action buttons
    //new item should be added before this info
    
  }

  renderTotalQuantity(totalQuantity) {
    totalQuantityEl.innerHTML = totalQuantity;//inside the basket
  }

  updateQuantity(item, totalAmount, totalQuantity) {//will be called from Basket.js to update info in DOM
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