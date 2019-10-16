let base = document.querySelector("#base");
let hitbox = document.querySelector("#hitbox");

let max = 70;
let expose = 1.02;

let frames = []
let temp;

let mouseX = 0;
let mouseY = 0;

let color_index = 1;
let color_distance = 15;

let wall_add = 4;
let wait = 30;

for (let index = 0; index < max; index++) {
    frames.push(4);
}

for (let index = 0; index < max; index++) {

    let exp = index + 100;
    let frame = frames[index];

    let frame_x = frame % 3;
    let frame_y = Math.floor(frame / 3);

    let div = document.createElement("div");

    div.classList.add("level");

    let x = (320 * (expose ** exp));
    let y = (240 * (expose ** exp));

    div.style.width = x + "px"; 
    div.style.height = y + "px";
    div.style.left = (x/6 * (expose ** (max - index - 1) - 1) - x / 3 * frame_x) + "px";
    div.style.top = (y/6 * (expose ** (max - index - 1) - 1) - y / 3 * frame_y) + "px";

    base.appendChild(div);

    if (index == (max - 1)) {
        hitbox.style.width = (x / 3) - 64 + "px"; 
        hitbox.style.height = (y / 3) - 64 + "px";
    }
}

function updateMouse(event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
}

function adapt() {
    let elems = document.querySelectorAll(".level");

    color_index = ((color_index + 1) % color_distance);
    frames.pop();
    frames.unshift(wall_add);
    for (let index = 0; index < max; index++) {
        base.removeChild(elems[index]);

        let baseX = hitbox.style.width.slice(0, -2);
        let baseY = hitbox.style.height.slice(0, -2);

        let decalX = (mouseX + 32) / (baseX - 64) / 3;
        let decalY = (mouseY + 32) / (baseX - 64) / 2.5;

        let exp = index + 100;
        let frame = frames[index];

        let frame_x = frame % 3;
        let frame_y = Math.floor(frame / 3);

        let div = document.createElement("div");

        div.classList.add("level");

        if ((color_index == 0) && (wait == 0)) {
            wall_add = Math.floor(Math.random() * 9);
            wait = 180;
        }
        else if (wait > 0) {
            wait--;
        }
        else {
            wall_add = 4;
        }

        if (index == (max - 1)) {
            div.classList.add("level-black");
        }
        else if ((index % color_distance) == color_index)
        {
            div.classList.add("level-green");
        }
        else
        {
            div.classList.add("level-base");
        }

        let x = (320 * (expose ** exp));
        let y = (240 * (expose ** exp));

        let randX = Math.floor(Math.random() * 5) - 2;
        let randY = Math.floor(Math.random() * 5) - 2;
    
        div.style.width = x + "px"; 
        div.style.height = y + "px";
        div.style.left = (x * decalX * (expose ** (max - index - 1) - 1) - x / 3 * frame_x - 64 + randX) + "px";
        div.style.top = (y * decalY * (expose ** (max - index - 1) - 1) - y / 3 * frame_y - 64 + randY) + "px";

        base.appendChild(div);
    }
}

hitbox.addEventListener("mousemove", updateMouse)
setInterval(adapt, 66);