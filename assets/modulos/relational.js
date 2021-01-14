var epDrag = {
    isSource:true, isTarget:true,
    connector: ["Bezier", {curviness: 100}],
    paintStyle: { stroke:'#70BF44', strokeWidth:6, fill: '#fff' },
    connectorPaintStyle:{ stroke:'#70BF44', strokeWidth:6, fill: '#fff' },
}
var epTarget = {
    isSource:true, isTarget:true,
    paintStyle: { stroke:'#F88E26', strokeWidth:6, fill: '#fff' },
    maxConnections: -1
} 

Vue.component('relational', {
    props: ['value', 'sources', 'targets', 'connections', 'oks', 'initclass', 'anchors', 'anchort'],
    data() {
        return {
            status: [],
            evaluate: false,
            result: false,
            started: false,
            anchorSource: 'Right',
            anchorTarget: 'Left'
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
                jsPlumb.addEndpoint('s_'+item, { anchor:this.anchorSource, uuid: 's_'+item }, epDrag )
            }
            for (item in this.targets) {
                jsPlumb.addEndpoint('t_'+item, { anchor:this.anchorTarget, uuid: 't_'+item }, epTarget )
            }
            
            // Load connections
            if(this.value){
                this.status = this.value
            }
            for (item in this.status) {
                jsPlumb.connect({ uuids:this.status[item] })
            }
        },
        verify () { 
            this.evaluate = true
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
        //this.$emit('input', false)

        var _this = this

        if(this.anchors!=undefined){ this.anchorSource = this.anchors }
        if(this.anchors!=undefined){ this.anchorTarget = this.anchort }

        setTimeout(function () {    
            _this.startConnections()
        }, 400)
        jsPlumb.bind('connection',function(info,ev){
            var con=info.connection;   //this is the new connection
            var sourcedata = info.connection.source.getAttribute('data')
            var targetid = info.connection.targetId
            var allconnections = jsPlumb.getConnections()
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
        window.addEventListener("resize", function (){
            console.log('resizing')
            jsPlumb.repaintEverything()
        })
    },
    template: `
        <div class="relational d-flex justify-content-between" :class="setclass + ' ' + (initclass?initclass:' ')">
            <div class="result" v-if="evaluate" :class="setclass + ' animate__animated animate__heartBeat'"></div>
            <div class="sources">
                <div v-for="(source, index) in sources" class="r_source" :id="'s_'+index" :data="source.data">
                    <slot name="source" :source="source" />
                </div>
            </div>
            <div class="targets">
                <div v-for="(target, index) in targets" class="r_target" :id="'t_'+index" :data="target.data">
                    <slot name="target" :target="target" />
                </div>
            </div>
        </div>
    `
})