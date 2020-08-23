Vue.component('dragdrop', {
    props: ['value', 'isok'],
    data() {
        return {
            status: false,
            evaluate: false,
            result: false,
            options: [],
            optionsRight: [
                {l: 'A', txt: 'Los'},
                {l: 'C', txt: 'chistes'},
                {l: 'E', txt: 'son'},
                {l: 'G', txt: 'textos'},
                {l: 'I', txt: 'humorísticos'},
                {l: 'K', txt: 'que'},
                {l: 'M', txt: 'utilizan'},
                {l: 'Ñ', txt: 'el'},
                {l: 'P', txt: 'juego de palabras'},
                {l: 'R', txt: 'para'},
                {l: 'T', txt: 'hacernos'},
                {l: 'Z', txt: 'reír.'},
             ]
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
    watch: {
        value () {
            if(this.watch){
                this.status = this.value
            }
        }
    },
    methods: {
        clicked () {
            if(this.evaluate) {
                return false
            }
            this.status = !this.status
            //this.status = !this.status
            this.$emit('input', this.status)
            if(this.status) {
                s_ok.play()
            } else {
                s_error.play()
            }
        },
        verify () { 
            this.evaluate = true

            if(_.isEqual(this.options, this.optionsRight)){
                this.$emit('isright', true)
                this.result = true
            }

        }
    },
    mounted () {
       this.$emit('input', "")
       this.options = [
           {l: 'P', txt: 'juego de palabras'},
           {l: 'E', txt: 'son'},
           {l: 'Z', txt: 'reír.'},
           {l: 'M', txt: 'utilizan'},
           {l: 'K', txt: 'que'},
           {l: 'Ñ', txt: 'el'},
           {l: 'R', txt: 'para'},
           {l: 'I', txt: 'humorísticos'},
           {l: 'G', txt: 'textos'},
           {l: 'T', txt: 'hacernos'},
           {l: 'C', txt: 'chistes'},
           {l: 'A', txt: 'Los'},
        ]
    },
    template: `
<div class="dragdropcustom1" >
    <div class="row mt-3">
        <div class="draggable options" :class="setclass">
            <div class="result" v-if="evaluate" :class="setclass + ' animate__animated animate__heartBeat'"></div>
            <draggable v-model="options" group="stf" >
                <div v-for="e in options" :key="e.l"><strong>{{e.l}}</strong> {{e.txt}}</div>
            </draggable>
        </div>
    </div>    
</div>
    `
})