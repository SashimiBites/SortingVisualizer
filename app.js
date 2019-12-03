class GraphicsGenerator{
    constructor(container, itemsArray, enable = true){
        this.container = container;
        this.itemsArray = itemsArray;
        this.enable = enable;
        this.barArray = [];
    }

    //method to generate the graphs
    generate(){
        let htmlToAdd = "";
        let bars = null;
        let containerHeight = this.container.offsetHeight - 50;
        let factor = 0;

        //loop to create bars
        for(let item of this.itemsArray) {
            htmlToAdd += `
                <div class="bar_gen" data-value="${item}">
                    <p class="bar_inner">${item}</p>
                </div>
            `;

            if(item > factor)
                factor = item;
        }

        //add bars to container
        this.container.insertAdjacentHTML("beforeend", htmlToAdd);

        //add styles to bars
        bars = this.container.querySelectorAll(".bar_gen");
        
        bars.forEach(element => {
            element.style.color = "white";
            element.style.height = (containerHeight / factor) * element.dataset.value + "px";

            this.barArray.push(element);
        });
    }

    //method to get a specific bar
    getBar(number = 0){
        return this.barArray[number];
    } 
}

class Utils{
    constructor(){

    }

    generateRandomNumberArray(min, max, numberOfItems){
        let currentItemNumber = 0;
        let itemsArray = [];

        while(currentItemNumber < numberOfItems){
            let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
            let isUnique = true;

            itemsArray.forEach(element => {
                if(randomNum === element){
                   isUnique = false;
                }
            });

            if(isUnique){
                itemsArray.push(randomNum);
                currentItemNumber++;
            }
        }

        return itemsArray;
    }
}

var utils = new Utils();
var app_state = ["start", "created", "animating", "end"];
var graphContainer = document.querySelector("#graphic_container");
var itemsArray = utils.generateRandomNumberArray(10, 100, 40);
var graphGen = new GraphicsGenerator(graphContainer, itemsArray, true);

graphGen.generate();
console.log(graphGen.getBar(2));