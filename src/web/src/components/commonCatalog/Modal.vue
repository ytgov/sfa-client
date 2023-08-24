<template>
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal modal-export">
        <div class="modal-header">
          <h2>{{ title }}</h2>          
          <span class="close-button" @click="closeModal">&times;</span>
        </div>
        <div class="modal-content">          
          <slot></slot>
          <v-btn  class="my-0" color="primary" @click="closeModal">Accept</v-btn>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
    },
    data() {
      return {
        showModal: false,
      };
    },
    methods: {
      openModal() {
        this.showModal = true;
      },
      closeModal() {
        this.showModal = false;
      },
    },
  };
  </script>
  
  <style>  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modal-export {
    width: 400px;
    height: auto;
    position: fixed;
    transform: translateY(-50%);
    top: 50%;
    left: 50%;
  }
  
  .close-button {
    cursor: pointer;
  }
  </style>