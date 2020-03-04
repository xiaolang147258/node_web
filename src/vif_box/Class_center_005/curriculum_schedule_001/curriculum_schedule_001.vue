<template>
	<!-- 课程列表 -->
	<div style="width:100%;">
	   <el-card v-loading="loading" class="box-card"  style="padding:0;margin:20px;padding-bottom: 20px;">
		<div style="width:100%;margin-bottom:10px;float: left;">
           
			<el-select class='tab_c'  @change='lx_cl' style='width:150px;' v-model="lx_val" clearable placeholder="课程门类">
			   <el-option v-for="(item,index) in lx_box" :key="index" :label="item.name" :value="item.id"></el-option>
			</el-select>
			
			<el-select class='tab_c' @change='zt_cl' style='width:120px;' v-model="sh_val" clearable placeholder="服务类型">
			   <el-option v-for="(item,index) in sh_zt_box" :key="index" :label="item.name" :value="item.id"></el-option>
			</el-select>
			
			<el-select class='tab_c' @change='nian_cl' style='width:100px;' v-model="nian_val" clearable placeholder="年级">
			   <el-option v-for="(item,index) in nian_box" :key="index" :label="item" :value="index"></el-option>
			</el-select>
			
			
			<el-select class='tab_c' v-model="cs_val" style='width:110px;' placeholder="城市">
			   <el-option v-for="(item,index) in cs_box" :key="index" :label="item.city_name" :value="item.city_id"></el-option>
			</el-select>
			<el-select class='tab_c' @change='qy_click' style='width:110px;' v-model="qy_val" clearable placeholder="区域">
			   <el-option v-for="(item,index) in qy_box" :key="index" :label="item.region_name" :value="item.region_id"></el-option>
			</el-select>
			<el-select class='tab_c' @change='jd_click' style='width:110px;' v-model="jd_val" clearable placeholder="街道">
			   <el-option v-for="(item,index) in jd_box" :key="index" :label="item.street_name" :value="item.street_id"></el-option>
			</el-select>
			
			<div class='inp_a' style='width:150px;'><el-input placeholder="请输入课班名称" v-model="masg_val" clearable></el-input></div>
            <el-button @click='git_act(1)' class='tab_c' type="primary">搜索</el-button>
			
			<!-- <el-button style='float:right;' type="primary">导入excel</el-button> -->
		</div>
		
   <div style="width:100%;float: left;">
	<el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%">
       
	  <!-- <el-table-column prop="school.city_name" align='center' header-align='center' label="城市" ></el-table-column>
       <el-table-column prop="school.region_name" class='tds' align='center' header-align='center'  label="区域" ></el-table-column>
       <el-table-column prop="school.street_name" align='center' header-align='center' label="街道" ></el-table-column> -->
	   
	   <el-table-column prop="school_name" class='tds' align='center' header-align='center'  label="学校名称" show-overflow-tooltip></el-table-column>
	   <el-table-column prop="max_grade" align='center' header-align='center' label="服务年级" >
		   <template slot-scope="scope">
		   			{{scope.row.min_grade}}-{{scope.row.max_grade}}
		   </template>
	   </el-table-column>
	   
	   <el-table-column prop="arrange_mode" align='center' header-align='center' label="服务类型" show-overflow-tooltip>
		    <template slot-scope="scope">{{scope.row.arrange_mode==1?'机构调配':(scope.row.arrange_mode==2?'学校调配':(scope.row.arrange_mode==3?'平台调配':''))}}</template>
	   </el-table-column>
	   
	   <el-table-column prop="course.category_name" class='tds' align='center' header-align='center'  label="课程门类" show-overflow-tooltip></el-table-column>
	   <el-table-column prop="course_name" align='center' header-align='center' label="课程名称" show-overflow-tooltip></el-table-column>
	   <el-table-column prop="course_title" class='tds' align='center' header-align='center'  label="平台课程名称" show-overflow-tooltip></el-table-column>
	   <el-table-column prop="class_name" align='center' header-align='center' label="课班名称" show-overflow-tooltip></el-table-column>

	   <el-table-column prop="time_format" align='center' header-align='center' label="上课时间" show-overflow-tooltip>
		    <template slot-scope="scope">
			   <span v-for="i in scope.row.class_timetable">{{i.timetable_format}}，</span>
		    </template>
	   </el-table-column>
	   
	   <el-table-column prop="region_name" class='tds' align='center' header-align='center'  label="总价格（课时单价x课时总数）" show-overflow-tooltip>
		   <template slot-scope="scope">
		   		{{scope.row.hour_fee}}x{{scope.row.hours_total}}={{scope.row.price}}
		   </template>
	   </el-table-column>
	   
	   <el-table-column prop="time_format" align='center' header-align='center' label="课程日期（开始/结束）" show-overflow-tooltip></el-table-column>
		   
	   <el-table-column prop="audit_type_name" class='tds' align='center' header-align='center'  label="授课老师" >
		    <template slot-scope="scope">{{scope.row.teacher?scope.row.teacher.name:''}}</template>
	   </el-table-column>
	   
	   <el-table-column prop="join_number" align='center' header-align='center' label="报名人数" ></el-table-column>
	   <el-table-column prop="audit_status_name" align='center' header-align='center' label="开班下限/开班上限" show-overflow-tooltip>
		    <template slot-scope="scope">
		   			{{scope.row.min_students}}/{{scope.row.max_students}}
		   </template>
	   </el-table-column>
	   
       <el-table-column  label="操作" align='center' style='width:200px;' header-align='center'>
		   <template slot-scope="scope">
			  <el-button class='btnsa' @click='fen_shi(scope.row.class_id)' type="primary" plain>分配老师</el-button>
			  <el-button class='btnsa' @click='put_name(scope.row)' style='margin-top:5px;margin-left:0;' type="primary" plain>修改名称</el-button>
	       </template>
	   </el-table-column>
	   
	   <!-- <el-table-column  label="" align='center' style='width:200px;' header-align='center'>
	   		   <template slot-scope="scope">
	   			  <el-button class='btnsa' style='margin-top:5px;' type="primary" plain>修改课程名称</el-button>
	       </template>
	   </el-table-column> -->
	   
     </el-table>
  <div style="margin-top:20px;">
<!-- 分页插件 :current-page="currentPage4" -->
	<div style="float:right;margin-right:10px;">
       <el-pagination background @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
       :page-sizes="ye_s"
       :page-size="100"
       layout="total, sizes, prev, pager, next, jumper"
       :total="total_01">
       </el-pagination>
	  </div>
     </div>
  </div>
  
    <transition name="el-fade-in-linear">
       <div v-show="show" class="transition-box">
    	   <transition name="el-zoom-in-top">
             <el-card v-show="show" class="transition-boxs">
    				 <p style="font-size:20px;font-weight:600;text-align:center;margin-bottom:30px;margin-top:10px;">分配老师</p>  
    				 <div class="box_call">
    				    <div style="width:400px;float:right;height:100%;">
							<el-select class='tab_c'  @change='therch_cl' style='width:250px;' v-model="therch_val" clearable placeholder="请选择老师">
							   <el-option v-for="(item,index) in therch_box" :key="index" :label="item.name" :value="item.teacher_id"></el-option>
							</el-select>
							<el-button @click='create_there' type="primary">添加老师</el-button>
						</div>
    				 </div> 
    				<div style="width:180px;height:40px;margin:35px auto;">
    					   <el-button @click='show=false' style='float:left;' type="info">取消</el-button>
    					   <el-button @click='git_fen' style='float:right;' type="primary">确认</el-button>
    				</div>
    			  </el-card>
          </transition>
    		</div>
     </transition>
<!-- 修改名字弹框 -->     
	  <transition name="el-fade-in-linear">
	    <div v-show="show2" class="transition-box">
	 	   <transition name="el-zoom-in-top">
	          <el-card v-show="show2" class="transition-boxs">
	 				 <p style="font-size:20px;font-weight:600;text-align:center;margin-bottom:30px;margin-top:10px;">修改课班名称</p>  
	 				 <div class="box_call" style="padding: 0 100px;">
	 						<el-input 
                              placeholder="请输入课程名称"
                              v-model="input10_val"
                              clearable>
                            </el-input>
	 				 </div> 
	 				<div style="width:180px;height:40px;margin:35px auto;">
	 					   <el-button @click='show2=false' style='float:left;' type="info">取消</el-button>
	 					   <el-button @click='put_names' style='float:right;' type="primary">确认</el-button>
	 				</div>
	 			  </el-card>
	       </transition>
	 		</div>
	  </transition>
	 
	 
  </el-card>
</div>
</template>

<script>
	import store from "../../../vuex/store.js";
     export default {
	  data(){
	    return {
		  input10_val:'',	
		
		  nian_box:['1年级','2年级','3年级','4年级','5年级','6年级','7年级','8年级','9年级'],
		  nian_id:'',
		  nian_val:'',
		  input_val:'',
		  show:false,
			
		  sh_val:'',
		  sh_zt_box:[],
		  sh_zt_id:'',//服务类型id
			
		   total_01:0,//分页-总条数
		   ye_s:[15],
		   
		   lx_box:[],
		   lx_id:'',//课程类型id
		   lx_val:'',
		   
		   masg_val:'',//搜索输入框数据
		   
		   tableData3:[],//列表数据
		   
           multipleSelection: [],
		   
		   // 城市区域街道
		   cs_box:[],
		   qy_box:[],
		   jd_box:[],
		   
		   cs_val:'',
		   qy_val:'',
		   jd_val:'',
		   
		   cs_id:'',
		   qy_id:'',
		   jd_id:'',
		   loading:true,
		   
		   pages:1,
		   
		   therch_box:'',
		   therch_val:'',
		   therch_id:'',//老师id
		   
		   ke_id:'',
		   show2:false,
		   
		   calss_id:'',
		   region_box:'',
	    }
	  },
		
	methods:{
		put_names(){
			if(this.input10_val){}else{this.$message({message: '请填写课班名称',type: 'warning' });return false;}
			
			this.$axios({method:'put',url:store.state.url_data+'/api/coursePlanClasses/'+this.calss_id,
			              data:{"class_name":this.input10_val},headers:{'Authorization':'Bearer '+localStorage.token}} ).then(res=>{
							console.log(res.data,'结果')
							this.show2=false;
						    if(res.data.code==200){
								 this.$message({message:'修改成功',type:'success'});
								 this.git_act(this.pages);
							}else{
								 this.$message({message: '修改失败',type: 'warning' });
							}
			  }).catch(error=> {this.$message({message: '修改失败',type: 'warning' });});
		},
		put_name(i){
			this.input10_val = i.class_name;
			this.calss_id = i.class_id;
			this.show2 = true;
		},
		
		create_there(){//添加老师按钮被点击
		  this.show = false;
		  this.$router.push({path:'/Teacher_management_003'});
		},
		
//分配老师被点击		
		fen_shi(id){
			this.git_act_therch(id);
			this.show=true;
		},
		
		therch_cl(i){
		   this.therch_id = i;
		},
		
		git_fen(){
			if(this.therch_id){}else{this.$message({message: '请选择老师 ',type: 'warning' });return false;}
			
			this.$axios({method:'put',url:store.state.url_data+'/api/coursePlanClasses/'+this.ke_id+'/teacher',
			              data:{teacher_id:this.therch_id},headers:{'Authorization':'Bearer '+localStorage.token}} ).then(res=>{
							console.log(res.data,'分配结果')
						    if(res.data.code==200){
								 this.$message({message:'分配成功',type:'success'});
							     this.show=false;
								 this.git_act(this.pages);
							}else{
								 this.$message({message: '分配失败',type: 'warning' });
							}
			  }).catch(error=> {this.$message({message: '分配失败',type: 'warning' });});
		},
		
//获取教师列表
		git_act_therch(id){
			this.ke_id = id;
			this.$axios({method:'get',url:store.state.url_data+'/api/coursePlanClasses/'+id+'/teacher',
						  headers:{'Authorization':'Bearer '+localStorage.token}}
						  ).then(res=>{
							console.log(res.data,'教师列表')
						    if(res.data.code==200){
								this.therch_box = res.data.data;
								this.loading_2 = false;
							  }
						  }).catch(error=> {});
		},
		
//年级被点击		
		nian_cl(i){
			this.nian_id = i+1;
			this.git_act(1)
		},
		
		//获取服务类型数据
		git_zt(){
		   this.$axios({method:'get',url:store.state.url_data+'/api/courseArrangeMode',
			  headers:{'Authorization':'Bearer '+localStorage.token}}
			  ).then(res=>{
				    console.log(res.data,'服务类型')
			    if(res.data.code==200){
					this.sh_zt_box = res.data.data;
				  }
			  }).catch(error=> {});
		},
		
//城市区域街道函数
		cs_fn(){//城市数据
		   this.$axios({method:'get',url:store.state.url_data+'/api/regions',params:{type:'city',id:440},headers:{'Authorization':'Bearer '+localStorage.token}}
		      ).then(res=>{
		        if(res.data.code==200){
				 let crs_box = store.state.crs_box;
				 this.cs_box = [];
				 for(var j in crs_box){
					  for (var i in res.data.data) {
					 	if(crs_box[j].city_id==res.data.data[i].city_id){
					 		this.cs_box.push(res.data.data[i]);
					 	  }
					  }; 
				 }
				 this.cs_val = this.cs_box[0].city_name;
				 this.cs_id = this.cs_box[0].city_id;
				 this.qy_fn();//获取区域数据
		   		}
		      }).catch(error=> {});
		},
		//获取区域数据
		qy_fn(){
		   this.$axios({method:'get',url:store.state.url_data+'/api/regions',params:{type:'region',id:this.cs_id},headers:{'Authorization':'Bearer '+localStorage.token}}
		      ).then(res=>{
				console.log(res.data,'区域数据')
		        if(res.data.code==200){
					let crs_box = store.state.crs_box;
					console.log(res.data.data,'111111111111111111111111111111')
					if(crs_box[0].region==-1){
						this.qy_box = res.data.data;
						this.region_box = [];
					}else{
					   for(var j in crs_box){
						  if(this.cs_id==crs_box[j].city_id){
							this.region_box = crs_box[j].region;
						  }
					   }
					   this.qy_box = [];
					   for(var j in this.region_box){
						  for (var i in res.data.data){
							if(this.region_box[j].region_id==res.data.data[i].region_id){
								this.qy_box.push(res.data.data[i]);
								console.log(2222)
								
							}
						  }
					   }
					}
					this.qy_val = this.qy_box[0].region_name;
					this.qy_id = this.qy_box[0].region_id; 
					// this.jd_fn();
					this.jd_fn();//获取街道数据
					 this.git_act(1)
		   		}
		      }).catch(error=> {});
		},
		//当区域选项被点击
		qy_click(i){
			this.qy_id = i;
			this.jd_val = '';
			this.jd_box = [];
			this.jd_id = '';
			this.jd_fn();//获取街道数据
			this.git_act(1)
		},
		//获取街道数据
		jd_fn(){
		   this.$axios({method:'get',url:store.state.url_data+'/api/regions',params:{type:'street',id:this.qy_id},headers:{'Authorization':'Bearer '+localStorage.token}}
		     ).then(res=>{
		  		console.log(res.data,'街道数据')
		       if(res.data.code==200){
				   let id = ''
				   for(var i in this.region_box){
					   if(this.region_box[i].region_id==this.qy_id){
						   id=this.region_box[i]
					   }
				   }
				   if(id.street==-1){
				   	  this.jd_box = res.data.data;
				   }else{
					  let street_box = '';
					  for(var j in this.region_box){
						 if(this.region_box[j].region_id==this.qy_id){
							 street_box = this.region_box[j].street;
						 }
					  };
					 this.jd_box = []
					 for(var j in street_box){
					   for (var i in res.data.data){
				   	  	 if(street_box[j].street_id==res.data.data[i].street_id){
				   	  		this.jd_box.push(res.data.data[i]);
				   	  	 }
				   	   };
					 }
				   }
				   // this.jd_val = this.jd_box[0].street_name;
				   // this.jd_id = this.jd_box[0].street_id;
				   // this.git_act(1)
		  		}
		     }).catch(error=> {});
		},
		//当街道选项被点击
		jd_click(i){
			this.jd_id = i;
			this.git_act(1)
		},

		
	   //分页相关函数
	   handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
		this.git_act(val);
		this.pages = val;
      },
	  lx_cl(i){
	  		this.lx_id = i;
			this.git_act(1)
	  },
	  zt_cl(i){
		  this.sh_zt_id = i;
		  this.git_act(1)
	  },
	//获取类型函数
	  git_lx(){
		  this.$axios({method:'get',url:store.state.url_data+'/api/courseCategories',headers:{'Authorization':'Bearer '+localStorage.token}}
		     ).then(res=>{
		        // console.log(res.data,'类型数据');
		       if(res.data.code==200){
				   this.lx_box = res.data.data;
			   }
		     }).catch(error=> {});
	  },
	  
	//获取列表数据函数
	  git_act(pages){
		  this.loading = true;
	  		this.$axios({method:'get',url:store.state.url_data+'/api/coursePlanClasses',
			  params:{
				page:pages,
				city_id:this.cs_id,
				region_id:this.qy_id,
				street_id:this.jd_id,
				
				grade:this.nian_id,
				category_id:this.lx_id,
				arrange_mode:this.sh_zt_id,
				
				search:this.masg_val
			  },headers:{'Authorization':'Bearer '+localStorage.token}}).then(res=>{
	  		        console.log(res.data,'数据');
					this.loading = false;
	  		       if(res.data.code==200){
					   this.tableData3 = res.data.data;
					   this.total_01 = res.data.meta.total;
	  			   }
	  		  }).catch(error=> {
				  this.loading = false;
				  if (error.response) {
				     console.log(error.response);
				     if(error.response.status==403){
				  		this.$notify({ title: '警告', message: '账号异常请重新登录',type: 'warning'});this.$router.push('/login');
				  	 }else{this.$message({message:'发生了错误，请联系技术中心！',type:'warning'})}
				   }
			  });
	  },
	 
	 },
	  mounted(){
		this.cs_fn();
		this.git_lx();
		this.git_zt();
		
		// this.git_act(1);
	  }
	};
	
</script>
<style scoped="scoped">
	.btnsa{
		padding:10px 7px;
	}
	
	.box_call_c{
		width:400px;float:right;height:100%;
	}
	.box_call p{
		float: right;
		font-size: 15px;
		font-weight: 600;
		margin: 0;
		margin-right: 10px;
		line-height: 40px;
	}
	.box_call{
		width: 100%;
		height: 40px;
		margin: 25px 0;
		padding-right: 0px;
	}
	
	.transition-boxs{
		width: 500px;
		height: 240px;
		background: white;
		margin: 100px auto;
	}
	
	.transition-box{
		 position: fixed;
		 top: 0;
		 left: 0;
		 z-index: 500;
		 width: 100%;
		 height: 100%;
		 background: rgba(0,0,0,.3);
		}
	
	
	.tds{
		text-align: center;
	}
	.tab_c{
		float:left;margin-right:10px;
	}
	.inp_a{
		width: 200px;
		float: left;
		margin-right: 10px;
	}
</style>
