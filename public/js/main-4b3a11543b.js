const submit=document.querySelector("#submit"),Form=document.querySelector("#reservationData");Form.addEventListener("submit",e=>{e.preventDefault();e=new FormData(Form),e=Object.fromEntries(e.entries());fetch("/reservationData",{method:"post",crossDomain:!0,body:JSON.stringify(e),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(e=>{console.log("hello",document.cookie.split("; "));var o=document.cookie.split("; ").find(e=>e.startsWith("flash_message="));o&&(toastr.success(decodeURIComponent(o.split("=")[1])),document.cookie="flash_message=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"),console.log("Data sent successfully"),Form.reset()}).catch(e=>{console.error("Error sending data:",e)})});