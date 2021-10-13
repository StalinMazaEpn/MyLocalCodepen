class CircleSlides {
    constructor(
        dot_container_ID,
        field_dot_ID,
        circleItemIdentifier = '.CirItem',
        dotCircleIdentifier = '.dotCircle'
    ) {
        this.radius = 250;
        this.dot_container_ID = dot_container_ID;
        this.field_dot_ID = field_dot_ID;
        this.circleItemIdentifier = circleItemIdentifier;
        this.dotCircleIdentifier = dotCircleIdentifier;

        this.dot_container_ID_Deep = `${dot_container_ID} ${field_dot_ID}`;
        this.circle_item_Deep = `${dot_container_ID} ${circleItemIdentifier}`
        this.circle_item_Dot = `${dot_container_ID} ${dotCircleIdentifier}`

        this.load();
        this.processCalculates();
        this.setFieldsAngles();
        this.listenClicks()
        console.warn({
            obj: this
        })
    }

    // reportWindowSize() {
        // widthCSS = getComputedStyle(document.documentElement)
            // .getPropertyValue('--circleSize');
        // console.log('widthCSS resize', widthCSS)
    // }

    recalculate(){
        this.processCalculates();
        this.setFieldsAngles();
    }

    processCalculates() {


        this.width = this.dotContainer.width();
        console.log('dot inner witdh', this.dotContainer.innerWidth())
        this.height = this.dotContainer.height();
        this.widthCSS = getComputedStyle(document.documentElement).getPropertyValue('--circleSize');
        this.radius = this.width / 2;
        this.angle = 0;
    }

    load() {
        this.dotContainer = $(this.dot_container_ID);
        this.fields = $(`${this.dot_container_ID} ${this.field_dot_ID}`)
        this.fieldsSize = this.fields.length;

        // this.processCalculates();

        // this.setFieldsAngles();

        // this.listenClicks();
      
    }

    setFieldsAngles() {
        const anglesList = []
        let angle = 0
        const step = (2 * Math.PI) / this.fieldsSize;
        this.fields.each((value) => {
            
            const colWidth = $(this.fields[value]).width();
            const colHeight = $(this.fields[value]).height();

            let x_position = Math.round(this.width / 2 + this.radius * Math.cos(angle) - colWidth / 1.5);
            let y_position = Math.round(this.height / 2 + this.radius * Math.sin(angle) - colHeight / 2);
            
            console.warn('SET INITIAL ANGLES')
            console.table({ value: value+1, width: this.width, height: this.height, x: x_position, y: y_position, angle: this.angle, radius: this.radius, colWidth, colHeight, innerWidth: $(this.fields[value]).innerWidth() });

            $(this.fields[value]).css({
                left: x_position + 'px',
                top: y_position + 'px'
            });
            angle += step; // 1.57
            anglesList.push({ 
                value: value+1, x: x_position, y: y_position, angle: angle, cos: Math.cos(angle) 
            })
        });
        console.table(anglesList)
    }

    listenClicks() {
        console.log('click', this.dot_container_ID_Deep)
        let i = 1;

        const clickElements = $(this.dot_container_ID).find(this.field_dot_ID)
        console.log('clickElements', clickElements)

        $(clickElements).click((e) => {
            const currentElement = $(e.currentTarget)
            let dataTab = currentElement.data("tab");
            i = dataTab;
            const dataTabId = `${this.circle_item_Deep}${dataTab}`;

            clickElements.removeClass('active');
            currentElement.addClass('active');
            
            $(`${this.circle_item_Deep}`).removeClass('active');
            // console.log('dataTab circle item', dataTabId)
            $(dataTabId).addClass('active');
            console.log('dataTab', dataTab)
            // const N_CONSTANT = 6 * this.fieldsSize;
            const N_CONSTANT = 36;
            // console.log('N_CONSTANT', N_CONSTANT)

            const dotRotate = (360 - (i - 1) * N_CONSTANT);
            const itemDotRotate = ((i - 1) * N_CONSTANT);
            console.log({
                dataTabId,
                dot_container_ID: this.dot_container_ID,
                dotCircleIdentifier: this.dotCircleIdentifier,
                dotRotate,
                itemDotRotate
            })

            console.log('$(this.dot_container_ID)', $(this.dot_container_ID))
            $(this.dot_container_ID).css({
                "transform": "rotate(" + dotRotate + "deg)",
                "transition": "2s"
            });
            console.log('.itemDot', $(this.dot_container_ID_Deep) )
            $(this.dot_container_ID_Deep).css({
                "transform": "rotate(" + itemDotRotate + "deg)",
                "transition": "1s"
            });
            return
            // return console.log('dataTab', dataTab)


        });
    }
}

$(document).ready(function () {

    const circleOneApp =  new CircleSlides('#dotCircle1', '.itemDot',)
    const circleTwoApp = new CircleSlides('#dotCircle2', '.itemDot',)
    new CircleSlides('#dotCircle3', '.itemDot')

});


