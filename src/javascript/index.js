const THREE = require('three')
const OrbitControls = require('three-orbit-controls-loader')
OrbitControls(THREE)
const OBJLoader = require('three-obj-loader')
OBJLoader(THREE)

import Vue from 'vue'

import Renderer from './classes/Renderer.class.js'
import Scene from './classes/Scene.class.js'
import VueBuilder from './classes/VueBuilder.class.js'

window.STORAGE = {}
//initCanvas()

window.onload = function () {
  new VueBuilder()
  STORAGE.currentProjectIndex = 0
  STORAGE.vueBuilderClass.init()

  initCanvas()
}


function initCanvas() {
	new Renderer()
	new Scene()
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

