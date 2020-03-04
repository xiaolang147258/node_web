<template>
	<!-- 课程库管理 -->
	<div style="width:100%;">
	  <el-card v-loading="loading" class="box-card"  style="padding:0;margin:20px;padding-bottom: 20px;">
		<div style="width:100%;margin-bottom:10px;float: left;">
            
			<el-select class='tab_c' @change='lx_cl' v-model="lx_val" clearable placeholder="请选择类型">
			   <el-option v-for="(item,index) in lx_box" :key="index" :label="item.name" :value="item.id"></el-option>
			</el-select>
			
			<div class='inp_a'><el-input placeholder="请输入课程名称" v-model="masg_val" clearable></el-input></div>
            <el-button @click='git_act(1)' class='tab_c' type="primary">搜索</el-button>
			
			 <el-button @click='course_create_put("")' style='float:right;margin-right:10px;' type="primary">添加课程</el-button>
		</div>
		
   <div style="width:100%;float: left;">
	<el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%">
		
	    <el-table-column prop="city_name" align='center' header-align='center' label="城市" ></el-table-column>
		<el-table-column prop="region_name" align='center' header-align='center' label="区域" ></el-table-column>
		<el-table-column prop="street_name" align='center' header-align='center' label="街道" ></el-table-column>
		<el-table-column prop="title" align='center' header-align='center' label="平台课程名称" ></el-table-column>
		<el-table-column prop="name" align='center' header-align='center' label="课程名称" ></el-table-column>
	    <el-table-column prop="category_name" align='center' header-align='center' label="课程门类" ></el-table-column>
       <el-table-column prop="source_name" align='center' header-align='center' label="所属单位"></el-table-column>
       <!-- <el-table-column prop="target" align='center' header-align='center' label="课程目标" show-overflow-tooltip></el-table-column> -->
	   
       <el-table-column prop="message" class='tds' align='center' header-align='center' label="适合年级" >
		   <template slot-scope="scope">
	           {{scope.row.min_grade}} — {{scope.row.max_grade}}
	        </template>
	   </el-table-column>
	   
       <el-table-column prop="type_name" align='center' header-align='center' label="适合人数" >
		    <template slot-scope="scope">
		       {{scope.row.min_students}} — {{scope.row.max_students}}
		    </template>
	   </el-table-column>
	   
       <el-table-column  label="操作" align='center' header-align='center'>
		   <template slot-scope="scope">
			   <el-button  @click='course_create_put(scope.row.course_id)' type="primary" plain>编辑</el-button>
	       </template>
	   </el-table-column>
	   
     </el-table>
  <div style="margin-top: 20px;">
       
<!-- 分页插件 :current-page="currentPage4" -->
	<div style="float:right;margin-right:10px;">
       <el-pagination background @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
       :page-sizes="[15]"
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
	import store from "../../../vuex/store.js";
     export default {
	  data(){
	    return {
		   show_meng:false,
		   total_01:0,//分页-总条数
	       
		   lx_box:[],
		   lx_id:'',//类型id
		   lx_val:'',
		   
		   masg_val:'',//搜索输入框数据
		    
		   tableData3:[],//列表数据
			  
           multipleSelection: [],
		   
		   xiang_value:'',
		   xiang_ly:'',
		   xiang_date:'',
		   loading:true,
	    }
	  },

	  methods:{
		//跳转添加||编辑页面
		course_create_put(id){
			sessionStorage.course_id = id;
			this.$router.push({path:'/add_course'});
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
	  		this.lx_id = i;
			this.git_act(1)
	  },
	  
	//获取类型函数
	  git_lx(){
		  this.$axios({method:'get',url:store.state.url_data+'/api/courseCategories',headers:{'Authorization':'Bearer '+localStorage.token}}
		     ).then(res=>{
		        console.log(res.data,'类型数据');
		       if(res.data.code==200){
				   this.lx_box = res.data.data;
			   }
		     }).catch(error=> {});
	  },
	
	  
//获取列表数据函数
	  git_act(pages){
		      this.loading = true;
	  		  this.$axios({method:'get',url:store.state.url_data+'/api/courses',
			  params:{
				page:pages,
				search:this.masg_val,
				category_id:this.lx_id,
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
				  		 this.$notify({
				          title: '警告',
				          message: '账号异常请重新登录',
				          type: 'warning'
				        });
				  		 this.$router.push('/login')
				  	 }
				   }
			  });
	  },
	  
	  },
	  mounted(){
		this.git_lx();
		this.git_act(1);
	  }
	};
	
</script>
<style scoped="scoped">
	.ming{
		float:right;
		line-height: 30px;
		margin: 0;
		margin-right:40px;
	}
	.tit_val{
		width: 70%;
		margin: 30px auto;
		/* background: red; */
		text-align:justify;
		line-height: 30px;
		margin-bottom: 80px;
		margin-top: 60px;
	}
	.p_title{
		font-size: 15px;
		/* width: 100%; */
		margin: 0px 0 50px 40px;
		font-weight: 600;
	}
	.transition-box_child{
		width: 70%;
		height: 90%;
		margin: 2% auto;
		background: white;
		border-radius:5px;
		overflow:auto;
		padding-top:30px;
		
		
	}
	.transition-box{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 500;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.5);
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
