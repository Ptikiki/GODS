<template>
  <div class="home__slider js-home-slider">
    <div class="home__slider__media">
      <img v-for="slide in datas.slider" v-if="slide.img" :src="slide.src" :data-type="slide.type" class="js-slide-element media js-home-slider-media is-image" alt="">
      <video v-for="slide in datas.slider" v-if="slide.video" :src="slide.src" :data-type="slide.type" class="js-slide-element media js-home-slider-media is-video" poster="" loop muted></video>
    </div>
    <div class="home__slider__desc">
      <p v-for="slide in datas.slider" class="title js-home-slider-title js-project-desc" :data-type="slide.type" :data-project-id="slide.projectId">- {{ slide.title }} -</p>
      <p v-for="slide in datas.slider" class="date js-home-slider-date js-project-desc" :data-type="slide.type" :data-project-id="slide.projectId">{{ slide.date }}</p>
    </div>
  </div>
</template>

<script>
import sliderHomeDatas from '../javascript/datas/Slider-Home-Datas'

export default {
  data () {
    return {
      datas: sliderHomeDatas
    }
  }
}
</script>
