import { TweenLite } from 'gsap'

class SliderProject {

  constructor(index) {
    STORAGE.sliderProjectClass = this
    this.sliderProjects = document.querySelectorAll('.js-slider-project')
    this.index = index || 0

    this.prevButtons = document.querySelectorAll('.js-project-slider-prev')
    this.nextButtons = document.querySelectorAll('.js-project-slider-next')

    this.activeProject = this.sliderProjects[this.index]

    this.swipeValue

    this.bind()
  }

  bind() {
    let that = this
    for (var i = 0; i < this.prevButtons.length; i++) {
      this.prevButtons[i].addEventListener('click', that.handleClick)
    }
    for (var i = 0; i < this.nextButtons.length; i++) {
      this.nextButtons[i].addEventListener('click', that.handleClick)
    }
    window.addEventListener('keydown', that.handleClick)
    window.addEventListener('touchstart', that.handleSwipeStart)
    window.addEventListener('touchend', that.handleSwipeEnd)
  }

  unbind() {
    let that = this
    window.removeEventListener('keydown', that.handleClick)
    window.removeEventListener('touchstart', that.handleSwipeStart)
    window.removeEventListener('touchend', that.handleSwipeEnd)
  }

  setActive() {
    STORAGE.gridClass.animateGrid()
    STORAGE.currentProjectIndex = Number(this.index)
    this.doSliderProjectDesaparition()

    this.activeProject = this.sliderProjects[this.index]

    let that = this
    setTimeout(function(){
      that.doSliderProjectAparition()
    }, 400)
  }

  doSliderProjectDesaparition() {
    TweenLite.to(this.activeProject, 0.3, {
      autoAlpha: 0
    })
    TweenLite.set(this.activeProject, {
      display: "none",
      delay: 0.3
    })
  }

  doSliderProjectAparition() {
    const title = this.activeProject.querySelector('.project__title')
    const desc = this.activeProject.querySelector('.project__header__desc')
    const date = desc.querySelector('.date')
    const techno = desc.querySelector('.techno')
    const text = desc.querySelector('.text')
    const link = desc.querySelector('.link')
    const roles = desc.querySelector('.roles')
    TweenLite.set(this.activeProject, {
      display: "block"
    })
    TweenLite.to(this.activeProject, 0.6, {
      autoAlpha: 1
    })
    TweenLite.from(title, 0.4, {
      alpha: 0,
      bottom: '55%',
      delay: 1.2
    })
    TweenLite.from(date, 0.6, {
      alpha: 0,
      y: 30,
      delay: 0.4
    })
    TweenLite.from(techno, 0.6, {
      alpha: 0,
      y: 30,
      delay: 0.6
    })
    TweenLite.from(text, 0.6, {
      alpha: 0,
      y: 30,
      delay: 0.8
    })
    if (link) {
      TweenLite.from(link, 0.6, {
        alpha: 0,
        y: 30,
        delay: 0.8
      })
    }
    TweenLite.from(roles, 0.6, {
      alpha: 0,
      y: 30,
      delay: 1
    })
  }

  handlePrevClick() {
    if (this.index > 0) {
      this.index--
    } else {
      this.index = this.sliderProjects.length - 1
    }
    this.setActive()
  }

  handleNextClick() {
    if (this.index < this.sliderProjects.length - 1) {
      this.index++
    } else {
      this.index = 0
    }
    this.setActive()
  }

  handleClick(e) {
    if (e.keyCode && ( e.keyCode != 37 && e.keyCode != 39 ) ) {
      return
    }
    if (e.keyCode && e.keyCode == 37) {
      STORAGE.sliderProjectClass.handlePrevClick()
    } else if (e.keyCode && e.keyCode == 39) {
      STORAGE.sliderProjectClass.handleNextClick()
    } else if (this.classList.contains('js-project-slider-prev')) {
      STORAGE.sliderProjectClass.handlePrevClick()
    } else {
      STORAGE.sliderProjectClass.handleNextClick()
    }
  }

  handleSwipeStart(e) {
    this.swipeValue = e.touches[0].clientX
  }

  handleSwipeEnd(e) {
    let delta = e.changedTouches[0].clientX - this.swipeValue

    if (delta > 0 && Math.abs(delta) > 100) {
      STORAGE.sliderProjectClass.handlePrevClick()
    } else if (delta < 0 && Math.abs(delta) > 100) {
      STORAGE.sliderProjectClass.handleNextClick()
    }
  }
}

export default SliderProject
