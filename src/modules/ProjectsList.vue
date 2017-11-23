<template>
  <div id="projects">
    <div v-for="project in datas.slider" class="list__project">
      <img v-if="project.img" :src="project.src" :data-type="project.type" class="media is-image" alt="">
      <video v-if="project.video" :src="project.src" :data-type="project.type" class="media is-video" poster="" loop muted></video>
      <div class="desc">
        <p class="title" :data-type="project.type" :data-project-id="project.projectId">- {{ project.title }} -</p>
        <p class="date" :data-type="project.type" :data-project-id="project.projectId">{{ project.date }}</p>
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
