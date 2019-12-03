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

let selectionSort = (array) => {
    for(let i = 0; i < array.length; i++){
        for(let j = i + 1; j < array.length; j++){
            if(array[j] < array[i]){
                swapArrayItems(array, i, j);
            }
        }
    }
};

let bubbleSort = (array) => {
    // for(let i = array.length; i > 0; i--){
    //     for(let j = 0; j < i - 1; j++){
    //         if(array[j] > array[j + 1]){
    //             swapArrayItems(array, j, j + 1);
    //         }
    //     }
    // }

    for(let i = 0; i < array.length; i++){
        for(let j = 0; j < array.length - i - 1; j++){
            if(array[j] > array[j + 1]){
                swapArrayItems(array, j, j + 1);
            }
        }
    }
}

let insertionSort = (array) => {
    for(let i = 1; i < array.length; i++){
        let pointer = i;
        while(array[pointer - 1] > array[pointer] && pointer > 0){
            swapArrayItems(array, pointer, pointer - 1);
            pointer--;
        }
    }
};

let merge = (array, left, middle, right) => {
    //tamaño del array 1
    let n1 = middle - left + 1;
    //tamaño del array 2
    let n2 = right - middle;

    //arrays auxiliares
    let auxArray1 = [];
    let auxArray2 = [];

    //poblando el array auxiliar 1
    for(let i = 0; i < n1; i++){
        auxArray1[i] = array[left + i]; 
    }

    //poblando el array auxiliar 2
    for(let j = 0; j < n2; j++){
        auxArray2[j] = array[middle + 1 + j]; 
    }

    //comparando elementos
    let i = 0; j = 0; k = left;

    while(i < n1 && j < n2){
        if(auxArray1[i] <= auxArray2[j]){
            array[k] = auxArray1[i];
            i++;
        } else {
            array[k] = auxArray2[j];
            j++;
        }
        k++;
    }

    //si sobran elementos en el array 1 o el array 2
    while(i < n1){
        array[k] = auxArray1[i];
        i++;
        k++;
    } 

    while(j < n2){
        array[k] = auxArray2[j];
        j++;
        k++;
    } 
};

let mergeSort = (array, left, right) => {
    if(left < right){
        let middle = Math.floor(left + (right - left) / 2);
        console.log(middle);
        mergeSort(array, left, middle);
        mergeSort(array, middle + 1, right);
        merge(array, left, middle, right);
    }

    return array;
};

let partition = (array, left, right) => {
    let pivot = array[right];
    let index = left;

    for(let i = left; i < right; i++){
        if(array[i] <= pivot){
            swapArrayItems(array, i, index);
            index++;
        }
    }

    swapArrayItems(array, index, right);

    return index;
};

let quickSort = (array, left, right) => {
    if(left >= right) return;

    let pivot = partition(array, left, right);
    quickSort(array, left, pivot - 1);
    quickSort(array, pivot + 1, right);
};

let swapArrayItems = (array, i, j) => {
    let aux = array[i];
    array[i] = array[j];
    array[j] = aux;
};

var utils = new Utils();
var app_state = ["start", "created", "animating", "end"];
var graphContainer = document.querySelector("#graphic_container");
var itemsArray = utils.generateRandomNumberArray(10, 100, 20);
// insertionSort(itemsArray);
console.log(itemsArray);
console.log(quickSort(itemsArray, 0 , itemsArray.length - 1));
console.log(itemsArray);

// var graphGen = new GraphicsGenerator(graphContainer, itemsArray, true);

// graphGen.generate();
// console.log(graphGen.getBar(2));