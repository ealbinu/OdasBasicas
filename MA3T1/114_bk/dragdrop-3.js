Vue.component('dragdrop', {
    props: ['value', 'isok', 'options', 'optionsOk'],
    data() {
        return {
            status: false,
            evaluate: false,
            result: false,
            optionsDraggable: []
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
            console.log(this.optionsDraggable, this.optionsOk)
            if(_.isEqual(this.optionsDraggable, this.optionsOk)){
                this.$emit('isright', true)
                this.result = true
            }

        }
    },
    mounted () {
       this.$emit('input', "")
       this.optionsDraggable = this.options
       console.log(this.optionsOk)
    },
    template: `
<div class="dragdrop" >
    <div class="row mt-3">
        <div class="draggable draggableModule" :class="setclass">
            <draggable v-model="optionsDraggable" group="stf">
            <div v-for="(e, index) in optionsDraggable" :key="e.l">
                {{e}}
                <div v-if="evaluate && e!=optionsOk[index]" class="iswrong"></div>
            </div>
            </draggable>
            <!--<div class="result" v-if="evaluate" :class="setclass + ' animate__animated animate__heartBeat'"></div>-->
        </div>
    </div>    
</div>
    `
})