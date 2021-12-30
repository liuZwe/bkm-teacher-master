<template>
    <div class="step2">
        <el-form :rules="rule" label-position="top" :model="form"  ref="form" class="form">
            <el-form-item label="选择开户银行" required prop="kh_dq">
                <el-select v-model="form.kh_dq" class="select" placeholder="请选择开户地区" style="border-radius: 5px;width: 343px; border: none;height: 46px; background: #F5F5FA;">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="form.khh" class=" select select2" placeholder="请选择开户行" style="border-radius: 5px;width: 343px; border: none;height: 46px; background: #F5F5FA;">
                    <el-option
                            v-for="item in optionsBlank"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="银行账户" required prop="yh_account">
                <el-input v-model.trim="form.yh_account" @input="sryhk" class="select input" placeholder="请输入银行账户" style="border-radius: 5px; width: 343px; background: #F5F5FA; "></el-input>
                <svg class="icon" aria-hidden="true" style="margin-left: 10px;" v-if="duihao2">
                    <use xlink:href="#icon-a-zhengque1"></use>
                </svg>
            </el-form-item>
            <el-form-item label="上传银行卡照片" required prop="yh_img_h">
                <p class="card-text">请上传银行卡的正反面，照片格式为JPG/PNG，且大小不超过2M；银行卡必须显示完整，不能缺角，背景纯净，数字显示清晰</p>
                <div class="uploadBox">
                    <Upload2
                            text="银行卡正面"
                            @changeImg="(e) => form.yh_img_q = e"
                            :form="form"
                            :imgsType="1"
                            @disabled="(e) => (disabled = e)"
                    />
                    <Upload2
                            text="银行卡反面"
                            class="upload2"
                            @changeImg="(e) => form.yh_img_h = e"
                            :form="form"
                            :imgsType="2"
                            @disabled="(e) => (disabled = e)"
                    />
                </div>
            </el-form-item>
            <el-form-item :class="[disabled ? 'dis' : '']" style="display: flex; justify-content: center; align-items: center; margin-top: 30px;">
                <el-button :class="['stepBtn', disabled ? 'gray' : '']"  @click="nextStep1()">下一步</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {request} from '@/network/request/request'
    import Upload2 from "@/common/upload/upload2.vue";
    import czsy from "@/components/zhgl/czsy";
    // import buzhou from "@/components/ghyhk/buzhou.vue";
    export default {
        data: () => ({
            form:{
                kh_dq: '',
                khh: '',
                yh_account: '',
                yh_img_q: '',
                yh_img_h: '',
            },
            options: [{
                value: '宝安',
                label: '宝安'
            }, {
                value: '龙岗',
                label: '龙岗'
            }, {
                value: '南山',
                label: '南山'
            }],
            optionsBlank: [{
                value: '建设银行',
                label: '建设银行'
            }, {
                value: '农业银行',
                label: '农业银行'
            }],
            disabled: true,
            duihao2:false,
            setpStatus1:0
        }),
        watch: {
            "form.yh_account"(v) {
                if(/\s/g.test(this.form.yh_account)) {
                    this.form.yh_account = this.form.yh_account.replace(/\s/g, '');
                }
            },
            form: {
                deep: true,
                immediate: true,
                handler(v) {
                    if(v.kh_dq && v.khh && v.yh_account && v.yh_img_q && v.yh_img_h) {
                        this.disabled = false;
                    }else {
                        this.disabled = true;
                    }
                }
            }
        },
        computed: {
            rule() {
                return Object.freeze({
                    kh_dq: [
                        { validator:  (rule, value, callback) => {
                                if(this.form.kh_dq && this.form.khh ) {
                                    callback();
                                }else {
                                    callback(new Error("请选择开户银行/开户地区"))
                                }
                            }, trigger: ['change', 'blur']}
                    ],
                    khh: [
                        {required: true, message: '请选择开户银行', trigger: ['blur', 'change']},
                    ],
                    yh_account: [
                        {required: true, message: '请输入正确银行卡号', trigger: ['blur', 'change']},
                        { pattern: /^[1-9]\d{9,29}$/, message: '请输入正确银行卡号' }
                    ],
                    yh_img_q: [
                        { validator:  (rule, value, callback) => {

                                if(value) {
                                    callback();
                                }else {
                                    callback(new Error("请上传银行卡正面照片"))
                                }
                            }, trigger: ['change', 'blur']}
                    ],
                    yh_img_h: [
                        { validator:  (rule, value, callback) => {
                                if(value) {
                                    callback();
                                }else {
                                    callback(new Error("请上传银行卡背面照片"))
                                }
                            }, trigger: ['change', 'blur']}
                    ]
                })
            }

        },
        components: {
            Upload2
        },
        methods: {
            nextStep1() {
                request({
                    url:'withdrawal/upbindBank',
                    data:{
                        czz_id:JSON.parse(localStorage.getItem('user')).id,
                        kh_dq:this.form.kh_dq,
                        khh:this.form.khh,
                        yh_account:this.form.yh_account,
                        yh_img_q:this.form.yh_img_q,
                        yh_img_h:this.form.yh_img_h
                    }
                }).then(res=>{
                    this.setpStatus1=2;
                    this.active1=1;
                    this.form=res.data.data;
                    if(res.data.st==1){
                        console.log("+++++++++++++")
                        this.$emit('GetKey',2)
                        this.$emit('Getkey',1)
                    }
                    if(res.data.st==500){
                        this.$message.warning('登录已过期，请重新登录')
                        this.$router.push({path:'/index'})
                    }
                   


                })
            },
            sryhk(){
                console.log("+++++++++++++++++++++++++++++++")
                console.log(this.form.yh_account)
                console.log("+++++++++++++++++++++++++++++++")
                if(this.form.yh_account.length>=16&&this.form.yh_account.length<=19){
                    this.duihao2=true;
                }else{
                    this.duihao2=false
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    ::v-deep input {
        background: #F5F5FA!important;
        height: 46px;
        border: none!important;
        width: 343px;
        height: 46px;
        opacity: 1;
        border-radius: 5px;
    }
    .text {
        margin-top: 5px;
    }
    .select2 {
        display: block;
        margin-top: 15px;
    }
    .select {
        margin-left: 15px;
    }
    ::v-deep .el-form-item__label{
        font-weight: 600;
        line-height: 22px;
        color: #37373B;
        font-size: 16px;
    }
    .gray {
        background: #C8C8D3;
        color: white;

    }

    .dis {
        ::v-deep .el-button:focus, .el-button:hover {
            background: #C8C8D3!important;
            border: none!important;
        }
    }
</style>