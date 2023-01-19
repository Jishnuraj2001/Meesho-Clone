let login_btn=document.querySelector("#seller-box form");
login_btn.addEventListener("submit",(event)=>{
    event.preventDefault();
    let obj={};
    let all_input_tags=document.querySelectorAll("#seller-box input");
    for(let i=0;i<all_input_tags.length-1;i++){
        obj[all_input_tags[i].id]=all_input_tags[i].value;
    }
    loginFunction(obj);
    
})


let loginFunction=async(obj)=>{
    try {
        let login_req=await fetch(`http://localhost:4040/admin/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(obj)
        })
        if(login_req.ok){
            let data=await login_req.json();
            sessionStorage.setItem("nxmkey",data.token);
            alert("Login successful");
            window.location.href="../admin_home/admin.home.html";
        }else{
            alert("Wrong Credentials");
        }
    } catch (error) {
        console.log(error.message);
        alert("Wrong Credentials");
    }
}