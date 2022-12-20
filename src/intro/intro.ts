import "../../public/index.css";

const triangle = document.getElementById("mattered-triangle");
const svgElement = document.querySelector("svg");

if (triangle) {
  triangle.addEventListener("click", () => {
    console.log("clicked on svgEleem");

    if (svgElement) {
      svgElement.classList.add("pass-through");
      setTimeout(() => {
        svgElement.remove();
      }, 2000);
    }
  });
}
