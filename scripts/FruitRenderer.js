
export class FruitRenderer {
    constructor(fruit) {
      this.fruit = fruit;
    }
    render() {
      const template = document.querySelector('.product').content.cloneNode(true);
      const li = template.querySelector('.fruit');
      const img = template.querySelector('.fruit--img-container img');
      const title = li.querySelector('h3');
      const div = li.querySelector('.fruit--description');
      const span = li.querySelector('.fruit--price span');
  
      li.setAttribute('id', this.fruit.id);
      title.innerHTML = this.fruit.title;
      img.src = this.fruit.src;
      div.innerHTML = this.fruit.description;
      span.innerHTML = this.fruit.price;
      return li;
    }
  }
  
  