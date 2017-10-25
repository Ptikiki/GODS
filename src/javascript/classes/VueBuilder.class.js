import { TweenLite } from 'gsap'
import Vue from 'vue'

import HomeTemplate from '../../modules/Home.vue'
import AboutTemplate from '../../modules/About.vue'
import ProjectTemplate from '../../modules/Project.vue'

import Slider from './Slider.class.js'

class VueBuilder {

  constructor() {
    STORAGE.vueBuilderClass = this
    this.home
    this.about
    this.project
  }

  init() {
    this.initHome(0, 'project')
  }

  initHome() {
    this.home = new Vue({
      el: '#home',
      data: {},
      computed: {
        viewModel() {
          return HomeTemplate
        }
      },
      render(h) {
        return h(this.viewModel)
      }
    })

    let SliderClass = new Slider()

  }

  initAbout() {
    this.about = new Vue({
      el: '#about',
      data: {},
      computed: {
        viewModel() {
          return AboutTemplate
        }
      },
      render(h) {
        return h(this.viewModel)
      }
    })
  }

  initProject() {
    this.project = new Vue({
      el: '#project',
      data: {},
      computed: {
        viewModel() {
          return ProjectTemplate
        }
      },
      render(h) {
        return h(this.viewModel)
      }
    })
  }

}

export default VueBuilder
