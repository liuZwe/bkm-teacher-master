<template>
    <div class="nr">
        <div class="nr_top">
            <div class="nr_top_title">
                课程评论/回复
            </div>
            <div class="nr_top_cha">
                <el-input
                        placeholder="搜索已发布课程"
                        suffix-icon="el-icon-search"
                        id="input1"
                        v-model="input"
                        @keydown.enter.native="cha()">
                </el-input>
            </div>
        </div>
        <div class="nr_bottom">
            <div class="nr_top_bg">
                <div>
                    <el-button v-for="(item,index) in btn" :key="index" @click="quan(item,index-1)" :class="[{actives : activeName == item}]">{{item}}</el-button>

                    <!--                    <el-button>全部评论</el-button>-->
<!--                    <el-button>已回复</el-button>-->
<!--                    <el-button>未回复</el-button>-->
                </div>
                <div>
                    <el-select v-model="value" placeholder="请选择" style="width: 124px">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="value1" placeholder="请选择" style="width: 176px">
                        <el-option
                                v-for="item in options1"
                                :key="item.value1"
                                :label="item.label1"
                                :value="item.value1">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="nr_top_nr">
                <div class="nr_top_nr_left">
                    <div class="nr_top_nr_left_tx">
                        <el-avatar
                                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    </div>
                    <div class="nr_top_nr_left_pj">
                        <div class="nr_top_nr_left_pj_top">
                            <div class="nr_top_nr_left_pj_top_name">哈哈的镜子</div>
                        </div>
                        <div class="nr_top_nr_left_pj_center" style="line-height: 2em">
                            数学基础 综合能力考试中的数学基础不分主要考查学生的运算能力、逻辑能力
                        </div>
                        <div class="hfnr" v-if="hf">
                            <el-input class="textarea"
                                      type="textarea"
                                      placeholder="回复哈哈的镜子"
                                      v-model="textarea"
                                      maxlength="100"
                                      resize="none"
                                      show-word-limit
                            >
                            </el-input>
                        </div>
                        <div class="di">
                            <div class="nr_top_nr_left_pj_bottom">
                                <div class="nr_top_nr_left_pj_bottom_time">01-27 21:31</div>
                                <div class="nr_top_nr_left_pj_bottom_hf" style="margin-left: 20px" @click="huifu()" v-if="hui">回复</div>
                            </div>
                            <div><el-button class="tijiao" v-if="tj" @click="tjpl()">提交评论</el-button></div>
                        </div>
                    </div>
                </div>
                <div class="nr_top_nr_right">
                    <div class="nr_top_nr_right_left">
                        <div class="nr_top_nr_right_left_top">世界现代史72讲系统课</div>
                        <div class="nr_top_nr_right_left_center">第02讲</div>
                        <div class="nr_top_nr_right_left_bottom">工业设计手绘的系统学习思维</div>
                    </div>
                    <div class="nr_top_nr_right_right">
                        <el-image :src="img" style="width: 116px;height: 71px; border-radius: 5px"></el-image>
                    </div>
                </div>
            </div>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    background
                    :current-page="currentPage4"
                    :page-sizes="[1]"
                    :page-size="1"
                    layout="total, prev, pager, next, jumper"
                    :total="1"
                    class="fy"
                    style="margin-top: 1%">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {request} from "@/network/request/request";

    export default {
        name: "kcplhf",
        data() {
            return {
                input: '',
                textarea:'',
                hf:false,
                hui:true,
                tj:false,
                options: [{
                    value: '选项1',
                    label: '全部时间'
                }],
                options1: [{
                    value1: '选项1',
                    label1: '全部课程'
                }],
                value: '',
                value1: '',
                value2: 3.7,
                img: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
                currentPage4: 4,
                btn:["全部评价","已回复","未回复"],
                activeName : "全部评价",
            }
        },
        methods: {
            huifu(){
                this.hf=true;
                this.hui=false;
                this.tj=true;
            },
            tjpl(){
                this.hf=false;
                this.hui=true;
                this.tj=false;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            quan(item,index){
                this.activeName = item;
                request({
                    url: 'Evaluate/allEvaluate',
                    data: {
                        czz_id: JSON.parse(localStorage.getItem('user')).id,
                        limit: this.pagesize,
                        page: this.currentpage,
                        status:index,

                    }
                }).then(res => {
                    this.tabledata = res.data.data;
                    this.TotalRows = res.data.count;
                })
            },
            cha(){
                request({
                    url:'/comment/allComment',
                    data:{
                        keyword:this.input,
                        page:this.currentpage,
                        limit:this.pagesize,
                        czz_id:JSON.parse(localStorage.getItem('user')).id,
                    }
                }).then(res=> {
                    this.tabledata = res.data.data;
                    this.TotalRows = res.data.count;
                })
            },
        },
    }
</script>

<style scoped>
    .nr {
        width: 100%;
        height: 100%;
    }

    .nr_top {
        width: 96%;
        height:70px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 10px;
        padding: 0 2%;
        background-color: #ffffff;
    }
    .nr_top_title {
        display: flex;
        align-items: center;
        font-size: 18px;
        color: #333333;
        font-weight: bold;
        white-space: nowrap;
        justify-content: left;
        font-family: PingFang SC, PingFang SC-Medium;
    }
    .nr_bottom{
        width: 96%!important;
        height: 100%;
        padding:1% 2%;
        background-color: #ffffff;
        border-radius: 10px;
        margin-top: 5px;
    }
    .nr_top_bg {
        height: 5%;
        display: flex;
        justify-content: space-between;
    }
    .nr_top_nr {
        width: 100%;
        /*height:20%;*/
        display: flex;
        justify-content: space-between;
        margin-top:2%;
        border-bottom: 1px solid #F4F4F4;
    }
    .nr_top_nr_left {
        width: 80%;
        height: 100%;
        display: flex;
        align-items: center;
    }
    .nr_top_nr_left_tx {
        height: 100%;
        display: flex;
        align-items: center;
    }
    .nr_top_nr_left_pj {
        padding-left: 10px;
    }

    .nr_top_nr_left_pj_top {
        line-height: 2em;
        display: flex;
        align-items: center;
    }
    .nr_top_nr_left_pj_top_name{
        font-size: 14px;
        font-family:PingFang SC;
        font-weight: 500;
        line-height: 20px;
        color: #7A83B9;
        opacity: 1;
    }
    .nr_top_nr_left_pj_center{
        font-size: 16px;
        font-family:PingFang SC;
        font-weight: 400;
        line-height: 22px;
        color: #333435;
    }
    .nr_top_nr_left_pj_bottom {
        display: flex;
        align-items: center;
        line-height: 2em;
    }

    .nr_top_nr_right {
        width: 20%;
        height: 100%;
        display: flex;
        align-items: center;
    }

    .nr_top_nr_right_left_top {
        font-size: 16px;
        font-family:PingFang SC;
        font-weight: 400;
        line-height: 2em;
        color: #242424;
        max-width: 160px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .nr_top_nr_right_left_center {
        font-size: 14px;
        font-family:PingFang SC;
        font-weight: 400;
        line-height: 2em;
        color: #767676;
    }

    .nr_top_nr_right_left_bottom {
        font-size: 14px;
        font-family:PingFang SC;
        font-weight: 400;
        line-height: 2em;
        color: #767676;
        max-width: 160px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .nr_top_nr_left_pj_bottom_time{
        font-size: 12px;
        font-family:PingFang SC;
        font-weight: 500;
        line-height: 17px;
        color: #A5A6A7;
    }
    .nr_top_nr_left_pj_bottom_hf{
        font-size: 12px;
        font-family:PingFang SC;
        font-weight: 600;
        line-height: 17px;
        color: #A8ACBE;
        cursor: pointer;
    }
    .nr_top_nr_right_right {
        width: 100px;
        height: 67px;
        margin-left: 10px;
    }
    .hfnr{
        width: 100%;
        height: 60px;
    }
    .el-input__inner{
        font-size: 14px;
        font-family:PingFang SC;
        font-weight: 500;
        line-height: 20px;
        color: #7A83B9;
        padding-left: 2%;
    }
    .textarea::-webkit-input-placeholder{
        /*color: #7A83B9;*/
        color: red;
    }
    .tijiao{
        background-color:#F66246;
        border: none;
        color: #ffffff;
        display: flex;

    }
    .di{
        width: 100%;
        display: flex;
        align-items:center;
        justify-content: space-between;
    }
    .fy{
        display: flex;
        justify-content: flex-end;
        padding-right: 2%;
    }
    .el-select{
        margin: 5px;
    }
    #input1{
        background-color: red;
    }
    .nr_top_cha{
        width: 303px;
    }
</style>