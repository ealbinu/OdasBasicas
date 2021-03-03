var epDrag = {
    isSource:true, isTarget:true,
    connector: ["Bezier", {curviness: 60}],
    paintStyle: { stroke:'#70BF44', strokeWidth:6, fill: '#fff' },
    connectorPaintStyle:{ stroke:'#70BF44', strokeWidth:6, fill: '#fff' },
}



var epMiddles = {
    isSource:true, isTarget:true,
    connector: ["Bezier", {curviness: 20}],
    paintStyle: { stroke:'#5BAEDA', strokeWidth:6, fill: '#fff' },
    maxConnections: -1
}


var epTarget = {
    isSource:true, isTarget:true,
    connector: ["Bezier", {curviness: 60}],
    paintStyle: { stroke:'#F88E26', strokeWidth:6, fill: '#fff' },
    maxConnections: -1
} 

Vue.component('relational', {
    props: ['value', 'sources', 'targets', 'middles', 'connections', 'oks', 'initclass', 'anchors', 'anchort'],
    data() {
        return {
            status: [],
            evaluate: false,
            result: false,
            started: false,
            anchorSource: 'Right',
            anchorTarget: 'Left',
            uuid: 0,
            jsplumbInstance: jsPlumb.getInstance()
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
        startConnections () {
            this.started = true
            for (item in this.sources) {
                this.jsplumbInstance.addEndpoint(this.uuid+'s_'+item, { anchor:this.anchorSource, uuid: this.uuid+'s_'+item }, epDrag )
            }
            for (item in this.targets) {
                this.jsplumbInstance.addEndpoint(this.uuid+'t_'+item, { anchor:this.anchorTarget, uuid: this.uuid+'t_'+item }, epTarget )
            }
            
            for (item in this.epMiddles) {
                this.jsplumbInstance.addEndpoint(this.uuid+'m_'+item, { anchor:'Bottom', uuid: this.uuid+'m_'+item }, epMiddles )
            }
            
            // Load connections
            if(this.value){
                this.status = this.value
            }
            for (item in this.status) {
                this.jsplumbInstance.connect({ uuids:this.status[item] })
            }
        },
        verify () { 

            for(var i in this.oks){
                for(var x in this.oks[i]){
                    this.oks[i][x] = this.uuid + this.oks[i][x]
                }
            }

            this.evaluate = true
            console.log(this.status.sort(), this.oks.sort())
            var endResult = _.isEqual( this.status.sort(), this.oks.sort() )
            if(endResult){
                this.$emit('isright', true)
                this.result = true
            } else {
                this.$emit('iswrong')
            }
        }
    },
    mounted () {
        this.$emit('input', false)

        var _this = this

        if(this.anchors!=undefined){ this.anchorSource = this.anchors }
        if(this.anchors!=undefined){ this.anchorTarget = this.anchort }
        

        setTimeout(function () {    
            _this.startConnections()
        }, 400)
        this.jsplumbInstance.bind('connection',function(info,ev){
            var con=info.connection;   //this is the new connection
            var sourcedata = info.connection.source.getAttribute('data')
            var targetid = info.connection.targetId
            var allconnections = this.jsplumbInstance.getConnections()
            var userConnections = []

            s_select.play()

            for(con in allconnections){
                const conn = [allconnections[con].sourceId, allconnections[con].targetId]
                userConnections.push(conn.sort())
            }
            _this.status = userConnections.sort()

            _this.$emit('input', _this.status)
        })

        
    },
    created() {
        var _this = this
        window.addEventListener("resize", function (){
            _this.jsplumbInstance.repaintEverything()
        })

        this.uuid = Math.random().toString(36).substring(10)
    },
    template: `
        <div class="relational d-flex justify-content-between" :class="setclass + ' ' + (initclass?initclass:' ')">
            <div class="result" v-if="evaluate" :class="setclass + ' animate__animated animate__heartBeat'"></div>
            <div class="sources">
                <div v-for="(source, index) in sources" class="r_source" :id="uuid+'s_'+index" :data="source.data">
                    <slot name="source" :source="source" />
                </div>
            </div>


            <div class="middles" v-if="middles!=undefined">
                <div v-for="(middle, index) in middles" class="r_middle" :id="uuid+'m_'+index" :data="middle.data">
                    <slot name="middle" :middle="middle" />
                </div>
            </div>
            
            <div class="targets">
                <div v-for="(target, index) in targets" class="r_target" :id="uuid+'t_'+index" :data="target.data">
                    <slot name="target" :target="target" />
                </div>
            </div>
        </div>
    `
})




/* Snippet:  rela */




/* WITH MIDDLE COLUMN */

/* 
relational(v-if="tempsobj.sources" v-model="d['rela']" :ref="refCount()" @isright="right++" :sources="tempsobj.sources" :targets="tempsobj.targets" :middles="tempsobj.middles" :oks="tempsobj.oks")
        template(v-slot:source="{source}"): img(:src="source.i").img-fluid
        template(v-slot:middle="{middle}"): div.text-center.px-1 {{middle.t}}
        template(v-slot:target="{target}"): div.text-center.px-1 {{target.t}}
 */
/* 
app.$set(app.tempsobj, 'sources', [
    {i: 'aimg/a1.png'},
    {i: 'aimg/a2.png'},
    {i: 'aimg/a3.png'},
])
app.$set(app.tempsobj, 'middles', [
    {t: 'Emisión de gases producidos por la combustión de autos o por la industria.'},
    {t: 'Derrame de aguas residuales, sustancias radioactivas, basura y petróleo.'},
    {t: 'Liberación de productos químicos como herbicidas o petróleo, o vertederos de basura.'},
])
app.$set(app.tempsobj, 'targets', [
    {t: 'Contaminación de ríos, lagos y depósitos subterráneos; pérdida de animales y plantas.'},
    {t: 'Cambio de clima, lluvia ácida y enfermedades respiratorias.'},
    {t: 'Erosión, pérdida de la cubierta vegetal, extinción de animales.'},
])
app.$set(app.tempsobj, 'oks', [
    ['m_0', 's_0'],
    ['m_0', 't_1'],
    
    ['m_1', 's_2'],
    ['m_1', 't_0'],
    
    ['m_2', 's_1'],
    ['m_2', 't_2'],
])

 */