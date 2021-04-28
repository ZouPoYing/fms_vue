<template>
    <transition name="alert-fade">
        <div id="toast"
             v-show="visible"
             class="dialog-tips dialog-center">
            {{message}}
        </div>
    </transition>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        visible: false,
        message: ''
      }
    }
  }
</script>

<style scoped>
    .alert-fade-enter-active,
    .alert-fade-leave-active {
        transition: opacity 0.3s;
    }
    .alert-fade-enter,
    .alert-fade-leave-to {
        opacity: 0;
    }
    .dialog-tips {
        position: fixed;
        z-index: 100;
        min-width: 220px;
        padding: 10px;
        border-radius: 15px;
        white-space: nowrap;
        background-color: rgba(0, 0, 0, 0.5);
        box-shadow: 0px 8px 30px 0 rgba(255, 255, 255, 0.2);
        text-align: center;
        color: rgb(255, 255, 255);
    }
    .dialog-center {
        top: 5%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>