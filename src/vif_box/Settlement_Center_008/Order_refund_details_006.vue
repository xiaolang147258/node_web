<template>
	<!-- 订单退款明细 -->
	<div style="width:100%;">
	   <el-card v-loading="loading" class="box-card"  style="padding:0;margin:20px;padding-bottom: 20px;">
		<div style="width:100%;margin-bottom:10px;float: left;">
           
			<el-select class='tab_c'  @change='lx_cl' style='width:150px;' v-model="lx_val" clearable placeholder="订单类型">
			    <el-option v-for='i in sku_type' :label="i.name" :value="i.id"></el-option>
			</el-select>
			
			<el-select class='tab_c'  @change='lx_cl2' style='width:150px;' v-model="lx_val2" clearable placeholder="退款类型">
			   <el-option v-for='(i,index) in refund_reasons' :label="i" :value="index"></el-option>
			</el-select>
			
			<el-date-picker class='tab_c' style='width:150px;' value-format='yyyy-MM-dd' @change='git_act(1)' v-model="date_s" type="date" placeholder="订单开始时间"></el-date-picker>
     
			<el-select class='tab_c' v-model="cs_val" style='width:110px;' placeholder="城市">
			   <el-option v-for="(item,index) in cs_box" :key="index" :label="item.city_name" :value="item.city_id"></el-option>
			</el-select>
			<el-select class='tab_c' @change='qy_click' style='width:110px;' v-model="qy_val" clearable placeholder="区域">
			   <el-option v-for="(item,index) in qy_box" :key="index" :label="item.region_name" :value="item.region_id"></el-option>
			</el-select>
			<el-select class='tab_c' @change='jd_click' style='width:110px;' v-model="jd_val" clearable placeholder="街道">
			   <el-option v-for="(item,index) in jd_box" :key="index" :label="item.street_name" :value="item.street_id"></el-option>
			</el-select>
			
			<div class='inp_a' style='width:150px;'><el-input placeholder="请输入学生名字" v-model="masg_val" clearable></el-input></div>
            <el-button @click='git_act(1)' class='tab_c' type="primary">搜索</el-button>
			
			<a :href="excel_url"><el-button type="primary" class='btns'>导出excel</el-button></a>
		</div>
		
   <div style="width:100%;float: left;">
	<el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%">
       
	    <el-table-column prop="refund_id" class='tds' align='center' header-align='center'  label="订单号" show-overflow-tooltip></el-table-column>
	   <el-table-column prop="refund_no" align='center' header-align='center' label="微信支付流水号" show-overflow-tooltip></el-table-column>
	   
       <el-table-column prop="" class='tds' align='center' header-align='center' label="退款类型" >
		    <template slot-scope="scope">{{refund_reasons[scope.row.refund_reason]}}</template>
	   </el-table-column>
	   <el-table-column prop="school.region_name" class='tds' align='center' header-align='center'  label="请假类型" >
		    <template slot-scope="scope">{{leave_types[scope.row.leave_type]}}</template>
	   </el-table-column>
	   <el-table-column prop="refund_time" class='tds' align='center' header-align='center'  label="退款时间" show-overflow-tooltip></el-table-column>
	   
	   
	   
       <el-table-column prop="order_period" align='center' header-align='center' label="订单类型" >
       		     <template slot-scope="scope">{{sku_type[scope.row.sku_type-1].name}}</template>
       </el-table-column>
       <el-table-column prop="school_name" align='center' header-align='center' label="学校名称" show-overflow-tooltip></el-table-column>
       <el-table-column prop="student_name" align='center' header-align='center' label="学生名字" show-overflow-tooltip></el-table-column>
       <el-table-column prop="" class='tds' align='center' header-align='center'  label="年级班级" show-overflow-tooltip>
       		    <template slot-scope="scope">
       			     {{scope.row.grade}}年{{scope.row.class}}班
       			</template>
       </el-table-column>
	  
	   <el-table-column prop="source.category_name" align='center' header-align='center' label="一级门类" show-overflow-tooltip></el-table-column>
	   	
	   <el-table-column prop="source.course_name" class='tds' align='center' header-align='center'  label="二级门类" show-overflow-tooltip></el-table-column>
	   <el-table-column prop="" align='center' header-align='center' label="品类名称" show-overflow-tooltip>
	   		   <template slot-scope="scope" v-if="scope.row.source">
	   			    <p v-if="scope.row.sku_type==1">{{scope.row.source.subtitle}}</p>
	   				<p v-else>{{scope.row.source.sku_name}}</p>
	   		   </template>
	   </el-table-column>
	   
	   <el-table-column prop="source.class_name" align='center' header-align='center' label="课班名称" show-overflow-tooltip></el-table-column>
	   <el-table-column prop="server_name" class='tds' align='center' header-align='center'  label="合作方" show-overflow-tooltip></el-table-column>
	   <el-table-column prop="order_time" align='center' header-align='center' label="下单时间" show-overflow-tooltip></el-table-column>
	   
	   <el-table-column prop="amount_refund" class='tds' align='center' header-align='center'  label="退款金额" show-overflow-tooltip></el-table-column>
	   <!-- <el-table-column prop="sku.sku_name" align='center' header-align='center' label="会员号" show-overflow-tooltip></el-table-column> -->
	   <el-table-column prop="sku.sku_name" align='center' header-align='center' label="退款原因" show-overflow-tooltip>
		    <template slot-scope="scope">
		   	   	{{scope.row.comment}}
		   </template>
	   </el-table-column>
	   
	   <el-table-column prop="start_format" align='center' header-align='center' label="订单开始时间" show-overflow-tooltip></el-table-column>
	   <el-table-column prop="end_format" class='tds' align='center' header-align='center'  label="订单结束时间" show-overflow-tooltip></el-table-column>
	   <el-table-column prop="city_name" class='tds' align='center' header-align='center'  label="市" show-overflow-tooltip></el-table-column>
	   <el-table-column prop="region_name" align='center' header-align='center' label="区" show-overflow-tooltip></el-table-column>
	   <el-table-column prop="street_name" align='center' header-align='center' label="街道" show-overflow-tooltip></el-table-column>
	   
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
  
  </el-card>
</div>
</template>

<script>
	import store from "../../vuex/store.js";
     export default {
	  computed:{
	  		excel_url(){return store.state.url_data+'/api/refunds/export'},
	  		
	  },
	  data(){
	    return {
		   leave_types:['未考勤','出勤','迟到','旷课','早退','私假','公假','病假'],
			lx_id2:'',//类型id
			lx_val2:'',
			sku_type:[{name:'个性化课程',id:1},{name:'午托',id:2},{name:'晚托',id:3},{name:'营养餐',id:4},{name:'午托+营养餐',id:5}],
			
			refund_reasons:{1:'订单退费(退剩余课时)',2:'公假退费',3:'病假退费',4:'连续私假退费',5:'部分退费'},
			
		   date_s:'',//订单开始时间
		   
		   input_val:'',
			
		   date_val:'',//月份
			
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
	    }
	  },
		
	methods:{
		lx_cl2(i){
			this.lx_id2 = i;
			this.git_act(1)
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
									this.git_act(1)
									this.jd_fn();//获取街道数据
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
		this.git_act(val);
      },
	  lx_cl(i){
		    this.lx_id = i;
			this.git_act(1)
	  },
	  
	//获取列表数据函数
	  git_act(pages){
		  this.loading = true;
	  		this.$axios({method:'get',url:store.state.url_data+'/api/refunds',
			  params:{
				page:pages,
				city_id:this.cs_id,
				region_id:this.qy_id,
				street_id:this.jd_id,
				search:this.masg_val,
				created_at:this.date_s,
				sku_type:this.lx_id,
				refund_reason:this.lx_id2,
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
		this.git_act(1);
	  }
	};
	
</script>
<style scoped="scoped">
	.btns{
		float:right;
		margin-right:20px;
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
