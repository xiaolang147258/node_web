<template>
	<!-- 学期管理 -->
	<div style="width:100%;">
	   <el-card v-loading="loading" class="box-card"  style="padding:0;margin:20px;padding-bottom: 20px;">
		<div style="width:100%;margin-bottom:10px;float: left;">
           
			<el-select class='tab_c'  @change='lx_cl' v-model="lx_val" clearable placeholder="请选择学期">
			   <el-option :label="'秋学期'" :value="'秋学期'"></el-option>
			   <el-option :label="'春学期'" :value="'春学期'"></el-option>
			</el-select>
			
			<el-date-picker value-format='yyyy' class='tab_c' @change='git_act(1)' v-model="value5" align="right" type="year" placeholder="请选择学年"></el-date-picker>
    
			<!-- <div class='inp_a'><el-input placeholder="请输入关键字" v-model="masg_val" clearable></el-input></div>
            <el-button @click='git_act(1)' class='tab_c' type="primary">搜索</el-button> -->
			
			<el-button @click='create_data("","")' style='float:right;margin-right: 40px;' type="primary">添加学期</el-button>
		</div>
		
   <div style="width:100%;float: left;">
	<el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%">
       <el-table-column prop="city_name" align='center' header-align='center' label="城市" ></el-table-column>
       <el-table-column prop="region_name" class='tds' align='center' header-align='center'  label="区域" ></el-table-column>
       <el-table-column prop="street_name" align='center' header-align='center' label="街道" ></el-table-column>
	   
	   <el-table-column prop="title" align='center' header-align='center' label="学期"></el-table-column>
	   <el-table-column prop="start_time_format" align='center' header-align='center' label="开学时间"></el-table-column>
	   <el-table-column prop="end_time_format" align='center' header-align='center' label="学期结束"></el-table-column>
	   <el-table-column prop="year" align='center' header-align='center' label="学年"></el-table-column>
       <el-table-column  label="操作" align='center' header-align='center'>
		   <template slot-scope="scope">
			  <el-button @click='create_data(scope.row.term_id,scope.row)' type="primary" plain>编辑</el-button>
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
<!-- 添加、编辑弹框 -->  
     <transition name="el-fade-in-linear">
        <div v-show="show" class="transition-box">
			<transition name="el-zoom-in-top">
              <el-card v-show="show" class="transition-boxs">
				  
				 <p style="font-size:20px;font-weight:600;text-align:center;margin-bottom:30px;margin-top:10px;">添加/编辑服务期</p>  
				 <div class="box_call">
					 <div style="width:400px;float:right;height:100%;">
						 <el-select style='width:125px;' @change='cs_click2' v-model="cs_val2" placeholder="请选择城市">
						    <el-option v-for="(item,index) in cs_box2" :key="item.city_id" :label="item.city_name" :value="item"></el-option>
						 </el-select>
						 <el-select style='width:125px;'  @change='qy_click2' v-model="qy_val2"  placeholder="请选择区域">
						    <el-option v-for="(item,index) in qy_box2" :key="item.region_id" :label="item.region_name" :value="item"></el-option>
						 </el-select>
						 <el-select style='width:125px;'  @change='jd_click2' v-model="jd_val2"  placeholder="请选择街道">
						    <el-option v-for="(item,index) in jd_box2" :key="item.street_id" :label="item.street_name" :value="item"></el-option>
						 </el-select>
					 </div><p>*城市区域：</p>
				 </div> 
				 
				  <div class="box_call">
				 	  <div class="box_call_c"><el-date-picker style='width:385px;' v-model="yuer_date"  align="right" type="year"  placeholder="选择学年"></el-date-picker></div> 
				 	 <p>*学年：</p>
				 </div>  
				 
				 <div class="box_call">
						  <div class="box_call_c"><el-select style='width:385px;' v-model="sh_val" clearable placeholder="请选择学期">
						      <el-option :label="'秋学期'" :value="'秋学期'"></el-option>
							  <el-option :label="'春学期'" :value="'春学期'"></el-option>
						  </el-select></div> 
				 	 <p>*学期：</p>
				 </div>
				 
				 <div class="box_call">
				 		<div class="box_call_c">
						  <el-date-picker  style='width:385px;' value-format='yyyy-MM-dd' format='yyyy-MM-dd'
      						v-model="value6" type="daterange" :unlink-panels='false' range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
						  </el-date-picker>
						</div> 
				 	 <p>*学期时间段：</p>
				 </div>
				
				<div style="width:180px;height:40px;margin:40px auto;">
					   <el-button @click='show=false' style='float:left;' type="info">取消</el-button>
					   <el-button @click='create_put_act' style='float:right;' type="primary">提交</el-button>
				</div>
			  </el-card>
           </transition>
		</div>
      </transition>
  <!--  -->
  </el-card>
</div>
</template>

<script>
	import store from "../../../vuex/store.js";
     export default {
	  data(){
	    return {
		  value5:'',//赛选列表的学年
		  yuer_date:'',//学年
		 
		  value6:'',//学期时间段
		  
		  show:false,
		  input:[],
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
		   loading:true,
		   
		   cs_box2:[],
		   qy_box2:[],
		   jd_box2:[],
		   cs_val2:'',
		   qy_val2:'',
		   jd_val2:'',
		   cs_id2:'',
		   qy_id2:'',
		   jd_id2:'',
		   region_box2:[],
		   act_id:'',
		   
		   pages_in:1,
		   
		   put_num:true,
	    }
	  },
		
	methods:{
		
		//添加服务
		create_data(i,imed){
			this.act_id = i;
			this.show=true;
			if(i==''){//判断为添加
			  this.qy_val2 = '';
			  this.qy_id2 = '';
			  this.jd_val2 = '';
			  this.jd_id2 = '';
			  this.yuer_date = '';
			  this.sh_val = '';
			  this.value6 = ['2019-07-10','2019-08-10'];
			}else{//判断为编辑
			 this.cs_val2 = imed.city_name;
			  this.cs_id2 = imed.city_id;
			this.qy_fn2()
			 this.qy_id2 = imed.region_id;
			 this.qy_val2 = imed.region_name;
			this.jd_fn2()
			 this.jd_val2 = imed.street_name;
			 this.jd_id2 = imed.street_id;
			 
			 this.sh_val = imed.period==1?"秋学期":"春学期";
			 // this.value6= [new Date(imed.start_time_format),new Date(imed.end_time_format)];
			 this.yuer_date =  new Date(imed.year+'-01'+'-01');
			 
			 this.value6= [imed.start_time_format,imed.end_time_format];
			 // this.yuer_date = imed.year
			 
			}
		},
		
		create_put_act(){//添加、编辑数据
			if(this.jd_id2){}else{this.$message({message:'请选择区域街道！',type:'warning'});return false}
			if(this.yuer_date){}else{this.$message({message:'请选择学年！',type:'warning'});return false}
			if(this.sh_val){}else{this.$message({message:'请选择学期！',type:'warning'});return false}
			if(this.value6){}else{this.$message({message:'请选择学期时间段！',type:'warning'});return false}
			
			var tr = this.yuer_date;
			if(typeof this.yuer_date=='string'){}else{this.yuer_date = tr.getFullYear()+''};
			// if(typeof this.value6[0]=='string'){}else{
			// 	this.value6[0] = this.value6[0].getFullYear()+'-'+(this.value6[0].getMonth()+1)+'-'+this.value6[0].getDate();
			// 	this.value6[1] = this.value6[1].getFullYear()+'-'+(this.value6[1].getMonth()+1)+'-'+this.value6[1].getDate()
			// }
			
			if(this.put_num){
				this.put_num=false
			   window.setTimeout(()=>{
			 	this.put_num = true;
			   },3000)
			}else{
				return false;
			}
			
		    let type = this.act_id==''?'post':'put';
			let id = this.act_id==''?'':'/'+this.act_id
			this.$axios({method:type,url:store.state.url_data+'/api/terms'+id,
			  data:{
				 city_id:this.cs_id2+'',
				 region_id:this.qy_id2+'',
				 street_id:this.jd_id2+'',
				 city_name:this.cs_val2,
				 region_name:this.qy_val2,
				 street_name:this.jd_val2,
				 year:this.yuer_date,//年份
				 period:this.sh_val=='秋学期'?1:2,//1秋学期  2春学期
				 title:this.yuer_date+this.sh_val,//学期名字
				 start_time:this.value6[0],//学期开始时间
				 end_time:this.value6[1]//学期结束时间
			  },
			  headers:{'Authorization':'Bearer '+localStorage.token}}
			   ).then(res=>{
				  console.log(res.data)
			     if(res.data.code==201||res.data.code==200){
					 this.$message({message:'提交成功',type:'success'});
					 this.git_act(this.pages_in);
					 this.show=false;
				  }}).catch(error=> {

						if (error.response) {
							this.$message.error(error.response.data.message)

						} else {
							this.$message.error('发生了错误！')
							this.put_num=true;
							this.show=false;
						}


				  });
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
		
		
	   //分页相关函数
	   handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
		this.git_act(val);
		this.pages_in = val;
      },
	  lx_cl(i){
	  		
			this.git_act(1)
	  },
	  zt_cl(i){
		 
		  this.git_act(1)
	  },
	
	  
	//获取列表数据函数
	  git_act(pages){
		    this.loading = true;
	  		this.$axios({method:'get',url:store.state.url_data+'/api/terms',
			  params:{
				period:this.lx_val=='秋学期'?1:(this.lx_val=='春学期'?2:''),
				year:this.value5,
				// city_id:localStorage.cs_id,
				// region_id:this.qy_id,
				// street_id:this.jd_id,
				title:this.masg_val,
				page:pages
			  },
			  headers:{'Authorization':'Bearer '+localStorage.token}}
	  		     ).then(res=>{
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
		this.cs_fn2()
		
		
		this.git_act(1);
		
	  }
	};
	
</script>
<style scoped="scoped">
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
		padding-right: 20px;
	}
	
	.transition-boxs{
		width: 600px;
		height: 420px;
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
