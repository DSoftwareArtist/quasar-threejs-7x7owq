import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
import { markRaw } from "vue";
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    Color,
    FogExp2,
    CylinderBufferGeometry,
    MeshPhongMaterial,
    Mesh,
    DirectionalLight,
    AmbientLight
  } from 'three'


export default {
  namespaced: true,

  state: () => ({
    width: 0,
    height: 0,
    camera: null,
    controls: null,
    scene: null,
    renderer: null,
    pyramids: []
  }),

  mutations: {
    SET_VIEWPORT_SIZE(state, {width, height}){
      state.width = width;
      state.height = height;
    },
    INITIALIZE_RENDERER(state, el) {
      const renderer = new WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(state.width, state.height);
      state.renderer = markRaw(renderer);
      el.appendChild(state.renderer.domElement);
    },
    INITIALIZE_CAMERA(state) {
      const camera = new PerspectiveCamera(
        60,
        state.width / state.height,
        1,
        1000
      );
      camera.position.set(0, 0, 500);
      state.camera = markRaw(camera);
    },
    INITIALIZE_CONTROLS(state) {
      const controls = new TrackballControls(
        state.camera,
        state.renderer.domElement
      );
      controls.rotateSpeed = 1.0;
      controls.zoomSpeed = 1.2;
      controls.panSpeed = 0.8;
      controls.noZoom = false;
      controls.noPan = false;
      controls.staticMoving = true;
      controls.dynamicDampingFactor = 0.3;
      state.controls = markRaw(controls);
    },
    INITIALIZE_SCENE(state) {
      const scene = new Scene();
      scene.background = new Color(0xcccccc);
      scene.fog = new FogExp2(0xcccccc, 0.002);
      state.scene = markRaw(scene);

      // create geometry and add mesh collection to an array
      var geometry = new CylinderBufferGeometry(0, 10, 30, 4, 1);
      var material = new MeshPhongMaterial({
        color: 0xffffff,
        flatShading: true,
      });

      for (var i = 0; i < 500; i++) {
        var mesh = new Mesh(geometry, material);
        mesh.position.x = (Math.random() - 0.5) * 1000;
        mesh.position.y = (Math.random() - 0.5) * 1000;
        mesh.position.z = (Math.random() - 0.5) * 1000;
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
        state.pyramids.push(markRaw(mesh));
      }

      state.scene.add(...state.pyramids);

      // create lights
      var lightA = new DirectionalLight(0xffffff);
      lightA.position.set(1, 1, 1);
      state.scene.add(markRaw(lightA));
      var lightB = new DirectionalLight(0x002288);
      lightB.position.set(-1, -1, -1);
      state.scene.add(markRaw(lightB));
      var lightC = new AmbientLight(0x222222);
      state.scene.add(markRaw(lightC));
    },
    RESIZE(state, { width, height }) {
      state.width = width;
      state.height = height;
      state.camera.aspect = width / height;
      state.camera.updateProjectionMatrix();
      state.renderer.setSize(width, height);
      state.controls.handleResize(); // to jest metoda dostępna dla TrackballControls
      state.renderer.render(state.scene, state.camera);
    },
  },

  actions: {
    INIT({ commit, state }, { width, height, el}){
      return new Promise(resolve => {
        commit("SET_VIEWPORT_SIZE", { width, height });
        commit("INITIALIZE_RENDERER", el);
        commit("INITIALIZE_CAMERA");
        commit("INITIALIZE_CONTROLS");
        commit("INITIALIZE_SCENE");

        // initial scene rendering
        state.renderer.render(state.scene, state.camera);

        // add event listener that will re-render the scene when the controls change
        state.controls.addEventListener("change", () => {
            state.renderer.render(state.scene, state.camera);
        });

        resolve();
      });
    },
 
  ANIMATE({ dispatch, state }){
      window.requestAnimationFrame(() => {
          dispatch("ANIMATE");
          state.controls.update();
      });
  }
},

  getters: {
    dims: (state) => {
      return state.width
    }
  }
};




