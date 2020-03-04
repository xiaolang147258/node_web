<template>
	<!-- 机构审核 -->
	<div>
	   <el-card v-loading="loading" class="box-card"  style="padding: 0;margin:20px;padding-left:60px;">
		 <div  class="tab_box"><p>所属地区：</p><a>{{p_val_1}}</a></div>
		 <div   class="tab_box"><p>机构名称：</p><a>{{p_val_2}}</a></div>
		 <div   class="tab_box"><p>审核类型：</p><a>{{p_val_3}}</a></div>
		 <div   class="tab_box"><p>公司名称：</p><a>{{p_val_4}}</a></div>
		 <div   class="tab_box"><p>经营地址：</p><a>{{p_val_5}}</a></div>
		 <div   class="tab_box"><p>法人名字：</p><a>{{p_val_6}}</a></div>
		 <div   class="tab_box"><p>联系人：</p><a>{{p_val_7}}</a></div>
		 <div   class="tab_box"><p>联系人号码：</p><a>{{p_val_8}}</a></div>
		 <div   class="tab_box"><p>社会信用代码：</p><a>{{p_val_9}}</a></div>
		 
		 <div  class="tab_box" style="height:auto;float:left;"><p>经营范围：</p><a style="float:left;height:auto;line-height:20px;width:70%;padding-top:20px;">{{p_val_10}}</a></div>
		 
		 <div style="float:left;"  class="tab_box"><p>办学许可证号：</p><a>{{p_val_11}}</a></div>
		 <div  style="float:left;"   class="tab_box"><p>公司官网：</p><a>{{p_val_12}}</a></div>
		 
		 <div style="width:100%;margin-left:-30px;margin-top: 20px;float:left;">
			 <div class="img_box">
				 <img v-if="url_box[0]" @click="img_click(url_box[0])" :src="url_box[0]"><img v-else src="../../assets/img/nopicture.png" alt="">
				 <p>法人证件照(反面 )：</p>
			 </div>
			 <div class="img_box">
			 	<img v-if="url_box[1]" @click="img_click(url_box[1])" :src="url_box[1]"><img v-else src="../../assets/img/nopicture.png" alt="">
			 	 <p>营业执照：</p>
			 </div>
			 <div class="img_box">
			 	<img v-if="url_box[3]" @click="img_click(url_box[3])" :src="url_box[3]"><img v-else src="../../assets/img/nopicture.png" alt="">
			 	<p>法人证件照(正面 )：</p>
			 </div>
			 <div class="img_box">
			 	<img v-if="url_box[2]" @click="img_click(url_box[2])" :src="url_box[2]"><img v-else src="../../assets/img/nopicture.png" alt="">
			 	 <p>办学许可证：</p>
			 </div>
			  
			 <div class="img_box">
			 	<img v-if="url_box[4]" @click="img_click(url_box[4])" :src="url_box[4]"><img v-else src="../../assets/img/nopicture.png" alt="">
			 	<p>环境或抬头照：</p>
			 </div>
		 </div>
	<!-- 审核展示的 -->	 
	<div v-if="detail_val=='审核'">
		 <div class="tab_box" style="height:150px;width: 100%;float: left;">
			 <p style="line-height: 30px;">原因备注：</p>
			 <textarea v-model="textarea" style='' cols="30" rows="10" placeholder="请输入内容(审核不通过必须填写原因备注)" ></textarea>
		 </div>
		<div style="float: left;width: 100%;padding-bottom:20px;">
		 <div class="btn_boxs">
			 <el-button @click='fanhui' style='float: left;'>返回列表</el-button>
			 <el-button @click='git_audit("pass")' style='margin-left:33px' type="primary">审核通过</el-button>
			 <el-button @click='git_audit("unpass")' style='float: right;' type="warning">审核拒绝</el-button>
		 </div>
		</div>  
	</div>	 	
	<!-- 详情展示的 -->
	 <div v-else>
		<div class="tab_box" style="width: 100%;float: left;"><p>审核状态：</p><a>{{p_val_13}}</a></div>
		<div v-show="p_val_14" class="beizu"><p>备注理由：</p><div class="beizuss">{{p_val_14}}</div><div style="width: 100%;height: 30px;float: left;"></div></div>
	 </div> 
	 
 </el-card>
	  
	  <!-- 全屏预览图片插件 -->
	  <el-dialog :visible.sync="dialogVisible" size="tiny">
         <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
	  
  </div>
</template>

<script>
	import store from "../../vuex/store.js";
     export default {
	  data(){
	    return {
			dialogVisible:false,
			dialogImageUrl:'',
			textarea:'',//原因备注--》输入框内容
			
			p_val_1:'',p_val_2:'',p_val_3:'',p_val_4:'',p_val_5:'',p_val_6:'',p_val_7:'',p_val_8:'',p_val_9:'',p_val_10:'',p_val_11:'',p_val_12:'',p_val_13:'',p_val_14:'',
			url_box:['','','','',''],//  
			  
			
			loading: false,//加载login
		}
	  },
	computed:{
		detail_val(){return store.state.audit_val},
	},
	methods:{
		img_click(i){
			 this.dialogImageUrl = i
             this.dialogVisible = true;
		},
		fanhui(){//返回上一页
			this.$router.go(-1);
		},
	    //获取详情数据
		git_act(){
		   this.$axios({method:'get',url:store.state.url_data+'/api/auditInstitutions/'+store.state.audit_id,headers:{'Authorization':'Bearer '+localStorage.token}}
		     ).then(res=>{
		        // console.log(res.data,'审核数据');
		       if(res.data.code==200){
		  		  let res_data = res.data.data;console.log(res_data)
	                                this.p_val_1 = res_data.city_name+'-'+res_data.region_name+'-'+res_data.street_name;
									this.p_val_2 = res_data.street_name;
									this.p_val_3 = '机构审核';
									this.p_val_4 = res_data.name;
									this.p_val_5 = res_data.address;
									this.p_val_6 = res_data.legal_name;
									this.p_val_7 = res_data.contact_name;
									this.p_val_8 = res_data.contact_phone;
									this.p_val_9 = res_data.credit_code;
									this.p_val_10 = res_data.business_scope;
									this.p_val_11 = res_data.educate_permit;
									this.p_val_12 = res_data.website;			
									  
				                   var img_box = res_data.audit_institution_attachment;
				                   if(img_box.business_license){this.url_box[1] = img_box.business_license};
				                   if(img_box.idcard_back){this.url_box[0] = img_box.idcard_back};
				                   if(img_box.idcard_front){ this.url_box[3] = img_box.idcard_front};
				                   if(img_box.office_img){this.url_box[4] = img_box.office_img};
				                   if(img_box.education_license){this.url_box[2] = img_box.education_license}
									        
								   this.p_val_13 = (res_data.log.audit_action==0?'审核拒绝':'审核通过');
								   this.p_val_14 = res_data.log.comment;
								   this.loading = false;
		  		}else{
					this.loading = false;
				}
		     }).catch(error=> {this.loading = false;});
		},
		//审核
	    git_audit(i){
		  if(i=='unpass'){//审核 不通过
			  if(this.textarea==''){
				   this.$message({message: '审核拒绝必须填写备注理由',type: 'warning'});//警告提示
                   return false;
			  }
			  
		  };
		   if(this.textarea.length>100){this.$message({message: '备注理由不能超过100字 ',type: 'warning'});return false}
		  this.$axios({method:'put',url:store.state.url_data+'/api/auditInstitutions/'+store.state.audit_id,
		       data:{'checked':i,'reason':this.textarea},
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
	}
	.tab_box textarea{
		float:left;width:400px;height:100%;border-radius:3px;padding:7px 7px;border: 1px solid #dcdfe6;
		font-size:15px;
	}
	.img_box img{
		width: 270px;
		height: 100%;
		float: right;
		margin-left: 15px;
	}
	.img_box p{
		font-size:15px;
		font-weight: 600;
		float: right;
	}
	.img_box{
		width:450px;
		height:150px;
		float: left;
		/* margin-right:10px; */
		margin-bottom: 20px;
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
