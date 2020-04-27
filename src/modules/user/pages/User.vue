<template>
    <div>
        <el-button id="test1" @click="add">user</el-button>
        <div>{{ num }}</div>
    </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'

export default {
    data(){
        return{}
    },
    computed:{
        ...mapState("report1",{
            num: state => state.count
        })
    },
    methods:{
        ...mapMutations("report1",{
            add:"increment"
        })
    }
}
</script>