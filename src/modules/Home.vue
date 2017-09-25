<template>
  <div id="home">
    <section class="home">
      <p class="home__name"><span class="js-name">MÉLINA GUYON</span><br><span class="js-name">FRONT-END DEVELOPER</span></p>
      <div class="home__container">
        <img src="http://localhost:3000/assets/logo-melina-blanc.svg" class="home__container__logo "alt="">
        <slider-home-component></slider-home-component>
      </div>
    </section>
  </div>
</template>

<script>
import Slider from '../components/Slider-Home-Component.vue'

export default {
  components: {
    'slider-home-component': Slider
  }
}
</script>
