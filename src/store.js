import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    goods:[
      {
        title: 'AA-Cream новая формула и нежность',
        count: 1,
        price: 21000,
        img: '../image.png',
        heart: true,
        showing:'увлавняющий Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nobis molestias illo.',
        type: null,
      },
      {
        title: 'BB-Cream новая формула и нежность',
        count: 1,
        price: 22000,
        img: '../image.png',
        heart: false,
        showing:'увлавняющий Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nobis molestias illo.',
        type: null,
      },
      {
        title: 'CC-Cream новая формула и нежность',
        count: 1,
        price: 23000,
        img: '../image.png',
        heart: false,
        showing:'увлавняющий Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nobis molestias illo.',
        type: null,
      },
      {
        title: 'DD-Cream новая формула и нежность',
        count: 1,
        price: 24000,
        img: '../image.png',
        heart: false,
        showing:'увлавняющий Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nobis molestias illo.',
        type: 'best',
      },
      {
        title: 'EE-Cream новая формула и нежность',
        count: 1,
        price: 25000,
        img: '../image.png',
        heart: false,
        showing:'увлавняющий Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nobis molestias illo.',
        type: 'best',
      },
      {
        title: 'FF-Cream новая формула и нежность',
        count: 1,
        price: 26000,
        img: '../image.png',
        heart: false,
        showing:'увлавняющий Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nobis molestias illo.',
        type: 'best',
      },
      {
        title: 'GG-Cream новая формула и нежность',
        count: 1,
        price: 21000,
        img: '../image.png',
        heart: true,
        showing:'увлавняющий Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nobis molestias illo.',
        type: null,
      },
      {
        title: 'HH-Cream новая формула и нежность',
        count: 1,
        price: 22000,
        img: '../image.png',
        heart: true,
        showing:'увлавняющий Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nobis molestias illo.',
        type: null,
      },
      {
        title: 'QQ-Cream новая формула и нежность',
        count: 1,
        price: 23000,
        img: '../image.png',
        heart: false,
        showing:'увлавняющий Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nobis molestias illo.',
        type: null,
      },
      {
        title: 'WW-Cream новая формула и нежность',
        count: 1,
        price: 24000,
        img: '../image.png',
        heart: false,
        showing:'увлавняющий Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nobis molestias illo.',
        type: 'best',
      },
      {
        title: 'EE-Cream новая формула и нежность',
        count: 1,
        price: 25000,
        img: '../image.png',
        heart: false,
        showing:'увлавняющий Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nobis molestias illo.',
        type: 'best',
      },
      {
        title: 'RR-Cream новая формула и нежность',
        count: 1,
        price: 26000,
        img: '../image.png',
        heart: false,
        showing:'увлавняющий Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nobis molestias illo.',
        type: 'best',
      },
    ]
  },
  mutations: {

  },
  actions: {
    
  },
  getters: {
    getGoods: (state) =>state.goods
  }
})
