<template>
	<!-- 教师审核 -->
	<div>
	   <el-card v-loading="loading" class="box-card"  style="padding: 0;margin:20px;padding-left:60px;">
		 <div v-show="p_val_1" class="tab_box"><p>所属地区：</p><a>{{p_val_1}}</a></div>
		 <div v-show="p_val_2"  class="tab_box"><p>审核来源：</p><a>{{p_val_2}}</a></div>
		 <div v-show="p_val_3"  class="tab_box"><p>审核类型：</p><a>{{p_val_3}}</a></div>
		 <div v-show="p_val_4"  class="tab_box"><p>名称：</p><a>{{p_val_4}}</a></div>
		 <div v-show="p_val_5"  class="tab_box"><p>教师名称：</p><a>{{p_val_5}}</a></div>
		 <div v-show="p_val_6"  class="tab_box"><p>学历：</p><a>{{p_val_6}}</a></div>
		 <div v-show="p_val_7"  class="tab_box"><p>性别：</p><a>{{p_val_7}}</a></div>
		 <div v-show="p_val_8"  class="tab_box"><p>手机号：</p><a>{{p_val_8}}</a></div>
		 <div v-show="p_val_9"  class="tab_box"><p>生日：</p><a>{{p_val_9}}</a></div>
		 
		 <div v-show="p_val_10"  class="tab_box" style="float:left;height:auto;"><p style="float: left;">授课门类：</p>
		    <div style="float: left;width: 80%;">
				 <el-tag v-for='i in p_val_10' style='margin-right:10px;'>{{i}}</el-tag>
				 <!-- <el-tag v-for='i in 50' style='margin-right:10px;'>123123</el-tag> -->
			</div>
		 </div>
		 
		 <div v-show="p_val_11" style="float:left" class="tab_box"><p>证件类型：</p><a>{{p_val_11}}</a></div>
		 <div v-show="p_val_12" style="float:left" class="tab_box"><p>证件号码：</p><a>{{p_val_12}}</a></div>
		
	<!-- 机构展示 --> 
		 <div v-if="p_val_2=='机构'" style="width:100%;float:left;">
			 <div class="img_box">
				  <p>教师资格证：</p>
				 <img v-if="url_box[0]" @click="img_click(url_box[0])" :src="url_box[0]">
				<img v-else src="../../assets/img/nopicture.png" alt="">
			 </div>
			 <div class="img_box">
				 <p>劳动合同：</p>
			 	<img v-if="url_box[1]" @click="img_click(url_box[1])" :src="url_box[1]">
			 	<img v-else src="../../assets/img/nopicture.png" alt="">
			 </div>
			 <div class="img_box">
				  <p>职业照：</p>
			 	<img v-if="url_box[2]" @click="img_click(url_box[2])" :src="url_box[2]">
			 	<img v-else src="../../assets/img/nopicture.png" alt="">
			 </div>
		 </div>
	<!-- 学校展示 --> 	 
		 <div v-else style="width:100%;float:left;">
		 			 <div class="img_box">
						 <p>证件照（正面）：</p>
		 				 <img v-if="url_box[3]" @click="img_click(url_box[3])" :src="url_box[3]"><img v-else src="../../assets/img/nopicture.png" alt="">
		 				 
		 			 </div>
		 			 <div class="img_box">
						  <p>证件照（反面）：</p>
		 			 	<img v-if="url_box[4]" @click="img_click(url_box[4])" :src="url_box[4]"><img v-else src="../../assets/img/nopicture.png" alt="">
		 			 	
		 			 </div>
		 			 <div class="img_box">
						  <p>职业照：</p>
		 			 	<img v-if="url_box[2]" @click="img_click(url_box[2])" :src="url_box[2]"><img v-else src="../../assets/img/nopicture.png" alt="">
		 			 	
		 			 </div>
		 </div>
	<!-- 其他证件照 -->	 
		 <div v-if="qi_box.length!=0" class="img_box" style="width:100%;height:230px;">
		 		<p>其他证件照：</p><img v-for="i in qi_box" @click="img_click(i)" style="width:240px;height:150px;" :src="i" alt="">
		 </div>
		 
	<!-- 审核展示的 -->	 
	<div v-if="detail_val=='审核'">
		 <div class="tab_box" style="height:150px;width: 100%;float: left;">
			 <p style="line-height: 30px;">原因备注：</p>
			 <textarea v-model="textarea" style='' cols="30" rows="10" placeholder="请输入内容(审核不通过必须填写原因备注)" ></textarea>
		 </div>
	<div style="width: 100%;float: left;padding-bottom:15px;"> 
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
		<div v-show="p_val_14" style="width: 100%;" class="beizu"><p>备注理由：</p><div class="beizuss">{{p_val_14}}</div><div style="width: 100%;height: 30px;float: left;"></div></div>
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
			url_box:[],//  
			  
			loading: false,//加载login
			
			qi_box:[],//其他职业照
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
		   this.$axios({method:'get',url:store.state.url_data+'/api/auditTeachers/'+store.state.audit_id,headers:{'Authorization':'Bearer '+localStorage.token}}
		     ).then(res=>{
		        // console.log(res.data,'审核数据');
		       if(res.data.code==200){
		  		  let res_data = res.data.data.teacher;console.log(res.data)
	                                this.p_val_1 = res_data.city_name+'-'+res_data.region_name+'-'+res_data.street_name;
									let ale = res_data.source_type_id==1?'机构':'学校';
									this.p_val_2=ale;
									this.p_val_3='教师审核'
									this.p_val_4=res_data.source_name
									this.p_val_5=res_data.name
									let xueli= res_data.edu_degree_type_id==1?'研究生学历':(res_data.edu_degree_type_id==2?'本科学历':(res_data.edu_degree_type_id==3?'专升本学历':'专科学理论'))
									this.p_val_6=xueli
									this.p_val_7=(res_data.gender==1?'男':'女');
									this.p_val_8=res_data.phone
									this.p_val_9=res_data.birthday
									this.p_val_10=res_data.full_category.split(" ")
									let idc = res_data.idcard_type==1?'身份证':(res_data.idcard_type==2?'护照':'港澳通行证/回乡证')
									this.p_val_11=idc
									this.p_val_12=res_data.idcard_number
									
									let url_box = res.data.data.attachment;
									for(var i=0;i<url_box.length;i++){
										if(url_box[i].id==6){this.url_box[2] = url_box[i].url};//职业照
										if(url_box[i].id==7){this.url_box[3]=url_box[i].url};
										if(url_box[i].id==8){this.url_box[4]=url_box[i].url};
										if(url_box[i].id==1){this.url_box[0] = url_box[i].url};
										if(url_box[i].id==2){this.url_box[1] = url_box[i].url};
										if(url_box[i].id==3){this.qi_box.push(url_box[i].url)}
									};
									      
								   this.p_val_13 = (res.data.data.log.audit_action==0?'审核拒绝':'审核通过');
								   this.p_val_14 = res.data.data.log.comment;
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
		  this.$axios({method:'put',url:store.state.url_data+'/api/auditTeachers/'+store.state.audit_id,
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
		height: 170px;
		float: float;
		margin-left: 15px;
	}
	.img_box p{
		font-size:15px;
		font-weight: 600;
		float: float;
	}
	.img_box{
		width:400px;
		height:220px;
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
		width: 100%;
		height: 60px;
		line-height: 60px;padding: 0;
	}
</style>
