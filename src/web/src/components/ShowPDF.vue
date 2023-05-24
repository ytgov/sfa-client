<template>
    <div>
        <div class="modal" v-if="show" ref="modal"
            @mousedown="addEvent"
            @mouseup="removeEvent"
            @mouseenter="e => {
                removeEvent();
            }"   
        >
            <div 
                class="modal-body"
                ref="modalBody"
            >
                <span class="error" @click="showModal( '', false)">
                    <v-icon class="mb-1">mdi-close</v-icon>
                </span>
                <embed @mouseenter="e => {
                    removeEvent();
                }"  
                v-if="!!url" :src="url" width="100%" height="100%">
                
                <div v-else class="display-error">
                    <h1>Error to show PDF</h1>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>

export default {
    data: () => ({
        url: "",
        dialogModel: null,
        confirmCallback: null,
        denyCallback: null,
        show: false,
        isDragging: false,
    }),
    destroyed() {
    },
    methods: {
        setData(url) {
            this.url = url;
        },
        showModal(url = "", value = true) {
            this.show = value;
            this.url = url;
        },
        onDrag({movementX , movementY}) {
            let modal = this.$refs.modal;
            let getStyle = window.getComputedStyle(modal);
            let leftValue = parseInt(getStyle.left);
            let topValue = parseInt(getStyle.top);

            modal.style.left = `${leftValue + movementX}px`;
            modal.style.top = `${topValue + movementY}px`;
        },
        addEvent() {
            this.$refs.modalBody.style.cursor = 'all-scroll';
            this.$refs.modalBody.addEventListener('mousemove', this.onDrag);
        },
        removeEvent() {
            this.$refs.modalBody.style.cursor = 'default';
            this.$refs.modalBody.removeEventListener('mousemove', this.onDrag);
        },
    },
};
</script>

<style>
.display-error {
    display: flex;
    justify-content: center;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.display-error h1{
    text-align: center;
    color: #9f9f9f !important;
}
.modal {
    width: auto;
    height: 100vh;
    position: fixed;
    top: 0%;
    left: 50%;
}
.modal-body{
    position: absolute;
    width: 600px;
    height: 650px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-40%);
    background-color: #fff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.507);
    border-radius: 5px;
    padding: 20px;
    user-select: none;
}
.modal-body h3{
    font-size: 25px;
}
.modal-body span{
    font-size: 28px;
    position: absolute;
    top: -10px;
    right: -10px;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 50%;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.507);
    background-color: #fff;
    cursor: pointer;
    color: white;
}
</style>