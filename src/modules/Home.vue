<template>
  <div id="home">
    <section class="home">
      <p class="home__name"><span class="js-name">Alicia Baudry</span><br><span class="js-name">CREATIVE DEVELOPER</span></p>
      <div class="home__container">
        <img src="#" class="home__container__logo "alt="">
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
