// get references to DOM elements
const sizes = document.querySelectorAll('.size');
const colors = document.querySelectorAll('.color');
const shoes = document.querySelectorAll('.shoe');
const gradients = document.querySelectorAll('.gradient');
const shoeBg = document.querySelector('.shoeBackground');

// set initial color and size values
let prevColor = "blue";
let animationEnd = true;

// handle size change function for responsive design
function changeSize(){
    sizes.forEach(size => size.classList.remove('active'));
    this.classList.add('active');
}

// handle color change function 
function changeColor(){
    if(!animationEnd) return;
    // get color attributes
    let primary = this.getAttribute('primary');
    let color = this.getAttribute('color');
    // get shoe and gradient elements based on color
    let shoe = document.querySelector(`.shoe[color="${color}"]`);
    let gradient = document.querySelector(`.gradient[color="${color}"]`);
    let prevGradient = document.querySelector(`.gradient[color="${prevColor}"]`);

    if(color == prevColor) return;
    // update active color
    colors.forEach(c => c.classList.remove('active'));
    this.classList.add('active');
    // update primary color variable
    document.documentElement.style.setProperty('--primary', primary);
    // show selected shoe and apply gradients
    shoes.forEach(s => s.classList.remove('show'));
    shoe.classList.add('show');
    // apply gradient animation
    gradients.forEach(g => g.classList.remove('first', 'second'));
    gradient.classList.add('first');
    prevGradient.classList.add('second');
    // update previous color and animationEnd flag
    prevColor = color;
    animationEnd = false;
    // add event listener to gradient animation
    gradient.addEventListener('animationend', () => {
        animationEnd = true;
    })
}

// add event listeners for size and color changes
sizes.forEach(size => size.addEventListener('click', changeSize));
colors.forEach(c => c.addEventListener('click', changeColor));
// check screen size for responsive design
let x = window.matchMedia("(max-width: 1000px)");

function changeHeight(){
    if(x.matches){
        let shoeHeight = shoes[0].offsetHeight;
        shoeBg.style.height = `${shoeHeight * 0.9}px`;
    }
    else{
        shoeBg.style.height = "475px";
    }
}

// call changeHeight initially and on window resize
changeHeight();
window.addEventListener('resize', changeHeight);