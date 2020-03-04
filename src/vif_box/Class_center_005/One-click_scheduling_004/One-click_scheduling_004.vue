<template>
	<!-- 班级名单 -->
	<div style="width:100%;">
	   <el-card v-loading="loading" class="box-card"  style="padding:0;margin:20px;padding-bottom: 20px;">
		<div style="width:100%;margin-bottom:10px;float: left;">
           
			<el-select class='tab_c'  @change='lx_cl' style='width:150px;' v-model="lx_val" clearable placeholder="排课状态">
			   <el-option v-for="(item,index) in lx_box" :key="index" :label="item.name" :value="item.id"></el-option>
			</el-select>
			
			<el-select class='tab_c' @change='zt_cl' style='width:150px;' v-model="sh_val" clearable placeholder="报课状态">
			   <el-option :label="'关闭'" :value="'0'"></el-option>
			   <el-option :label="'开启'" :value="'1'"></el-option>
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
			
			<div class='inp_a' style='width:150px;'><el-input placeholder="请输入学校名字" v-model="masg_val" clearable></el-input></div>
            <el-button @click='git_act(1)' class='tab_c' type="primary">搜索</el-button>
			
			
			<!-- <el-button style='float:right;' type="success">导入excel</el-button> -->
		</div>
		
   <div style="width:100%;float: left;">
	<el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%">
       
	   <el-table-column prop="school_detail.city_name" align='center' header-align='center' label="城市" ></el-table-column>
       <el-table-column prop="school_detail.region_name" class='tds' align='center' header-align='center'  label="区域" ></el-table-column>
       <el-table-column prop="school_detail.street_name" align='center' header-align='center' label="街道" ></el-table-column>
	   <el-table-column prop="school_name" class='tds' align='center' header-align='center'  label="学校名称" show-overflow-tooltip></el-table-column>
	   
	   <el-table-column prop="target_tags" align='center' header-align='center' label="育人目标" show-overflow-tooltip></el-table-column>
	   <el-table-column prop="schools_tags" align='center' header-align='center' label="办学特色" show-overflow-tooltip></el-table-column>
	   
	   <el-table-column prop="key_works" class='tds' align='center' header-align='center'  label="关键字" show-overflow-tooltip></el-table-column>
		    
	   <el-table-column prop="" align='center' header-align='center' label="排课状态" show-overflow-tooltip>
		    <template slot-scope="scope" v-if="scope.row.course_plan_class_status">{{lx_box[Number(scope.row.phase)-1].name}}</template>
	   </el-table-column>
	   <el-table-column prop="school_detail.can_arrange" class='tds' align='center' header-align='center'  label="报课状态" show-overflow-tooltip>
		   <template slot-scope="scope">{{scope.row.school_detail.can_arrange==0?'关闭':'开启'}}</template>
	   </el-table-column>
	   
	   <el-table-column prop="" class='tds' align='center' header-align='center'  label="操作" >
	   		   <template slot-scope="scope">
				   <el-button style='float:right;margin-bottom:5px;' v-show='scope.row.school_detail.can_arrange==1&&scope.row.phase==1' @click='pai_ke(scope.row)' type="primary" >一键排课</el-button>
				   <el-button style='float:right;' @click='git_kebiao(scope.row)' type="success" >查看课表</el-button>
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
     
<!-- 一键排课 -->	 
	
<el-dialog :title="shool_name" width='80%' top='5vh' :before-close="guanbi" :visible.sync="dialogFormVisible">
  <div style="width:100%;height:200px;">
	<div style="width:66%;height: 100%;float: left;overflow:auto;border:#dcdfe6 solid 1px;padding:10px;">
<!-- ////////////////////////////////////////////////////////////////////////////// -->		
		<div style="width: 100%;float:left;">
			<p style="font-size:15px;font-weight:600;float:left;margin:5px 0 0 0;">育人目标:</p>
			<div style="width:90%;float:right;">
				<el-tag v-for='i in yu_box' class='biaos'>{{i.name}}</el-tag>
			</div>
		</div>
<!-- ////////////////////////////////////////////////////////////////////////////// -->		
		<div style="width: 100%;float:left;margin-top:20px;">
			<p style="font-size:15px;font-weight:600;float:left;margin:5px 0 0 0;">办学特色:</p>
			<div style="width:90%;float:right;">
				<el-tag v-for='i in ts_box' class='biaos' type="success">{{i.name}}</el-tag>
			</div>
		</div>
<!-- ////////////////////////////////////////////////////////////////////////////// -->		
	</div>  
	<div style="width: 33%;height: 100%;float: right;border:#dcdfe6 solid 1px;padding:20px 20px;">
		<div style="width:47%;float:left;height:50%;margin-top:40px;border-radius:5px;-moz-box-shadow:0px 0px 7px #2A9B00; -webkit-box-shadow:0px 0px 7px #2A9B00; box-shadow:0px 0px 7px #2A9B00;">
			<el-button style='width:100%;height:100%;font-size:18px;' @click='put_ke' type="primary">一键排课</el-button>
		</div>
	    <div style="width:47%;float:right;height:50%;margin-top:40px;">
			<el-button style='width:100%;height:100%;font-size:18px;border-radius:5px;-moz-box-shadow:0px 0px 7px #1890ff; -webkit-box-shadow:0px 0px 7px #1890ff; box-shadow:0px 0px 7px #1890ff;' :disabled='tableData4.length>=60'  @click="put_shou" type="success">手动添加</el-button>
		</div>
	</div>
  </div>
<!-- 表格、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、 -->  
  <div style="width:100%;height:500px;margin-top:20px;overflow:auto;border:#dcdfe6 solid 1px;"   v-loading="loading2">
	 <el-table ref="multipleTable" :data="tableData4" tooltip-effect="dark" style="width: 100%">
	    <el-table-column prop="" class='tds' align='center' header-align='center'  label="年级范围" show-overflow-tooltip>
			<template slot-scope="scope">
				{{scope.row.min_grade}}年级--{{scope.row.max_grade}}年级
			</template>
		</el-table-column>
	    <el-table-column prop="category_name" align='center' header-align='center' label="课程门类" show-overflow-tooltip></el-table-column>
	    <el-table-column prop="course_name" align='center' header-align='center' label="课程名称" show-overflow-tooltip></el-table-column>
	    <el-table-column prop="" class='tds' align='center' header-align='center'  label="授课类型" show-overflow-tooltip>
			<template slot-scope="scope">
				{{scope.row.arrange_mode==1?'机构':(scope.row.arrange_mode==2?'学校':'平台调配')}}
			</template>
		</el-table-column>
	    <el-table-column prop="" align='center' header-align='center' label="授课单位" show-overflow-tooltip>
			<template slot-scope="scope">
				{{scope.row.arrange_mode==1?scope.row.institude_name:(scope.row.arrange_mode==2?shool_name:'')}}
			</template>
		</el-table-column>
	    <el-table-column prop="" class='tds' align='center' header-align='center'  label="操作" show-overflow-tooltip>
	    	<template slot-scope="scope">
	 			<el-button @click='put_huan(scope.row.id)' type="primary" plain>智能替换</el-button>
				<el-button @click='delete_box(scope.row.id)' type="danger" plain>删除</el-button>
	 		</template>
	    </el-table-column>
	  </el-table>
<!-- 表格、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、 -->	 
  </div>
<!-- 内部二级弹窗、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、 -->   
  <el-dialog width="80%" title="手动添加" top='5vh' :visible.sync="innerVisible" append-to-body>
	<div style="width: 100%;height:40px;line-height:40px;">
		<el-select class='tab_c' v-model="cs_val2" style='width:110px;' placeholder="城市">
		   <el-option v-for="(item,index) in cs_box2" :key="index" :label="item.city_name" :value="item.city_id"></el-option>
		</el-select>
		<el-select class='tab_c' @change='qy_click2' style='width:110px;' v-model="qy_val2" clearable placeholder="区域">
		   <el-option v-for="(item,index) in qy_box2" :key="index" :label="item.region_name" :value="item.region_id"></el-option>
		</el-select>
		<el-select class='tab_c' @change='jd_click2' style='width:110px;' v-model="jd_val2" clearable placeholder="街道">
		   <el-option v-for="(item,index) in jd_box2" :key="index" :label="item.street_name" :value="item.street_id"></el-option>
		</el-select>
		
		<el-select class='tab_c'  @change='ji_cl' style='width:150px;' v-model="ji_val" clearable placeholder="机构授课">
		   <el-option v-for="(item,index) in ji_box" :key="index" :label="item.name" :value="item.id"></el-option>
		</el-select>
		<el-select class='tab_c' v-show='ji_id!=2'  @change='jg_cl' style='width:150px;' v-model="jg_val" filterable clearable placeholder="机构搜索">
		   <el-option v-for="(item,index) in jg_act" :key="index" :label="item.name" :value="item.institution_id"></el-option>
		</el-select>
		<el-select class='tab_c'  @change='ke_cl' style='width:150px;' v-model="ke_val" clearable placeholder="课程门类">
		   <el-option v-for="(item,index) in ke_box" :key="index" :label="item.name" :value="item.id"></el-option>
		</el-select>
		<div class='inp_a' style='width:150px;'><el-input placeholder="请输入关键字" v-model="masg_val2" clearable></el-input></div>
		<el-button @click='git_ke_act()' class='tab_c' type="primary">搜索</el-button>
   </div>
	
	<p style="font-size:15px;font-weight:600;float:left;margin:20px 0;">已选{{checkedCities.length}}门课</p>
	<div style="width:100%;height:400px;margin-top:30px;overflow:auto;border:#dcdfe6 solid 1px;padding:20px;" v-loading="loading2">
	<!-- 多选标签 -->
		<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
             <el-checkbox style='margin:0 5px 5px 0;' border v-for="city in ke_table_box" :label="city.course_id" :key="city.course_id">{{city.name}}</el-checkbox>
        </el-checkbox-group>
	</div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="innerVisible = false">取 消</el-button>
      <el-button type="primary" @click="git_ti">确 定</el-button>
    </div> 
  </el-dialog>
<!-- 、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、 -->
  <div slot="footer" class="dialog-footer">
    <el-button @click="guanbi">取消</el-button>
    <el-button type="primary" v-loading="loading2" @click="put_active">确 定</el-button>
  </div>
</el-dialog>
 
<!-- 查看课表弹窗 -->
 <el-dialog :title="item_box.school_name" width='80%' top='5vh' :visible.sync="dialogFormVisible2">
    <div style="width:100%;height:700px;overflow:auto;border:#dcdfe6 solid 1px;" v-loading="loading2">
  	 <el-table ref="multipleTable" :data="tableData4" tooltip-effect="dark" style="width: 100%">
  	    <el-table-column prop="" class='tds' align='center' header-align='center'  label="年级范围" show-overflow-tooltip>
  			<template slot-scope="scope">
  				{{scope.row.min_grade}}年级--{{scope.row.max_grade}}年级
  			</template>
  		</el-table-column>
  	    <el-table-column prop="category_name" align='center' header-align='center' label="课程门类" show-overflow-tooltip></el-table-column>
  	    <el-table-column prop="course_name" align='center' header-align='center' label="课程名称" show-overflow-tooltip></el-table-column>
  	    <el-table-column prop="" class='tds' align='center' header-align='center'  label="授课类型" show-overflow-tooltip>
  			<template slot-scope="scope">
  				{{scope.row.arrange_mode==1?'机构':(scope.row.arrange_mode==2?'学校':'平台调配')}}
  			</template>
  		</el-table-column>
  	    <el-table-column prop="" align='center' header-align='center' label="授课单位" show-overflow-tooltip>
  			<template slot-scope="scope">
  				{{scope.row.arrange_mode==1?scope.row.institude_name:(scope.row.arrange_mode==2?shool_name:'')}}
  			</template>
  		</el-table-column>
		<el-table-column prop="intention_count" class='tds' align='center' header-align='center'  label="意向人数" show-overflow-tooltip></el-table-column>
		
   </el-table>
   </div>
</el-dialog>
 
</el-card>
</div>
</template>

<script>
	import store from "../../../vuex/store.js";
     export default {
	  data(){
	    return {
		  dialogFormVisible2:false,
		  loading2:false,
		  checkAll: false,
		  ke_table_box:[], //课程选项类表数据
		  checkedCities: [],//已选中的课程id容器
          isIndeterminate: true,
		  innerVisible:false,
		  dialogFormVisible:false,
		  
		  input_val:'',
		  sh_val:'',
		  sh_zt_box:[],
		  sh_zt_id:'',
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
		   shool_name:'',
		   yu_box:[],//育人目标
		   ts_box:[],//办学特色
		   tableData4:[],
		   item_box:'',
		   
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
    //机构列表
		jg_act:[],
		jg_val:'',
		jg_id:'',
		
	//课程门类
		 ke_val:'',
		 ke_box:[],
		 ke_id:"",
		 
	//机构授课	 
		ji_val:'机构',
		ji_box:[{id:1,name:'机构'},{id:2,name:'学校'},{id:3,name:'平台'}],
		ji_id:1,
		masg_val2:'',
		show_num:true,
		
		pages:1,
		region_box2:'',
		region_box:'',
	    }
	  },
		
	methods:{
		guanbi(){//关闭一键排课请求接口
		    this.dialogFormVisible = false
			this.$axios({method:'put',url:store.state.url_data+'/api/coursePlansCourses/unConfirmed',
			data:{plan_id:this.item_box.plan_id},headers:{'Authorization':'Bearer '+localStorage.token}}
			   ).then(res=>{
			     if(res.data.code==200){}
			   }).catch(error=> {
				 if (error.response) {console.log(error.response.data.message)} 
				});
		},
		
		put_active(){//一键排课的确定按钮被点击
		    if(this.show_num){this.show_num = false;
		    	window.setTimeout(()=>{
		    		this.show_num = true;
		    	},3000)
		    }else{return false}
		    if(this.tableData4.length==0){this.$message({ message: '没有数据！', type: 'warning' });return false};
			var datas = [];
			for(var i in this.tableData4){datas.push(this.tableData4[i].id)};
			this.loading2 = true;
			this.$axios({method:'put',url:store.state.url_data+'/api/coursePlansCourses/confirmed',
			data:{
			     plan_id:this.item_box.plan_id,
				 ids:datas
			},
			headers:{'Authorization':'Bearer '+localStorage.token}}
			   ).then(res=>{
				   this.loading2 = false;
			     if(res.data.code==200){
					this.$message({message:'成功！',type:'success'});
					this.dialogFormVisible = false;
				    this.git_act(this.pages);
				 }
			   }).catch(error=> {
				   this.loading2 = false;
						    if (error.response) {
								this.$message.error(error.response.data.message)
							} else {
								this.$message.error('发生了错误！')
							}
				});
		},
//查看课表
      git_kebiao(i){
		this.item_box = i;
		this.git_table_box();
		this.dialogFormVisible2 = true;
	  },
//手动添加提交按钮被点击
      git_ti(){
		if(this.checkedCities.length==0){this.$message({ message: '未选择课程！', type: 'warning' });return false};
		if(this.show_num){this.show_num = false;
			window.setTimeout(()=>{
				this.show_num = true;
			},3000)
		}else{return false}
		this.$axios({method:'post',url:store.state.url_data+'/api/coursePlansCourses',
		data:{
			school_id:this.item_box.school_id,
		    plan_id:this.item_box.plan_id,
			course_ids:this.checkedCities
		},
		headers:{'Authorization':'Bearer '+localStorage.token}}
		   ).then(res=>{
		     if(res.data.code==200){
						  this.$message({message:'添加成功！',type:'success'});
						  this.innerVisible = false;
						  this.git_table_box()
					   }
		   }).catch(error=> {
					    if (error.response) {
							this.$message.error(error.response.data.message)
						} else {
							this.$message.error('发生了错误！')
						}
					});
	  },
	  
//获取课程列表选项
	  git_ke_act(){
		this.loading2 = true;
		let ids = this.ji_id==2?this.item_box.school_id:this.jg_id;
		this.$axios({method:'get',url:store.state.url_data+'/api/coursePlansCourses/courses?source_id='+ids+'&source_type='+this.ji_id+'&category_id='+this.ke_id+'&search='+this.masg_val2,
		   headers:{'Authorization':'Bearer '+localStorage.token}}
		  ).then(res=>{
			  this.loading2 = false
		     console.log(res.data,'课程数据');
		    if(res.data.code==200){
			  this.ke_table_box = res.data.data;
		    }
		  }).catch(error=> {this.loading2 = false});
	  },
	  
//机构授课被点击
       ji_cl(i){
		 this.ji_id = i; 
		 this.git_ke_act()
	   },
//获取课程门类
	    ke_cl(i){
			this.ke_id = i;
			this.git_ke_act()
		},
		git_ke(){
			 this.$axios({method:'get',url:store.state.url_data+'/api/courseCategories',headers:{'Authorization':'Bearer '+localStorage.token}}
			   ).then(res=>{
			      // console.log(res.data,'课程门类数据');
			     if(res.data.code==200){
						this.ke_box = res.data.data;
                     }
			   }).catch(error=> {});
		},
		
//获取机构列表函数		
        jg_cl(i){this.jg_id = i;this.git_ke_act()},//机构选项被点击
		git_jg(){
		   this.$axios({method:'get',url:store.state.url_data+'/api/coursePlansCourses/institutions?city_id='+localStorage.cs_id+'&region_id='+this.qy_id2+'&street_id='+this.jd_id2,
		   headers:{'Authorization':'Bearer '+localStorage.token}}
		      ).then(res=>{
		         // console.log(res.data,'机构列表');
		        if(res.data.code==200){
		   			 this.jg_act = res.data.data;
		   		}
		      }).catch(error=> {}); 
		},
//手动添加被点击==》打开窗口		
        put_shou(){
			console.log(this.item_box,'列表数据');
			this.innerVisible=true;
			
			this.cs_val2  = this.item_box.school_detail.city_name;
			this.qy_val2  = this.item_box.school_detail.region_name;
			this.jd_val2  = this.item_box.school_detail.street_name;
			this.qy_id2  = this.item_box.school_detail.region_id;
			this.jd_fn2();
			this.jd_id2  = this.item_box.school_detail.street_id;
			this.git_jg()
			this.git_ke();
			this.git_ke_act();
			this.checkedCities = [];
		},
		
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
				 this.cs_val2 = this.cs_box[0].city_name;
				 this.cs_id2 = this.cs_box[0].city_id;
				 this.qy_fn2();//获取区域数据
		   		}
		      }).catch(error=> {});
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
								console.log(2222)
								
							}
						  }
					   }
					}
					this.qy_val2 = this.qy_box2[0].region_name;
					this.qy_id2 = this.qy_box2[0].region_id; 
					this.jd_fn2();
		   		}
		      }).catch(error=> {});
		},
		//当区域选项被点击
		qy_click2(i){
			this.qy_id2 = i;
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
				   let id = ''
				   for(var i in this.region_box2){
					   if(this.region_box[i].region_id==this.qy_id2){
						   id=this.region_box2[i]
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
					   this.jd_box2 = []
					 for(var j in street_box){
					   for (var i in res.data.data){
				   	  	 if(street_box[j].street_id==res.data.data[i].street_id){
				   	  		this.jd_box2.push(res.data.data[i]);
				   	  	 }
				   	   };
					 }
				   }
				   this.jd_val2 = this.jd_box2[0].street_name;
				   this.jd_id2 = this.jd_box2[0].street_id;
				   this.git_jg()
		  		}
		     }).catch(error=> {});
		},
		//当街道选项被点击
		jd_click2(i){
			this.jd_id2 = i;
			this.git_jg()
		},

//、、、、、、、、、、、、、、、、、、、、、、、,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
		
	//删除
	    delete_box(id){
			  this.$confirm('确定删除吗？', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			 }).then(() => {
					// this.$axios({method:'delete',url:store.state.url_data+'/api/coursePlansCourses/'+id,
					//    headers:{'Authorization':'Bearer '+localStorage.token}}
					//    ).then(res=>{
					// 	 console.log(res.data.data,'删除')
					//      if(res.data.code==200){
					// 		this.$message({message:'删除成功！',type:'success'});
					// 		this.git_table_box();
					// 	 }
					//    }).catch(error=> {
					// 	   if (error.response) {
					// 	   	let response=error.response.data;
					// 	   	this.$message({message: response.message, type: 'error' });
					// 	   }
					//    });
					for(var i in this.tableData4){
						if(id==this.tableData4[i].id){
							this.tableData4.splice(i,1)
						}
					}
					this.$message({message:'删除成功！',type:'success'});
			 })
		},
	//智能替换
		put_huan(id){
			this.$axios({method:'put',url:store.state.url_data+'/api/coursePlansCourses/'+id+'/smarty',
			   headers:{'Authorization':'Bearer '+localStorage.token}}
			   ).then(res=>{
				 console.log(res.data.data,'替换')
			     if(res.data.code==200){
					this.$message({message:'替换成功！',type:'success'});
					this.git_table_box();
				 }
			   }).catch(error=> {
				   if (error.response) {
				   	let response=error.response.data;
				   	this.$message({message: response.message, type: 'error' });
				   }
			   });
		},

	 //弹出框的列表数据	
	   	 git_table_box(){
			 this.loading2  = true;
	   		 this.$axios({method:'get',url:store.state.url_data+'/api/coursePlansCourses?plan_id='+this.item_box.plan_id+'&is_page=0',
	   		      		   headers:{'Authorization':'Bearer '+localStorage.token}}
	   		      		   ).then(res=>{
							  this.loading2 = false
	   		      			 console.log(res.data.data,'弹出框的列表数据')
	   		      		     if(res.data.code==200){
	   		      				this.tableData4 = res.data.data;
	   		      			 }
	   		}).catch(error=> {this.loading2 = false});
	   },
	   
     //获取标签
	   git_check1(){//获取授课门类数据
	   		      		this.$axios({method:'get',url:store.state.url_data+'/api/coursePlanClasses/'+this.item_box.school_id+'/tags',
	   		      		   headers:{'Authorization':'Bearer '+localStorage.token}}
	   		      		   ).then(res=>{
	   		      			 console.log(res.data.data,'标签')
	   		      		     if(res.data.code==200){
	   		      				 this.yu_box = []; this.ts_box = [];
								 for(var i in res.data.data){
									if(res.data.data[i].type==2){
										this.yu_box.push(res.data.data[i])
									}else{
										this.ts_box.push(res.data.data[i])
									}
								 }
	   		      				}
	   		      		   }).catch(error=> {});
	   },
	
	   put_ke(){//一键排课
		  this.$axios({method:'post',url:store.state.url_data+'/api/coursePlansCourses',
		  data:{
			  school_id:this.item_box.school_id,
              plan_id:this.item_box.plan_id
		  },
		  headers:{'Authorization':'Bearer '+localStorage.token}}
		     ).then(res=>{
		       if(res.data.code==200){
				  this.$message({message:'排课成功！',type:'success'});
				  this.git_table_box()
			   }
		     }).catch(error=> {
			    if (error.response) {
					this.$message.error(error.response.data.message)
				} else {
					this.$message.error('发生了错误！')
				}
			});
	   },
	   
	   
	   handleCheckedCitiesChange(value) {//标签被点击
        // let checkedCount = value.length;
        // this.checkAll = checkedCount === this.cities.length;
        // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
		
		pai_ke(i){
		  this.shool_name = i.school_name
		  // let val = i.school_detail.city_name+i.school_detail.region_name+i.school_detail.street_name+i.school_name;
		  // this.$confirm('对'+val+'进行一键排课', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //      }).then(() => {
		   this.item_box = i;
           this.dialogFormVisible = true;
		   this.git_table_box();
		   this.git_check1()
		   // this.put_ke(i);
         // })
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
	  		// console.log(i);
	  		this.lx_id = i;
			this.git_act(1)
	  },
	  zt_cl(i){
		  this.sh_zt_id = i;
		  this.git_act(1)
	  },
	//获取排课状态和报课状态
	  git_lx(){
		  this.$axios({method:'get',url:store.state.url_data+'/api/coursePhase',headers:{'Authorization':'Bearer '+localStorage.token}}
		     ).then(res=>{
		        console.log(res.data,'排课状态和报课状态数据');
		       if(res.data.code==200){
				  this.lx_box = res.data.data;
				  
			   }
		     }).catch(error=> {});
	  },
	  
	//获取列表数据函数
	  git_act(pages){
		  this.loading = true;
	  		this.$axios({method:'get',url:store.state.url_data+'/api/coursePlans',
			  params:{
				page:pages,
				city_id:this.cs_id,
				region_id:this.qy_id,
				street_id:this.jd_id,
				phase:this.lx_id,
				can_arrange:this.sh_zt_id,
				search:this.masg_val
			  },headers:{'Authorization':'Bearer '+localStorage.token}}).then(res=>{
	  		        console.log(res.data,'数据');
					this.loading = false;
	  		       if(res.data.code==200){
					   this.tableData3 = res.data.data;
					   this.total_01 = res.data.meta.total;
	  			   }
	  		  }).catch(error=>{
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
		this.cs_fn2();
		this.git_lx();
		this.git_act(1);
	  }
	};
	
</script>
<style scoped="scoped">
	.biaos{
		margin: 0 10px 10px 0;
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
