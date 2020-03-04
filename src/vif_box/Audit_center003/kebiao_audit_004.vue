<template>
    <!-- 教师审核 -->
    <div>
        <el-card v-loading="loading" class="box-card" style="padding: 0;margin:20px;padding-left:60px;">
            <div v-show="school_name">{{school_address}} {{school_name}}</div>
            <el-table ref="multipleTable" :data="coursePlans" tooltip-effect="dark" style="width: 100%">
                <el-table-column align='center' header-align='center' label="服务年级">
                    <template slot-scope="scope">{{ scope.row.min_grade }}-{{scope.row.max_grade}}</template>
                </el-table-column>
                <el-table-column prop="institude_name" align='center' header-align='center' label="服务单位"></el-table-column>
                <el-table-column prop="message" class='tds' align='center' header-align='center' label="服务类型">
                    <template slot-scope="scope">{{arrange_mode[scope.row.arrange_mode]}}</template>
                </el-table-column>
                <el-table-column prop="category_name" align='center' header-align='center'
                                 label="课程门类"></el-table-column>
                <el-table-column prop="course_name" align='center' header-align='center' label="课程名称"></el-table-column>
                <!-- <el-table-column prop="target" align='center' header-align='center' label="课程目标"></el-table-column> -->
                <el-table-column prop="intention_count" align='center' header-align='center'
                                 label="意向人数"></el-table-column>

            </el-table>

            <!-- 审核展示的 -->
            <div v-if="phase ==5">

                <div class="tab_box" style="height:150px;width: 100%;float: left;margin-top:20px;">
                    <p style="line-height: 30px;">原因备注：</p>
                    <textarea v-model="textarea" style='' cols="30" rows="10"
                              placeholder="请输入内容(审核不通过必须填写原因备注)"></textarea>
                </div>
                <div style="width: 100%;float: left;padding-bottom:15px;">
                    <div class="btn_boxs">
                        <el-button @click='fanhui' style='float: left;'>返回列表</el-button>
                        <el-button @click='git_audit("pass")' style='margin-left:33px' type="primary">审核通过</el-button>
                        <el-button @click='git_audit("unpass")' style='float:right;' type="warning">审核拒绝</el-button>
                    </div>
                </div>
            </div>
            <!-- 详情展示的 -->
            <div v-else>
                <div class="tab_box" style="width: 100%;float: left;"><p>审核状态：</p><a>{{datas.audit.audit_action==0?'审核拒绝':'审核通过'}}</a></div>
                <div  style="width: 100%;" class="beizu"><p>备注理由：</p>
                    <div class="beizuss">{{audit_reason}}</div>
                </div>
            </div>

        </el-card>

    </div>
</template>
<script>
  import store from '../../vuex/store.js'

  export default {
    data() {
      return {
        dialogVisible: false,
        dialogImageUrl: '',
        textarea: '',//原因备注--》输入框内容
        school_address: '',//学校地址
        school_name: '',//学校名称
        coursePlans: [],//列表数据
        audit_status: 1,
        audit_reason: '',
        phase:5,
        arrange_mode: {
          '1': '机构授课',
          '2': '学校调配',
          '3': '平台调配'
        },
        loading: false,//加载login
				datas:'',
      }
    },
    computed: {
      detail_val() {
        return store.state.audit_val
      }
    },
    methods: {
      fanhui() {//返回上一页
        this.$router.go(-1)
      },
      //获取详情数据
      git_act() {
        this.$axios({
            method: 'get',
            url: store.state.url_data + '/api/auditCoursePlans/' + store.state.audit_id,
            headers: { 'Authorization': 'Bearer ' + localStorage.token }
          }
        ).then(res => {
          console.log(res.data,'审核数据');
          if (res.data.code == 200) {
						this.datas = res.data.data;
            let response = res.data.data;
            let school_detail = response.school_detail

            this.coursePlans = response.course_plan_course;
			console.log(this.coursePlans);
			
            this.school_address = school_detail.city_name + '-' + school_detail.region_name + '-' + school_detail.street_name
            this.school_name = response.school_name;

            this.phase=response.phase;
            this.audit_status = (response.log.audit_action==0?'审核不通过':'审核通过');
            this.audit_reason = response.log.comment;

            this.loading = false
          } else {
            this.loading = false
          }
        }).catch(error => {
          this.loading = false
        })
      },
      //审核
      git_audit(status) {
        if (status == 'unpass') {//审核 不通过
          if (this.textarea == '') {
            this.$message({ message: '审核拒绝必须填写备注理由', type: 'warning' })//警告提示
            return false
          }
					
        }
				if(this.textarea.length>100){this.$message({message: '备注理由不能超过100字 ',type: 'warning'});return false}
        this.$axios({
            method: 'put', url: store.state.url_data + '/api/auditCoursePlans/' + store.state.audit_id,
            data: { 'checked': status, 'reason': this.textarea },
            headers: { 'Authorization': 'Bearer ' + localStorage.token }
          }
        ).then(res => {
          if (res.data.code == 200) {
            this.$message({ message: '审核成功', type: 'success' })//
            window.setTimeout(() => {
              this.$router.go(-1)
            }, 1500)
          } else {
            this.$message.error('审核失败')
          }
        }).catch(error => {
          this.$message.error('发生错误，重复审核或系统报错！')
        })
      }

    },
    created() {
      this.loading = true
    },
    mounted() {
      this.git_act(1)
    }
  }

</script>
<style scoped="scoped">
    .qita{
        float: left;
        margin-right: 10px;
        width: 120px;
        height: 120px;
    }
    .beizuss{
        width: 400px;
        float: left;
        margin-top: 15px;
    }
    .beizu p{
        font-size:15px;
        font-weight: 600;
        float: left;
    }
    .beizu{
        width: 100%;

    }
    .btn_boxs{
        width: 360px;
        height:40px;
        /* background: red; */
        margin:40px auto 10px auto;
        /* float: left; */
    }
    .tab_box textarea{
        float:left;width:400px;height:100%;border-radius:3px;padding:7px 7px;border: 1px solid #dcdfe6;
        font-size:15px;
    }
    .img_box img{
        width: 270px;
        height: 100%;
        float: left;
        margin-left: 15px;
    }
    .img_box p{
        font-size:15px;
        font-weight: 600;
        float: left;
    }
    .img_box{
        width:400px;
        height:170px;
        float: left;
        /* margin-right:10px; */
        margin-bottom: 20px;
        margin-top: 20px;
    }
    .tab_box a{
        font-size:15px;
    }
    .tab_box p{
        font-size:15px;
        font-weight: 600;
        margin: 0;
        float: left;
    }
    .tab_box{
        margin-top: 20px;
        width: 100%;
        height: 60px;
        line-height: 60px;padding: 0;
    }
</style>