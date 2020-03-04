<template>
	<!-- 工作台-审核 -->
	<div style="width:100%;">
		<div style="width:100%;margin-bottom:10px;float: left;">
           
			<el-select class='tab_c' @change='lx_cl' v-model="lx_val" clearable placeholder="请选择类型">
			   <el-option v-for="(item,index) in lx_box" :key="index" :label="item.name" :value="item.id"></el-option>
			</el-select>
			
			<el-select class='tab_c' v-model="cs_val" placeholder="请选择城市">
			   <el-option v-for="(item,index) in cs_box" :key="index" :label="item.city_name" :value="item.city_id"></el-option>
			</el-select>
			<el-select class='tab_c' @change='qy_click' v-model="qy_val" clearable placeholder="请选择区域">
			   <el-option v-for="(item,index) in qy_box" :key="index" :label="item.region_name" :value="item.region_id"></el-option>
			</el-select>
			<el-select class='tab_c' @change='jd_click' v-model="jd_val" clearable placeholder="请选择街道">
			   <el-option v-for="(item,index) in jd_box" :key="index" :label="item.street_name" :value="item.street_id"></el-option>
			</el-select>
			
			<div class='inp_a'><el-input placeholder="请输入来源(机构/学校)名称" v-model="masg_val" clearable></el-input></div>
            <el-button @click='git_act(1)' class='tab_c' type="primary">搜索</el-button>
		</div>
		
   <div style="width:100%;float: left;">
	<el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%">
		
       <!-- <el-table-column type="selection" width="100" align='center' header-align='center'></el-table-column> -->
       <el-table-column prop="created_at" align='center' header-align='center' label="提交日期时间"><template slot-scope="scope">{{ scope.row.created_at }}</template></el-table-column>
       
	   <el-table-column prop="audit_name" class='tds' align='center' header-align='center'  label="来源" ></el-table-column>
	   
	   <el-table-column prop="city_name" align='center' header-align='center' label="城市" ></el-table-column>
       <el-table-column prop="region_name" class='tds' align='center' header-align='center'  label="区域" ></el-table-column>
       <el-table-column prop="street_name" align='center' header-align='center' label="街道" ></el-table-column>
	   <el-table-column prop="audit_type_name" class='tds' align='center' header-align='center'  label="类型" ></el-table-column>
	   <el-table-column prop="audit_status_name" align='center' header-align='center' label="状态" ></el-table-column>
	   
       <el-table-column  label="操作" align='center' header-align='center'>
		   <template slot-scope="scope">
			  <el-button v-show='scope.row.audit_status_name!="待审核"' type="primary" plain>详情</el-button>
			  <el-button @click='audit_click(scope.row,"审核")' v-show='scope.row.audit_status_name=="待审核"' type="success" plain>审核</el-button>
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
</div>
</template>

<script>
	import store from "../../vuex/store.js";
     export default {
	  data(){
	    return {
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
		   region_box:[],
	    }
	  },
		
	methods:{
		//审核按钮被点击
		audit_click(i,val){
			console.log(i);
			store.state.audit_id = i.audit_id;
			store.state.audit_val = val;
			if(i.audit_type_name=='机构审核'){
				this.$router.push({path:'/ji_audit_001'});
			}else if(i.audit_type_name=='课程审核'){
				this.$router.push({path:'/ke_audit_002'});
			}else if(i.audit_type_name=='教师审核'){
				this.$router.push({path:'/jiao_shi_audit_003'});
			}else if(i.audit_type_name=='课表审核'){
				this.$router.push({path:'/kebiao_audit_004'});
			}else if(i.audit_type_name=='营养餐退款审核'){
				this.$router.push({path:'/yingyang_tui_001'});
			}else if(i.audit_type_name=='营养餐请假审核'){
				this.$router.push({path:'/yingyang_audit_005'});
			}else if(i.audit_type_name=='普惠请假审核'){
				this.$router.push({path:'/puhuiqing_audit_008'});
			}else if(i.audit_type_name=='普惠退款审核'){
				this.$router.push({path:'/puhui_tui_002'});
			}else if(i.audit_type_name=='课程退款审核'){
				this.$router.push({path:'/kechengtui_audit_006'});
			}else if(i.audit_type_name=='课程请假审核'){
				this.$router.push({path:'/kechengqing_audit_007'});
			}
			
		},
		
		
//城市区域街道函数
				cs_fn(){//城市数据
				   this.$axios({method:'get',url:store.state.url_data+'/api/regions',params:{type:'city',id:440},headers:{'Authorization':'Bearer '+localStorage.token}}
				      ).then(res=>{
				        if(res.data.code==200){
						 let crs_box = store.state.crs_box;
						 // let crs_box = this.crs_boxs;
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
							// let crs_box = this.crs_boxs;
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
		
	   //列表勾选项，数据函数
       handleSelectionChange(val) {
		 // console.log(val);
         this.multipleSelection = val;
       },
	   //分页相关函数
	   handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
		this.git_act(val);
      },
	  lx_cl(i){
	  		// console.log(i);
	  		this.lx_id = i;
			this.git_act(1)
	  },
	
	//获取类型函数
	  git_lx(){
		  this.$axios({method:'get',url:store.state.url_data+'/api/auditTypes',headers:{'Authorization':'Bearer '+localStorage.token}}
		     ).then(res=>{
		        // console.log(res.data,'类型数据');
		       if(res.data.code==200){
				   this.lx_box = res.data.data;
				   for(var i in this.lx_box){
				   		if(this.lx_box[i].name=='营养餐退款审核'||this.lx_box[i].name=='普惠退款审核'){
				   			this.lx_box.splice(i,1)
				   		}
						if(this.lx_box[i].name=='营养餐请假审核'){
							this.lx_box.splice(i,1)
						}
				   }
			   }
		     }).catch(error=> {});
	  },
	  
	//获取列表数据函数
	  git_act(pages){
	  		this.$axios({method:'get',url:store.state.url_data+'/api/audits',
			  params:{
				audit_type:this.lx_id,
				city_id:this.cs_id,
				region_id:this.qy_id,
				street_id:this.jd_id,
				audit_status:1,//这里只获取待审核的数据 ，审核中心需要修改
				audit_name:this.masg_val,
				page:pages
			  },
			  headers:{'Authorization':'Bearer '+localStorage.token}}
	  		     ).then(res=>{
	  		        console.log(res.data,'数据');
	  		       if(res.data.code==200){
					   this.tableData3 = res.data.data;
					   this.total_01 = res.data.meta.total;
	  			   }
	  		  }).catch(error=> {});
	  },
	 
	 },
	  mounted(){
		this.cs_fn();
		window.setTimeout(()=>{
		  this.tableData3 = store.state.audit_box.slice(0,15);
		  this.total_01 = store.state.audit_box.length;//赋值分页数据，进行分页
		},200)
		this.git_lx();
		
		
	  }
	};
	
</script>
<style scoped="scoped">
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
