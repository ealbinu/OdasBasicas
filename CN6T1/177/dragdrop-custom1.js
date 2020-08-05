Vue.component('dragdrop', {
    props: ['value', 'isok'],
    data() {
        return {
            status: false,
            evaluate: false,
            result: false,
            options: [],
            res1: [],
            res2: []
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

            const a1 = ["Agua de mar.", "Sangre.", "Leche." ]
            const a2 = ["Sopa de fideos.", "Leche con malvaviscos.", "Pera con plátano." ]

            if(_.isEqual(this.res1.sort(), a1.sort()) && _.isEqual(this.res2.sort(), a2.sort())){
                this.$emit('isright', true)
                this.result = true
            }

        }
    },
    mounted () {
       this.$emit('input', "")
       this.options = ["Agua de mar.", "Sopa de fideos.", "Sangre.", "Leche con malvaviscos.", "Leche.", "Pera con plátano.",]
    },
    template: `
<div class="dragdropcustom1" >
    <div class="row mt-3">
        <div class="draggable options">
            <draggable v-model="options" group="stf" >
                <div v-for="e in options" :key="e">{{e}}</div>
            </draggable>
        </div>
    </div>
    <div class="row mt-3">
        <div class="col-6">
            <img src="aimg/esq.svg" class="img-fluid">
        </div>
        <div class="col-6 dropzones dragdropcustomres" :class="setclass">
            <div class="result" v-if="evaluate" :class="setclass + ' animate__animated animate__heartBeat'"></div>

            <div class="draggable">
                <draggable v-model="res1" group="stf" >
                    <div v-for="e in res1" :key="e">{{e}}</div>
                </draggable>
            </div>
            <div class="draggable">
                <draggable v-model="res2" group="stf" >
                    <div v-for="e in res2" :key="e">{{e}}</div>
                </draggable>
            </div>
        </div>
    </div>
</div>
    `
})