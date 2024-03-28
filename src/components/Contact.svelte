<script>
    import { Modals, closeModal, openModal, modals } from 'svelte-modals'
    import Modal from './Modal.svelte'
      
    function handleOpen() {
        openModal(Modal, { 
            title: `Contact Me`, 
        })
    }
</script>

<button on:click={handleOpen}>
    Contact Me
</button>

<Modals>
    <div
        slot="backdrop"
        class="backdrop"
        on:click={closeModal}
    />
</Modals>

<style>
    .backdrop {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: black;
        opacity: 50%;
        transition: 0.5s;
    }
    button {
        background-color: rgb(238, 198, 108);
        border: none;
        padding: 12px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 1000px;
        font-size: 15px;
        color: #102542;
        font-weight: bold;
        transition: .25s;
    }
    button:hover {
        background-color: rgb(202, 167, 86);
        transition: 0.25s;
    }
</style>