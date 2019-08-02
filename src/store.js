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
        img: 'https://images.unsplash.com/photo-1564674705242-8e1cfca3674e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        heart: true,
        showing:'увлавняющий Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nobis molestias illo.',
        type: null,
        id:1
      },
      {
        title: 'BB-Cream новая формула и нежность',
        count: 1,
        price: 22000,
        img: 'https://images.unsplash.com/photo-1564679971102-10dbb3e247b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        heart: false,
        showing:'увлавняющий Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nobis molestias illo.',
        type: null,
        id:2
      },
      {
        title: 'CC-Cream новая формула и нежность',
        count: 1,
        price: 23000,
        img: 'https://images.unsplash.com/photo-1564582654667-7fa92fcca939?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1057&q=80',
        heart: false,
        showing:'увлавняющий Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nobis molestias illo.',
        type: null,
        id:3
      },
      {
        title: 'DD-Cream новая формула и нежность',
        count: 1,
        price: 24000,
        img: 'https://images.unsplash.com/photo-1564665872710-7cce69129b0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        heart: false,
        showing:'увлавняющий Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nobis molestias illo.',
        type: 'best',
        id:4
      },
      {
        title: 'EE-Cream новая формула и нежность',
        count: 1,
        price: 25000,
        img: 'https://images.unsplash.com/photo-1564586867773-1a1a60a0882d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
        heart: false,
        showing:'увлавняющий Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nobis molestias illo.',
        type: 'best',
        id:5
      },
      {
        title: 'FF-Cream новая формула и нежность',
        count: 1,
        price: 26000,
        img: 'https://images.unsplash.com/photo-1562102048-8f2e318543f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
        heart: false,
        showing:'увлавняющий Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nobis molestias illo.',
        type: 'best',
        id:6
      },
      {
        title: 'GG-Cream новая формула и нежность',
        count: 1,
        price: 21000,
        img: 'https://images.unsplash.com/photo-1564664044569-a0c916520f15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80',
        heart: true,
        showing:'увлавняющий Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nobis molestias illo.',
        type: null,
        id:7
      },
      {
        title: 'HH-Cream новая формула и нежность',
        count: 1,
        price: 22000,
        img: 'https://images.unsplash.com/photo-1564647318295-30ec5f4c7c13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        heart: true,
        showing:'увлавняющий Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nobis molestias illo.',
        type: null,
        id:8
      },
      {
        title: 'QQ-Cream новая формула и нежность',
        count: 1,
        price: 23000,
        img: 'https://images.unsplash.com/photo-1563117016-ad4553cb742d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        heart: false,
        showing:'увлавняющий Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nobis molestias illo.',
        type: null,
        id:9
      },
      {
        title: 'WW-Cream новая формула и нежность',
        count: 1,
        price: 24000,
        img: 'https://images.unsplash.com/photo-1562835087-9d1a6cf60b32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        heart: false,
        showing:'увлавняющий Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nobis molestias illo.',
        type: 'best',
        id:10
      },
      {
        title: 'EE-Cream новая формула и нежность',
        count: 1,
        price: 25000,
        img: 'https://images.unsplash.com/photo-1564666069679-3e1d55404209?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        heart: false,
        showing:'увлавняющий Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nobis molestias illo.',
        type: 'best',
        id:11
      },
      {
        title: 'RR-Cream новая формула и нежность',
        count: 1,
        price: 26000,
        img: 'https://images.unsplash.com/photo-1564582996194-8e75a25225d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        heart: false,
        showing:'увлавняющий Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed nobis molestias illo.',
        type: 'best',
        id:12
      },
    ],
    order:[
      {
        title: 'Особый заказ',
        number: '№12876395',
        date: '24.05.19',
        status: 'Ожидает доставки',
        statusClass: '#FFC000'
      },
      {
        title: 'Заказ',
        number: '№12876395',
        date: '24.05.19',
        status: 'Ожидает доставки',
        statusClass: '#FFC000'
      },
      {
        title: 'Заказ',
        number: '№12876395',
        date: '24.05.19',
        status: 'Доставлен',
        statusClass: '#23DA98'
      },
      {
        title: 'Заказ',
        number: '№12876395',
        date: '24.05.19',
        status: 'Отменен',
        statusClass: '#FF3D3D'
      },
    ]
  },
  mutations: {

  },
  actions: {
    
  },
  getters: {
    getGoods: (state) =>state.goods,
    getOrder: (state) =>state.order
  }
})
