import "../../public/index.css";

const triangle = document.querySelector(".cls-2");

if (triangle) {
  triangle.addEventListener("click", () => {
    console.log("triangle clicked");
  });
}
