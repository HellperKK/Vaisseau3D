let base = document.querySelector("#base");
let hitbox = document.querySelector("#hitbox");

let max = 70;
let expose = 1.02;

let frames = []
let temp;
for (let index = 0; index < max; index++) {
    if (Math.floor(index / 3) == 0)
    {
        temp = Math.floor(Math.random() * 9);
    }
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
        hitbox.style.width = (x / 3) + "px"; 
        hitbox.style.height = (y / 3) + "px";
    }
}

function adapt(event) {
    let elems = document.querySelectorAll(".level");

    for (let index = 0; index < max; index++) {
        base.removeChild(elems[index]);

        let mouseX = event.pageX;
        let mouseY = event.pageY;
        let baseX = this.style.width.slice(0, -2);
        let baseY = this.style.height.slice(0, -2);

        let decalX = (baseX / 2) - mouseX + 32;
        let decalY = (baseY / 2) - mouseY + 32;

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
        div.style.left = ((x/6 + decalX)* (expose ** (max - index - 1) - 1) - x / 3 * frame_x) + "px";
        div.style.top = ((y/6 + decalY) * (expose ** (max - index - 1) - 1) - y / 3 * frame_y) + "px";

        base.appendChild(div);
    }
}

hitbox.addEventListener("mousemove", adapt)