<template>
    <div>
        <el-button id="test2" @click="sub">test2</el-button>
        <div>{{ num }}</div>
    </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'

export default {
    data(){
        return{}
    },
    computed: {
        ...mapState("report2",{
            num: state => state.count
        })
    },
    methods:{
        ...mapMutations("report2",{
            sub:"increment"
        })
    }
}
</script>