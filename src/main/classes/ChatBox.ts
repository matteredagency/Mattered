export default class ChatBox {
  messagesElement: HTMLElement;
  textOptionSpanElements: NodeListOf<Element>;
  responseBox: HTMLInputElement;
  sendButton: HTMLButtonElement;

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

    this.sendButton = document.querySelector(
      "#text-box > button"
    ) as HTMLButtonElement;

    this.textOptionSpanElements.forEach((element) =>
      element.parentElement?.addEventListener("click", () => {
        this.addMessageToResponseBox(element.textContent ?? "");
        if (this.sendButton.attributes.getNamedItem("disabled")) {
          this.activateSend();
        }
      })
    );
  }

  activateSend() {
    this.sendButton.removeAttribute("disabled");
    this.sendButton.style.backgroundColor = "#583475";
    this.sendButton.addEventListener("click", () => {
      if (this.responseBox.value) {
        this.addMessageToMessages(this.responseBox.value, false);
      }
      this.responseBox.value = "";
      this.sendButton.style.background = "#f2f2f2";
      this.sendButton.setAttribute("disabled", "true");
    });
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
