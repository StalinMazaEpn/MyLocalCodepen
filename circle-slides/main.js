class CarouselDynamic {
    constructor(
      carousel_id, 
      carousel_cells_id,
      isHorizontal = true
      ){
      
      this.carousel_id = carousel_id;
      this.carousel_cells_id = carousel_cells_id;
     
      
      this.selectedIndex = 0;
      this.cellsAngles = []
      this.isHorizontal = isHorizontal;
      this.rotateFn = this.isHorizontal ? "rotateY" : "rotateX";
      this.radius = 0;
      this.theta = 360 / this.cellCount;
      this.currentTransform = ''
      
      this.load();
  
      this.changeCarousel()
      this.listenClick();
      this.print()
    }
    
    load(){
        this.carousel = this.getCarousel()
        this.cells = this.getCarousel().querySelectorAll(this.carousel_cells_id);
        this.cellCount = this.cells.length;
        this.cellWidth = this.carousel.offsetWidth;
        this.cellHeight = this.carousel.offsetHeight;
    }

    getCarousel(){
        return document.querySelector(this.carousel_id);
    }

    print() {
      window.document.querySelector(".msg").innerHTML = `
      <b>Selected Index: <br/> ${this.selectedIndex} <br/><br/> CellCount <br/> ${this.cellCount} <br/><br/> currentTransform <br/> ${this.currentTransform} +  "</b>
      `;
    }
    rotateCarousel() {
      this.carousel = window.document.querySelector(this.carousel_id);
      const angle = this.theta * this.selectedIndex * -1;
      
      const transform = `translateZ(-${this.radius}px) ${this.rotateFn}(${angle}deg)`;
      
      this.currentTransform = transform;
      
      this.carousel.style.transform = transform;
      this.carousel.style.webkitTransform = transform;
      this.carousel.style.MozProperty = transform;
    }
  
    prevSlide() {
        this.selectedIndex--;
      this.rotateCarousel();
      this.print();
    }
    nextSlide() {
        this.selectedIndex++;
      this.print();
      this.rotateCarousel();
    }
  
    listenClick() {
      return;
      for (let i = 0; i < this.cells.length; i++) {
        const cell = this.cells[i];
        cell.addEventListener("click", (e) => {
          const angleCellEvent = cell.dataset.cellAngle;
          const angleCellSelected = this.cells[this.selectedIndex].dataset.cellAngle;
          
          if (i == this.selectedIndex) {
            return;
          }
          if (angleCellEvent <= angleCellSelected) {
            this.nextSlide();
          } else {
            this.prevSlide();
          }
        });
      }
    }
  
    changeCarousel() {
      this.theta = 360 / this.cellCount;
      const cellSize = this.isHorizontal ? this.cellWidth : this.cellHeight;
      
      this.radius = Math.round(cellSize / 2 / Math.tan(Math.PI / this.cellCount));
      
      for (let i = 0; i < this.cells.length; i++) {
        const cell = this.cells[i];
        const cellAngle = this.theta * i;
        if (i < this.cellCount) {
          // visible cell
          const transformStyle = `${this.rotateFn} (${cellAngle}deg) translateZ(${this.radius} + px)`;
          cell.style.opacity = 1;
          cell.style.transform = transformStyle;
          cell.dataset.visible = 1;
          cell.dataset.transform = '';
        } else {
          // hidden cell
          cell.style.opacity = 0;
          cell.style.transform = "none";
          cell.dataset.visible = 0;
          cell.dataset.transform = ''
        }
        cell.dataset.cellAngle = cellAngle;
        cell.dataset.position = i;
        
        this.cellsAngles.push({
          cellAngle
        });
      }
      this.rotateCarousel()
    }
  }
  
  const carruselDynamic = new CarouselDynamic(".carousel", ".carousel__cell");
  
  const prevButton = document.querySelector(".previous-button");
  prevButton.addEventListener("click", function () {
    console.log('prevSlide')
    carruselDynamic.prevSlide();
  });
  
  const nextButton = document.querySelector(".next-button");
  nextButton.addEventListener("click", function () {
     console.log('nextSlide')
    carruselDynamic.nextSlide();
  });