<template>
	<!-- 学校编辑添加 -->
	<div style="width:100%;">
	  <el-card v-loading="loading" class="box-card"  style="padding:0;margin:20px;padding-bottom: 20px;">
		  
	    <div class="box_tall"><el-input class='tab_c' placeholder="请输入" v-model="input[0]" clearable></el-input><p>*学校名称:</p></div>
			 
		<div class="box_tall">
		  <div class='tab_c' style="width:365px;margin-right:-10px;">
			  <el-select style='width:115px;' :disabled='action==false' @change='cs_click2' v-model="cs_val2" placeholder="请选择城市">
			     <el-option v-for="(item,index) in cs_box2" :key="item.city_id" :label="item.city_name" :value="item"></el-option>
			  </el-select>
			  <el-select style='width:115px;' :disabled='action==false' @change='qy_click2' v-model="qy_val2"  placeholder="请选择区域">
			     <el-option v-for="(item,index) in qy_box2" :key="item.region_id" :label="item.region_name" :value="item"></el-option>
			  </el-select>
			  <el-select style='width:115px;' :disabled='action==false' @change='jd_click2' v-model="jd_val2"  placeholder="请选择街道">
			     <el-option v-for="(item,index) in jd_box2" :key="item.street_id" :label="item.street_name" :value="item"></el-option>
			  </el-select>
		  </div>
		  <p>*所在城市:</p>
		</div>
		
		<div class="box_tall"><el-input type='text' class='tab_c' placeholder="请输入" v-model="input[1]" clearable></el-input>
		  <p>*联系人:</p></div>
		
		<div class="box_tall"><el-input type='text' class='tab_c' placeholder="请输入" v-model="input[2]" clearable></el-input>
		  <p>*详细地址:</p></div>
		
		<div class="box_tall"><el-input :disabled='action==false' type='Number' class='tab_c' placeholder="请输入" v-model="input[3]" @blur='put_act' ></el-input>
		  <p>*手机号码:</p></div>
	
	<div v-show="action">
		<!-- <div class="box_tall"><el-input type='Number' class='tab_c' placeholder="请输入" v-model="input[4]" @blur='put_act' ></el-input>
		  <p>*登录账号:</p></div> -->
		
		<div class="box_tall"><el-input type='text' class='tab_c' placeholder="请输入" v-model="input[5]" @blur='put_act' ></el-input>
		  <p>*登录密码:</p></div>
	</div>	
		  
	 <div style="width: 100%;float: left;">	
		<div class="box_tall" style="height:auto;float:left;width:100%;padding-right:5px;">
			<div class='tab_c' style="height:auto;width:90.5%;">
				 <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
				  <el-checkbox style='margin:0px 10px 10px 0px;' v-for="city in cities" :label="city.id" :key="city.id" border>{{city.name}}</el-checkbox>
				</el-checkbox-group>
			</div><p>*办学特色:</p>
		</div>
	</div>
	<div style="width: 100%;float: left;">	
        <div class="box_tall" style="height:auto;float:left;width:100%;padding-right:5px;">
        	<div class='tab_c' style="height:auto;width:90.5%">
        		 <el-checkbox-group v-model="checkedCities1" @change="handleCheckedCitiesChange1">
        		  <el-checkbox style='margin:0px 10px 10px 0px;' v-for="city in cities1" :label="city.id" :key="city.id" border>{{city.name}}</el-checkbox>
        		</el-checkbox-group>
        	</div><p>*育人目标:</p>
        </div>
	</div>
	
	<div style="width: 100%;float: left;">	
	   <div class="box_tall" style="height:auto;float:left;width:750px;">
		   <div class='tab_c' style="width:505px;height: auto;">
			  <div class="tab_c_c">
				  
			   <div style="float:left;height: 45px;">
				 <el-time-picker format='HH:mm' value-format='HH-mm'  is-range v-model='value_box[0]' range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
			   </div>
			   <div v-show='value_box[1]' style="float:left;height: 45px;">
			   	 <el-time-picker format='HH:mm' value-format='HH-mm'  is-range v-model='value_box[1]' range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
			   </div>
			    <div v-show='value_box[2]' style="float:left;height: 45px;">
			   	  <el-time-picker format='HH:mm' value-format='HH-mm'  is-range v-model='value_box[2]' range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
			   </div>
			   <div v-show='value_box[3]' style="float:left;height: 45px;">
			   	 <el-time-picker format='HH:mm' value-format='HH-mm' is-range v-model='value_box[3]' range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
			   </div>
			   <div v-show='value_box[4]'  style="float:left;height: 45px;">
			   	 <el-time-picker format='HH:mm' value-format='HH-mm'  is-range v-model='value_box[4]' range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
			   </div>
			   <div v-show='value_box[5]'  style="float:left;height: 45px;">
			   	 <el-time-picker format='HH:mm' value-format='HH-mm' is-range v-model='value_box[5]' range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
			   </div>
			    <div v-show='value_box[6]'  style="float:left;height: 45px;">
			   	 <el-time-picker format='HH:mm' value-format='HH-mm'  is-range v-model='value_box[6]' range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
			   </div>
			   <div v-show='value_box[7]'  style="float:left;height: 45px;">
			   	 <el-time-picker format='HH:mm' value-format='HH-mm'  is-range v-model='value_box[7]' range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
			   </div>
			   <div v-show='value_box[8]'  style="float:left;height: 45px;">
			   	 <el-time-picker format='HH:mm' value-format='HH-mm'  is-range v-model='value_box[8]' range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
			   </div>
			   <div v-show='value_box[9]'  style="float:left;height: 45px;">
			   	 <el-time-picker format='HH:mm' value-format='HH-mm' is-range v-model='value_box[9]' range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
			   </div>
			   <el-button @click='create_date' style='margin-left:10px;' type="primary" icon="el-icon-circle-plus">添加课时</el-button>
			  </div> 
		   </div><p>*课程时间设置:</p>
		</div>
	</div> 
<!-- 22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222 -->	  
	  <div style="width: 100%;height:40px;float: left;margin-top: 10px;">
	  		    <div style="width: 210px;height: 100%;margin-left:350px;">
	  				<el-button @click='quxioa' style='float:left;' type="info">返回列表</el-button>
	  				<el-button @click='git_active' style='float:right;' type="primary">确认提交</el-button>
	  			</div>
	  </div>
<!-- 22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222 -->
  </el-card>
 
</div>
</template>

<script>
	   import store from "../../../vuex/store.js";
     export default {
		 data(){
			 return{
				 loading:false,
				 value4:[],//展示数据
				 value_box:[['12-00','23-00'],['12-00','23-00'],['12-00','23-00']],
				 
				action:true,	   
				checkedCities:[],//选中的标签数组
				cities:[],
				checkedCities1:[],//选中的标签数组
				cities1:[],
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
				
				loading:false,
				
				date_boxs:[],
				show_unm:true,
				 region_box2:[],
			 }
		 },
	methods:{
	put_act(){//账号验证
	    if(this.input[3]){}else{return false;}
		this.$axios({method:'get',url:store.state.url_data+'/api/checkAccount',
		    params:{
				// username:this.input[4],
				password:this.input[5],
				phone:this.input[3]
			},headers:{'Authorization':'Bearer '+localStorage.token}}
		   ).then(res=>{
			 console.log(res,'账号验证')
		     if(res.data.code==200){
				  this.$message({message:'验证通过，该账号可以使用！',type:'success'});    
			  }else{
				   // this.input[4] = '';
				   let box = res.data.data; let vals = '';
				   for (var index in box) {
				 	vals = box[index].join(' ');
				   }
				   this.$message.error(vals+'账号验证不通过将无法提交！')
			  }
			}).catch(error=> {
				// this.input[4] = '';
				if (error.response) {
					this.$message.error(error.response.data.message+'账号验证不通过将无法提交！')
				} else {
					this.$message.error('发生了错误')
				}
			});
	},
	
	create_date(){//添加课时
	  if(this.value_box.length>=10){return false};
		var a = ['12-00','23-00'];
		this.value_box.push(a);
		console.log(this.value_box);
	},	
	
   git_put_act(){//判断是否为编辑状态
		if(localStorage.school_id==''){//增加状态
		    this.action = true;
			
		}else{//编辑状态
		    this.action = false;
		  this.$axios({method:'get',url:store.state.url_data+'/api/schools/'+localStorage.school_id,headers:{'Authorization':'Bearer '+localStorage.token}}
		     ).then(res=>{
		  	   console.log(res.data.data,'编辑详情')
		       if(res.data.code==200){
				       let datas = res.data.data.school;
							 console.log(datas);
							 this.input[0] = datas.name;
							 
							 this.cs_id2 = datas.city_id;
							 this.cs_val2 = datas.city_name;
							this.qy_fn2() 
							 this.qy_id2 = datas.region_id;
							 this.qy_val2 = datas.region_name;
							this.jd_fn2() 
							 this.jd_id2 = datas.street_id;
							 this.jd_val2 = datas.street_name;
							 
							 this.input[2] = datas.address;
							 this.input[1] = datas.contact_name;
							 this.input[3] = datas.contact_phone;
							 // this.input[4] = datas.account;
							 this.input[5] = datas.password;
							 this.checkedCities = res.data.data.target_tags;
							 this.checkedCities1 = res.data.data.school_tags;
							 this.value_box = res.data.data.timetables;
							 
							 this.date_boxs = JSON.stringify(res.data.data.timetables)
							 
			     }
		     }).catch(error=> {});
		}
	},
//提交数据
	git_active(){
		
		if(this.input[0]){}else{ this.$message({message:'请填写学校名字！',type:'warning'});return false}
	  if(this.qy_id2){}else{ this.$message({message:'请选择区域街道！',type:'warning'});return false}
		if(this.input[1]){}else{ this.$message({message:'请填写联系人！',type:'warning'});return false}
		if(this.input[2]){}else{ this.$message({message:'请填写地址！',type:'warning'});return false}
	if(localStorage.school_id==''){
		if(this.input[3]){}else{ this.$message({message:'请填写手机号！',type:'warning'});return false}
		if(this.input[3].length==11){}else{ this.$message({message:'手机号必须为11位数！',type:'warning'});return false};
	}
	if(localStorage.school_id==''){
		// if(this.input[4]){}else{ this.$message({message:'请填写账号！',type:'warning'});return false}
		if(this.input[5]){}else{ this.$message({message:'请填写密码！',type:'warning'});return false}
	}
		
		if(this.checkedCities.length!=0){}else{ this.$message({message:'请选择办学特色！',type:'warning'});return false}
		if(this.checkedCities1.length!=0){}else{ this.$message({message:'请选择育人目标！',type:'warning'});return false}
		if(this.value_box[0]){}else{ this.$message({message:'请设置课程时间！',type:'warning'});return false}
		
		if(this.show_unm){
		   this.show_unm = false;
		   window.setTimeout(()=>{
			   this.show_unm = true;
		   },5000)
		}else{return false;}
		
		this.loading = true;
		
		let postData = {
			        name:this.input[0],//学校名字
					city_id:this.cs_id2+'',
					region_id:this.qy_id2+'',
					street_id:this.jd_id2+'',
					address:this.input[2],//地址
					contact_name:this.input[1],//联系人
					contact_phone:this.input[3],//联系方式 
					intro:'学校简介',//学校简介
					account:this.input[3],//账号
					password:this.input[5],//密码
					city_name:this.cs_val2,//城市名字
					region_name:this.qy_val2,//区域名字
					street_name:this.jd_val2,//街道名字
		};
		postData.target_tags = [];
		for(var i=0;i<this.checkedCities.length;i++){
			  postData.target_tags[i] = this.checkedCities[i];
		};
		postData.school_tags = [];
		for(var i=0;i<this.checkedCities1.length;i++){
			  postData.school_tags[i] = this.checkedCities1[i];
		};

		if(this.date_boxs == JSON.stringify(this.value_box)){}else{
				        let box = this.value_box;this.value_box=[];
						console.log(box,'原始数据')
						for(var i=0;i<box.length;i++){
							if(box[i]){
								this.value_box.push(box[i])
							}
			};console.log(this.value_box)
			postData.timetables = this.value_box;
		}
		console.log(postData,'传递的数据');
		let type = localStorage.school_id==''?'post':'put';let id = '';
	  if(localStorage.school_id!=''){id = '/'+localStorage.school_id;}
		this.$axios({method:type,url:store.state.url_data+'/api/schools'+id,data:postData,
		     headers:{'Authorization':'Bearer '+localStorage.token}}).then(res=>{
			this.loading = false;
		     console.log(res.data,'添加结果')
		   if(res.data.code==200){
				this.$message({message:'提交成功',type:'success'});
				this.$router.go(-1);
		    }else{
				  let box = res.data.data; let vals = '';
				  for (var index in box) {
					vals = box[index].join(' ');
				  }
				  this.$alert(vals+'账号重复', '消息', {
					confirmButtonText: '确定', callback:action => {
				  }
				})
			}
			}).catch(error=> {
				this.loading = false;
			    if (error.response) {
					this.$message.error(error.response.data.message)
				} else {
					this.$message.error('发生了错误！')
				}
			});
	},
//返回	
	quxioa(){this.$router.go(-1);},//返回上一页
     
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
		
//办学特色		
		    handleCheckedCitiesChange(value) {//任意一项被点击
		        let checkedCount = value.length;
				this.checkAll = checkedCount === this.cities.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
				console.log(this.checkedCities)
		      },
			  git_check(){//获取授课门类数据
				this.$axios({method:'get',url:store.state.url_data+'/api/tags/options?type=2',
				   headers:{'Authorization':'Bearer '+localStorage.token}}
				   ).then(res=>{
					 console.log(res.data.data,'办学特色')
				     if(res.data.code==200){
							this.cities = res.data.data;
						}
				   }).catch(error=> {});
			  },
//育人目标		
		        handleCheckedCitiesChange1(value) {//任意一项被点击
		              let checkedCount = value.length;
					  this.checkAll = checkedCount === this.cities1.length;
					  this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities1.length;
		      		console.log(this.checkedCities1)
		            },
		      	  git_check1(){//获取授课门类数据
		      		this.$axios({method:'get',url:store.state.url_data+'/api/tags/options?type=3',
		      		   headers:{'Authorization':'Bearer '+localStorage.token}}
		      		   ).then(res=>{
		      			 console.log(res.data.data,'育人目标')
		      		     if(res.data.code==200){
		      					this.cities1 = res.data.data;
		      				}
		      		   }).catch(error=> {});
		      	  },
		
		},
		 mounted(){
			this.cs_fn2();
			
			this.git_check();
			this.git_check1();
			this.git_put_act();
		},
	 };
</script>
<style scoped="scoped">
	.tab_c_c{
		width: 100%;
		margin-bottom: 10px;
		float: left;
	}
	
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
		margin: 20px 0;
	}
	
</style>
