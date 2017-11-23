import sliderHomeDatas from '../datas/Slider-Home-Datas'

class Scene {

    constructor(options) {

      STORAGE.SceneClass = this
      this.scene = new THREE.Scene()
      STORAGE.scene = this.scene
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
      STORAGE.camera = this.camera
      STORAGE.camera.position.z = 300
      // this.controls = new THREE.OrbitControls( STORAGE.camera )
      // this.controls.target.set( 0, 0, 0 )
      this.light = new THREE.PointLight(0xffffff, 0.7, Infinity)
      this.light.position.set(-50, 0, 250)
      STORAGE.scene.add(this.light)
      this.lightAmb = new THREE.AmbientLight(0x777777, 1.3)
      STORAGE.scene.add(this.lightAmb)

      this.raycaster = new THREE.Raycaster()
      this.mouse = new THREE.Vector2()

      this.homeSlider1 = document.querySelector('.js-home-slider')

      this.init()
      this.bind()
      this.animate()
    }

    init() {
      this.linkClick()
      this.createStatues()
    }

    linkClick() {
      this.el = document.querySelector('.js-nav')
      this.navigationItems = this.el.querySelectorAll('.js-nav-item')

      for (var i = 0; i < this.navigationItems.length; i++) {
        STORAGE.SceneClass.navigationItems[i].addEventListener('click', function(e) {
          STORAGE.SceneClass.activeSectionName = e.target.getAttribute('id') 
          console.log(STORAGE.SceneClass.activeSectionName)
          if (STORAGE.SceneClass.activeSectionName == '#about') {
            STORAGE.vueBuilderClass.initAbout() 
          }
          else if (STORAGE.SceneClass.activeSectionName == '#projects') {
            STORAGE.vueBuilderClass.initProjectsList() 
          }
        })
      }
    }

    createStatues() {
      let that = this

      this.myStatues = []
      this.loader = new THREE.OBJLoader()

      sliderHomeDatas.slider.forEach((project, index) => {

        this.loader.load( project.objUrl, function ( object ) {
          object.position.x = project.objX
          object.position.y = project.objY
          object.position.z = project.objZ
          object.rotation.y = project.objRotY
    
          STORAGE.scene.add( object )
          that.myStatues.push(object)
        } )

      })

    }

    createBackground() {
      let that = this
      this.texture = new THREE.TextureLoader().load( 'assets/textures/church.jpg' )
      this.textureWidth = 3000
      this.textureHeight = 500
      this.ratio = this.textureWidth / this.textureHeight
      this.newTextureWidth = this.ratio * window.innerHeight

      this.backgroundMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(that.newTextureWidth, window.innerHeight, 0),
        new THREE.MeshBasicMaterial({
          map: that.texture
        })
      )
      STORAGE.scene.add(this.backgroundMesh)
      STORAGE.carrousel = this.backgroundMesh        
    }

    onMouseMove(event) {
      let that = STORAGE.SceneClass

      that.myStatues.forEach((statue, index) => {
        statue = that.myStatues[index]

        that.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1
        that.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1

        that.actualMouseX = that.mouse.x
        setTimeout(function() {
          that.newMouseX = that.mouse.x
        }, 500)
     
        if (statue && that.actualMouseX < that.newMouseX && statue.rotation.y > 1.2) {
          console.log("tourche à gauche")
          statue.rotation.y -= 0.007
        }
        else if (statue && that.actualMouseX > that.newMouseX && statue.rotation.y < 2.1) {
          console.log("tourne à droite")
          statue.rotation.y += 0.007
        }
      })
    }

    bind() {
      document.addEventListener('mousemove', this.onMouseMove, false )
      window.addEventListener( 'resize', this.onWindowResize, false )
    }

    onWindowResize() {
      STORAGE.camera.aspect = window.innerWidth / window.innerHeight
      STORAGE.camera.updateProjectionMatrix()
      STORAGE.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    animate() {
      let that = STORAGE.SceneClass
      STORAGE.renderer.render(STORAGE.scene, STORAGE.camera)
      requestAnimationFrame( that.animate )
    }
}

export default Scene
