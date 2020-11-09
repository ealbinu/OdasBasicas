Vue.component('dragdrop', {
    props: ['value', 'isok', 'options', 'optionsOk','ignoreOrder', 'group'],
    data() {
        return {
            status: false,
            evaluate: false,
            result: false,
            optionsDraggable: [],
            groupdrag: 'groupdrag'
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

            let optionsAreEqual = _.isEqual(this.optionsDraggable, this.optionsOk)

            if(this.ignoreOrder!=undefined){
                let od = this.optionsDraggable.sort()
                let oo = this.optionsOk.sort()
                optionsAreEqual = _.isEqual(od, oo)
                console.log('ignoreOptions')
            }

            if(optionsAreEqual){
                this.$emit('isright', true)
                this.result = true
            }
        },
        itChanged (dt, dt2) {
            console.log(dt, dt2)
            this.$emit('updated')
        }
    },
    mounted () {
       this.$emit('input', "")
       this.optionsDraggable = this.options

       if(this.group!=undefined){
           this.groupdrag = this.group
       }

       console.log(this.options)

    },
    template: `
<div class="dragdrop" >
    <div class="draggable draggableModule" :class="setclass">
        <draggable v-model="optionsDraggable" :group="groupdrag" @change="itChanged">
            <div v-for="e in optionsDraggable" :key="e.l" v-html="e"></div>
        </draggable>
        <div class="result" v-if="evaluate" :class="setclass + ' animate__animated animate__heartBeat'"></div>
    </div>
</div>
    `
})

/*
<p>{{optionsDraggable}}</p>
<p>{{optionsOk}}</p>
*/