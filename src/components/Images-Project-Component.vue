<template>
  <div class="project__images">
    <img v-for="image in project.src" class="full-width" :src="image" alt="">
    <div v-if="project.double" class="project__images__double">
      <img v-for="image in project.srcDouble" class="half-width" :src="image" alt="">
    </div>
    <div v-if="project.sextuple">
      <div class="project__images__triple">
        <img v-for="image in project.srcTripleOne" class="third-width" :src="image" alt="">
      </div>
      <div class="project__images__triple">
        <img v-for="image in project.srcTripleTwo" class="third-width" :src="image" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['project']
}
</script>
