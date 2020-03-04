<template>
	<!-- 平台调配 -->
	<div style="width:100%;">
	   <el-card v-loading="loading" class="box-card"  style="padding:0;margin:20px;padding-bottom: 20px;">
		<div style="width:100%;margin-bottom:10px;float: left;">
           
			<el-select class='tab_c'  @change='lx_cl' v-model="lx_val" clearable placeholder="课程门类">
			   <el-option v-for="(item,index) in lx_box" :key="index" :label="item.name" :value="item.id"></el-option>
			</el-select>
			
			<el-select class='tab_c' v-model="cs_val" style='width:150px;' placeholder="请选择城市">
			   <el-option v-for="(item,index) in cs_box" :key="index" :label="item.city_name" :value="item.city_id"></el-option>
			</el-select>
			<el-select class='tab_c' @change='qy_click' style='width:150px;' v-model="qy_val" clearable placeholder="请选择区域">
			   <el-option v-for="(item,index) in qy_box" :key="index" :label="item.region_name" :value="item.region_id"></el-option>
			</el-select>
			<el-select class='tab_c' @change='jd_click' style='width:150px;' v-model="jd_val" clearable placeholder="请选择街道">
			   <el-option v-for="(item,index) in jd_box" :key="index" :label="item.street_name" :value="item.street_id"></el-option>
			</el-select>
			<div class='inp_a'><el-input placeholder="请输入学校名称" v-model="masg_val" clearable></el-input></div>
            <el-button @click='git_act(1)' class='tab_c' type="primary">搜索</el-button>
		</div>
		
   <div style="width:100%;float: left;">
	<el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%">
       <!-- <el-table-column type="selection" width="100" align='center' header-align='center'></el-table-column> -->
       <!-- <el-table-column prop="created_at" align='center' header-align='center' label="提交日期时间"><template slot-scope="scope">{{ scope.row.created_at }}</template></el-table-column> -->
       
	   <el-table-column prop="course_plan.school_detail.city_name" align='center' header-align='center' label="城市" ></el-table-column>
       <el-table-column prop="course_plan.school_detail.region_name" class='tds' align='center' header-align='center' label="区域" ></el-table-column>
       <el-table-column prop="course_plan.school_detail.street_name" align='center' header-align='center' label="街道" ></el-table-column>
	   
	   <el-table-column prop="course_plan.school_name" class='tds' align='center' header-align='center'  label="学校名称" show-overflow-tooltip></el-table-column>
	   <el-table-column prop="max_grade" align='center' header-align='center' label="服务年级" >
		   <template slot-scope="scope">
		   			{{scope.row.min_grade}}-{{scope.row.max_grade}}
		   </template>
	   </el-table-column>
	   <el-table-column prop="audit_type_name" class='tds' align='center' header-align='center'  label="服务类型" show-overflow-tooltip>
		    <template slot-scope="scope">{{scope.row.arrange_mode==1?'机构调配':(scope.row.arrange_mode==2?'学校调配':'平台调配')}}</template>
	   </el-table-column>
	   <el-table-column prop="category_name" align='center' header-align='center' label="课程门类" show-overflow-tooltip></el-table-column>
	   <el-table-column prop="course.revised_name" class='tds' align='center' header-align='center'  label="平台课程名称" show-overflow-tooltip></el-table-column>
	   <el-table-column prop="course_name" align='center' header-align='center' label="课程名称" show-overflow-tooltip></el-table-column>
	   <el-table-column prop="institude_name" align='center' header-align='center' label="服务机构" show-overflow-tooltip></el-table-column>
	   
       <el-table-column  label="操作" align='center' header-align='center'>
		   <template slot-scope="scope">
			  <el-button @click='tiao(scope.row)' v-if='scope.row.source_id==""' type="primary" plain>平台调配</el-button>
			  <el-button @click='tiao(scope.row)' v-else type="success" plain>重新调配</el-button>
	       </template>
	   </el-table-column>
	   
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
   				 <p style="font-size:20px;font-weight:600;text-align:center;margin-bottom:30px;margin-top:10px;">平台调配</p>  
   				  
   				 <div class="box_call">
   				    <div style="width:400px;float:right;height:100%;line-height:40px">{{inp_val[0]}}</div>
   				    <p>学校名称：</p>
   				 </div> 
   				<div class="box_call">
   				   <div style="width:400px;float:right;height:100%;line-height:40px">{{inp_val[1]}}</div>
   				   <p>课程门类：</p>
   				</div> 
				<div class="box_call">
				   <div style="width:400px;float:right;height:100%;line-height:40px">{{inp_val[2]}}</div>
				   <p>服务年级：</p>
				</div> 
				<div class="box_call">
				   <div style="width:400px;float:right;height:100%;line-height:40px">{{inp_val[3]}}</div>
				   <p>平台课程名称：</p>
				</div> 
				<div class="box_call">
				   <div style="width:400px;float:right;height:100%;line-height:40px">{{inp_val[4]}}</div>
				   <p>学校地区：</p>
				</div> 
				
				<div class="box_call">
				   <div style="width:400px;float:right;height:100%;line-height:40px">
					   <el-select style='width:385px;' @change='lx_cl_s' v-model="lx_val_s" clearable placeholder="请选择服务机构">
					      <el-option v-for="(item,index) in lx_box_s" :key="index" :label="item.name" :value="item.institution_id"></el-option>
					   </el-select>
				   </div>
				   <p>服务机构：</p>
				</div> 
				
				<div class="box_call">
				   <div style="width:400px;float:right;height:100%;line-height:40px">
					   <el-select style='width:385px;' @change='lx_cl_s2' v-model="lx_val_s2" clearable placeholder="请选择课程名称">
					      <el-option v-for="(item,index) in lx_box_s2" :key="index" :label="item.name" :value="item.course_id"></el-option>
					   </el-select>
				   </div>
				   <p>课程名称：</p>
				</div> 
				
   				<div style="width:180px;height:40px;margin:35px auto;">
   					   <el-button @click='show=false' style='float:left;' type="info">取消</el-button>
   					   <el-button @click='git_put_tiao' style='float:right;' type="primary">提交</el-button>
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
		  inp_val:[],
		  
	      show:false,
			
		   total_01:0,//分页-总条数
		   ye_s:[15],
		   
		   lx_box:[],
		   lx_id:'',//类型id
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
		   
		   item:'',
		   
		   lx_box_s:[],
		   lx_id_s:'',//机构id
		   lx_val_s:'',
		   
		   lx_box_s2:[],
		   lx_id_s2:'',//课程id
		   lx_val_s2:'',
		   
		   region_box:[],
	    }
	  },
		
	methods:{
		
//调配函数		
		git_put_tiao(){
			if(this.lx_id_s){}else{this.$message({message: '请选择服务机构',type: 'warning' });return false;}
			if(this.lx_id_s2){}else{this.$message({message: '请选择课程名称 ',type: 'warning' });return false;}
			this.$axios({method:'put',url:store.state.url_data+'/api/coursePlansCourses/'+this.item.id+'/smarty',
			    data:{
				     source_id:this.lx_id_s,
					 course_id:this.lx_id_s2,
					 
					},
			   headers:{'Authorization':'Bearer '+localStorage.token}}
			   ).then(res=>{
				  console.log(res.data,'调配结果')
			     if(res.data.code==200){
					     this.$message({message:'调配成功',type:'success'});
						 this.show = false;
						 this.git_act(this.pages);
					}else{this.$message({message: '调配失败 ',type: 'warning' })}
			   }).catch(error=> {
				     if (error.response) {
				     	this.$message.error(error.response.data.message)
				     } else {
				     	this.$message.error('发生了错误！')
				     }
				   });
		},
//调配被点击		
		tiao(i){
		  console.log(i)
		  this.item = i;
		  this.show = true;
		  this.inp_val[0] = i.course_plan.school_name;
		  this.inp_val[1] = i.category_name;
		  this.inp_val[2] = i.min_grade+'-'+i.max_grade;
		  this.inp_val[3] = i.course_title;
		  this.inp_val[4] = i.course_plan.school_detail.city_name+'-'+i.course_plan.school_detail.region_name+'-'+i.course_plan.school_detail.street_name;
		  
		  if(this.item.source_id==''){
			   this.lx_id_s='';this.lx_val_s='';
			   this.lx_id_s2=''; this.lx_val_s2='';
		  }else{
			   this.lx_id_s=i.institude_id;
			   this.lx_val_s=i.institude_name;
			   this.lx_id_s2=i.course_id; 
			   this.lx_val_s2=i.course_name;
		  }
		},
		lx_cl_s(i){//机构类表被点击
			this.lx_id_s = i;
			this.git_course()
		},
		git_jigou(){//获取机构列表
			this.$axios({method:'get',url:store.state.url_data+'/api/coursePlansCourses/institutions',params:{city_id:localStorage.cs_id},headers:{'Authorization':'Bearer '+localStorage.token}}
			   ).then(res=>{
				 console.log(res.data,'机构数据')
			     if(res.data.code==200){
					this.lx_box_s = res.data.data;
					}
			   }).catch(error=> {
				   
			   });
		},
		lx_cl_s2(i){//课程被点击
			this.lx_id_s2 = i
		},
		git_course(){//获取课程列表
			this.$axios({method:'get',url:store.state.url_data+'/api/coursePlansCourses/courses?source_id='+this.lx_id_s+'&category_id='+this.item.category_id+'&min_grade='+this.item.min_grade+'&max_grade='+this.item.max_grade+'&search='+this.item.course_title,
			    headers:{'Authorization':'Bearer '+localStorage.token}}
			   ).then(res=>{
				 console.log(res.data,'课程数据')
			     if(res.data.code==200){
					    this.lx_box_s2 = res.data.data;
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
	  
	//获取类型函数
	  git_lx(){
		  this.$axios({method:'get',url:store.state.url_data+'/api/courseCategories',headers:{'Authorization':'Bearer '+localStorage.token}}
		     ).then(res=>{
		       if(res.data.code==200){
				   this.lx_box = res.data.data;
			   }
		     }).catch(error=> {});
	  },
	  
	//获取列表数据函数
	  git_act(pages){
		  this.loading = true;
	  		this.$axios({method:'get',url:store.state.url_data+'/api/coursePlansCourses',
			  params:{
				page:pages,
				city_id:this.cs_id,
				region_id:this.qy_id,
				street_id:this.jd_id,
				category_id:this.lx_id,
				search:this.masg_val,
				arrange_mode:3
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
		this.git_jigou()
		// this.git_act(1);
	  }
	};
	
</script>
<style scoped="scoped">
	.box_call_c{
		width:400px;
		float:right;
		height:100%;
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
		margin: 15px 0;
		padding-right: 20px;
	}
	.transition-boxs{
		width: 600px;
		height: 550px;
		background: white;
		margin: 50px auto;
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
