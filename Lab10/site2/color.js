const colors = ["green", "red", "rgba(133,122,200)", "#f15025", "#f125aaff", "#36f125ff"];

const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");
const btn3 = document.querySelector(".btn3");

const colorText = document.querySelector("#colorCode");
const colorPanel = document.querySelector("#colorPanel");

function randomColor() 
{
    console.log('First button got clicked!');
    let colorIndex = Math.floor(Math.random()*colors.length);
    console.log(colorIndex);
    colorPanel.style.backgroundColor = colors[colorIndex];
    colorText.innerText = colors[colorIndex];
}
btn1.addEventListener("click", randomColor);

// Use this format to change the colors rgba(133,122,200)
// rgba (r,g,b) 0 <= r <= 255, 0 <= g <= 255, 0 <= b <= 255