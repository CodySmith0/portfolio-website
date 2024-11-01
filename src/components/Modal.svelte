<script>
    import { closeModal, closeAllModals, openModal, modals } from 'svelte-modals'
    
    function isValidEmail(email) {
        // Regular expression for validating email addresses
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }   

    export let isOpen;
    export let title;

    let stackIndex = modals.length;
    let email = '';
    let subject = '';
    let message2 = '';
    let errorAppended = false;

    
    function displayMessage(message, color) {
        const modalContent = document.querySelector('.modal-content');
        
        modalContent.querySelectorAll('p').forEach(p => p.remove());
        const messageElement = document.createElement('p');
        
        messageElement.textContent = message;
        messageElement.style.color = color;
        messageElement.style.marginTop = '10px';
        messageElement.style.fontSize = '14px';
        messageElement.style.fontWeight = 'bold';
        modalContent.style.height = '310px';
        modalContent.appendChild(messageElement);
    }

    function validateEmail() {
      const errorText = document.createElement('p');
      const modalContent = document.querySelector('.modal-content');
      if (!isValidEmail(email)) {
          if (!errorAppended){
              displayMessage('Please enter a valid Email Address', 'red');
          }
          return false;
      }
      return true;
    }
  
    $: isFormFilled = email && subject && message2;
    
    async function handleSubmit() {
      if (validateEmail()) {
        if (isFormFilled) {
          const modifiedEmail = '<' + email + '>' + " <mailgun@sandbox4543c9a06b8b4bd4b545664162f6f681.mailgun.org>";
          const requestBody = {
            email: modifiedEmail,
            subject: subject,
            message2: message2
          };

          try {
            const response = await fetch('https://emailscript.fizzled04.workers.dev/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(requestBody)
            });

          if (response.ok) {
            displayMessage('Email sent successfully', 'green');
            email = '';
            subject = '';
            message2 = '';
          } else {
            return response.text().then(text => {
              displayMessage('Email failed to send. Contact me at: cody@fizzled.dev', 'red');
              console.error('Failed to send email:', text);
            });
           }
          } catch (error) {
            displayMessage('Error sending email. Contact me at: cody@fizzled.dev', 'red');
            console.error('Error sending email:', error);
         }
        }
      }
    }
</script>

{#if isOpen}
  <div class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{title}</h2>
        <div id="actions">
          <button id="close" on:click={closeModal}>
            <img src="x-symbol-svgrepo-com.svg" alt="Close button">
          </button>	
        </div>				
      </div>
      <form on:submit|preventDefault={handleSubmit}>
        <div id="modal-body">
          <input id="inputs" type="text" bind:value={email} name="email" placeholder="Email">
          <input id="inputs2" type="text" bind:value={subject} name="subject" placeholder="Subject"> 
        </div>
        <div>
          <textarea id="message" bind:value={message2} name="message" placeholder="Message" spellcheck="true"></textarea>
        </div>
        <button id="submitButton" class="submit" class:disabled={!isFormFilled}>Submit</button>
      </form> 
    </div>
  </div>
{/if}

<style>
  input {
    border-radius: 6px;
  }
  #message {
    width: 99.65%;
    height: 149px;
    background-color: #CDD7D6;
    overflow-wrap: break-word;
    border-radius: 8px;
    resize: none;
    border-color: #102542;
    border-width: 1px;
    margin-top: .5rem;
    outline: none;
    box-sizing: border-box;
    box-shadow: 0 0 0px solid #102542;
    transition: box-shadow 0.1s ease;
    font-family: system-ui, sans-serif;
  }
  #message:focus {
    box-shadow: 0 0 4px #102542;
  }
  #close {
    background-color: #CDD7D6;
    border-color: transparent;
    transition: 0.25s;
    cursor: pointer;
    border-radius: 10px;
    width: 30px;
    height: 30px;
    padding: 4px;
    justify-content: center;
    align-items: center;
    appearance: fixed;
  }
  #close img {
    height: 18px;
    width: 18px;
  }
  #close:hover{
    background-color: rgb(140, 167, 162);
    transition: 0.25s;
  }
  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    overflow: auto;
  }
  .modal-content {
    width: 400px;
    height: 270px;
    border-radius: 15px;
    padding: 16px;
    background: #CDD7D6;
    pointer-events: auto;
    animation-name: animatemodal;
    animation-duration: 0.5
  }
  .modal-header {
    display: flex;
    justify-content: space-between;
  }
  .modal-header h2 {
    margin-top: 8px;
    margin-left: 8px;
    font-size: 24px;
    color: #102542;
  }
  #inputs {
    width: 49.25%;
    height: 25px;
    justify-self: center;
    background-color: #CDD7D6;
    border: 1px solid #102542;
    outline: none;
    box-sizing: border-box;
    box-shadow: 0 0 0px #102542;
    transition: box-shadow 0.1s ease;
  }
  #inputs:focus {
    box-shadow: 0 0 4px #102542;
  }
  #inputs2 {
    width: 49.25%;
    height: 25px;
    justify-self: center;
    background-color: #CDD7D6;
    border: 1px solid #102542;
    outline: none;
    box-sizing: border-box;
    
    box-shadow: 0 0 0px #102542;
    transition: box-shadow 0.1s ease;
  }
  #inputs2:focus {
    box-shadow: 0 0 4px #102542;
  }
  @keyframes animatemodal {
    from {opacity: 0}
    to {opacity: 1}
  }
  .submit {
        background-color: rgb(238, 198, 108);
        border: none;
        padding: 12px 20px;
        width: 99.65%;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        margin-top: 4px;
        cursor: pointer;
        border-radius: 1000px;
        font-size: 15px;
        color: #102542;
        font-weight: bold;
        transition: .25s;
  }
  .submit:hover {
        background-color: rgb(202, 167, 86);
        transition: 0.25s;
  }
  .submit.disabled {
      background-color: grey;
      color: #666;
      cursor: default;
  }

</style>