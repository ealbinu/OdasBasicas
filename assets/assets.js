/* AUDIOS */
var s_end = new Howl({ src: ['../../assets/asound/end.mp3'] });
var s_error = new Howl({ src: ['../../assets/asound/error.mp3'] });
var s_ok = new Howl({ src: ['../../assets/asound/ok.mp3'] });
var s_select = new Howl({ src: ['../../assets/asound/select.mp3'] });
var s_win = new Howl({ src: ['../../assets/asound/win.mp3'] });



/* ################ */
/* VUE INIT */
var app = new Vue({
    el: '#app',
    data () {
        return {
            r: [],
            right: 0,
            total: 0,
            resultado: false,
        }
    },
    methods: {
        reset () { location.reload() },
        finalizar () {
            s_win.play()
            this.total = this.r.length
            for(var i in this.$refs){
                if(Array.isArray(this.$refs[i])){
                    this.$refs[i][0].verify()
                } else {
                    this.$refs[i].verify()
                }
            }
            this.resultado = true
        }
    }
})