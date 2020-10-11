'use strict'

let arr = [];
let input = document.querySelector('#arr_elem');
let p = document.createElement('p');
let body = document.querySelector('body');

let buttonAdd = document.querySelector('#add').onclick = function() {
    p = body.appendChild(p);
    p.innerText += ' ' + input.value;
    arr.push(+input.value);
    console.log(arr);
    input.value = '';
}

let buttonSort = document.querySelector('#sort').onclick = function() {
    let h1 = document.createElement('h2');
    h1 = body.appendChild(h1);
    h1.innerText += ' Before sorting: '  + arr.join(' ');
    sort(arr);
    let h2 = document.createElement('h2');
    let h3 = document.createElement('h3');
    h2 = body.appendChild(h2); 
    h3 = body.appendChild(h3);
    h2.innerText +=  ' After sorting: '  + arr.join(' ');
    h3.innerText += ` min = ${arr[0]} \n max = ${arr[arr.length -1]} \n sum = ${sum(arr)}\n`;
    arr = [];
    p.innerText = ''; 
    } 

function sort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                let res = arr[i];
                arr[i] = arr[j];
                arr[j] = res;
            }
        }
    }
    return arr;
}

function sum(arr) {
    let sum = 0;
    arr.forEach(element => sum += element);
    return sum;
}

