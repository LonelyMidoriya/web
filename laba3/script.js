'use strict'

let main = (function() {
			let array = [];
			let nameV = document.querySelector('#name');
			let surnameV = document.querySelector('#surname');
			let ageV = document.querySelector('#age');
			let avgV = document.querySelector('#avg');
			function add() {
				let student = {
					"name": nameV.value,
					"surname": surnameV.value,
					"age": ageV.value,
					"avg": avgV.value
				};
				array.push(student);
				nameV.value='';
				surnameV.value='';
				ageV.value='';
				avgV.value='';
			}

			function table(delStudent = false) {
				if (!array.length && delStudent) {
					let table = document.getElementById("table");
					table.parentNode.removeChild(table);
				} else {
					let table = document.getElementById("table");
				if (table != null) table.parentNode.removeChild(table);
				let body = document.getElementById("body");
				table = document.createElement("table");
				let data = document.createElement("tr");
				let name = document.createElement("td");
				name.appendChild(document.createTextNode("Name"));
				data.appendChild(name);
				let surname = document.createElement("td");
				surname.appendChild(document.createTextNode("Surname"));
				data.appendChild(surname);
				let age = document.createElement("td");
				age.appendChild(document.createTextNode("Age"));
				data.appendChild(age);
				let avg = document.createElement("td");
				avg.appendChild(document.createTextNode("Avg"));
				data.appendChild(avg);
				table.appendChild(data);
				for (let i = 0; i < array.length; i++){ 
					let row = document.createElement("tr");
					row.setAttribute("id", i);
					let cellName = document.createElement("td");
					cellName.appendChild(document.createTextNode(array[i]["name"]));
					row.appendChild(cellName);
					let cellSurname = document.createElement("td");
					cellSurname.appendChild(document.createTextNode(array[i]["surname"]));
					row.appendChild(cellSurname);
					let cellAge = document.createElement("td");
					cellAge.appendChild(document.createTextNode(array[i]["age"]));
					row.appendChild(cellAge);
					let cellAvg = document.createElement("td");
					cellAvg.appendChild(document.createTextNode(array[i]["avg"]));
					row.appendChild(cellAvg);
					let editButton = document.createElement("button");
					let deleteButton = document.createElement("button");
					editButton.appendChild(document.createTextNode("Edit"));
					deleteButton.appendChild(document.createTextNode("Delete"));
					editButton.setAttribute("name", "e" + i);
					editButton.setAttribute("onclick", "main.ed(this)");
					deleteButton.setAttribute("name", "d" + i);
					deleteButton.setAttribute("onclick", "main.del(this)");
					row.appendChild(editButton);
					row.appendChild(deleteButton);
					cellAvg.setAttribute("name", "avg" + i)
					table.appendChild(row);
				}
				body.appendChild(table);
				table.setAttribute("id", "table");
			}
		}
			let h2 = document.createElement('h2');
			h2 = body.appendChild(h2);
			function avg(){
				let num = +document.getElementById("table").lastChild.id;
				let sum = 0;
				for (let i = 0; i <= num; i++){
					sum += +document.getElementsByName("avg" + i)[0].innerHTML;
				}
				h2.innerText =`Avg all: ${(sum / (num + 1)).toFixed(1)}`;
			}
			function ed(obj){
				let idEdElem = +obj.name.slice(1);
				let edElem = array[idEdElem];
				edElem["name"] = prompt("Edit name:", edElem["name"]);
				edElem["surname"] = prompt("Edit surname:", edElem["surname"]);
				edElem["age"] = +prompt("Edit age", edElem["age"]);
				edElem["avg"] = +prompt("Edit avg:", edElem["avg"]);
				array[idEdElem] = edElem;
				table();
			}
			function del(obj){
				let delIndex;
				for (let i = 0; i <= array.length; i++){
					if ("d" + i == obj.name){
						delIndex = i;
						break;
					}
				}
				let newArray = [];
				for (let i = 0; i < array.length; i++){
					if (i == delIndex) continue;
					newArray.push(array[i]);
				}
				array = newArray;
				table();
			}
			return {
				add: add,
				table: table,
				avg: avg,
				ed: ed,
				del: del
			}
		})();