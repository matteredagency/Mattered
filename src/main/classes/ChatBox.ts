export default class ChatBox {
  messagesElement: HTMLElement;
  textOptionSpanElements: NodeListOf<Element>;
  responseBox: HTMLInputElement;
  constructor() {
    this.messagesElement = document.getElementById(
      "messages-scroll"
    ) as HTMLElement;

    this.textOptionSpanElements = document.querySelectorAll(
      "button.text-option > span"
    );

    this.responseBox = document.querySelector(
      "#text-box > input"
    ) as HTMLInputElement;

    this.textOptionSpanElements.forEach((element) =>
      element.parentElement?.addEventListener("click", () => {
        this.addMessageToResponseBox(element.textContent ?? "");
      })
    );
  }

  respondMessage() {}
  introMessages() {}
  // addOptions() {
  //   for (let i = 0; i < responseOptions.length; i++) {
  //     responseOptions[i].classList.add("display-option");
  //   }
  // }

  addMessageToResponseBox(message: string) {
    this.responseBox.value = message;
  }

  addMessageToMessages(message: string, received: boolean) {
    const newMessage = document.createElement("div");
    newMessage.classList.add("message");
    newMessage.classList.add(received ? "received" : "sent");
    newMessage.innerText = message;
    this.messagesElement.appendChild(newMessage);
  }
}
