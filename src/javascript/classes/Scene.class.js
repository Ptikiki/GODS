class Scene {

    constructor(options) {
      STORAGE.SceneClass = this
      this.scene = new THREE.Scene()
      STORAGE.scene = this.scene
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      STORAGE.camera = this.camera
      STORAGE.camera.position.z = 480
      // this.controls = new THREE.OrbitControls( STORAGE.camera )
      // this.controls.target.set( 0, 0, 0 )
      this.light = new THREE.PointLight(0xffffff, 1, Infinity)
      this.light.position.set(20, 0, 20)
      STORAGE.scene.add(this.light)
      this.lightAmb = new THREE.AmbientLight(0x777777)
      STORAGE.scene.add(this.lightAmb)

      this.raycaster = new THREE.Raycaster()
      this.mouse = new THREE.Vector2()

      this.init()
      this.bind()
      this.animate()
    }

    init() {
      this.createBackground()
      this.createStatue()
    }

    createStatue() {
      this.manager = new THREE.LoadingManager()
      this.manager.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total )
      }

      this.loader = new THREE.OBJLoader( this.manager )
      this.loader.load( 'assets/statue.obj', function ( object ) {
        // object.traverse( function ( child ) {
        //   if ( child instanceof THREE.Mesh ) {
        //     child.material.map = texture;
        //   }
        // } )

        object.position.x = 0
        object.position.y = -200
        object.position.z = 100
        //object.rotation.x = -300
        object.rotation.y = 1.5
        //object.rotation.z = 100
        object.scale.x = 3
        object.scale.y = 3
        object.scale.z = 3

        STORAGE.scene.add( object )
        STORAGE.statue = object

      } )

      console.log(STORAGE.loader)
    }

    createBackground() {
      let that = this
      this.texture = new THREE.TextureLoader().load( 'assets/textures/church.jpg' )
      this.textureWidth = 3000
      this.textureHeight = 500
      //console.log(this.texture.encoding)
      this.ratio = this.textureWidth / this.textureHeight
      //console.log(this.ratio)
      this.newTextureWidth = this.ratio * window.innerHeight
      //console.log(this.newTextureWidth)

      this.backgroundMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(that.newTextureWidth, window.innerHeight, 0),
        new THREE.MeshBasicMaterial({
          map: that.texture
        })
      )
      //this.backgroundMesh.material.depthTest = false
      //this.backgroundMesh.material.depthWrite = false

      /*this.backgroundScene = new THREE.Scene()
      STORAGE.backgroundScene = this.backgroundScene
      this.backgroundCamera = new THREE.Camera()
      STORAGE.backgroundCamera = this.backgroundCamera
      STORAGE.backgroundScene.add(STORAGE.backgroundCamera )
      STORAGE.backgroundScene.add(this.backgroundMesh )*/
      STORAGE.scene.add(this.backgroundMesh)
      STORAGE.carrousel = this.backgroundMesh        
    }

    onMouseMove(event) {
      let that = STORAGE.SceneClass
      
      that.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1
      that.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1
      that.raycaster.setFromCamera( that.mouse, STORAGE.camera )
      that.intersects = that.raycaster.intersectObjects( STORAGE.scene.children )

      console.log(that.mouse.x)
      
      //INTERACTION AU MOUVEMENT DE LA SOURIS ==> ROTATION DE LA STATUE

    }

    bind() {
      document.addEventListener( 'wheel', this.onDocumentMouseWheel, false )
      document.addEventListener('mousemove', this.onMouseMove, false )
      window.addEventListener( 'resize', this.onWindowResize, false )
    }

    onWindowResize() {
      STORAGE.camera.aspect = window.innerWidth / window.innerHeight
      STORAGE.camera.updateProjectionMatrix()
      STORAGE.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    onDocumentMouseWheel(event) {
      // ZOOM
      /*  
      STORAGE.camera.fov += event.deltaY * 0.05
      STORAGE.camera.updateProjectionMatrix()
      */
            
      console.log(STORAGE.scene.position.x)
      if (Math.abs(STORAGE.scene.position.x - window.innerWidth) < 3000 - 45 && event.deltaY > 0 ) { // stop le défilement au dernier sprite (défile tant que x abs < à largeur totale de tous les sprites-1)
        STORAGE.scene.position.x -= Math.abs(event.deltaY) / 3
      } else if (STORAGE.scene.position.x > -45) {
        return
      } else if (event.deltaY < 0) {
        STORAGE.scene.position.x += Math.abs(event.deltaY) / 3
      }
    }

    animate() {
      let that = STORAGE.SceneClass
      STORAGE.renderer.render(STORAGE.scene, STORAGE.camera)
      requestAnimationFrame( that.animate )
    }
}

export default Scene
