<template>
  <div class="home__slider js-home-slider">
    <div class="home__slider__media">
      <img v-for="project in datas.slider" v-if="project.img" :src="project.src" :data-type="project.type" class="js-slide-element media js-home-slider-media is-image" alt="">
      <video v-for="project in datas.slider" v-if="project.video" :src="project.src" :data-type="project.type" class="js-slide-element media js-home-slider-media is-video" poster="" loop muted></video>
    </div>
    <div class="home__slider__desc">
      <p v-for="project in datas.slider" class="title js-home-slider-title js-project-desc" :data-type="project.type" :data-project-id="project.projectId">- {{ project.title }} -</p>
      <p v-for="project in datas.slider" class="date js-home-slider-date js-project-desc" :data-type="project.type" :data-project-id="project.projectId">{{ project.date }}</p>
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
