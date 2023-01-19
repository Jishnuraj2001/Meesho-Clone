let register_btn=document.querySelector("#seller-box form");
register_btn.addEventListener("submit",(event)=>{
    event.preventDefault();
    let obj={};
    let all_input_tags=document.querySelectorAll("#seller-box input");
    for(let i=0;i<all_input_tags.length-1;i++){
        obj[all_input_tags[i].id]=all_input_tags[i].value;
    }
    registerFunction(obj);
})


let registerFunction=async(obj)=>{
    try {
        let register_req=await fetch(`http://localhost:4040/admin/register`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(obj)
        })
        if(register_req.ok){
            alert("Registration Successful.");
            window.location.href="admin.login.html";
        }else{
            alert("Registration Failed!,Please Try Again.");
        }
    } catch (error) {
        console.log(error.message);
        alert("Registration Failed!,Please Try Again.");
    }
}