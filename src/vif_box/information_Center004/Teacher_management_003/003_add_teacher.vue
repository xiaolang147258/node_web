<template>
	<!-- 教师编辑添加 -->
	<div style="width:100%;">
	  <el-card v-loading="loading" class="box-card"  style="padding:0;margin:20px;padding-bottom: 20px;">
		  
	    <div class="box_tall"><el-input class='tab_c' placeholder="请输入内容" v-model="input[0]" clearable></el-input><p>*教师名称:</p></div>
			 
		<div class="box_tall">
		  <div class='tab_c' style="width:380px;margin-right:-25px;">
			  <el-select style='width:115px;'  v-model="cs_val2" @change='cs_click2' placeholder="请选择城市">
			     <el-option v-for="(item,index) in cs_box2" :key="item.city_id" :label="item.city_name" :value="item"></el-option>
			  </el-select>
			  <el-select style='width:115px;'  @change='qy_click2' v-model="qy_val2"  placeholder="请选择区域">
			     <el-option v-for="(item,index) in qy_box2" :key="item.region_id" :label="item.region_name" :value="item"></el-option>
			  </el-select>
			  <el-select style='width:115px;'  @change='jd_click2' v-model="jd_val2"  placeholder="请选择街道">
			     <el-option v-for="(item,index) in jd_box2" :key="item.street_id" :label="item.street_name" :value="item"></el-option>
			  </el-select>
		  </div>
		  <p>*所属地区:</p>
		</div> 
		
		 <div class="box_tall">
			 <el-select class='tab_c' @change='xl_click' v-model="xl_val" placeholder="请选择">
			     <el-option v-for='(i,index) in xl_box'  :label="i.name" :value="i.id"></el-option>
			 </el-select>
		    <p>*学历:</p>
		 </div>
		
		<div class="box_tall">
					 <el-select class='tab_c' v-model="sex_val" placeholder="请选择">
					     <el-option  :label="'男'" :value="'男'"></el-option>
						 <el-option  :label="'女'" :value="'女'"></el-option>
					 </el-select>
		   <p>*性别:</p>
		</div>
		
		<div class="box_tall"><el-input type='Number' class='tab_c' placeholder="请输入11位数手机号" v-model="input[1]" clearable></el-input><p>*手机号码:</p></div>
		
		<div class="box_tall">
		  <div class='tab_c'><el-date-picker style='width:100%;' v-model="value1" type="date" placeholder="选择生日"> </el-date-picker></div><p>*生日:</p>
		</div> 
		
<!-- 教师来源 ===================================================================================================================================================-->	
		<div class="box_tall">
		  <div class='tab_c'>
			  
			  <el-select style='width:115px;' :disabled='inps_show' @change='lx_cl' v-model="lx_val" placeholder="请选择">
			     <el-option  :label="'机构'" :value="'机构'"></el-option>
			     <el-option  :label="'学校'" :value="'学校'"></el-option>
			  </el-select>
			  <el-select class='tab_c'  style='width:235px;' @change='dw_cl' v-model="dw_val" placeholder="请选择">
			      <el-option v-for='(i,index) in dw_box'  :label="i.name" :value="i.institution_id?i.institution_id:i.school_id"></el-option>
			  </el-select>
			  
		  </div>
		  <p>*教师来源:</p>
		</div> 

        <div v-show='dada_x_j==false' class="box_tall" style="width: 1000px;padding-left:165px;">
			<p style="float: left;">*银行卡号:</p>
		    <el-input @blur='bank_id_show' style='float: left;' type='Number' class='tab_c' placeholder="请输入银行卡号" v-model="input[2]" clearable></el-input>
		    <a v-show="banke_se" style="float:flet;margin-left:10px;line-height:40px;">{{banke_se}}-{{banke_cs}}-{{banke_name}}</a>
		</div>
        
		<div v-show='dada_x_j==false' class="box_tall">
			<div class='tab_c' style="padding-top:10px;padding-left:5px;">
				 <el-radio v-model="radio" label="1">身份证</el-radio>
				 <el-radio v-model="radio" label="2">护照</el-radio>
				 <el-radio v-model="radio" label="3">港澳台通行证/回乡证</el-radio>
			</div> <p>*证件类型:</p>
		</div>
        
        <div class="box_tall">
        	<el-input type='Number' @blur='idcard_id_show' class='tab_c' placeholder="请输入证件号码" v-model="input[3]" clearable></el-input>
            <p>*证件号码:</p>
        </div>
		
		<div class="box_tall" style="height:auto;float:left;width:850px;padding-right:5px;">
			<div class='tab_c' style="height:auto;width:600px;">
				 <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
				  <el-checkbox style='margin:0px 10px 10px 0px;' v-for="city in cities" :label="city.id" :key="city.id" border>{{city.name}}</el-checkbox>
				</el-checkbox-group>
			</div><p>*授课门类:</p>
		</div>

<!-- 机构的老师需要上传的图片 -->		
      <div v-if="dada_x_j" class="img_f_box" style="padding-left:135px;float: left;height: auto;">
		  
		 <div class="box_tall" style="height:150px;padding:0;width:300px;float:left;">
			 <p style="float:left;">教师资格证书:</p>
		 	 <div class='tab_c' style="height:150px;float:left;width:150px;overflow:hidden;">
			  <el-upload
                 :action="url_img" :headers=headers_s name='images' :file-list='fist_box.s1' :limit='1'
				 :on-success='on_success_ok1' :on-error='on_error_on' list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove1">
                 <el-tooltip class="item" effect="dark" content="建议上传4x4比例且清晰的图片" placement="right-start"><i style="width: 100%;height:100%;outline:none;" class="el-icon-plus"></i></el-tooltip>
              </el-upload>
			 </div>
		 </div>
		 
		 <div class="box_tall" style="height:150px;padding:0;width:320px;float:left;">
		 			 <p style="float:left;">*合同盖章页（尾页）:</p>
		 	 <div class='tab_c' style="height:150px;float:left;width:150px;overflow:hidden;">
		 			  <el-upload
		                 :action="url_img" :headers=headers_s name='images' :file-list='fist_box.s2' :limit='1'
		 				 :on-success='on_success_ok2' :on-error='on_error_on' list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove2">
		                 <el-tooltip class="item" effect="dark" content="建议上传4x4比例且清晰的图片" placement="right-start"><i style="width: 100%;height:100%;outline:none;" class="el-icon-plus"></i></el-tooltip>
		               </el-upload>
		 	 </div>
		 </div>
		
		  <div class="box_tall" style="height:150px;padding:0;width:300px;float:left;margin-left:40px;">
		 			 <p style="float:left;">*职业照:</p>
		 	 <div class='tab_c' style="height:150px;float:left;width:150px;overflow:hidden;">
		 			  <el-upload
		                 :action="url_img" :headers=headers_s name='images' :file-list='fist_box.s6' :limit='1'
		 				 :on-success='on_success_ok6' :on-error='on_error_on' list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove6">
		                <el-tooltip class="item" effect="dark" content="建议上传4x4比例且清晰的图片" placement="right-start"><i style="width: 100%;height:100%;outline:none;" class="el-icon-plus"></i></el-tooltip>
		              </el-upload>
		 	</div>
		 </div>
	  </div>

<!-- 学校的老师需要上传的图片 -->		
	  <div v-else class="img_f_box" style="padding-left:120px;float: left;height: auto;">
		 <div class="box_tall" style="height:150px;padding:0;width:300px;float:left;">
		 			 <p style="float:left;">*身份证（正面）:</p>
		 	 <div class='tab_c' style="height:150px;float:left;width:150px;overflow:hidden;">
		 			  <el-upload
		         :action="url_img" :headers=headers_s name='images' :file-list='fist_box.s7' :limit='1'
		 				 :on-success='on_success_ok7' :on-error='on_error_on' list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove7">
		         <el-tooltip class="item" effect="dark" content="建议上传4x4比例且清晰的图片" placement="right-start"><i style="width: 100%;height:100%;outline:none;" class="el-icon-plus"></i></el-tooltip>
		      </el-upload>
		 			 </div>
		 </div>
		 
		 <div class="box_tall" style="height:150px;padding:0;width:300px;float:left;">
		 			 <p style="float:left;">*身份证（反面）:</p>
		 	 <div class='tab_c' style="height:150px;float:left;width:150px;overflow:hidden;">
		 			  <el-upload
		                 :action="url_img" :headers=headers_s name='images' :file-list='fist_box.s8' :limit='1'
		 				 :on-success='on_success_ok8' :on-error='on_error_on' list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove8">
		                 <el-tooltip class="item" effect="dark" content="建议上传4x4比例且清晰的图片" placement="right-start"><i style="width: 100%;height:100%;outline:none;" class="el-icon-plus"></i></el-tooltip>
		               </el-upload>
		 	 </div>
		 </div>
		 		
		  <div class="box_tall" style="height:150px;padding:0;width:300px;float:left;margin-left:20px;">
		 			 <p style="float:left;">*职业照:</p>
		 	 <div class='tab_c' style="height:150px;float:left;width:150px;overflow:hidden;">
		 			  <el-upload
		                 :action="url_img" :headers=headers_s name='images' :file-list='fist_box.s6' :limit='1'
		 				 :on-success='on_success_ok6' :on-error='on_error_on' list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove6">
		                <el-tooltip class="item" effect="dark" content="建议上传4x4比例且清晰的图片" placement="right-start"><i style="width: 100%;height:100%;outline:none;" class="el-icon-plus"></i></el-tooltip>
		              </el-upload>
		 	</div>
		 </div> 
	  </div>	
<!-- 其他证件照 -->	  
	  <div class="img_f_box" style="padding-left:145px;float:left;">
		  <div class='tab_c' style="height:150px;float:left;width:100%;">
			      <p style="float:left;font-weight:600;margin-right:10px;">其他职业照:</p>
		  		  <el-upload
		              :action="url_img" :headers=headers_s name='images'  :file-list='fist_box.s3' :limit='5' :on-exceed='exceed' :multiple='true'
		  			  :on-success='on_success_ok3' :on-error='on_error_on' list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove3">
		              <el-tooltip class="item" effect="dark" content="建议上传4x4比例且清晰的图片" placement="right-start"><i style="width: 100%;height:100%;outline:none;" class="el-icon-plus"></i></el-tooltip>
		            </el-upload>
		  </div>
	  </div>
	  
<!-- 22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222 -->	  
	  <div style="width: 100%;height:40px;float: left;margin-top: 30px;">
	  		    <div style="width: 210px;height: 100%;margin: 0 auto;">
	  				<el-button @click='quxioa' style='float:left;' type="info">返回列表</el-button>
	  				<el-button @click='git_active' style='float:right;' type="primary">确认提交</el-button>
	  			</div>
	  </div>
<!-- 22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222 -->
	  
      </el-card>
 <!-- 全屏预览图片 -->
  <el-dialog :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="">
 </el-dialog>
</div>
</template>

<script>
	 import store from "../../../vuex/store.js";
	 
     export default {
		 computed:{
			 url_img(){return store.state.url_data+'/api/uploads'},
			 headers_s(){return {'Authorization':'Bearer '+localStorage.token}},
			 
			 // radios(){return this.radio},
		 },
		 data(){
			 return{
				 inps_show:false,
				  region_box2:[],
				 banke_se:'',//开户行省
				 banke_cs:'',//开户行市
				 banke_name:'',//开户行名字
				 
				fist_box:{s1:[],s2:[],s3:[],s6:[],s7:[],s8:[]},//s3是其他证件照
				img_url_box:{s1:'',s2:'',s3:[],s6:'',s7:'',s8:''},//s3是其他证件照
				
				dada_x_j:true,//学校为false--机构为true
				 
				checkedCities:[],//选中的标签数组
				cities:[],
				 
				dialogImageUrl:'',
				dialogVisible:false,
				loading:false, 
				
				input:[],
	 // 城市区域街道2
				cs_box2:[],
				qy_box2:[],
				jd_box2:[],
				
				cs_val2:'',
				qy_val2:'',
				jd_val2:'',
				
				cs_id2:'',
				qy_id2:'',
				jd_id2:'',
				
				//学历
				xl_val:'',
				xl_box:[],
				xl_id:'',
				
				sex_val:'',//性别
				
				value1: '',//生日为==时间戳格式==传递时需要转换
				
				lx_val:'机构',//类型 学校||机构
				dw_val:'',
				dw_box:[],
				dw_id:'',//教师来源id
				
				radio:'1',//证件类型选择的参数
				
				bank_show:false,//银行卡效验开关
				idcard_show:false,//身份证效验开关
				
				show_unm:true,
			 }
		 },
	methods:{
		
		bank_id_show(){//银行卡效验
		    console.log(this.input[2])
		    if(this.input[2]){}else{this.$message.error('银行卡号不能为空');return false;}
		    this.$axios({method:'get',url:store.state.url_data+'/api/cards?card='+this.input[2],
			   headers:{'Authorization':'Bearer '+localStorage.token}}).then(res=>{
				 console.log(res.data.data,'银行效验')
			     if(res.data.code==200){
					  this.bank_show = true;
					  this.banke_se=res.data.data.province,//开户行省
					  this.banke_cs=res.data.data.city,//开户行市
					  this.banke_name=res.data.data.bankName,//开户行名字
					  this.$notify({title:'成功',message:'银行卡效验成功',type:'success'});
				 }else{
					 this.banke_se='',//开户行省
					 this.banke_cs='',//开户行市
					 this.banke_name='',//开户行名字
					 this.bank_show = false;
					 let box = res.data.data;let vals = '';
					 for (var index in box){vals=box[index].join(' ')}  
					 this.$notify({title:'失败',message:vals+'请重新输入',type:'warning'});
				 }
			 }).catch(error=> {
				   this.banke_se='',//开户行省
				   this.banke_cs='',//开户行市
				   this.banke_name='',//开户行名字
				   this.$notify.error({title:'错误',message:'银行卡效验失败，请重新输入！'}); this.bank_show = false;
				 });
		},
		idcard_id_show(){//身份证效验
		    console.log(this.input[3])
			if(this.radio!='1'){this.idcard_show = true;return false}
			if(this.input[0]){}else{this.$message.error('教师姓名不能为空');return false;}
		    if(this.input[3]){}else{this.$message.error('身份证号码能为空');return false;}
			
		    this.$axios({method:'get',url:store.state.url_data+'/api/ocridNum?idCard='+this.input[3]+'&name='+this.input[0],
			   headers:{'Authorization':'Bearer '+localStorage.token}}).then(res=>{
				 console.log(res.data.data,'证件效验');
			     if(res.data.code==200){
					  this.idcard_show = true;
					  this.$notify({title:'成功',message:'身份证效验成功',type:'success'});
				}else{
					this.idcard_show = false;
					let box = res.data.data;let vals = '';
					for (var index in box){vals=box[index].join(' ')}
					this.$notify({title:'失败',message:vals+'请重新输入',type:'warning'});
				}
			 }).catch(error=> {this.$notify.error({title:'错误',message:'身份证效验失败，请重新输入！'});this.idcard_show = false;});
		},
		
    git_put_act(){//判断是否为编辑状态
		if(sessionStorage.teacher_id==''){//增加状态
		    this.inps_show = false
		}else{//编辑状态
		    this.inps_show = true;
		  this.bank_show=true//银行卡效验开关
		  this.idcard_show=true//身份证效验开关
		  this.$axios({method:'get',url:store.state.url_data+'/api/teachers/'+sessionStorage.teacher_id,
		     headers:{'Authorization':'Bearer '+localStorage.token}}
		     ).then(res=>{
		  	   console.log(res.data.data,'编辑详情')
		       if(res.data.code==200){
		  		 var teacher = res.data.data.teacher;//教师详细信息
		  		 var category = res.data.data.category;
		  		 var attachment = res.data.data.attachment;
				 
				 this.input[0] = teacher.name;
				 
				 console.log(this.input)
				 
			window.setTimeout(()=>{
				 this.cs_val2=teacher.city_name;
				 this.cs_id2=teacher.origin_city;
				
				console.log(teacher)
				this.qy_fn2()
				 this.qy_val2=teacher.region_name;
				 this.qy_id2=teacher.origin_region;
				this.jd_fn2();
				 this.jd_id2=teacher.origin_street;
				 this.jd_val2=teacher.street_name;
			},1000)
			 
				 this.xl_id = teacher.edu_degree_type_id;
				 this.xl_val = this.xl_id==1?'研究生学历':(this.xl_id==2?'本科学历':(this.xl_id==3?'专升本学历':'专科学理'));
				 this.sex_val = teacher.gender==1?'男':'女';
				 this.input[1] = teacher.phone;
				 // console.log(this.input[1])
				 
				if(teacher.birthday){
					this.value1 = new Date(teacher.birthday);
				}
				 
				 this.lx_val = teacher.source_type_id ==1?'机构':'学校';
				 this.lx_cl();
				 this.dw_id = teacher.source_id;
				 this.dw_val = teacher.source_name;
				 
				 this.input[2] = teacher.bank_account;
				 this.banke_se = teacher.bank_province;
				 this.banke_cs = teacher.bank_city;
				 this.banke_name = teacher.bank_name;
				
				 this.radio = teacher.idcard_type+'';
				    
				 this.input[3] = teacher.idcard_number;
				 this.checkedCities = category;
			
			     if(this.lx_val=='机构'){
				    for(var i=0;i<attachment.length;i++){
					    if(attachment[i].id==1){this.img_url_box.s1 = attachment[i].url}
						if(attachment[i].id==2){this.img_url_box.s2 = attachment[i].url}
						if(attachment[i].id==6){this.img_url_box.s6 = attachment[i].url}
				    }
					
					if(this.img_url_box.s1){this.fist_box.s1[0] = {name:'s1',url:this.img_url_box.s1};}
					if(this.img_url_box.s2){this.fist_box.s2[0] = {name:'s1',url:this.img_url_box.s2};}
					if(this.img_url_box.s6){this.fist_box.s6[0] = {name:'s1',url:this.img_url_box.s6};}
					
			     }else if(this.lx_val=='学校'){
				     for(var i=0;i<attachment.length;i++){
				        if(attachment[i].id==7){this.img_url_box.s7 = attachment[i].url}
				    	if(attachment[i].id==8){this.img_url_box.s8 = attachment[i].url}
						if(attachment[i].id==6){this.img_url_box.s6 = attachment[i].url}
				    }
					
					if(this.img_url_box.s7){this.fist_box.s7[0] = {name:'s1',url:this.img_url_box.s7};}
					if(this.img_url_box.s8){this.fist_box.s8[0] = {name:'s1',url:this.img_url_box.s8};}
					if(this.img_url_box.s6){this.fist_box.s6[0] = {name:'s1',url:this.img_url_box.s6};}
					
			     }
				 for(var i=0;i<attachment.length;i++){
				     if(attachment[i].id==3){this.img_url_box.s3.push(attachment[i].url)}
				 }
				 for(var i=0;i<this.img_url_box.s3.length;i++){
					this.fist_box.s3.push({name:'s1',url:this.img_url_box.s3[i]})
				 }
				 console.log(this.img_url_box);
				 
		  		}
		     }).catch(error=> {});
		}
	},
//提交数据
	git_active(){
		if(this.input[0]){}else{ this.$message({message:'请填写教师姓名！',type:'warning'});return false}
		if(this.jd_id2){}else{ this.$message({message:'请选择区域街道！',type:'warning'});return false}
		if(this.xl_id){}else{ this.$message({message:'请选择学历！',type:'warning'});return false}
		if(this.sex_val){}else{ this.$message({message:'请选择性别！',type:'warning'});return false}
		if(this.input[1]){}else{ this.$message({message:'请填写手机号码！',type:'warning'});return false}
		// if(this.value1){}else{ this.$message({message:'请选择生日！',type:'warning'});return false}
	    if(sessionStorage.teacher_id==''){//判断当前页面为添加状态
		  if(this.dw_id){}else{this.$message({message:'请选择教师来源组织！',type:'warning'});return false}
	    }
		if(this.checkedCities.length!=0){}else{this.$message({message:'请选择授课门类！',type:'warning'});return false}
		if(this.lx_val=='机构'){
			if(this.idcard_show==false&&this.radio=='1'){this.$message({message:'身份证号验证未通过，请重新输入身份证号！',type:'warning'});return false}
			// if(this.img_url_box.s1==''){this.$message({message:'请上传教师资格证',type:'warning'});return false};
			if(this.img_url_box.s2==''){this.$message({message:'请上传合同盖章页（尾页）',type:'warning'});return false};
		}else if(this.lx_val=='学校'){
			if(this.bank_show==false){this.$message({message:'银行卡号验证未通过，请重新输入银行卡号！',type:'warning'});return false}
			if(this.idcard_show==false&&this.radio=='1'){this.$message({message:'身份证号验证未通过，请重新输入身份证号！',type:'warning'});return false}
			if(this.img_url_box.s7==''){this.$message({message:'请上传身份证（正面）',type:'warning'});return false};
			if(this.img_url_box.s8==''){this.$message({message:'请上传身份证（反面）',type:'warning'});return false};
		}
		if(this.img_url_box.s6){}else{this.$message({message:'请上传职业照',type:'warning'});return false}
		
		if(this.show_unm){
		   this.show_unm = false;
		   window.setTimeout(()=>{
			   this.show_unm = true;
		   },5000)
		}else{return false;}
		
		// let datess = ''
		
		let postData = {
			 name:this.input[0],//教师姓名
			 source_type_id:this.lx_val=='机构'?1:2,//教师来源类型id 1：机构，2学校
			 source_id:this.dw_id,//来源的组织id
			 role_type_id:1,//教师的角色id  目前只有1，
			 gender:this.sex_val=='男'?1:2,//性别：1：男， 2： 女，默认-1
			 phone:this.input[1],//教师手机号码
			 birthday:this.value1?this.value1.getFullYear()+'/'+(this.value1.getMonth()+1)+'/'+this.value1.getDate():'',//生日
			 origin_country:'中国',//国籍
			 origin_province:'440',//省份id
			 origin_city:this.cs_id2+'',//城市id
			 origin_region:this.qy_id2+'',//区域id
			 origin_street:this.jd_id2+'',//街道id
			 idcard_type:this.radio,//身份证件类型：1：身份证、2：护照、3：港澳通行证/回乡证
			 idcard_number:this.input[3],//证件号码
			 edu_degree_type_id:this.xl_id,//学历类型编号  1研究生学历，2，本科学历，3专升本学历，4专科学理
			 bank_account:this.input[2],//银行卡号
			 attachment_1:this.img_url_box.s1,//教师资格证
			 attachment_2:this.img_url_box.s2,//劳动合同
			 attachment_3:this.img_url_box.s3,//其他资格证书
			 attachment_6:this.img_url_box.s6,//职业照
			 attachment_7:this.img_url_box.s7,//身份证正面
			 attachment_8:this.img_url_box.s8,//身份证反面
			 category:this.checkedCities,//授课门类
			 bank_province:this.banke_se,//银行卡开户省份
			 bank_city:this.banke_cs,////银行卡开户市
			 bank_name:this.banke_name//开户银行
		};
		let type = sessionStorage.teacher_id==''?'post':'put';
		let id = sessionStorage.teacher_id==''?'':'/'+sessionStorage.teacher_id;
		this.$axios({
			method: type, url: store.state.url_data + '/api/teachers' + id, data: postData,
			headers: { 'Authorization': 'Bearer ' + localStorage.token }
		}).then(res => {
			console.log(res.data, '添加结果')
			if (res.data.code == 200) {
				this.$message({ message: '提交成功', type: 'success' })
				this.$router.go(-1)
			} else {
				let box = res.data.data
				let vals = ''
				for (var index in box) {
					vals = box[index].join(' ')
				}
				this.$alert(vals, '消息', {
					confirmButtonText: '确定', callback: action => {
					}
				})
			}
		}).catch(error => {
			if (error.response) {
				this.$message.error(error.response.data.message)
			} else {
				this.$message.error('发生了错误！')
			}

		})
	},
//返回	
	quxioa(){this.$router.go(-1);},//返回上一页
     
//其他职业证书
	  handleRemove3(file, fileList) {//删除
	    this.img_url_box.s3 = [];
	    for(var i=0;i<fileList.length;i++){this.img_url_box.s3.push(fileList[i].response.data.image)}
		console.log(this.img_url_box);
      },
	  on_success_ok3(response, file, fileList){//上传成功
	      console.log(fileList);
		  this.$message({message: '上传成功',type: 'success' });
		  this.img_url_box.s3 = [];
		  for(var i=0;i<fileList.length;i++){this.img_url_box.s3.push(fileList[i].response.data.image)}
		  console.log(this.img_url_box);
	  },
	  exceed(){this.$message.error('其他职业照不能超过5张')},
//教师资格证  	  
	  handleRemove1(file, fileList) {//删除
		this.img_url_box.s1 = ''; console.log(this.img_url_box)
      },
	  on_success_ok1(response, file, fileList){//上传成功
		  this.$message({message: '上传成功',type: 'success' });
		  this.img_url_box.s1 = response.data.image;
		  console.log(this.img_url_box)
	  },
//合同盖章页（尾页）  	  
	  handleRemove2(file, fileList) {//删除
		this.img_url_box.s2 = ''; console.log(this.img_url_box)
      },
	  on_success_ok2(response, file, fileList){//上传成功
		  this.$message({message: '上传成功',type: 'success' });
		  this.img_url_box.s2 = response.data.image;
		  console.log(this.img_url_box)
	  },	  
//职业照  	  
	  handleRemove6(file, fileList) {//删除
		this.img_url_box.s6 = ''; console.log(this.img_url_box)
      },
	  on_success_ok6(response, file, fileList){//上传成功
		  this.$message({message: '上传成功',type: 'success' });
		  this.img_url_box.s6 = response.data.image;
		  console.log(this.img_url_box)
	  },	  

//身份证（正面）  	  
	  handleRemove7(file, fileList) {//删除
		this.img_url_box.s7 = ''; console.log(this.img_url_box)
      },
	  on_success_ok7(response, file, fileList){//上传成功
		  this.$message({message: '上传成功',type: 'success' });
		  this.img_url_box.s7 = response.data.image;
		  console.log(this.img_url_box)
	  },
//身份证（反面）  	  
	  handleRemove8(file, fileList) {//删除
		this.img_url_box.s8 = ''; console.log(this.img_url_box)
      },
	  on_success_ok8(response, file, fileList){//上传成功
		  this.$message({message: '上传成功',type: 'success' });
		  this.img_url_box.s8 = response.data.image;
		  console.log(this.img_url_box)
	  },	  
	  
      on_error_on(err, file, fileList){//上传失败
		  this.$message.error('上传失败');console.log(err)
	  },
      handlePictureCardPreview(file) {//查看大图
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
	  
//授课门类函数		
      handleCheckedCitiesChange(value) {//任意一项被点击
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
		console.log(this.checkedCities)
      },
	  git_check(){//获取授课门类数据
		this.$axios({method:'get',url:store.state.url_data+'/api/courseCategories',
		   headers:{'Authorization':'Bearer '+localStorage.token}}
		   ).then(res=>{
			 // console.log(res.data.data,'授课门类')
		     if(res.data.code==200){
					this.cities = res.data.data;
				}
		   }).catch(error=> {});
	  },		
		
//获取来源
         lx_cl(){//教师类型被点击 机构||学校
			this.dw_val = '';this.dw_id = '';
			let url = this.lx_val=='机构'?'institutions':'schools';
			this.dada_x_j = this.lx_val=='机构'?true:false;
			
			this.img_url_box.s1='';this.img_url_box.s2='';this.img_url_box.s6='';
			this.img_url_box.s7='';this.img_url_box.s8='';//清空数据层图片容器
			
			this.fist_box.s1=[];this.fist_box.s2=[];this.fist_box.s6=[];
			this.fist_box.s7=[];this.fist_box.s8=[];//清空视图层图片容器
			
			this.radio='1';//重新定义证件类型为身份证
			
			this.$axios({method:'get',url:store.state.url_data+'/api/'+url+'?type=options&audit_status=2',
			   headers:{'Authorization':'Bearer '+localStorage.token}}
			   ).then(res=>{
			     if(res.data.code==200){
					 this.dw_box = res.data.data;
				 }}).catch(error=> {});
		},
		dw_cl(i){
			this.dw_id = i;
			console.log(this.dw_id);
		},
		
//学历
        git_xl_act(){//获取学历数据
			this.$axios({method:'get',url:store.state.url_data+'/api/teacherEduDegrees',headers:{'Authorization':'Bearer '+localStorage.token}}
			   ).then(res=>{
			     if(res.data.code==200){
					 this.xl_box = res.data.data;
				 }}).catch(error=> {});
		},
        xl_click(i){//学历被点击
		  this.xl_id = i;
		  console.log(this.xl_id,'学历id')
		},

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////				 
//城市区域街道函数
				cs_fn2(){//城市数据
				   this.$axios({method:'get',url:store.state.url_data+'/api/regions',params:{type:'city',id:440},headers:{'Authorization':'Bearer '+localStorage.token}}
				      ).then(res=>{
				        if(res.data.code==200){
						 let crs_box = store.state.crs_box;
						 this.cs_box2 = [];
						 for(var j in crs_box){
							  for (var i in res.data.data) {
							 	if(crs_box[j].city_id==res.data.data[i].city_id){
							 		this.cs_box2.push(res.data.data[i]);
									console.log(3)
							 	  }
							  };
						 }
						 this.cs_val2 = this.cs_box2[0].city_name;
						 this.cs_id2 = this.cs_box2[0].city_id;
						 this.qy_fn2();//获取区域数据
				   		}
				      }).catch(error=> {});
				},
				cs_click2(i){
					this.cs_val2 = i.city_name;
					this.cs_id2 = i.city_id;
					this.qy_fn2()
				},
				//获取区域数据
				qy_fn2(){
				   
				   this.$axios({method:'get',url:store.state.url_data+'/api/regions',params:{type:'region',id:this.cs_id2},headers:{'Authorization':'Bearer '+localStorage.token}}
				      ).then(res=>{
						console.log(res.data,'区域数据')
				        if(res.data.code==200){
							let crs_box = store.state.crs_box;
							if(crs_box[0].region==-1){
								this.qy_box2 = res.data.data;
								this.region_box2 = [];
							}else{
							   for(var j in crs_box){
								  if(this.cs_id2==crs_box[j].city_id){
									this.region_box2 = crs_box[j].region;
								  }
							   }
							   this.qy_box2 = [];
							   for(var j in this.region_box2){
								  for (var i in res.data.data){
									if(this.region_box2[j].region_id==res.data.data[i].region_id){
										this.qy_box2.push(res.data.data[i]);
									}
								  }
							   }
							}
							// this.qy_val2 = this.qy_box2[0].region_name;
							// this.qy_id2 = this.qy_box2[0].region_id; 
							// this.jd_fn2();
							
				   		}
				      }).catch(error=> {});
					  
				},
				//当区域选项被点击
				qy_click2(i){
					this.qy_val2 = i.region_name;
					this.qy_id2 = i.region_id; 
					this.jd_val2 = '';
					this.jd_box2 = [];
					this.jd_id2 = '';
					this.jd_fn2();//获取街道数据
				},
				//获取街道数据
				jd_fn2(){
				   this.$axios({method:'get',url:store.state.url_data+'/api/regions',params:{type:'street',id:this.qy_id2},headers:{'Authorization':'Bearer '+localStorage.token}}
				     ).then(res=>{
				  		console.log(res.data,'街道数据')
				       if(res.data.code==200){
						   let id = '';
						   for(var i in this.region_box2){
							   if(this.region_box2[i].region_id==this.qy_id2){
								   id=this.region_box2[i];
							   }
						   }
						   if(id.street==-1){
						   	  this.jd_box2 = res.data.data;
						   }else{
							  let street_box = '';
							  for(var j in this.region_box2){
								 if(this.region_box2[j].region_id==this.qy_id2){
									 street_box = this.region_box2[j].street;
								 }
							  };
							 this.jd_box2 = [];
							 
							 for(var j in street_box){
							   for (var i in res.data.data){
						   	  	 if(street_box[j].street_id==res.data.data[i].street_id){
						   	  		this.jd_box2.push(res.data.data[i]);
									
						   	  	 }
						   	   };
							 }
						   }
						   // this.jd_val2 = this.jd_box2[0].street_name;
						   // this.jd_id2 = this.jd_box2[0].street_id;
				  		}
				     }).catch(error=> {});
					 
				},
				//当街道选项被点击
				jd_click2(i){
					this.jd_val2 = i.street_name;
					this.jd_id2 = i.street_id;
					// this.git_jg()
				},
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
		
		},
		 mounted(){
			this.cs_fn2();
			this.git_xl_act();
			this.lx_cl();
			this.git_check();
			this.git_put_act();
		},
	 };
</script>
<style scoped="scoped">
	.img_f_box{
		width: 100%;
		height: 150px;
		margin: 20px 0;
		float: left;
		/* background: red; */
		padding-left:160px;
	}
	.tab_c{
		width:355px;
		height: 40px;
		float: right;
		}
	.box_tall p{
		font-size: 15px;
		font-weight: 600;
		float: right;
		margin: 0;
		line-height: 40px;
		margin-right: 10px;
	}
	.box_tall{
		width: 600px;
		height: 40px;
		padding-left: 70px;
		margin: 0 0 10px 0;
	}
	
</style>
