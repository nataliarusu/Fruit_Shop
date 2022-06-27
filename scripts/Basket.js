import { BasketRenderer } from './BasketRenderer.js';
export class Basket {
  #items;
  #totalQuantity;
  constructor(basketItemsList) {
    this.#items = [];
    this.#totalQuantity = 0;
    this.basketRenderer = new BasketRenderer(basketItemsList);
  }
  get totalAmount() {
    const sum = this.#items.reduce(
      //reduce go through full array like (for loop but this return ...)
      (sum, currentItem) => {
        return (
          (sum * 100 + currentItem.price * currentItem.quantity * 100) / 100
        );
      },
      0
    );
    return sum;
  }
  get itemsInBasket() {
    return this.#items;
  }

  get totalItemsQuantity() {
    return this.#totalQuantity;
  }

  addItem(newItem) {
    newItem.id = `${newItem.id}-b`;//generate new id, so DOM els id will be unic
    const item = this.itemsInBasket.find((item) => item.id === newItem.id);//look up if the new added item is in the basket
    if (item) {
      this.addUnit(item);
      this.basketRenderer.updateQuantity(
        item,
        this.totalAmount,
        this.totalItemsQuantity
      );
    } else {
      this.#totalQuantity++;
      newItem.quantity = 1;//set new property to the added product
      this.#items.push(newItem);
      this.basketRenderer.renderNewItem(
        newItem,
        this.totalAmount,
        this.totalItemsQuantity
      );
    }
  }

  addUnit(item) {
    item.quantity++;
    this.#totalQuantity++;
  }

  increaseUnits(id) {
    const item = this.itemsInBasket.find((item) => item.id === id);
    this.addUnit(item);
    this.basketRenderer.updateQuantity(
      item,
      this.totalAmount,
      this.totalItemsQuantity
    );
  }

  decreaseUnits(id) {
    const item = this.itemsInBasket.find((item) => item.id === id);
    item.quantity--;
    this.#totalQuantity--;
    if (item.quantity) {
      this.basketRenderer.updateQuantity(
        item,
        this.totalAmount,
        this.totalItemsQuantity
      );
    } else {
      this.removeItem(id);
    }
  }

  removeItem(id) {
    const idx = this.#items.findIndex((item) => item.id === id);
    const quantity = this.#items[idx].quantity;

    const copyItems = [...this.#items];//create an immutable copy of an array 
    copyItems.splice(idx, 1);
    this.#items = [...copyItems];
    
    this.#totalQuantity = this.#totalQuantity - quantity;
    this.basketRenderer.removeItem(
        id,
        this.totalAmount,
        this.totalItemsQuantity
      );
  }

  deleteAllItems(){
    this.#items.splice(0);
    this.#totalQuantity=0;
    this.basketRenderer.removeAllItems(this.totalAmount,this.totalItemsQuantity);
  }
}
