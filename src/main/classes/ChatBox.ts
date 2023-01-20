import MatteredExperience from "./MatteredExperience";

export default class ChatBox {
  messagesElement: HTMLElement;
  textOptionSpanElements: NodeListOf<Element>;
  responseBox: HTMLInputElement;
  sendButton: HTMLButtonElement;
  typingElement: HTMLDivElement;
  messagesWrapper: HTMLDivElement;
  experience: MatteredExperience;
  chatWindow: HTMLDivElement;

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

    this.chatWindow = document.getElementById("chat-window") as HTMLDivElement;
    this.messagesWrapper = document.getElementById(
      "messages-wrapper"
    ) as HTMLDivElement;

    this.experience = new MatteredExperience();
    this.typingElement = document.createElement("div");
    this.typingElement.classList.add("message");
    this.typingElement.classList.add("typing");
    for (let i = 0; i < 3; i++) {
      this.typingElement.appendChild(document.createElement("div"));
    }
  }

  setUpTextOptions() {
    setTimeout(() => {
      this.textOptionSpanElements.forEach((element, index) => {
        if (element.parentElement) {
          if (index !== 0) element.parentElement.removeAttribute("disabled");
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
        this.addMessageToMessages("Welcome to Mattered!", true);

        setTimeout(() => {
          this.messagesElement.appendChild(this.typingElement);

          setTimeout(() => {
            this.messagesElement.removeChild(
              this.messagesElement.lastChild as Node
            );
            this.addMessageToMessages(
              "Please let us tell you more about us.",
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
      }, 1000);
    }, 1000);
  }

  activateSend() {
    this.sendButton.removeAttribute("disabled");
    this.sendButton.style.backgroundColor = "black";
    this.responseBox.style.webkitTextFillColor = "#2a292c";
    this.responseBox.style.opacity = "1";
    this.sendButton.addEventListener("click", () => {
      if (this.responseBox.value === "Show me what you can do") {
        this.sendButton.setAttribute("disabled", "true");
        this.addMessageToMessages("Hi Mattered!", false);
        setTimeout(() => {
          this.addMessageToMessages("Show me what you can do", false);

          setTimeout(() => {
            this.messagesElement.appendChild(this.typingElement);
            setTimeout(() => {
              this.messagesElement.removeChild(
                this.messagesElement.lastChild as Node
              );
              this.addMessageToMessages("Yes! Just sit tight", true);
              setTimeout(() => {
                this.sendButton.style.animation =
                  "1s 1 ease-in-out launchplane";
                setTimeout(() => {
                  this.sendButton.style.display = "none";
                  this.sendButton.style.opacity = "0";
                }, 1000);
                setTimeout(() => {
                  // this.start3DExperience();
                  this.experience.audio.play();
                }, 1500);
              }, 500);
            }, 1000);
          }, 1000);
        }, 1000);
      } else {
        this.addMessageToMessages(this.responseBox.value, false);
        this.sendButton.style.backgroundColor = "#f2f2f2";
      }
      this.textOptionSpanElements.forEach((element) => {
        element.parentElement?.classList.remove("selected-text-option");
      });

      this.responseBox.value = "";
      this.sendButton.setAttribute("disabled", "true");
      this.responseBox.style.opacity = "0.5";
    });
  }

  addMessageToResponseBox(message: string) {
    this.responseBox.value = message;
  }

  addMessageToMessages(message: string, received: boolean) {
    const newMessageParent = document.createElement("div");
    const newMessageSpan = document.createElement("span");
    newMessageParent.classList.add("message");
    newMessageParent.classList.add(received ? "received" : "sent");
    newMessageSpan.innerText = message;
    newMessageParent.appendChild(newMessageSpan);
    this.messagesElement.appendChild(newMessageParent);
    this.messagesElement.scrollTop = this.messagesElement.scrollHeight;
    this.messagesWrapper.scrollTop = this.messagesWrapper.scrollHeight;
  }
  start3DExperience() {
    this.chatFall();

    this.chatWindow!.style.opacity = "0";

    setTimeout(() => {
      this.experience.startExperience();
      setTimeout(() => {
        this.chatWindow!.remove();
      }, 1000);
    }, 1000);
  }

  chatFall() {
    const currentWindowHeight = window.screen.height;
    const textArea = document.getElementById("text");
    const messagesArea = document.getElementById("messages-wrapper");
    const messages = document.querySelectorAll("div.message");
    const mattteredLogo = document.getElementById("mattered-logo");

    //@ts-ignore
    mattteredLogo!.style.transform = `translate(0, ${
      -mattteredLogo!.getBoundingClientRect().top - 50
    }px)`;
    //@ts-ignore
    mattteredLogo!.style.opacity = "0";
    textArea!.style.transform = `translate(0, ${
      currentWindowHeight - textArea!.getBoundingClientRect().top
    }px)`;
    textArea!.style.overflow = "inherit";

    messagesArea!.classList.add("messages-fall");

    messagesArea!.style.transform = `translate(0, ${
      currentWindowHeight - messagesArea!.getBoundingClientRect().top + 75
    }px)`;
    this.textOptionSpanElements.forEach((element, index) => {
      let rotation = Math.random() * 30;
      if (index % 2 === 0) rotation *= -1;
      element.parentElement!.style.transform = `rotate(${rotation}deg)`;
    });

    messages[0].parentElement?.parentElement?.style.removeProperty(
      "overflow-y"
    );
    messages.forEach((element, index) => {
      let rotation = Math.random() * 33;
      if (index % 2 === 0) rotation *= -1;
      //@ts-ignore
      element.style.transform = `rotate(${rotation}deg)`;
    });
  }
}
