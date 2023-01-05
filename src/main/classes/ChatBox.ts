export default class ChatBox {
  messagesElement: HTMLElement;
  constructor() {
    this.messagesElement = document.getElementById("messages") as HTMLElement;
  }

  respondMessage() {}
  introMessages() {}
  addOptions() {
    const responseOptions = document.getElementsByClassName("text-option");

    for (let i = 0; i < responseOptions.length; i++) {
      responseOptions[i].classList.add("display-option");
    }
  }
}
