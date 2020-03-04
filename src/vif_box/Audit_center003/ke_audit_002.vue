<template>
	<!-- 课程审核 -->
	<div>
	   <el-card v-loading="loading" class="box-card"  style="padding: 0;margin:20px;padding-left:60px;">
		 <div v-show="p_val_1" class="tab_box"><p>审核来源：</p><a>{{p_val_1}}</a></div>
		 <div v-show="p_val_2"  class="tab_box"><p>名称：</p><a>{{p_val_2}}</a></div>
		 <div v-show="p_val_3"  class="tab_box"><p>审核类型：</p><a>{{p_val_3}}</a></div>
		 <div v-show="p_val_4"  class="tab_box"><p>课程名称：</p><a>{{p_val_4}}</a></div>
		 <div v-show="p_val_5"  class="tab_box"><p>课程类型：</p><a>{{p_val_5}}</a></div>
		 <div v-show="p_val_6"  class="tab_box"><p>适合年级：</p><a>{{p_val_6}}</a></div>
		 <div v-show="p_val_7"  class="tab_box"><p>课堂人数：</p><a>{{p_val_7}}</a></div>
		 
		 <div style="width: 100%;margin: 20px 0;float: left;" class="beizu">
		    <p>课程目标：</p><div class="beizuss" style="width:50%;margin-left: 10px;">{{p_val_8}}</div>
		 </div>
		 
		 <div style="width: 100%;margin: 20px 0;float: left;" class="beizu">
		    <p>课程材料：</p><div class="beizuss" style="width:50%;margin-left: 10px;">{{p_val_15}}</div>
		 </div>
		 
		 <div style="height:150px;margin:20px 0 20px 0;" class="tab_box"><p style="line-height:20px;">封面图：</p>
		       <img v-for="i in url_box" @click="img_click(i)" class="img_feng" :src="i" alt="">
			    <!-- <el-image fit="contain" v-for="i in url_box" class="img_feng" :src="i" :preview-src-list="url_box"> -->
   
  </el-image>
		 </div>
		 
		 <div class="tab_box"><p>课程特色：</p>
		      <el-tag v-for='i in tag_box' style='margin-right:10px;'>{{i}}</el-tag>
		 </div>
		
		  <div style="margin:20px 0 20px 0;width:100%;float:left;"><p style="line-height:20px;font-size:15px;font-weight:600;">课程大纲：</p>
				   <table class="course-table" style="width:100%;float:left;">
				    <tr>
				    <th>单元</th>
				    <th>单元标题</th>
				    <th>单元目标</th>
				    <th>课时编号</th>
				    <th>课时名称</th>
				    <th>课时内容</th>
				    </tr>
				      <tbody v-html="excel_box"></tbody> 
				    </table>
		  </div>	
		  
		  <div style="width: 100%;margin: 20px 0;float: left;" class="beizu">
			  <p>课程简介：</p>
		     <div class="beizuss" style="width:50%;margin-left: 10px;" v-html="p_val_9"></div>
		  </div>
			
	<!-- 审核展示的 -->	 
	<div v-if="detail_val=='审核'">
		 <div class="tab_box" style="height:150px;width: 100%;float: left;">
			 <p style="line-height: 30px;">原因备注：</p>
			 <textarea v-model="textarea" style='' cols="30" rows="10" placeholder="请输入内容(审核不通过必须填写原因备注)" ></textarea>
		 </div>
		<div style="width: 100%;float:left;padding-bottom:15px;">
		 <div class="btn_boxs">
			 <el-button @click='fanhui' style='float: left;'>返回列表</el-button>
			 <el-button @click='git_audit("pass")' style='margin-left:33px' type="primary">审核通过</el-button>
			 <el-button @click='git_audit("unpass")' style='float: right;' type="warning">审核拒绝</el-button>
		 </div>
		</div> 
	</div>	 	
	<!-- 详情展示的 -->
	 <div v-else>
		<div class="tab_box"><p>审核状态：</p><a>{{p_val_13}}</a></div>
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
			
			p_val_1:'',p_val_2:'',p_val_3:'',p_val_4:'',p_val_5:'',p_val_6:'',p_val_7:'',p_val_8:'',p_val_9:'',p_val_10:'',p_val_11:'',p_val_12:'',p_val_13:'',p_val_14:'',p_val_15:'',
			url_box:[],//  
			
			tag_box:[],//标签
			
			excel_box:'',//解析的excel
			
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
		
		//解析excel
		 excls(excelObj){
			var tableStr = '',rowStr = '';
			for (var i = 0; i < excelObj.length; i++) {
			        for (var j = 0; j < excelObj[i].class.length; j++) {
			          if (j == 0) {
			            rowStr += '<td style="text-align:center;border:1px solid #ccc;padding:5px 10px">' +
			              excelObj[i].class[j].name +
			              '</td>' +
			              '<td style="text-align:center;border:1px solid #ccc;">' +
			              excelObj[i].class[j].title +
			              '</td>' +
			              '<td style="text-align:center;border:1px solid #ccc;padding:5px 10px">' +
			              excelObj[i].class[j].content +
			              '</td>'
			
			            tableStr += '<tr>' +
			              '<td style="text-align:center;border:1px solid #ccc;" rowspan="' + excelObj[i].class.length + '">' +
			              excelObj[i].unit +
			              '</td>' +
			              '<td style="text-align:center;border:1px solid #ccc;" rowspan="' + excelObj[i].class.length + '">' +
			              excelObj[i].title +
			              '</td>' +
			              '<td style="text-align:center;border:1px solid #ccc;padding:5px 10px;text-align:justify;" rowspan="' + excelObj[i].class.length + '">' +
			              excelObj[i].content +
			              '</td>' +
			              rowStr +
			              '</tr>'
			          } else {
			            rowStr += '<tr style="text-align:center;border:1px solid #ccc;">' +
			              '<td style="text-align:center;border:1px solid #ccc;padding:5px 10px">' +
			              excelObj[i].class[j].name +
			              '</td>' +
			              '<td style="text-align:center;border:1px solid #ccc;padding:5px 10px">' +
			              excelObj[i].class[j].title +
			              '</td>' +
			              '<td style="text-align:center;border:1px solid #ccc;padding:5px 10px">' +
			              excelObj[i].class[j].content +
			              '</td>' +
			              '</tr>'
			            tableStr += rowStr
			          }; rowStr = ''
			        }
			      };
			return tableStr
		},
	    //获取详情数据
		git_act(){
		   this.$axios({method:'get',url:store.state.url_data+'/api/auditCourses/'+store.state.audit_id,headers:{'Authorization':'Bearer '+localStorage.token}}
		     ).then(res=>{
		        // console.log(res.data,'审核数据');
		       if(res.data.code==200){
		  		  let res_data = res.data.data;console.log(res_data)
				  
				                     let data = res.data.data;
				                     this.p_val_1 =(data.source_type==1?'机构':'学校');
				                     this.p_val_2 =data.source_name
				                     this.p_val_3 ='课程'
				                     this.p_val_4 =data.name
				                     this.p_val_5 =data.category_name  
				                     this.p_val_6 =(data.min_grade+'年级'+'-'+data.max_grade+'年级');   
				                     this.p_val_7 =(data.min_students+'-'+data.max_students);
				                     this.p_val_8 =data.target
				                     
									 if(data.cover_img1){this.url_box[0]=data.cover_img1}
									 if(data.cover_img2){this.url_box[1]=data.cover_img2}
									 if(data.cover_img3){this.url_box[2]=data.cover_img3}
				                     
									 this.tag_box = data.course_tags;
	                                 
									 this.excel_box = this.excls(data.units);
									 
									 this.p_val_9 = data.intro;
									        
								   this.p_val_13 = (data.log.audit_action==0?'审核拒绝':'审核通过');
								   this.p_val_14 = data.log.comment;
								   this.p_val_15 = data.material_text;
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
		  console.log(this.textarea.length);
		  if(this.textarea.length>100){this.$message({message: '备注理由不能超过100字 ',type: 'warning'});return false}
		  
		  this.$axios({method:'put',url:store.state.url_data+'/api/auditCourses/'+store.state.audit_id,
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
	.course-table tbody tr{
		width: 100%;
		border: 1px solid #ccc;
	}
	.course-table tbody td{
		padding: 5px 20px;
		border: 1px solid #ccc;
		text-align: center;
	}
	.course-table th{
		padding:10px 20px;
		border: 1px solid #ccc;
		text-align: center;
		width: 200px;
	}
	.img_feng{
		width: 250px;
		height: 150px;
		float: left;
		margin-right: 20px;
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
	}
	.tab_box textarea{
		float:left;width:400px;height:100%;border-radius:3px;padding:7px 7px;border: 1px solid #dcdfe6;
		font-size:15px;
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
		float: left;
	}
</style>
