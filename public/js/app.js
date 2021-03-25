


   const weatherForm = document.querySelector('form');
   //const input = weatherForm.querySelector('input').value;
   const messageOne = document.querySelector('#message-1');
   const messageTwo = document.querySelector('#message-2');

   

   weatherForm.addEventListener('submit', (e) => {
       e.preventDefault();
       
       //const input = e.target.children[0].value;    -another way
       const input = weatherForm.querySelector('input').value;
       console.log(input)
       messageOne.textContent = 'Loading...';
        messageTwo.textContent = '';
       fetch(`/weather?address=${input}`)
        .then((response) => {
            response.json()
            .then((data) => {
                if(data.error){
                    console.log(data.error);
                    messageOne.textContent = data.error;

                }else{
                    console.log(data.location);
                    messageOne.textContent = data.location;
                    console.log(data.forecast);
                    messageTwo.textContent = `It is ${data.forecast.current}, ${data.forecast.feelslike} degrees`;
                }
                
            })
        });
    //    console.log('testing');
   })