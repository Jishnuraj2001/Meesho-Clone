let register_btn=document.querySelector("#user-box form");
register_btn.addEventListener("submit",(event)=>{
    event.preventDefault();
    let obj={};
    let all_input_tags=document.querySelectorAll("#user-box input");
    for(let i=0;i<all_input_tags.length-1;i++){
        obj[all_input_tags[i].id]=all_input_tags[i].value;
    }
    registerFunction(obj);
})


let registerFunction=async(obj)=>{
    try {
        let register_req=await fetch(`http://localhost:4040/user/register`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(obj)
        })
        if(register_req.ok){
            alert("SignUp Successful.");
            window.location.href="user.login.html";
        }else{
            alert("SignUp Failed!,Please Try Again.");
        }
    } catch (error) {
        console.log(error.message);
        alert("SignUp Failed!,Please Try Again.");
    }
}