function Authenticatelogin(){
    
    var username = document.getElementById('ModalUserName');
    var password = document.getElementById('ModalPassword');
    var User = {
        "UserName" : username.value,
        "Password" : password.value
    }

    fetch("https://localhost:44324/api/Login", {
    method: "POST",
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
    'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(User)
    })
    .then(res => res.json())
    .then(res => {
        // console.log(res);
        document.getElementById('error-message').innerHTML = "";
        localStorage.setItem("token", JSON.stringify(res));
        alert('Successfully Logged In');
        window.open('/index2.html');
    })
    .catch(function(){
        // console.log("You are not authorized!");
        document.getElementById('error-message').innerHTML = "You are not authorized. Re-enter the credentials!"
    })
    // .then(function (response) {
    //     if(response.status == 401){
    //         console.log("You are not authorized");
    //         document.getElementById('error-message').innerHTML = "You are not authorized. Re-enter the credentials!"
    //     }else if(response.status == 200){
    //         response.body.
    //         // alert('Successfully Logged In');
    //         // window.open('/index2.html');
    //     }
    // });
}


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
                <div class="col-md-12">              
                    <span>${TempUser.year} </span>
                    <h3>${TempUser.qualification}</h3>
                    <p>${TempUser.schoolName}</p> 
                    <p>Percentage / CGPA : ${TempUser.grade}</p>
                </div>
            </div>
        </div>`;
    });
    document.getElementById("education-details").innerHTML = li;
})
.catch(function(error) {
    console.log('Looks like there was a problem: \n', error);
});



function submitContactDetails(){
    var Cname=document.getElementById("contact-name");
    var Cemail=document.getElementById("contact-email");
    var Cproject=document.getElementById("contact-project");
    var Cmessage=document.getElementById("contact-message");
    var ContactUser={
        "name":Cname.value,
        "email":Cemail.value,
        "projectName":Cproject.value,
        "message":Cmessage.value
    }
    let myToken = JSON.parse(localStorage.getItem("token"));
    fetch("https://localhost:44324/api/ContactData", {
    method: "POST",
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + myToken.token
     },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(ContactUser)
    })
    .then(result => {
        alert('Data you entered is stored');
        document.getElementById("contact-name").innerHTML = "";
        document.getElementById("contact-email").innerHTML = "";
        document.getElementById("contact-project").innerHTML = "";
        vdocument.getElementById("contact-message").innerHTML = "";
    });
}
