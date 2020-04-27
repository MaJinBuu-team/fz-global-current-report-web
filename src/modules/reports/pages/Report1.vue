<template>
    <div>
        <el-button id="test1" @click="add">test1</el-button>
        <div>{{ num }}</div>
        <div>{{ text }}</div>
    </div>
</template>

<script>
import { mapState,mapMutations,mapActions } from 'vuex'

export default {
    data(){
        return{}
    },
    computed:{
        ...mapState("report1",{
            num: state => state.count,
            text: state => state.text
        })
    },
    methods:{
        ...mapMutations("report1",{
            add:"increment"
        }),
        ...mapActions("report1",{
            dataInit:"dataInit"
        })
    },
    created(){
        this.dataInit();
    }
}
</script>