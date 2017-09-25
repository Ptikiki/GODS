<template>
  <div id="about">
    <div class="about">
      <div class="about__title">
        <span>-</span><span class="title">{{ datas.title }}</span><span>-</span>
      </div>
      <div class="about__desc">
        <div class="about__desc__logo">
          <img :src="datas.srcLogo" alt="">
        </div>
        <p class="about__desc__about" v-html="datas.desc">{{ datas.desc }}</p>
        <br>
        <p class="about__desc__about">If you’d like to chat <a class="about-links" href="mailto:guyonmelina@gmail.com" target="_blank">contact me.</a><br>Or you can check <a class="about-links" href="http://localhost:3000/assets/Melina-Guyon-CV.pdf" target="_blank">my resume.</a></p>
        <p class="about__desc__about">You can also find me there : <a class="about-links" href="https://twitter.com/MelinaGuyon" target="_blank">Twitter</a> - <a class="about-links" href="https://github.com/MelinaGuyon" target="_blank">GitHub</a> - <a class="about-links" href="http://codepen.io/MelinaGuyon/" target="_blank">CodePen</a> - <a class="about-links" href="https://www.linkedin.com/in/melina-guyon-488107b5/" target="_blank">LinkedIn</a></p>
        <br>
        <p class="about__desc__about designed"><a href="" href="https://www.behance.net/AxlPasquier" target="_blank">Designed by Axelle Pasquier</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import aboutDatas from '../javascript/datas/About-Datas'

export default {
  data () {
    return {
      datas: aboutDatas
    }
  }
}
</script>
