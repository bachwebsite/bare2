let keysPressed = [];
document.addEventListener("keydown", (event) => {
  keysPressed.push(event.key);

  const b = document.body.querySelector('#container');

  if (keysPressed.join("").includes("sunset")) {
    const c = document.createElement("img");
    c.style.position = "absolute";
    c.style.zIndex = "9999";
    c.style.width = "100vw";
    c.style.height = "100vh";
    c.style.transition = "1s ease-out";
    c.src = "/data/images/ooososcary.gif";
    b.insertBefore(c, b.firstChild);
    keysPressed = [];
    const d = document.createElement("audio");
    d.src = "/data/audio/raah.mp3";
    d.autoplay = true;
    b.appendChild(d);
  } else if (keysPressed.join("").includes("breakium")) {
    const c = document.createElement("img");
    c.style.position = "absolute";
    c.style.zIndex = "9999";
    c.style.width = "100vw";
    c.style.height = "100vh";
    c.style.transition = "1s ease-out";
    c.src = "/data/images/yay.png";
    b.insertBefore(c, b.firstChild);
    keysPressed = [];
    const d = document.createElement("audio");
    d.src = "/data/audio/yay.mp3";
    d.autoplay = true;
    b.appendChild(d);
  } else if (keysPressed.join("").includes("plexile")) {
    const c = document.createElement("img");
    c.style.position = "absolute";
    c.style.zIndex = "9999";
    c.style.width = "100vw";
    c.style.height = "100vh";
    c.style.transition = "1s ease-out";
    c.src = "/data/images/clipped.jpg";
    b.insertBefore(c, b.firstChild);
    keysPressed = [];
    const d = document.createElement("audio");
    d.src = "/data/audio/cryaboutit.mp3";
    d.autoplay = true;
    b.appendChild(d);
  } else if (keysPressed.join("").includes("moonlight")) {
    const c = document.createElement("img");
    c.style.position = "absolute";
    c.style.zIndex = "9999";
    c.style.width = "100vw";
    c.style.height = "100vh";
    c.style.transition = "1s ease-out";
    c.src = "/data/images/moonlight.jpg";
    b.insertBefore(c, b.firstChild);
    keysPressed = [];
    const d = document.createElement("audio");
    d.src = "/data/audio/moonlight.mp3";
    d.autoplay = true;
    b.appendChild(d);
  } else if (keysPressed.join("").includes("inter")) {
    const c = document.createElement("img");
    c.style.position = "absolute";
    c.style.zIndex = "9999";
    c.style.width = "100vw";
    c.style.height = "100vh";
    c.style.transition = "1s ease-out";
    c.src = "/data/images/inter.jpg";
    b.insertBefore(c, b.firstChild);
    keysPressed = [];
    const d = document.createElement("audio");
    d.src = "/data/audio/inter.mp3";
    d.autoplay = true;
    b.appendChild(d);
  }  else if (keysPressed.join("").includes("shadow")) {
    const c = document.createElement("img");
    c.style.position = "absolute";
    c.style.zIndex = "9999";
    c.style.width = "100vw";
    c.style.height = "100vh";
    c.style.transition = "1s ease-out";
    c.src = "/data/images/shadow.jpg";
    b.insertBefore(c, b.firstChild);
    keysPressed = [];
    const d = document.createElement("audio");
    d.src = "/data/audio/moonlight.mp3";
    d.autoplay = true;
    b.appendChild(d);
  } else if (keysPressed.join("").includes("light")) {
    const c = document.createElement("img");
    c.style.position = "absolute";
    c.style.zIndex = "9999";
    c.style.width = "100vw";
    c.style.height = "100vh";
    c.style.transition = "1s ease-out";
    c.src = "/data/images/light.jpg";
    b.insertBefore(c, b.firstChild);
    keysPressed = [];
    const d = document.createElement("audio");
    d.src = "/data/audio/light.mp3";
    d.autoplay = true;
    b.appendChild(d);
  }
  console.log(keysPressed);
});
