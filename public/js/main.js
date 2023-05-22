const submit=document.querySelector('#submit');
const Form=document.querySelector('#reservationData');
Form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const formData=new FormData(Form);
    const data=Object.fromEntries(formData.entries());
    fetch('/reservationData', {
        method: 'post',
        crossDomain:true,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then(response => {
            console.log("hello" ,document.cookie.split('; '));
            const flashMessage = document.cookie.split('; ').find(row => row.startsWith('flash_message='));
            if (flashMessage) {
              // display the flash message using toastr
              toastr.success(decodeURIComponent(flashMessage.split('=')[1]));
              // clear the flash message cookie
              document.cookie = 'flash_message=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            }
          console.log('Data sent successfully');
          Form.reset();
        })
        .catch(error => {
          // handle error
          console.error('Error sending data:', error);
        });

})