<template>
    <!-- 营养餐请假 -->
    <div>
        <el-card v-loading="loading" class="box-card"  style="padding: 0;margin:20px;padding-left:60px;">
			
           <div v-if="datas.school" class="tab_box"><p>所属地区：</p><a>{{datas.school.city_name}}-{{datas.school.region_name}}-{{datas.school.street_name}}</a></div>
           <div  class="tab_box"><p>审核类型：</p><a>营养餐退款</a></div>
           <div v-if="datas.order" class="tab_box"><p>支付时间：</p><a>{{datas.order.pay_at}}</a></div>
           <div  class="tab_box"><p>申请时间：</p><a>{{datas.created_at}}</a></div>
           <div  class="tab_box"><p>支付单号：</p><a>{{datas.order_id}}</a></div>
           <div v-if="datas.order"  class="tab_box"><p>支付流水号：</p><a>{{datas.order.out_trade_no}}</a></div>
           <div v-if="datas.order"  class="tab_box"><p>微信单号：</p><a>{{datas.order.out_trade_no}}</a></div>
			
           <div v-if="datas.order"  class="tab_box"><p>订单金额：</p><a>{{datas.order.amount_paid}}</a></div>
           <div class="tab_box"><p>学校名称：</p><a>{{datas.school_name}}</a></div>
           <div   class="tab_box"><p>学生姓名：</p><a>{{datas.student_name}}</a></div>
           <div  class="tab_box"><p>年级班级：</p><a>{{datas.order.grade}}年{{datas.order.class}}班</a></div>
           <div v-if="datas.order"  class="tab_box"><p>用餐类型：</p><a>{{datas.order.order_period==1?'月度用餐':'学期用餐'}}</a></div>
           <div v-if="datas.order"  class="tab_box"><p>用餐月份：</p><a>{{moth_box}}</a></div>
			
            <div v-if="datas.order"  class="tab_box"><p>用餐开始日期：</p><a>{{datas.order.start_format}}</a></div>
            <div v-if="datas.order"  class="tab_box"><p>用餐结束日期：</p><a>{{datas.order.end_format}}</a></div>
            <div  class="tab_box"><p>营养餐标价：</p><a>{{datas.order.dining_price}}</a></div>
            <div class="tab_box"><p>配餐记录：</p><a><el-button @click='git_xiang' :loading="btn_login" type="primary">查看详细</el-button></a></div>
			
			<div   class="tab_box"><p>停止服务生效日期：</p><a>{{datas.effective_format}}</a></div>
            <div   class="tab_box"><p>应用餐次数：</p><a>{{datas.days_total}}</a></div>
			<div   class="tab_box"><p>实际用餐次数：</p><a>{{datas.days_left}}</a></div>
			<div   class="tab_box"><p>请假次数：</p><a>{{datas.leaves_count}}</a></div>
			<div  class="tab_box"><p>应退餐次数：</p><a>{{datas.days_refundable}}</a></div>
			
            <div   class="tab_box"><p>营养餐单价：</p><a>{{datas.order.dining_price}}</a></div>
            <div   class="tab_box"><p>退款金额：</p><a>{{datas.amount_refundable}}</a></div>
            <div   class="tab_box"><p>请假原因：</p><a>{{datas.comment}}</a></div>
			
            <div class="tab_box" style="height:100px;"><p>附件：</p><a>
			    <img @click="img_click(datas.attachment1_url)" v-show="datas.attachment1_url" style="width:200px;height:100px;float:left;margin-left:10px;" :src="datas.attachment1_url" alt="">
				<img @click="img_click(datas.attachment2_url)" v-show="datas.attachment2_url" style="width:200px;height:100px;float:left;margin-left:10px;" :src="datas.attachment2_url" alt="">
				<img @click="img_click(datas.attachment3_url)" v-show="datas.attachment3_url" style="width:200px;height:100px;float:left;margin-left:10px;" :src="datas.attachment3_url" alt="">
			</a></div>
            
            <!-- 审核展示的 -->
            <div v-if="detail_val=='审核'">
                <div class="tab_box" style="height:150px;width: 100%;float: left;margin-top:20px;">
                    <p style="line-height: 30px;">原因备注：</p>
                    <textarea v-model="textarea" cols="30" rows="10" placeholder="请输入内容(审核不通过必须填写原因备注)" ></textarea>
                </div>
                <div style="width:100%;float:left;padding-bottom:15px;">
                    <div class="btn_boxs">
                        <el-button @click='fanhui' style='float:left;'>返回列表</el-button>
                        <el-button @click='git_audit("pass")' style='margin-left:33px' type="primary">审核通过</el-button>
                        <el-button @click='git_audit("unpass")' style='float: right;' type="warning">审核拒绝</el-button>
                    </div>
                </div>
            </div>
            <!-- 详情展示的 -->
            <div v-else>
                <div   class="tab_box" style="width: 100%;float: left;"><p>审核状态：</p><a>{{datas.audit.audit_action==0?'审核拒绝':'审核通过'}}</a></div>
                <div  style="width: 100%;" class="beizu"><p>备注理由：</p><div class="beizuss">{{datas.audit.comment}}</div><div style="width:100%;height:30px;float:left;"></div></div>
            </div>
        </el-card>
        <!-- 全屏预览图片插件 -->
       <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
		
		<transition name="el-fade-in-linear">
		     <div v-show="show_meng" @click="show_meng=false" class="transition-box">
		   		  <transition name="el-zoom-in-top">
		          <div v-show="show_meng" class="transition-box_child">
					 <div v-for="i in tab_box" :class="{box_cass:(i.status==2?true:false),box_dal:(i.status==1?true:false),box_cass2:(i.status==0?true:false)}">
					 		<p>{{i.status==1?'配餐':(i.status==2?'请假':'未配餐')}}</p>
					 		<p>{{i.date}}</p>
					 </div>
		   		  </div>
		        </transition>
		   		</div>
		 </transition>
	 
    </div>
</template>

<script>
  import store from "../../../vuex/store.js";
  export default {
    data(){
      return {
		show_meng:false,
        dialogVisible:false,
        application:[],
        order:[],
        school:[],
        attachments:[],
		datas:{},
        loading: false,//加载login
		dialogImageUrl:'',
		p_val_13:'',
		p_val_14:'',
		btn_login:false,
		tab_box:[],
		textarea:'',
      }
    },
    computed:{
      detail_val(){return store.state.audit_val},
	  moth_box(){
	  		let start = this.datas.order.start_format.substr(0,7);
	  		let end = this.datas.order.end_format.substr(0,7);
	  		let dates = start==end?start:start+' ~ '+end;
	        return dates
	  },
    },
    methods:{
		
	  git_xiang(){
		  if(this.tab_box.length!=0){
		  	this.show_meng = true;
		  	return false;
		  }
		  this.btn_login = true;
		this.$axios({method:'get',url:store.state.url_data+'/api/auditDiningLeaves/'+this.datas.order_id+'/leaveRecord',
		     headers:{'Authorization':'Bearer '+localStorage.token}}
		  ).then(res=>{
		  	console.log(res.data,'数据')
			this.btn_login = false;
		    if(res.data.code==200){
		      this.show_meng = true;
		  	this.tab_box = res.data.data.list;
		    }else{
		      this.loading = false;
		    }
		  }).catch(error=> {this.loading = false;this.btn_login = false;});
	  },
      img_click(i){
        this.dialogImageUrl = i
        this.dialogVisible = true;
      },
      fanhui(){//返回上一页
        this.$router.go(-1);
      },
      //获取详情数据
      git_act(){
        // store.state.audit_id = '1296cc2d-a942-3440-b1af-b44d7bc9d092';
        this.$axios({method:'get',url:store.state.url_data+'/api/auditDiningRefunds/'+store.state.audit_id,headers:{'Authorization':'Bearer '+localStorage.token}}
        ).then(res=>{
			console.log(res.data,'详情数据')
          if(res.data.code==200){
            this.datas = res.data.data;
            // this.p_val_13 = (res.data.data.log.audit_action==0?'审核不通过':'审核通过');
            // this.p_val_14 = res.data.data.log.comment;
            this.loading = false;
          }else{
            this.loading = false;
          }
        }).catch(error=> {this.loading = false;});
      },
      //审核
      git_audit(audit){
        if(audit=='unpass'){//审核 不通过
          if(this.textarea==''){
            this.$message({message: '审核拒绝必须填写备注理由',type: 'warning'});//警告提示
            return false;
          }
		  
        };
		if(this.textarea.length>100){this.$message({message: '备注理由不能超过100字 ',type: 'warning'});return false}
        this.$axios({method:'put',url:store.state.url_data+'/api/auditDiningRefunds/'+store.state.audit_id,
          data:{'checked':audit,'reason':this.textarea},
          headers:{'Authorization':'Bearer '+localStorage.token}}
        ).then(res=>{
          console.log(res.data,'审核数据');
          if(res.data.code==200){
            this.$message({message: '审核成功',type: 'success'});// 
            window.setTimeout(()=>{this.$router.go(-1)},1500)
          }else{
            this.$message.error('审核失败');
          }
        }).catch(error=> {
          this.$message.error('发生错误，重复审核或系统报错！')
        });
      },


    },
    created(){
      this.loading = true;
    },
    mounted(){
      this.git_act();

    }
  };

</script>
<style scoped="scoped">
	.box_cass2{
		background:darkgray;
	}
	.box_cass{
		background:#B4D100;
	}
	.box_dal{
		background:#18BC9C;
	}
	.transition-box_child div{
		
		width: 149px;
		height: 87px;
		float: left;
		margin-left:20px;
		margin-bottom: 13.5px;
		border-radius:5px;
		text-align: center;
		line-height: 22px;
		color: white;
	}
	.transition-box_child{
		width:920px;
		height:90%;
		margin: 0 auto;
		margin-top:2%;
		background: white;
		border-radius:5px;
		overflow:auto;
		padding:20px;
		padding-top: 30px;
	}
	.transition-box{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 500;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.5);
	}
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
        margin:40px auto 10px auto;
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
        width: 100%;
        height: 60px;
        line-height: 60px;padding: 0;
    }
</style>
