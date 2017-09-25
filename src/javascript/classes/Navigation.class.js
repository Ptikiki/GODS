import { TweenLite } from 'gsap'

class Navigation {

  constructor(el) {
    this.el = document.querySelector('.js-nav')
    this.navigationItems = this.el.querySelectorAll('.js-nav-item')

    this.navigationBurger = this.el.querySelector('.js-nav-burger')
    this.navigationBurgerItems = this.el.querySelectorAll('.js-nav-burger-item')

    this.prevActiveSection
    this.activeSection = document.querySelector('#home')
    this.activeSectionName

    this.projectPointers

    this.name = document.querySelectorAll('.js-name')

    this.bind(true)
    this.init()
  }

  init() {
    this.animateNav()
  }

  bind(firstTime) {
    this.projectPointers = document.querySelectorAll('.js-project-pointer')

    let that = this

    for (var i = 0; i < this.projectPointers.length; i++) {
      this.projectPointers[i].addEventListener('click', function(e) {
        let el = this
        that.handleProjectClick(el)
      })
    }

    if (firstTime) {
      this.navigationBurger.addEventListener('click', function(){
        that.handleBurgerClick()
      })

      for (var i = 0; i < this.navigationItems.length; i++) {
        this.navigationItems[i].addEventListener('click', function(e) {
          that.handleItemClick(e)
        })
      }
    }
  }

  animateNav() {
    if (window.innerWidth > 640) {
      TweenMax.from(this.navigationItems, 0.3, {
        scaleY: 0,
        delay:0.9
      })
    }

    this.name = document.querySelectorAll('.js-name')
    if (window.innerWidth > 640) {
      TweenMax.from(this.name, 0.3, {
        scaleY: 0,
        delay:0.9
      })
    }
  }

  animateSection() {
    let that = this
    TweenMax.to(this.prevActiveSection, 0.6, {
      alpha: 0,
      onComplete: function() {
        if (that.prevActiveSection != that.activeSection) {
          TweenMax.set(that.prevActiveSection, { display: 'none' })
        }
      }
    })
    TweenMax.to(this.activeSection, 0.6, {
      display: 'block',
      alpha: 1,
      delay: 0.6
    })
  }

  handleItemClick(e) {
    STORAGE.gridClass.animateGrid()

    this.prevActiveSection = this.activeSection
    this.activeSectionName = e.target.getAttribute('id')
    this.callBuildView()
    this.handlePageChange()

    this.activeSection = document.querySelector(e.target.getAttribute('data-target'))

    this.animateSection()
    this.animateNav()

    if (window.innerWidth < 640) {
      this.handleBurgerClick()
    }
  }

  handleProjectClick(el) {
    this.animateNav()
    STORAGE.gridClass.animateGrid()

    this.prevActiveSection = this.activeSection

    // Must be before callBuildView function
    if (el.getAttribute('data-type') == "project") {
      this.activeSectionName = '#project'
    } else {
      this.activeSectionName = '#lab'
    }

    const projectId = el.getAttribute('data-project-id')
    this.callBuildView(projectId)

    // Must be after callBuildView function
    if (el.getAttribute('data-type') == "project") {
      this.activeSection = document.querySelector('#project')
    } else {
      this.activeSection = document.querySelector('#lab')
    }

    this.animateSection()
  }

  handleBurgerClick() {
    if (this.navigationBurger.classList.contains('is-closed')) {
      this.navigationBurger.classList.remove('is-closed')
      TweenLite.to(this.el, 0.3, {
        right : '-50%'
      })
      TweenLite.to(this.navigationBurger, 0.3, {
        left : '-60px',
        translateX: '0',
        alpha: 1
      })
      TweenLite.to(this.navigationBurgerItems[1], 0.3, {
        alpha : 1
      })
      TweenLite.to(this.navigationBurgerItems[0], 0.3, {
         rotation: 0
      })
      TweenLite.to(this.navigationBurgerItems[2], 0.3, {
        rotation: 0
      })
      TweenLite.to(this.navigationBurgerItems[0], 0.3, {
        y : 0,
        delay: 0.3
      })
      TweenLite.to(this.navigationBurgerItems[2], 0.3, {
        y : 0,
        delay: 0.3
      })
      TweenLite.to(this.navigationBurgerItems[1], 0.3, {
        alpha : 1,
        delay: 0.3
      })
      TweenMax.set([this.el, this.navigationBurgerItems, this.navigationBurger],{
        clearProps: "all",
        delay: 0.6
      })
    } else {
      this.navigationBurger.classList.add('is-closed')
      TweenLite.to(this.el, 0.3, {
        right : 0
      })
      TweenLite.to(this.navigationBurger, 0.3, {
        left : '50%',
        translateX: '-50%',
        alpha: 0.2
      })
      TweenLite.to(this.navigationBurgerItems[0], 0.3, {
        y : 7
      })
      TweenLite.to(this.navigationBurgerItems[2], 0.3, {
        y : -8
      })
      TweenLite.to(this.navigationBurgerItems[1], 0.3, {
        alpha : 0,
        delay: 0.3
      })
      TweenLite.to(this.navigationBurgerItems[0], 0.3, {
         rotation: 45,
         delay: 0.3
      })
      TweenLite.to(this.navigationBurgerItems[2], 0.3, {
        rotation: -45,
        delay: 0.3
      })
    }
  }

  handlePageChange() {
    if (this.activeSectionName == '#homeProject') {
      document.querySelector('.js-nav-lab').classList.remove('is-active')
      document.querySelector('.js-nav-project').classList.add('is-active')
      document.querySelector('.js-nav-about').classList.remove('is-active')
    }
    if (this.activeSectionName == '#homeLab') {
      document.querySelector('.js-nav-lab').classList.add('is-active')
      document.querySelector('.js-nav-project').classList.remove('is-active')
      document.querySelector('.js-nav-about').classList.remove('is-active')
    }
    if (this.activeSectionName == '#about') {
      document.querySelector('.js-nav-lab').classList.remove('is-active')
      document.querySelector('.js-nav-project').classList.remove('is-active')
      document.querySelector('.js-nav-about').classList.add('is-active')
    }
  }

  callBuildView(projectId) {
    if (STORAGE.sliderHomeClass)
      STORAGE.sliderHomeClass.unbind()
    if (STORAGE.sliderProjectClass)
      STORAGE.sliderProjectClass.unbind()
    if (STORAGE.sliderLabClass)
      STORAGE.sliderLabClass.unbind()

    document.body.style.overflow = 'auto'

    if (this.activeSectionName == '#homeProject') {
      STORAGE.vueBuilderClass.initHome(STORAGE.currentProjectIndex, 'project')
      document.body.style.overflow = 'hidden'
    } else if (this.activeSectionName == '#homeLab') {
      STORAGE.vueBuilderClass.initHome((7 + STORAGE.currentLabIndex), 'lab')
      document.body.style.overflow = 'hidden'
    } else if (this.activeSectionName == '#about') {
      STORAGE.vueBuilderClass.initAbout()
    } else if (this.activeSectionName == '#project') {
      STORAGE.vueBuilderClass.initProject(projectId)
    } else if (this.activeSectionName == '#lab') {
      STORAGE.vueBuilderClass.initLab(projectId)
    }
    this.bind()
  }
}

export default Navigation
