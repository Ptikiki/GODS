import { TweenLite } from 'gsap'
import Vue from 'vue'

import HomeTemplate from '../../modules/Home.vue'
import AboutTemplate from '../../modules/About.vue'
import ProjectTemplate from '../../modules/Project.vue'
import LabTemplate from '../../modules/Lab.vue'
import GridTemplate from '../../modules/Grid.vue'
import NavTemplate from '../../modules/Nav.vue'

import SliderHome from './SliderHome.class.js'
import SliderProject from './SliderProject.class.js'
import SliderLab from './SliderLab.class.js'

class VueBuilder {

  constructor() {
    STORAGE.vueBuilderClass = this
    this.home
    this.about
    this.project
    this.lab
  }

  init() {
    this.initGrid()
    this.initNav()
    this.initHome(0, 'project')
  }

  initHome(sliderIndex, sliderType) {
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

    let SliderHomeClass = new SliderHome(sliderIndex, sliderType)
    SliderHomeClass.setActive()
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

  initProject(sliderIndex) {
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

    let SliderProjectClass = new SliderProject(sliderIndex)
    SliderProjectClass.setActive()
  }

  initLab(sliderIndex) {
    this.lab = new Vue({
      el: '#lab',
      data: {},
      computed: {
        viewModel() {
          return LabTemplate
        }
      },
      render(h) {
        return h(this.viewModel)
      }
    })

    let SliderLabClass = new SliderLab(sliderIndex)
    SliderLabClass.setActive()
  }

  initNav() {
    new Vue({
      el: '#nav',
      data: {},
      computed: {
        viewModel() {
          return NavTemplate
        }
      },
      render(h) {
        return h(this.viewModel)
      }
    })
  }

  initGrid() {
    new Vue({
      el: '#grid',
      data: {},
      computed: {
        viewModel() {
          return GridTemplate
        }
      },
      render(h) {
        return h(this.viewModel)
      }
    })
  }

}

export default VueBuilder
