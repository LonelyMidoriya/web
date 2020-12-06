$.ajax({ 
        url: "student.json", 
        dataType: "json", 
        method: "GET",    
        data: {},
        success: function(data) {
        if(data.length) {
          let nameTable = $("<td></td>").text("Name");
          let surnameTable = $("<td></td>").text("Surname");
          let ageTable = $("<td></td>").text("Age");
          let avgTable = $("<td></td>").text("Avg");
          $("body").append($("<table></table>").attr("id", "table").append($("<tr></tr>").append(nameTable, surnameTable, ageTable, avgTable)));
          for (let i = 0; i < data.length; i++){          
            let cellName = $("<td></td>").text(data[i]["name"]);
            let cellSurname = $("<td></td>").text(data[i]["surname"]);
            let cellAge = $("<td></td>").text(data[i]["age"]);
            let cellavg = $("<td></td>").text(data[i]["avg"]).attr("name", "avg" + i);
            let editButton = $("<button></button>").attr("onclick", "main.ed(this)").attr("name", "e" + i).text("Edit");
            let deleteButton = $("<button></button>").attr("onclick", "main.del(this)").attr("name", "d" + i).text("Delete");    
            $("table").append($("<tr></tr>").attr("id", i).append(cellName, cellSurname, cellAge, cellavg, editButton, deleteButton));
          }
        }
      }
    });
    let name = $("<p></p>").text("Name: ").append($("<input>").attr("type", "text").attr("id", "name"));
    let surname = $("<p></p>").text("Surname: ").append($("<input>").attr("type", "text").attr("id", "surname"));
    let age = $("<p></p>").text("Age: ").append($("<input>").attr("type", "number").attr("id", "age"));
    let avg = $("<p></p>").text("Avg: ").append($("<input>").attr("type", "number").attr("id", "avg"));
    let buttonAdd = $("<button></button>").text("Add").attr("onclick", "main.add()");
    let buttonavg = $("<button></button>").text("Avg all").attr("onclick", "main.avg()");
    let div = $("<div></div>");
    $("body").append(name, surname, age, avg, buttonAdd, buttonavg,div);  
    let main = (function() {
      function add(array = []){
        if(array.length) {
          $("table").empty();
          let nameTable = $("<td></td>").text("Name");
          let surnameTable = $("<td></td>").text("Surname");
          let ageTable = $("<td></td>").text("Age");
          let avgTable = $("<td></td>").text("Avg");
          ($("table").attr("id", "table").append($("<tr></tr>").append(nameTable, surnameTable, ageTable, avgTable)));
          for (let i = 0; i < array.length; i++){           
            let cellName = $("<td></td>").text(array[i]["name"]);
            let cellSurname = $("<td></td>").text(array[i]["surname"]);
            let cellAge = $("<td></td>").text(array[i]["age"]);
            let cellavg = $("<td></td>").text(array[i]["avg"]).attr("name", "avg" + i);
            let editButton = $("<button></button>").attr("onclick", "main.ed(this)").attr("name", "e" + i).text("Edit");
            let deleteButton = $("<button></button>").attr("onclick", "main.del(this)").attr("name", "d" + i).text("Delete");        
            $("table").append($("<tr></tr>").attr("id", i).append(cellName, cellSurname, cellAge, cellavg, editButton, deleteButton));
          }
        } else {
          let array = [];     
          for (let i = 0; i <= +$("table tr:last-child").attr("id"); i++){
            let student = {
              "name": $("tr:eq(" + (i + 1) +") td:eq(0)").text(),
              "surname": $("tr:eq(" + (i + 1) +") td:eq(1)").text(),
              "age": $("tr:eq(" + (i + 1) +") td:eq(2)").text(),
              "avg": $("tr:eq(" + (i + 1) +") td:eq(3)").text()
            }
          array.push(student);
          } 
          let student = {
            "name": $("#name").val(),
            "surname": $("#surname").val(),
            "age": $("#age").val(),
            "avg": $("#avg").val()
          };
          array.push(student);
          $("table").empty();
          let nameTable = $("<td></td>").text("Name");
          let surnameTable = $("<td></td>").text("Surname");
          let ageTable = $("<td></td>").text("Age");
          let avgTable = $("<td></td>").text("Avg");
          ($("table").attr("id", "table").append($("<tr></tr>").append(nameTable, surnameTable, ageTable, avgTable)));
          for (let i = 0; i < array.length; i++){           
            let cellName = $("<td></td>").text(array[i]["name"]);
            let cellSurname = $("<td></td>").text(array[i]["surname"]);
            let cellAge = $("<td></td>").text(array[i]["age"]);
            let cellavg = $("<td></td>").text(array[i]["avg"]).attr("name", "avg" + i);
            let editButton = $("<button></button>").attr("onclick", "main.ed(this)").attr("name", "e" + i).text("Edit");
            let deleteButton = $("<button></button>").attr("onclick", "main.del(this)").attr("name", "d" + i).text("Delete");         
            $("table").append($("<tr></tr>").attr("id", i).append(cellName, cellSurname, cellAge, cellavg, editButton, deleteButton));
          }
        }
      }
      function avg(){
        let array = [];     
        for (let i = 0; i <= +$("table tr:last-child").attr("id"); i++){
          let student = {
            "name": $("tr:eq(" + (i + 1) +") td:eq(0)").text(),
            "surname": $("tr:eq(" + (i + 1) +") td:eq(1)").text(),
            "age": +$("tr:eq(" + (i + 1) +") td:eq(2)").text(),
            "avg": +$("tr:eq(" + (i + 1) +") td:eq(3)").text()
          }
          array.push(student);
        } 
        if(!array.length){
         $("div").text(` Avg all: 0`);
        } else {  
          let num = array.length;
          let sum = 0;
          for (let i = 0; i < num; i++){
            sum += +$('td[name = "avg' + i + '"]').text();
          }
          $("div").text(` Avg all: ${(sum / num).toFixed(1)}`);
        }       
      }
      function ed(obj){
        let array = []; 
        for (let i = 0; i <= +$("table tr:last-child").attr("id"); i++){
          let student = {
            "name": $("tr:eq(" + (i + 1) +") td:eq(0)").text(),
            "surname": $("tr:eq(" + (i + 1) +") td:eq(1)").text(),
            "age": $("tr:eq(" + (i + 1) +") td:eq(2)").text(),
            "avg": $("tr:eq(" + (i + 1) +") td:eq(3)").text()
          }
          array.push(student);
        }
        idEditElement = +obj.name.slice(1);
        let editElement = array[idEditElement];       
        editElement["name"] = prompt("Edit Name:", editElement["name"]);
        editElement["surname"] = prompt("Edit Surname:", editElement["surname"]);
        editElement["age"] = +prompt("Edit Age:", editElement["age"]);
        editElement["avg"] = +prompt("Edit Avg:", editElement["avg"]);
        array[idEditElement] = editElement
        add(array);          
      }
      function del(obj){
        let array = []; 
        for (let i = 0; i <= +$("table tr:last-child").attr("id"); i++){
          let student = {
            "name": $("tr:eq(" + (i + 1) +") td:eq(0)").text(),
            "surname": $("tr:eq(" + (i + 1) +") td:eq(1)").text(),
            "age": $("tr:eq(" + (i + 1) +") td:eq(2)").text(),
            "avg": $("tr:eq(" + (i + 1) +") td:eq(3)").text()
          }
          array.push(student);
        }
        if(array.length == 1) {
          $("table").empty();
          $("table").attr("border", "0");
          return;
        }
        let deleteIndex;
        for (let i = 0; i <= array.length; i++){
          if ("d" + i == obj.name){
            deleteIndex = i;
            break;
          }
        }
        let newArray = [];
        for (let i = 0; i < array.length; i++){
          if (i == deleteIndex) continue;
          newArray.push(array[i]);
        }
        array = newArray;
        add(array);
      }
      return {
        add: add,
        avg: avg,
        ed: ed,
        del: del
      }
    })();