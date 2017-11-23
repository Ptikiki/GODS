<template>
  <div id="home">
    <section class="home">
      <p class="home__name"><span class="js-name">Alicia Baudry</span><br><span class="js-name">CREATIVE DEVELOPER</span></p>
      <div class="home__container">
        <img src="#" class="home__container__logo "alt="">
          <div id="nav" class="nav js-nav">
            <span class="nav__item js-nav-item js-nav-about" data-target="#about" id="#about">About me</span></br>
            <span class="nav__item js-nav-item js-nav-projectsList" data-target="#projects" id="#projects">All my projects</span>
          </div>
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
