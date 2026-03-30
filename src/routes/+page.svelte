<section>
  <h1>Welcome to SvelteKit</h1>
  <p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
  </p>

  <section class="animation_section">
    <div class="container">
      <img
        src="./src/lib/assets/airplane.png"
        alt="nothing"
        class="airp"
      />

      <img
        src="./src/lib/assets/cloud.png"
        alt="cloud"
        class="cloud1"
      />

      <img
        src="./src/lib/assets/cloud2.png"
        alt="cloud"
        class="cloud2"
      />
    </div>
  </section>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  section.animation_section {
    width: 100vw;
    height: 10rem;
  }

  .container {
    /*   background-color:cyan; */
    background-image: linear-gradient(to top, #e7f0fd 0%, #accbee 100%);
    width: 30vw;
    position: relative;
    overflow: hidden;
  }

  .airp {
    left: -60px;
    width: 10rem;
    height: auto;
    position: absolute;
    animation-name: slideUpRight;
    animation-duration: 4s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    position: relative;
    transform: rotate(120deg);
  }
  .cloud1 {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100px;
    height: auto;
  }

  .cloud2 {
    position: absolute;
    right: -10px;
    top: 0;
    width: 100px;
    height: auto;
    /* transform: rota; */
  }

  /* .airp::before {
    content: "rtgfgvfg-";
  position:relative;
  left:-20px;
  width:20px;
  height:2px;
  background-color:green;
  
} */

  @keyframes slideUpRight {
    0% {
      left: 0;
      transform: translateX(0);
    }
    25% {
      transform: translateY(0);
    }
    75% {
      transform: translateY(-50%);
    }
    100% {
      left: 120%;
      transform: translateX(-100%);
      transform: translateY(0);
    }
  }
</style>
