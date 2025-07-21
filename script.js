let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    // Handle movement for both mouse and touch
    const moveHandler = (e) => {
      if (e.touches) {
        this.mouseX = e.touches[0].clientX;
        this.mouseY = e.touches[0].clientY;
      } else {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
      }

      if (!this.rotating) {
        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;
      }

      const dirX = this.mouseX - this.mouseTouchX;
      const dirY = this.mouseY - this.mouseTouchY;
      const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;

      const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
      let degrees = 180 * angle / Math.PI;
      degrees = (360 + Math.round(degrees)) % 360;
      if (this.rotating) {
        this.rotation = degrees;
      }

      if (this.holdingPaper) {
        if (!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    };

    // Start drag/rotate event
    const startHandler = (e) => {
      this.holdingPaper = true;
      paper.style.zIndex = highestZ;
      highestZ += 1;

      if (e.touches) {
        this.mouseTouchX = e.touches[0].clientX;
        this.mouseTouchY = e.touches[0].clientY;
        this.prevMouseX = this.mouseTouchX;
        this.prevMouseY = this.mouseTouchY;
      } else {
        this.mouseTouchX = e.clientX;
        this.mouseTouchY = e.clientY;
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;
      }

      if (e.button === 2 || (e.touches && e.touches.length > 1)) {
        this.rotating = true;
      }
    };

    // End drag event
    const endHandler = () => {
      this.holdingPaper = false;
      this.rotating = false;
    };

    // Attach events for mouse and touch
    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('touchmove', moveHandler, { passive: false });

    paper.addEventListener('mousedown', startHandler);
    paper.addEventListener('touchstart', startHandler, { passive: false });

    window.addEventListener('mouseup', endHandler);
    window.addEventListener('touchend', endHandler);
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});

document.getElementById('goToNextScene').addEventListener('click', function () {
    window.location.href = "https://anchan31.github.io/Scene2/Merijaan.html";
});



