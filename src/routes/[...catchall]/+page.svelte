<script lang="ts">
    import { page } from "$app/stores";
    import Mascot from "$lib/assets/mascot.svg"

    const path = $page.params.catchall;
</script>

<section class="_route-catchall">
    
        <div class="_catchall-mascot-container">
            <img src={Mascot} alt="mascot" class='_catchall_mascot'/>
        </div>
        <div class='_catchall-message-container'>
            <span class='_catchall-error-code'>404</span>
            <strong class='_catchall-message'>This is not the web page you are looking for.</strong>
        </div>
    
</section>

<style>
    ._route-catchall {
        background-image: linear-gradient(to top ,var(--primary-color-900), var(--secondary-color-500), var(--primary-color-100));
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: auto;
        height: 40rem;
        width: 100vw;
    }

    ._catchall-mascot-container {
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(50%, 90%);

    }

    ._catchall_mascot {
        height: 20rem;
        width: auto;
    }

    ._catchall-message-container {
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(100%, 20%);
    }

    ._catchall-error-code {
        color: var(--primary-color-800);
        text-shadow: 5px 5px 5px var( --white-color);
        font-size:6rem;
        font-weight:bolder;
    }

    ._catchall-message {
        display: flex;
        padding: 3rem;
        border-radius: 1rem;
        font-size:2rem;
        width: 18rem;
        background-color: var(--primary-color-100);
        color: var(--primary-color-900);
        text-shadow: 2px 2px 2px var(--accent-003);

    }    



</style>
