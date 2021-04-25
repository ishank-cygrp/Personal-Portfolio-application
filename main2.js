fetch('https://localhost:44324/api/EducationData',{
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer'
}
)
.then(res => res.json())
.then(data => {
    let li = "";
    data.forEach(TempUser => {
        li += `<div class="box">
        <i class="fas fa-graduation-cap"></i>
            <div class="row">
                <div class="col-md-8">              
                    <span>${TempUser.year} </span>
                    <h3>${TempUser.qualification}</h3>
                    <p>${TempUser.schoolName}</p> 
                    <p>Percentage / CGPA : ${TempUser.grade}</p>
                </div>
                <div class="col-md-4">
                    <div class="row">
                        <div class="col-md-6">
                            <i class="fas fa-pen bg-success" id="update" style="font-size: 1.8rem; cursor:pointer" data-toggle="modal" data-target="#myModal" onclick="updateEducation(${TempUser.id}, '${TempUser.year}', '${TempUser.qualification}', '${TempUser.schoolName}', '${TempUser.grade}')"></i>
                        </div>
                        <div class="col-md-6">
                            <i class="fas fa-trash-alt bg-danger ml-4" id="delete" style="font-size: 1.8rem; cursor:pointer" onclick="DeleteEducation(${TempUser.id})"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    });
    document.getElementById("education-details").innerHTML = li;
})
.catch(function(error) {
    console.log('Looks like there was a problem: \n', error);
});


function updateEducation(id, year, quali, sname, grade){
    // console.log('Hiiiiii');
    document.getElementById('Modalyear').value = year;
    document.getElementById('ModalQualification').value = quali;
    document.getElementById('ModalSname').value = sname;
    document.getElementById('ModalGrade').value = grade;

    document.getElementById('update-btn').addEventListener('click', function(){

        var TempYear=document.getElementById("Modalyear");
        var TempQualification=document.getElementById("ModalQualification");
        var TempSname=document.getElementById("ModalSname");
        var TempGrade=document.getElementById("ModalGrade");
        var TempUser={
        "Year":TempYear.value,
        "Qualification":TempQualification.value,
        "SchoolName":TempSname.value,
        "Grade":TempGrade.value
        }

        let myToken = JSON.parse(localStorage.getItem("token"));
        // console.log(myToken.token);
        // console.log(TempUser);
        fetch("https://localhost:44324/api/EducationData" + "/" + id.toString(), {
        method: "PUT",
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + myToken.token
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(TempUser)
        })
        .then(result => {
            alert('Entry is Updated');
        });
        document.getElementById('modal-close-btn').addEventListener('click', function(){
            window.location.reload();
        });
    });
}

function addEducation(){
    var Temp2Year=document.getElementById("Modal2year");
    var Temp2Qualification=document.getElementById("Modal2Qualification");
    var Temp2Sname=document.getElementById("Modal2Sname");
    var Temp2Grade=document.getElementById("Modal2Grade");
    var Temp2User={
        "Year":Temp2Year.value,
        "Qualification":Temp2Qualification.value,
        "SchoolName":Temp2Sname.value,
        "Grade":Temp2Grade.value
    }
    let myToken = JSON.parse(localStorage.getItem("token"));
    // console.log(TempUser);
    fetch("https://localhost:44324/api/EducationData", {
    method: "POST",
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer' + myToken.token
     },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(Temp2User)
    })
    .then(result => {
        alert('Successfully addedd');
        window.location.reload();
    });
}


function DeleteEducation(id){
    let myToken = JSON.parse(localStorage.getItem("token"));
    fetch("https://localhost:44324/api/EducationData" + "/" + id.toString(), {
    method: "DELETE",
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer' + myToken.token
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer',
    })
    .then(result => {
        alert('Entry Deleted!');
        window.location.reload();
    });
}


function GetContactData(){
    let myToken = JSON.parse(localStorage.getItem("token"));
    fetch('https://localhost:44324/api/ContactData',{
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + myToken.token
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer'
}
)
.then(res => res.json())
.then(data => {
    let li = "";
            data.forEach(User => {
               // console.log(user);
            li += `<tr>
            <td>${User.name} </td>
            <td>${User.email} </td>
            <td>${User.projectName} </td>
            <td>${User.message}</td> 
          <td>  <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
               
            <div  class="btn-group me-2" role="group" aria-label="Second group" >
            <a href="mailTo: ${User.name}"><i class="fas fa-envelope mr-2" style="color:green; font-size: 1.9rem; cursor:pointer"></i></a>    
            </div>
            <div class="btn-group" role="group" aria-label="Third group" onclick="DeleteContact(${User.id})">
                <i class="fas fa-trash-alt " style="color: red; font-size: 1.9rem; cursor:pointer"></i>
            </div>
        </td>
        </tr>`;
    });
    document.getElementById("ContactTable").innerHTML = li;
})
.catch(function(error) {
  console.log('Looks like there was a problem: \n', error);
});
}


function DeleteContact(id){
    let myToken = JSON.parse(localStorage.getItem("token"));
    fetch("https://localhost:44324/api/ContactData" + "/" + id.toString(), {
    method: "DELETE",
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + myToken.token
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer',
    })
    .then(result => {
        alert('Entry Deleted!');
    });
}