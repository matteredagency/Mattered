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
    setTimeout(() => {
      this.textOptionSpanElements.forEach((element) => {
        if (element.parentElement) {
          element.parentElement.removeAttribute("disabled");
          element.parentElement.style.opacity = "1";
        }
        this.textOptionSpanElements.forEach((element, selectedIndex) => {
          if (element.parentElement) {
            element.parentElement.addEventListener("click", () => {
              element.parentElement?.classList.add("selected-text-option");
              this.textOptionSpanElements.forEach((element, index) => {
                if (selectedIndex !== index) {
                  element.parentElement?.classList.remove(
                    "selected-text-option"
                  );
                }
              });
              this.addMessageToResponseBox(element.textContent ?? "");
              if (this.sendButton.attributes.getNamedItem("disabled")) {
                this.activateSend();
              }
            });
          }
        });
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
      this.textOptionSpanElements.forEach((element) => {
        element.parentElement?.classList.remove("selected-text-option");
      });
      if (this.responseBox.value === "Show me what you can do") {
        setTimeout(() => {
          this.startExperience();
        }, 500);
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

  startExperience() {
    const currentWindowHeight = window.screen.height;
    const textArea = document.getElementById("text");

    textArea!.style.transform = `translate(0, ${
      currentWindowHeight - textArea!.getBoundingClientRect().top
    }px)`;
    textArea!.style.overflow = "inherit";

    const messagesArea = document.getElementById("messages");
    messagesArea!.classList.add("messages-fall");

    messagesArea!.style.transform = `translate(0, ${
      currentWindowHeight - messagesArea!.getBoundingClientRect().top
    }px)`;
    this.textOptionSpanElements.forEach((element, index) => {
      let rotation = Math.round(Math.random() * 33);
      if (index % 2 === 0) rotation *= -1;
      element.parentElement!.style.transform = `rotate(${rotation}deg)`;
    });

    const messages = document.querySelectorAll("div.message");
    messages[0].parentElement?.parentElement?.style.removeProperty(
      "overflow-y"
    );
    messages.forEach((element, index) => {
      let rotation = Math.round(Math.random() * 33);
      if (index % 2 === 0) rotation *= -1;
      //@ts-ignore
      element.style.transform = `rotate(${rotation}deg)`;
    });

    // this.responseBox.style.position = "absolute";
    // this.responseBox.style.removeProperty("grid-column");
    // this.responseBox.style.transform = `translate(0, 200px) rotate(-10deg)`;
  }
}
