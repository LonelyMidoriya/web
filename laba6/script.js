let students = [];
    class Table extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                name: "",
                surname: "",
                age: null,
                avg: null,
                avgStudents: null,
                data: []
            };
           
            this.nameAdd = this.nameAdd.bind(this);
            this.surnameAdd = this.surnameAdd.bind(this);
            this.ageAdd = this.ageAdd.bind(this);
            this.avgAdd = this.avgAdd.bind(this);
            this.studentAdd = this.studentAdd.bind(this);
            this.studentEdit = this.studentEdit.bind(this);
            this.studentDelete = this.studentDelete.bind(this);
        }
        componentDidMount() {
            fetch("student.json")
            .then(response => response.json())
            .then((result) => {
            students = result;
                if(students.length) {
                    const num = students.length;
                    let sum = 0;
                    for (let i = 0; i < students.length; i++){
                        sum += +students[i]["avg"];
                    }
                    const avg = (sum / num).toFixed(1);
                    this.setState({
                        avgStudents: avg,
                        data: students
                    });
                } else {
                    this.setState({
                        avgStudents: 0,
                        data: []
                    }); 
                }
            });
        }
        nameAdd(e) {
            let val = e.target.value;
            this.setState({name: val, surname: this.state.surname, age: this.state.age, avg: this.state.avg});
        }
        surnameAdd(e) {
            let val = e.target.value;    
            this.setState({name: this.state.name, surname: val, age: this.state.age, avg: this.state.avg});
        }
        ageAdd(e) {
            let val = e.target.value;    
            this.setState({name: this.state.name, surname: this.state.surname, age: val, avg: this.state.avg});
        }
        avgAdd(e) {
            let val = e.target.value;    
            this.setState({name: this.state.name, surname: this.state.surname, age: this.state.age, avg: val});
        }
        studentAdd(e) {
            e.preventDefault();
            let student = {
                "name": this.state.name,
                "surname": this.state.surname,
                "age": this.state.age,
                "avg": this.state.avg
            };
            students.push(student);             
            const num = students.length;
            let sum = 0;        
            for (let i = 0; i < students.length; i++){
                sum += +students[i]["avg"];
            }
            const avg = (sum / num).toFixed(1);
            this.setState({
                avgStudents: avg,
                data: students
            }); 
        }
        studentEdit(e) {
            e.preventDefault();
            const studentId = +e.currentTarget.id.slice(1);
            students[studentId] = {
                "name": prompt("Edit Name:", students[studentId]["name"]),
                "surname": prompt("Edit Surname:", students[studentId]["surname"]),
                "age": +prompt("Edit Age:", students[studentId]["age"]),
                "avg": +prompt("Edit Avg:", students[studentId]["avg"])
            };
            const num = students.length;
            let sum = 0;        
            for (let i = 0; i < students.length; i++){
                sum += +students[i]["avg"];
            }
            const avg = (sum / num).toFixed(1);
                this.setState({
                    avgStudents: avg,
                    data: students
                });
        }
        studentDelete(e) {
            e.preventDefault();
            if (students.length == 1){
                students = [];
                this.setState({
                    avgStudents: null,
                    data: []
                });
            } else {
                const studentId = +e.currentTarget.id.slice(1);
                let newStudents = [];
                for (let i = 0; i < students.length; i++){
                    if (i != studentId){
                        newStudents.push(students[i]);
                    }    
                }
                students = newStudents;
                const num = students.length;
                let sum = 0;       
                for (let i = 0; i < students.length; i++){
                    sum += +students[i]["avg"];
                }
                const avg = (sum / num).toFixed(1);
                this.setState({
                    avgStudents: avg,
                    data: students
                });
            }
        }
        render() {
                return (
                    <div>
                        <form onSubmit={this.studentAdd}>
                            <p>Name: <input type="text" value={this.state.name} onChange={this.nameAdd}/></p>
                            <p>Surname: <input type="text" value={this.state.surname} onChange={this.surnameAdd}/></p>
                            <p>Age: <input type="number" value={this.state.age} onChange={this.ageAdd}/></p>
                            <p>Avg: <input type="number" value={this.state.avg} onChange={this.avgAdd}/></p>
                            <input type="submit" value="Add" />         
                        </form>
                        <table border="0">
                            <tr>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Age</th>
                                <th>Avg</th>
                            </tr>
                            {this.state.data.map((student,index) => (
                            <tr key={index}>
                                <td>{student.name}</td>
                                <td>{student.surname}</td>
                                <td>{student.age}</td>
                                <td>{student.avg}</td>
                                <input type="button" value="Edit" onClick={this.studentEdit} id={'e' + index}/>
                                <input type="button" value="Delete" onClick={this.studentDelete} id={'d' + index}/>
                            </tr>
                            ))}

                            <tr>
                                <input type="text" value={`Avg all: ${this.state.avgStudents}`}/>
                            </tr>
                        </table>    
                    </div>   
                );
            }
        }

        ReactDOM.render(
            <Table />,
            document.getElementById("app")
        )