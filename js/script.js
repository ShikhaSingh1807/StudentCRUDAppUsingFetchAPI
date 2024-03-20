function getData() {
    fetch("http://localhost:3000/student").then((response) => {
        return response.json();
    }).then((resp) => {
        let tbody = document.getElementById("demo");
        console.log(tbody);
        let tdata = "";
        resp.forEach(element => {
            tdata += `<tr>
                        <td>${element.id}</td>
                        <td>${element.name}</td>
                        <td>${element.email}</td>
                        <td><button class="btn btn-warning" onclick="getDataById(${element.id});"><i class="fa fa-edit"></i></button></td>
                        <td><button class="btn btn-danger" onclick="deleteData(${element.id})"><i class="fa fa-trash"></i></button></td>
                     </tr>`;
        });

        tbody.innerHTML = tdata;
    }).catch((err) => { console.log(err); });
}

function addData(event) {
    event.preventDefault();
    // Extracted values entered by User
    let name = document.getElementById('exampleInput1').value;
    let email = document.getElementById('exampleInput2').value;

    // Created a data object from the extracted values

    let data = {
        name: name,
        email: email
    }

    //Through fetch call posting the data to the db.json 
    fetch('http://localhost:3000/student', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((resp) => {
        alert("Data Saved Successfully");
        getData();
    }).catch((err) => {
        console.log(err);
        alert('Error in adding Data');
    });
}


function deleteData(id) {
    console.log('Deleted Id is : ' + id);
    fetch(`http://localhost:3000/student/${id}`, {
        method: "DELETE"
    }).then((resp) => {
        alert('Data Deleted Successfully!!!');
        getData();
    }).catch((err) => {
        console.log(err);
        alert('Error occurred while deleting data');
    })
}


function getDataById(id) {
    console.log('Id to be updated is : ' + id);
    fetch(`http://localhost:3000/student/${id}`).then((response) => {
        return response.json();
    }).then((resp) => {
        console.log(resp);
        let studentId = resp.id;
        let studentName = resp.name;
        let studentEmailId = resp.email;
        console.log("Id : " + studentId + " ,Name : " + studentName + " ,Email Id : " + studentEmailId);

        document.getElementById('stuId').value = studentId;
        document.getElementById('stuName').value = studentName;
        document.getElementById('stuemail').value = studentEmailId;
    }).catch(error => {
        console.log(error);
        alert('Error in getting data by Id');
    });



}

function updateData(event) {
    event.preventDefault();
    let stuid = document.getElementById('stuId').value;
    let stuname = document.getElementById('stuName').value;
    let stuemail = document.getElementById('stuemail').value;

    let data = {
        name: stuname,
        email: stuemail
    };

    console.log(data);

    fetch(`http://localhost:3000/student/${stuid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)

    }).then((response) => {
        alert('Data Updated Successfully...');
        getData();
    }).catch((err) => {
        console.log(err);
        alert('Error occurred while updating data');
    })
}

getData();