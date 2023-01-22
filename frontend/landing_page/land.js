window.addEventListener("load",(event)=>{
    let url="http://localhost:4040/land";
    getProductsFunction(url);
})



async function getProductsFunction(url,data_perpage=6,page_number=1){
    try {
        let allData_req=await fetch(`${url}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:sessionStorage.getItem("userkey")
            }
        });
        let allData=await allData_req.json();
        let count=0;
        for(let data of allData){
            count++;
        }

        let get_all_data=await fetch(`${url}?limit=${data_perpage}&page=${page_number}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:sessionStorage.getItem("nxmkey")
            }
        })
        if(get_all_data.ok){
            //let total_data_count=get_all_data.headers.get("x-total-count");
            let total_data_count=count;
            let total_pages=Math.ceil(total_data_count/data_perpage);
            //alert("all products are fetched successfully");
            let all_data=await get_all_data.json();
            renderDataFunction(all_data,url);
            renderPaginationButtons(total_pages,url);
        }
    } catch (error) {
        alert(error);
    }
}



function renderDataFunction(all_data,url){
    document.querySelector("#display-address-container").innerHTML=null;
    let display_container=document.querySelector("#display-container");
    display_container.innerHTML=null;
    let newData=all_data.map((item)=>{
        return`<div class="product-box">
                    <img class="image" src=${item.image} alt="">
                    <div class="content">
                        <h4 class="title">${item.title.substring(0,30)}...</h4>
                        <p class="description">${item.category}</p>
                        <p class="pro-id">${item.rating}</p>
                        <p class="price">₹${item.price}</p>
                        <button class="delete box-btn" data-id=${item._id}>ADD TO CART</button>
                    </div>
                </div>`;
    })
    display_container.innerHTML=newData.join("");

}



//Pagination part
let paginationWrapper=document.querySelector("#pagination-wrapper");
function renderPaginationButtons(total_pages,url){
    console.log(total_pages,`${url}`);
    paginationWrapper.innerHTML = `
      <div className="pagination-btn-list">
      ${CreatePagButton(total_pages).join(" ")}
      </div>
    `;
    //handle clicks of pagination buttons
    let paginationButtons=document.querySelectorAll(".pagination-btn");
    for(let paginationBtn of paginationButtons){
        paginationBtn.addEventListener("click",(event)=>{
            let page_number=event.target.dataset.id;
            //console.log(page_number);
            getProductsFunction(url,data_perpage=6,page_number);
            // getAddressFunction(url,data_perpage=4,page_number);
        })
    }
}
function CreatePagButton(total_page){
    let array=[];
    for(let page=1;page<=total_page;page++){
        array.push(getAsBtn(page,page))
    }
    return array;
}
function getAsBtn(text,dataId){
    console.log(dataId);
    return`<button class="pagination-btn" data-id=${dataId} ${dataId ? `data-id=${dataId}`:''}">${text}</button>`;
}
