class CircleSlides {
    constructor(
        holderWrapperCircleID,
        itemDotIdentifier = '.itemDot',
        circleItemIdentifier = '.CirItem',
        dotCircleId = '.dotCircle'
    ) {
        this.radius = 250;

        this.holderWrapperCircleID = holderWrapperCircleID;
        this.itemDotIdentifier = itemDotIdentifier;
        this.circleItemIdentifier = circleItemIdentifier;
        this.dotCircleId = dotCircleId;

        this.load();
        this.processCalculates();
        this.setFieldsAngles();
        this.listenClicks()
    }

    recalculate(){
        this.processCalculates();
        this.setFieldsAngles();
    }

    processCalculates() {
        this.width = this.DOTElementCircle.width();
        this.height = this.DOTElementCircle.height();
        this.widthCSS = getComputedStyle(document.documentElement).getPropertyValue('--circleSize').trim();
        this.radius = this.width / 2;
        this.angle = 0;
    }

    load() {
        this.DOTElementCircle = $(this.holderWrapperCircleID)
        this.itemsCircleDotList = $(this.holderWrapperCircleID).find(this.itemDotIdentifier)
        this.itemsCircleListSize = this.itemsCircleDotList.length;
    }

    setFieldsAngles() {
        let angle = 0
        const step = (2 * Math.PI) / this.itemsCircleListSize;
        this.itemsCircleDotList.each((value) => {
            
            const colWidth = $(this.itemsCircleDotList[value]).width();
            const colHeight = $(this.itemsCircleDotList[value]).height();

            let x_position = Math.round(this.width / 2 + this.radius * Math.cos(angle) - colWidth / 1.5);
            let y_position = Math.round(this.height / 2 + this.radius * Math.sin(angle) - colHeight / 2);
            
           
            $(this.itemsCircleDotList[value]).css({
                left: x_position + 'px',
                top: y_position + 'px'
            });
            angle += step; 
        });
    }

    listenClicks() {
        let i = 1;
        const clickElements = $(this.holderWrapperCircleID).find(this.itemDotIdentifier)

        $(clickElements).click((e) => {
            const currentElement = $(e.currentTarget)
            const dataTab = currentElement.data("tab");
            i = dataTab;

            clickElements.removeClass('active');
            currentElement.addClass('active');

            $(this.holderWrapperCircleID).find(this.circleItemIdentifier).removeClass('active');
            $(this.holderWrapperCircleID).find(`${this.circleItemIdentifier}${dataTab}`).addClass('active');
            console.log('dataTabId', dataTab)
            
            const CIRCLE_SLIDE_CONSTANT = 36;
            const dotRotate = (360 - (i - 1) * CIRCLE_SLIDE_CONSTANT);
            const itemDotRotate = ((i - 1) * CIRCLE_SLIDE_CONSTANT);

            console.table({
                dataTab,
                holderWrapperCircleID: this.holderWrapperCircleID,
                dotCircleId: this.dotCircleId
            })

            const dotCircleApp = $(this.holderWrapperCircleID).find(this.dotCircleId)
            console.warn('dotCircleApp',dotCircleApp)
            $(this.holderWrapperCircleID).find(this.dotCircleId).css({
                "transform": "rotate(" + dotRotate + "deg)",
                "transition": "2s"
            });
            console.log('.itemDot', $(this.dot_container_ID_Deep) )
            $(this.holderWrapperCircleID).find(this.itemDotIdentifier).css({
                "transform": "rotate(" + itemDotRotate + "deg)",
                "transition": "2s"
            });
        });
    }
}

$(document).ready(function () {

    const circleOneApp =  new CircleSlides('#holderCircle1')
    const circleTwoApp = new CircleSlides('#holderCircle2')
    new CircleSlides('#holderCircle3')

});


