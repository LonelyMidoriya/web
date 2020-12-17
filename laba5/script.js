let app = angular.module('myApp', []);
    app.controller('myController',
         function ($scope, $http) {
            let request = {
                method: 'get',
                    url: 'student.json',
                dataType: 'json'
            };
    $scope.data = [];
    $http(request)
        .success(function (data) {
                $scope.data = data;
                    let sum = 0;
                        for (let i = 0; i < data.length; i++){
                            if (data[i]["avg"]){
                                sum += data[i]["avg"];
                            } else {
                                sum += 0;
                            }
                        }
                        let tfoot = angular.element(document.querySelector("tfoot"));
                        data.length ? tfoot.text(`Avg all: ${(sum / (data.length ? $scope.data.length : 1)).toFixed(1)}`) : tfoot.text("Empty table.");
                });
    $scope.editRow = function (index) {
            let editElement = $scope.data[index];
                editElement["name"] = prompt("Edit  Name:", editElement["name"]);
                editElement["surname"] = prompt("Edit  Surname:", editElement["surname"]);
                editElement["age"] = +prompt("Edit  Age:", editElement["age"]);
                editElement["avg"] = +prompt("Edit  Avg:", editElement["avg"]);
                $scope.data[index] = editElement;
            let sum = 0;
                for (let i = 0; i < $scope.data.length; i++){
                    if ($scope.data[i]["avg"]){
                            sum += $scope.data[i]["avg"];
                        } else {
                            sum += 0;
                        }
                }
                let tfoot = angular.element(document.querySelector("tfoot"));
                tfoot.text(`Avg all: ${(sum / $scope.data.length).toFixed(1)}`);
                };
    $scope.deleteRow = function (index) {
            let newArray = [];
                for (let i = 0; i < $scope.data.length; i++){
                    if (i != index){
                        newArray.push($scope.data[i]);
                    }
                }
    $scope.data = newArray;
            let sum = 0;
                for (let i = 0; i < newArray.length; i++){
                    if (newArray[i]["avg"]){
                            sum += newArray[i]["avg"];
                        } else {
                            sum += 0;
                        }
                }
            let tfoot = angular.element(document.querySelector("tfoot"));
            newArray.length ? tfoot.text(`Avg all: ${(sum / (newArray.length ? $scope.data.length : 1)).toFixed(1)}`) : tfoot.text("Empty table.");    
                };
    $scope.addRow = function (){
            let student = {
                "name": $scope.name,
                "surname": $scope.surname,
                "age": $scope.age,
                "avg": $scope.avg
            };
    $scope.data.push(student);
            let sum = 0;
                for (let i = 0; i < $scope.data.length; i++){
                    if ($scope.data[i]["avg"]){
                            sum += $scope.data[i]["avg"];
                        } else {
                            sum += 0;
                        }
                }
            let tfoot = angular.element(document.querySelector("tfoot"));
                tfoot.text(`Avg all: ${(sum / $scope.data.length).toFixed(1)}`);
                }
        });		  