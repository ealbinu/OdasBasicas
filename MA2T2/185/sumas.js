Vue.component('suma', {
    props: ['answer'],
    data() {
        return {
            status: "",
            evaluate: false,
            result: false,
            v1: null,
            v2: null,
        }
    },
    computed:{
        setclass () {
            if(this.evaluate) {
                return this.result ? 'isright':'iswrong'
            } else {
                return ''
            }
        }
    },
    methods: {
        inputed () {

        },
        verify () { 
            this.evaluate = true
            if(this.v1 + this.v2 == this.answer) {
                this.$emit('isright', true)
                this.result = true
            } else {
                this.$emit('iswrong', true)
            }
        }
    },
    mounted () {
        this.$emit('input', "")
    },
    template: `
        <div class="inputbox suma" :class="setclass">
                <input v-model.number="v1" type="number" @input="inputed" :disabled="evaluate" />
                <numbers> + </numbers>
                <input v-model.number="v2" type="number" @input="inputed" :disabled="evaluate" />
                <numbers> = </numbers>
                <div v-if="v1 || v2"> <numbers> {{v1+v2}} </numbers> </div>
                <div class="result" v-if="evaluate" :class="setclass + ' animate__animated animate__heartBeat'"></div>
        </div>
    `
})
