const imageUpload = document.querySelector("#image"),
  canvas = document.querySelector("#canvas"),
  context = canvas.getContext("2d"),
  clearBtn = document.querySelector(".clear"),
  removeImg = document.querySelector(".remove-img"),
  grayBtn = document.querySelector(".grayscale"),
  redBtn = document.querySelector(".red-hue"),
  blueBtn = document.querySelector(".blue-hue"),
  greenBtn = document.querySelector(".green-hue");

let orgImage = null;
const filterBtns = [grayBtn, redBtn, blueBtn, greenBtn];

imageUpload.addEventListener("change", () => {
  if (!imageUpload.value == "") {
    let filename = "./resources/" + imageUpload.value.slice(12);
    orgImage = new SimpleImage(filename);
    orgImage.drawTo(canvas);
    imageUpload.value = "";
    removeImg.classList.remove("disabled");
    filterBtns.forEach((btn) => {
      btn.classList.remove("disabled");
    });
  }
});

removeImg.addEventListener("click", () => {
  if (orgImage) {
    context.clearRect(0, 0, orgImage.getWidth(), orgImage.getHeight());
    orgImage = null;
    removeImg.classList.add("disabled");
    filterBtns.forEach((btn) => {
      btn.classList.add("disabled");
    });
  }
});

clearBtn.addEventListener("click", () => {
  orgImage.drawTo(canvas);
  clearBtn.classList.add("disabled");
  filterBtns.forEach((btn) => {
    btn.classList.remove("disabled");
  });
});

grayBtn.addEventListener("click", () => {
  let grayImg = new SimpleImage(orgImage);
  if (grayImg) {
    for (let px of grayImg.values()) {
      let r = px.getRed(),
        g = px.getGreen(),
        b = px.getBlue(),
        avg = (r + g + b) / 3;
      px.setRed(avg);
      px.setGreen(avg);
      px.setBlue(avg);
    }
    grayImg.drawTo(canvas);
    clearBtn.classList.remove("disabled");
    filterBtns.forEach((btn) => {
      btn.classList.add("disabled");
    });
  }
});
redBtn.addEventListener("click", () => {
  let redImg = new SimpleImage(orgImage);
  if (redImg) {
    for (let px of redImg.values()) {
      let r = px.getRed(),
        g = px.getGreen(),
        b = px.getBlue(),
        avg = (r + g + b) / 3;
      if (avg < 128) {
        px.setRed(avg * 2);
        px.setGreen(0);
        px.setBlue(0);
      } else {
        px.setRed(255);
        px.setGreen(avg * 2 - 255);
        px.setBlue(avg * 2 - 255);
      }
    }
    redImg.drawTo(canvas);
    clearBtn.classList.remove("disabled");
    filterBtns.forEach((btn) => {
      btn.classList.add("disabled");
    });
  }
});
blueBtn.addEventListener("click", () => {
  let blueImg = new SimpleImage(orgImage);
  if (blueImg) {
    for (let px of blueImg.values()) {
      let r = px.getRed(),
        g = px.getGreen(),
        b = px.getBlue(),
        avg = (r + g + b) / 3;
      if (avg < 128) {
        px.setRed(0);
        px.setGreen(0);
        px.setBlue(avg * 2);
      } else {
        px.setRed(avg * 2 - 255);
        px.setGreen(avg * 2 - 255);
        px.setBlue(255);
      }
    }
    blueImg.drawTo(canvas);
    clearBtn.classList.remove("disabled");
    filterBtns.forEach((btn) => {
      btn.classList.add("disabled");
    });
  }
});
greenBtn.addEventListener("click", () => {
  let greenImg = new SimpleImage(orgImage);
  if (greenImg) {
    for (let px of greenImg.values()) {
      let r = px.getRed(),
        g = px.getGreen(),
        b = px.getBlue(),
        avg = (r + g + b) / 3;
      if (avg < 128) {
        px.setRed(0);
        px.setGreen(avg * 2);
        px.setBlue(0);
      } else {
        px.setRed(avg * 2 - 255);
        px.setGreen(255);
        px.setBlue(avg * 2 - 255);
      }
    }
    greenImg.drawTo(canvas);
    clearBtn.classList.remove("disabled");
    filterBtns.forEach((btn) => {
      btn.classList.add("disabled");
    });
  }
});
