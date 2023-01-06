export default class ChatBox {
  messagesElement: HTMLElement;
  textOptionSpanElements: NodeListOf<Element>;
  responseBox: HTMLInputElement;
  sendButton: HTMLButtonElement;
  typingElement: HTMLDivElement;

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

    this.typingElement = document.createElement("div");
    this.typingElement.classList.add("message");
    this.typingElement.classList.add("typing");
    this.typingElement.classList.add("received");

    for (let i = 0; i < 3; i++) {
      this.typingElement.appendChild(document.createElement("div"));
    }
  }

  setUpTextOptions() {
    this.textOptionSpanElements.forEach((element) => {
      if (element.parentElement) {
        element.parentElement.style.height = "100%";
      }
    });

    setTimeout(() => {
      this.textOptionSpanElements.forEach((element) => {
        if (element.parentElement) {
          element.parentElement.removeAttribute("disabled");
          element.parentElement.style.opacity = "1";
        }
        this.textOptionSpanElements.forEach((element) =>
          element.parentElement?.addEventListener("click", () => {
            this.addMessageToResponseBox(element.textContent ?? "");
            if (this.sendButton.attributes.getNamedItem("disabled")) {
              this.activateSend();
            }
          })
        );
      });
    }, 1000);
  }

  init() {
    setTimeout(() => {
      this.messagesElement.appendChild(this.typingElement);
      setTimeout(() => {
        this.messagesElement.removeChild(
          this.messagesElement.lastChild as Node
        );
        this.addMessageToMessages(
          "Welcome to Mattered! Please let us tell you more about us.",
          true
        );
        setTimeout(() => {
          this.messagesElement.appendChild(this.typingElement);
          setTimeout(() => {
            this.messagesElement.removeChild(
              this.messagesElement.lastChild as Node
            );
            this.addMessageToMessages("Shall we begin?", true);
            this.setUpTextOptions();
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }

  activateSend() {
    this.sendButton.removeAttribute("disabled");
    this.sendButton.style.backgroundColor = "#583475";
    this.responseBox.style.webkitTextFillColor = "#2a292c";
    this.responseBox.style.opacity = "1";
    this.sendButton.addEventListener("click", () => {
      if (this.responseBox.value) {
        this.addMessageToMessages(this.responseBox.value, false);
      }
      this.responseBox.value = "";
      this.sendButton.style.backgroundColor = "#f2f2f2";
      this.sendButton.setAttribute("disabled", "true");
      this.responseBox.style.opacity = "0.5";
    });
  }

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
