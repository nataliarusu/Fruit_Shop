import { FruitsRenderer } from './FruitsRenderer.js';
import { Fruit } from './Fruit.js';
import { getData } from './UI/dataloader.js';
import { Basket } from './Basket.js';
import { ConfirmActionRenderer } from './ConfirmActionRenderer.js';

const main = document.querySelector('main');
const backdrop = document.querySelector('.backdrop');
const cart = document.querySelector('.cart');
const cartBtn = document.querySelector('.cart-main-btn');
const exitBasketBtn = cart.querySelector('.cart-shop-btn');
const buyNowBtn = cart.querySelector('.cart-buy-btn');

const basketItemsList = document.querySelector('.cart-items');
const emptyBasketDisplay = document.querySelector('.cart-empty');
const confirmActionBlock = document.querySelector('#confirm--buy-block'); 

const fruitsListType = {//DOM sections
  apples: main.querySelector('#apples ul'),
  grapes: main.querySelector('#grapes ul'),
  bananas: main.querySelector('#bananas ul'),
};

//arrays to store JS objects
let apples = [];
let grapes = [];
let bananas = [];

getData('./data/apples.json').then((result) => {
  apples = result.map(
    (item) =>
      new Fruit(item.title, item.url, item.description, item.price, item.id)
  );
  return new FruitsRenderer(apples, fruitsListType.apples).render();
});

getData('./../data/grapes.json').then((result) => {
  grapes = result.map(
    (item) =>
      new Fruit(item.title, item.url, item.description, item.price, item.id)
  );
  return new FruitsRenderer(grapes, fruitsListType.grapes).render();
});

getData('./../data/bananas.json').then((result) => {
  bananas = result.map((item) => {
    return new Fruit(
      item.title,
      item.url,
      item.description,
      item.price,
      item.id
    );
  });
  return new FruitsRenderer(bananas, fruitsListType.bananas).render();
});

const basket = new Basket(basketItemsList);

const addToBasket = (ev) => {
  if (ev.target.nodeName === 'BUTTON') {
    const fruitType = ev.target.closest('section').id;
    const id = ev.target.closest('li').id;
    let product;
    switch (fruitType) {
      case 'apples':
        product = apples.find((el) => el.id === id);
        break;
      case 'grapes':
        product = grapes.find((el) => el.id === id);
        break;
      case 'bananas':
        product = bananas.find((el) => el.id === id);
        break;
    }

    basket.addItem({ ...product });
  }
};

const addHidden=(...els)=>{
  for(const el of els){
    el.classList.add('hidden');
  }  
}
const removeHidden=(...els)=>{
  for(const el of els){
    el.classList.remove('hidden');
  }  
}
const addDisabled=(...els)=>{
  for(const el of els){
    el.setAttribute('disabled', 'true');
  }    
}
const removeDisabled=(...els)=>{
  for(const el of els){
    el.removeAttribute('disabled');
  }   
}

const showBasketItems = () => {
  removeHidden(cart, backdrop);
  if (basket.itemsInBasket.length === 0) {
    removeHidden(emptyBasketDisplay);
    addDisabled(buyNowBtn);
    
  } else {
    addHidden(emptyBasketDisplay);
    removeDisabled(buyNowBtn);
  }
};

const hideBasketItems = () => {
  addHidden(cart, backdrop);
};

const basketItemsBtnsHandler = (ev) => {
  const id = ev.target.closest('li').id;
  const btnClasses = ev.target.classList;
  if (btnClasses.contains('increase-btn')) {
    basket.increaseUnits(id);
  } else if (btnClasses.contains('decrease-btn')) {
    basket.decreaseUnits(id);
  } else if (btnClasses.contains('remove-item')) {
    basket.removeItem(id);
  }
};

const confirmEventHandler = () => {
  const basketBtns=basketItemsList.querySelectorAll('button');
  confirmActionBlock.classList.add('modal');
  /**prevent user form modifying basket while confirm block is active, 
   * in case the hidden class was accidentally removed from the basket list, all buttons are disabled*/
  addDisabled(...basketBtns);
  addHidden(cart);
  removeHidden(confirmActionBlock);
  const confirmed=()=>{
    basket.deleteAllItems();
    confirmActionBlock.classList.remove('modal');
    addHidden(backdrop);
    removeDisabled(exitBasketBtn);
  };
  const cancel=()=>{
    confirmActionBlock.classList.remove('modal');
    addHidden(backdrop);
    removeDisabled(...basketBtns);
  };
 
  new ConfirmActionRenderer(confirmActionBlock, basket.totalAmount, confirmed, cancel).render();
};

for (const type in fruitsListType) {
  fruitsListType[type].addEventListener('click', addToBasket);
}
cartBtn.addEventListener('click', showBasketItems);
exitBasketBtn.addEventListener('click', hideBasketItems);
basketItemsList.addEventListener('click', basketItemsBtnsHandler);
buyNowBtn.addEventListener('click', confirmEventHandler);
