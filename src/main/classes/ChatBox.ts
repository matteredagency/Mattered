import MatteredExperience from "./MatteredExperience";

export default class ChatBox {
  messagesElement!: HTMLElement;
  textOptionSpanElements!: NodeListOf<Element>;
  responseBox!: HTMLInputElement;
  sendButton!: HTMLButtonElement;
  typingElement!: HTMLDivElement;
  messagesWrapper!: HTMLDivElement;
  mainExperience!: MatteredExperience;
  chatWindow!: HTMLDivElement;
  textArea!: HTMLDivElement;
  matteredLogo!: HTMLElement;
  endStatsWrapper!: HTMLDivElement;
  endStatsScroll!: HTMLDivElement;
  privacyTerms!: HTMLDivElement;
  favoriteSpotCanvas!: HTMLCanvasElement;
  favoriteStopSection!: HTMLDivElement;
  favoriteStopSectionInner!: HTMLDivElement;
  favoriteSpotCanvasExpanded!: boolean;
  favoriteSpotExpandButton!: HTMLButtonElement;
  startOverButton!: HTMLButtonElement;
  lastBoundingTop!: number;
  statsTable!: HTMLElement;
  totalTripDurationSection!: HTMLDivElement;
  endTextOptionsSection!: HTMLDivElement;
  static instance: ChatBox;
  constructor() {
    if (ChatBox.instance) {
      return ChatBox.instance;
    }
    ChatBox.instance = this;
    this.messagesElement = document.getElementById(
      "messages-scroll"
    ) as HTMLElement;

    this.textOptionSpanElements = document.querySelectorAll(
      "#text > button.text-option > span"
    );

    this.lastBoundingTop = 0;

    this.privacyTerms = document.getElementById(
      "privacy-terms-main"
    ) as HTMLDivElement;

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
    this.endStatsWrapper = document.getElementById(
      "end-stat-scroll-wrapper"
    ) as HTMLDivElement;

    this.endStatsScroll = document.getElementById(
      "end-stat-scroll"
    ) as HTMLDivElement;

    this.endTextOptionsSection = document.getElementById(
      "end-text"
    ) as HTMLDivElement;

    this.favoriteSpotCanvas = document.getElementById(
      "favorite-stop-canvas"
    ) as HTMLCanvasElement;
    this.favoriteStopSection = document.getElementById(
      "favorite-stop-section"
    ) as HTMLDivElement;
    this.favoriteStopSectionInner = document.getElementById(
      "favorite-stop-section-inner"
    ) as HTMLDivElement;

    this.favoriteSpotExpandButton = document.getElementById(
      "favorite-stop-expand"
    ) as HTMLButtonElement;

    this.totalTripDurationSection = document.getElementById(
      "time-stats"
    ) as HTMLDivElement;
    this.statsTable = document.querySelector("tbody") as HTMLElement;

    this.matteredLogo = document.getElementById(
      "mattered-logo-chat"
    ) as HTMLElement;
    this.textArea = document.getElementById("text") as HTMLDivElement;
    this.mainExperience = new MatteredExperience();
    this.typingElement = document.createElement("div");
    this.typingElement.classList.add("message");
    this.typingElement.classList.add("typing");
    for (let i = 0; i < 3; i++) {
      this.typingElement.appendChild(document.createElement("div"));
    }

    this.favoriteSpotCanvasExpanded = false;

    this.favoriteSpotExpandButton.addEventListener("click", () => {
      this.expandButtonEffects();
    });

    this.startOverButton = document.getElementById(
      "start-over"
    ) as HTMLButtonElement;

    this.startOverButton.addEventListener("click", () => {
      this.startOverButtonCallback();
    });
  }

  startOverButtonCallback() {
    this.mainExperience.resetExperience();

    // Object.values(
    //   this.mainExperience.favoriteSpotExperience.gui.__folders
    // ).forEach((folder) =>
    //   this.mainExperience.favoriteSpotExperience.gui.removeFolder(folder)
    // );
  }

  expandButtonEffects() {
    if (this.favoriteSpotCanvasExpanded) {
      this.favoriteSpotExpandButton.style.position = "relative";

      this.favoriteSpotCanvas.classList.remove("favorite-stop-canvas-expand");
      this.favoriteSpotCanvas.style.top = `${this.lastBoundingTop}px`;
      setTimeout(() => {
        this.favoriteStopSection.classList.remove(
          "favorite-stop-section-expand"
        );
        this.favoriteStopSectionInner.classList.remove(
          "favorite-stop-section-expand"
        );
        this.favoriteSpotCanvas.style.position = "relative";
        this.favoriteSpotCanvas.style.removeProperty("top");
      }, 25);

      this.favoriteSpotExpandButton.style.transform = "translate(0, 0)";
      this.favoriteSpotExpandButton.style.color = "black";
      this.favoriteSpotExpandButton.children[1].textContent = "Expand";
      this.favoriteSpotExpandButton.children[0].children[0].classList.remove(
        "expand-button-fill"
      );
    } else {
      this.lastBoundingTop =
        this.favoriteSpotCanvas.getBoundingClientRect().top;
      this.favoriteStopSection.classList.add("favorite-stop-section-expand");
      this.favoriteStopSectionInner.classList.add(
        "favorite-stop-section-expand"
      );

      this.favoriteSpotCanvas.classList.add("favorite-stop-canvas-expand");
      this.favoriteSpotCanvas.style.position = "absolute";
      this.favoriteSpotCanvas.style.top = `${this.lastBoundingTop}px`;
      setTimeout(() => {
        this.favoriteSpotCanvas.style.top = "0";
      }, 25);

      this.favoriteSpotExpandButton.style.transform = `translate(0, ${Math.round(
        window.innerHeight / 2
      )}px)`;
      this.favoriteSpotExpandButton.style.position = "absolute";

      this.favoriteSpotExpandButton.style.color = "white";
      this.favoriteSpotExpandButton.children[1].textContent = "Minimize";
      this.favoriteSpotExpandButton.children[0].children[0].classList.add(
        "expand-button-fill"
      );
    }
    this.mainExperience.favoriteSpotExperience.toggleSceneExpand();
    this.favoriteSpotCanvasExpanded = !this.favoriteSpotCanvasExpanded;
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
                  this.start3DExperience();
                  this.mainExperience.audio.play();
                }, 1500);
              }, 500);
            }, 1000);
          }, 1000);
        }, 1000);
      } else if (this.responseBox.value) {
        this.addMessageToMessages(this.responseBox.value, false);
        this.sendButton.style.backgroundColor = "#f2f2f2";

        setTimeout(() => {
          (window.location.href = `https://www.mattered.com/${
            this.responseBox.value === "Contact" ? "contact" : ""
          }`),
            true;
        }, 750);
        this.sendButton.setAttribute("disabled", "true");
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
  }
  start3DExperience() {
    this.chatFall();

    this.chatWindow!.style.backgroundColor = "rgba(225, 225, 225, 0)";

    setTimeout(() => {
      this.mainExperience.clock.start();
      setTimeout(() => {
        this.chatWindow!.style.display = "none";
        this.chatWindow!.style.opacity = "0";
        this.matteredLogo.style.transform = "translate(0, 0)";
        this.matteredLogo.style.opacity = "1";
        this.messagesWrapper.remove();
        this.textArea.remove();
      }, 1000);
    }, 500);
  }

  chatFall() {
    const currentWindowHeight = window.screen.height;
    const messagesArea = document.getElementById("messages-wrapper");
    const messages = document.querySelectorAll("div.message");
    const messagesScroll = document.getElementById("messages");
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", "#000000");

    //@ts-ignore
    this.matteredLogo!.style.transform = `translate(0, ${
      -this.matteredLogo!.getBoundingClientRect().top - 50
    }px)`;
    //@ts-ignore
    this.matteredLogo!.style.opacity = "0";
    this.textArea!.style.transform = `translate(0, ${
      currentWindowHeight - this.textArea!.getBoundingClientRect().top
    }px)`;
    this.textArea!.style.overflow = "inherit";

    messagesArea!.classList.add("messages-fall");
    messagesArea!.style.backgroundColor = "rgba(243, 243, 243, 0)";
    messagesScroll!.style.backgroundColor = "rgba(255, 255, 255, 0)";
    this.textArea!.style.backgroundColor = "rgba(255, 255, 255, 0)";
    this.textArea!.style.border = "none";

    messagesArea!.style.transform = `translate(0, ${
      currentWindowHeight - messagesArea!.getBoundingClientRect().top + 75
    }px)`;

    this.privacyTerms.style.transform = `translate(0, ${
      currentWindowHeight - this.privacyTerms!.getBoundingClientRect().top + 75
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
    setTimeout(() => {
      this.privacyTerms.remove();
    }, 2000);
  }

  setEndStats() {
    this.endStatsWrapper.style.display = "block";
    document.querySelectorAll(".end-section").forEach((node) => {
      node.classList.remove("end-section");
    });

    this.privacyTerms.style.transform = "translate(0, 0)";

    this.endTextOptionsSection.style.display = "flex";

    if (window.innerHeight <= 1130) {
      this.endTextOptionsSection.style.boxShadow =
        "0px -4px 12.5px rgba(0, 0, 0, 0.2)";
    }

    const totalExperienceSeconds = Math.round(
      this.mainExperience.clock.getElapsedTime()
    );

    const totalTimeColumn = document.getElementById(
      "total-time"
    ) as HTMLElement;

    const totalTimeObject = this.getHoursMinuteSeconds(totalExperienceSeconds);

    Object.entries(totalTimeObject).forEach(([key, value]) => {
      const timeStatElement = document.createElement("div");
      const valueSpan = document.createElement("span");
      const keySpan = document.createElement("span");

      timeStatElement.classList.add("time-stat");

      valueSpan.innerText = value.toString();
      keySpan.innerText = key;

      timeStatElement.appendChild(valueSpan);
      timeStatElement.appendChild(keySpan);

      this.totalTripDurationSection.appendChild(timeStatElement);
    });

    Object.entries(this.mainExperience.mainSceneController.sceneTime).forEach(
      ([name, time]) => {
        time = Math.round(time);
        const {
          hours: subjectHours,
          minutes: subjectMinutes,
          seconds: subjectSeconds,
        } = this.getHoursMinuteSeconds(time);

        const newRow = document.createElement("tr");

        const nameData = document.createElement("td");
        const timeData = document.createElement("td");
        const percentData = document.createElement("td");

        nameData.innerText = name[0].toUpperCase() + name.substring(1);
        timeData.innerText = this.formatTimeStatement(
          subjectHours * 60 + subjectMinutes,
          subjectSeconds
        );
        percentData.innerText =
          Math.round((time / totalExperienceSeconds) * 100).toString() + "%";

        newRow.appendChild(nameData);
        newRow.appendChild(timeData);
        newRow.appendChild(percentData);

        this.statsTable.appendChild(newRow);
      }
    );

    totalTimeColumn.innerText = this.formatTimeStatement(
      totalTimeObject.hours * 60 + totalTimeObject.minutes,
      totalTimeObject.seconds
    );
  }

  resetEndStats() {
    this.statsTable.innerHTML = "";
    this.totalTripDurationSection.innerHTML = "";
  }

  getHoursMinuteSeconds(totalSeconds: number) {
    const remainingSeconds = totalSeconds % 3600;

    return {
      hours: Math.floor(totalSeconds / 3600),
      minutes: Math.floor(remainingSeconds / 60),
      seconds: remainingSeconds % 60,
    };
  }

  formatTimeStatement(minutes: number, seconds: number) {
    return `${minutes >= 10 || minutes === 0 ? minutes : "0" + minutes}:${
      seconds >= 10 ? seconds : "0" + seconds
    }`;
  }

  getSubjectPercentage(subjectTime: number, totalSeconds: number) {
    return Math.round((subjectTime / totalSeconds) * 100);
  }
}
