<template>
  <div class="project__header">
    <div class="project__header__desc">
      <p class="date">- {{ project.date }} -</p>
      <p class="techno">Technology : {{ project.techno }}</p>
      <p class="text" v-html="project.desc">{{ project.desc }}</p>
      <p class="link" v-if="project.url"><a :href="project.url" target="_blank">- See the project -</a></p>
      <p class="code-link" v-if="project.gitHubUrl"><a :href="project.gitHubUrl" target="_blank">- See the code -</a></p>
      <br>
      <div class="roles">
        <p class="roles__team" v-if="project.team" v-html="project.team">{{ project.team }}</p>
        <p class="roles__personal" v-html="project.role">{{ project.role }}</p>
      </div>
      <div class="project__header__nav">
        <div class="arrow-prev js-project-slider-prev"></div>
        <div class="arrow-next js-project-slider-next"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['project']
}
</script>
