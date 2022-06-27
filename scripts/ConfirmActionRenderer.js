export class ConfirmActionRenderer {
  constructor(block, total, confirm, cancel) {
    this.block = block;
    this.total = total;
    this.confirm = confirm;
    this.cancel = cancel;
  }
  render() {
    const messageEl = document.createElement('div');
    const message = `Your total amount to pay is £${this.total.toFixed(2)}.
    Unfortunately, the payment page is not supported. We will reset your basket.`;
    messageEl.innerHTML = message;
    const actionsBtnsContainer = document.createElement('div');
    actionsBtnsContainer.setAttribute('class', 'confirm--actions');
    const confirmBtn = document.createElement('button');
    confirmBtn.classList.add('btn');
    confirmBtn.innerHTML = 'Confirm';
    confirmBtn.addEventListener('click', () => {
      this.block.innerHTML = '';
      this.confirm();
    });

    const cancelBtn = document.createElement('button');
    cancelBtn.classList.add('btn');
    cancelBtn.innerHTML = 'Back to shopping';
    cancelBtn.addEventListener('click', () => {
      this.block.innerHTML = '';
      this.cancel();
    });
    actionsBtnsContainer.append(cancelBtn, confirmBtn);
    this.block.append(messageEl, actionsBtnsContainer);
  }
}
