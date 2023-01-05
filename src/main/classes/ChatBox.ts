export default class ChatBox {
  messagesElement: HTMLElement;
  textOptionSpanElements: NodeListOf<Element>;
  constructor() {
    this.messagesElement = document.getElementById(
      "messages-scroll"
    ) as HTMLElement;

    this.textOptionSpanElements = document.querySelectorAll(
      "button.text-option > span"
    );

    this.textOptionSpanElements.forEach((element) =>
      element.parentElement?.addEventListener("click", () => {
        this.addMessage(element.textContent ?? "", false);
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

  addMessage(message: string, received: boolean) {
    const newMessage = document.createElement("div");
    newMessage.classList.add("message");
    newMessage.classList.add(received ? "received" : "sent");
    newMessage.innerText = message;
    this.messagesElement.appendChild(newMessage);
  }
}
