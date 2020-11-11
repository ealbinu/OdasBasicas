Vue.component('checkmark', {
    template: `<img src="../../assets/aimg/check.svg" class="animate__animated animate__heartBeat">`
})

Vue.component('numbers', {
    props: ['c'],
    template: `<div :class="'numbers ' + (c!=undefined?'c'+c:'')"><slot></slot></div>`
})

Vue.component('labeltext', {
    props: ['num'],
    template: `<div :class="'label '">
            <strong v-if="num">{{num}}</strong>
            <slot></slot>
        </div>`
})

Vue.component('markex', {
    template: `<img src="../../assets/aimg/markex.svg" class="animate__animated animate__heartBeat">`
})



Vue.component('imgbg', {
    props: ['initclass', 'img'],
    template: `
        <div :class="'imgbgMod ' + initclass + ' animate__animated animate__pulse animate__delay-2s'">
            <img :src="img" class="w-100 ">
            <div class="inputs">
                <slot></slot>
            </div>
        </div>
        `
})