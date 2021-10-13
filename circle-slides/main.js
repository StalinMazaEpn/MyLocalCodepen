class CarouselDynamic {
    constructor(carousel_id, carousel_cells_id) {
      console.log({
        window,
        document: window.document,
        selector: window.document.querySelector
      })

      this.carousel_id = carousel_id;
      this.carousel_cells_id = carousel_cells_id;
     
      
      this.selectedIndex = 0;
      this.cellsAngles = []
      this.isHorizontal = true;
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
        console.log('this.carousel', this.carousel)
        console.log('this', this)
        this.cells = this.getCarousel().querySelectorAll(this.carousel_cells_id);
        this.cellCount = this.cells.length;
        this.cellWidth = this.carousel.offsetWidth;
        this.cellHeight = this.carousel.offsetHeight;
    }

    getCarousel(){
        return document.querySelector(this.carousel_id);
    }

    print() {
      window.document.querySelector(".msg").innerHTML = "<b>Selected Index: " + this.selectedIndex + ' CellCount' + this.cellCount + 'currentTransform' + this.currentTransform +  "</b>";
    }
    rotateCarousel() {
      this.carousel = window.document.querySelector(this.carousel_id);
      const angle = this.theta * this.selectedIndex * -1;
      console.log('angle', angle, this.theta, this.cellCount)
      const transform = `translateZ(-${this.radius}px) ${this.rotateFn}(${angle}deg)`;
      console.log('rotateCarousel: ', transform)
      this.currentTransform = transform;
      console.log('this.carousel', this.carousel)
      this.carousel.style.transform = transform;
      this.carousel.style.webkitTransform = transform;
      this.carousel.style.MozProperty = transform;
    }
  
    prevSlide() {
      // if(Math.abs(this.selectedIndex) >= 0){
        // this.selectedIndex = 0;
      // }else{/
        this.selectedIndex--;
      // }
      this.rotateCarousel();
      this.print();
    }
    nextSlide() {
      // if(this.selectedIndex >= (this.cellCount -1)){
        // this.selectedIndex = 0;
      // }else{
        this.selectedIndex++;
      // }
      this.print();
      this.rotateCarousel();
    }
  
    listenClick() {
      return;
      for (let i = 0; i < this.cells.length; i++) {
        const cell = this.cells[i];
        cell.addEventListener("click", (e) => {
        //   return;
          console.log('cell.dataset', cell.dataset, i)
          console.log('this.theta', this.theta)
          const angleCellEvent = cell.dataset.cellAngle;
          console.log('this.selectedIndex', this.selectedIndex)
          const angleCellSelected = this.cells[this.selectedIndex].dataset.cellAngle;
          console.log("angleCellEvent", angleCellEvent);
          console.log("angleCellSelected", angleCellSelected);
          if (i == this.selectedIndex) {
            return;
          }
          if (angleCellEvent <= angleCellSelected) {
            console.log("next");
            this.nextSlide();
          } else {
            console.log("prev");
            this.prevSlide();
          }
        });
      }
    }
  
    changeCarousel() {
      //cellCount = cellsRange.value;
      this.theta = 360 / this.cellCount;
      const cellSize = this.isHorizontal ? this.cellWidth : this.cellHeight;
      console.log('cellSize', cellSize)
      this.radius = Math.round(cellSize / 2 / Math.tan(Math.PI / this.cellCount));
      console.log("radius Index", this.radius );
      for (let i = 0; i < this.cells.length; i++) {
        const cell = this.cells[i];
        const cellAngle = this.theta * i;
        if (i < this.cellCount) {
          // visible cell
          const transformStyle = `${this.rotateFn} (${cellAngle}deg) translateZ(${this.radius} + px)`;
          // const transformStyleDataset = `translateZ(${-this.radius} + px) ${this.rotateFn} + (${cellAngle} deg)`;
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
        console.log("cell: ", i+1, ' ', cell, cellAngle);
        this.cellsAngles.push({
          cellAngle
        });
      }
      console.log('this.cellsAngles.', this.cellsAngles)
      this.rotateCarousel()
    }
  }
  
  const carruselDynamic = new CarouselDynamic(".carousel", ".carousel__cell");
  
  /*var carousel = document.querySelector(".carousel");
  var cells = carousel.querySelectorAll(".carousel__cell");
  var cellCount; // cellCount set from cells-range input value
  var selectedIndex = 0;
  var cellWidth = carousel.offsetWidth;
  var cellHeight = carousel.offsetHeight;
  var isHorizontal = true;
  var rotateFn = isHorizontal ? "rotateY" : "rotateX";
  var radius, theta;
  console.log("theta", theta);*/
  
  /*function rotateCarousel() {
    var angle = theta * selectedIndex * -1;
    carousel.style.transform =
      "translateZ(" + -radius + "px) " + rotateFn + "(" + angle + "deg)";
  }*/
  
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
  
  
  /*function changeCarousel() 
    cellCount = cellsRange.value;
    theta = 360 / cellCount;
    var cellSize = isHorizontal ? cellWidth : cellHeight;
    radius = Math.round(cellSize / 2 / Math.tan(Math.PI / cellCount));
    console.log("selected Index", selectedIndex);
    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      var cellAngle = theta * i;
      if (i < cellCount) {
        // visible cell
        cell.style.opacity = 1;
        cell.style.transform =
          rotateFn + "(" + cellAngle + "deg) translateZ(" + radius + "px)";
      } else {
        // hidden cell
        cell.style.opacity = 0;
        cell.style.transform = "none";
      }
      cell.dataset.cellAngle = cellAngle;
      console.log("cell", cell, cellAngle);
    }
  
    rotateCarousel();
  }*/
  