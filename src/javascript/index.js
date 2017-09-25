const THREE = require('three')
/*const OrbitControls = require('three-orbit-controls-loader')
OrbitControls(THREE)*/

import Vue from 'vue'

import Renderer from './classes/Renderer.class.js'
import Scene from './classes/Scene.class.js'
/*import Navigation from './classes/Navigation.class.js'
import VueBuilder from './classes/VueBuilder.class.js'
import Grid from './classes/Grid.class.js'
import Resizer from './classes/Resizer.class.js'*/

window.STORAGE = {}
initCanvas()

/*window.onload = function () {
  new VueBuilder()
  new Grid()
  new Resizer()
  STORAGE.currentLabIndex = 0
  STORAGE.currentProjectIndex = 0
  STORAGE.vueBuilderClass.init()

  new Navigation()
}*/


function initCanvas() {
	new Renderer()
	new Scene()
	// new Loader()
	// new Carousel({ number: 2 })

 	// render()
}

function render() {
	let that = STORAGE.SceneClass
  	requestAnimationFrame(render)
	//STORAGE.renderer.autoClear = false
	//STORAGE.renderer.clear()
  	//STORAGE.renderer.render(STORAGE.backgroundScene , STORAGE.backgroundCamera)
  	STORAGE.renderer.render(STORAGE.scene, STORAGE.camera)
}

