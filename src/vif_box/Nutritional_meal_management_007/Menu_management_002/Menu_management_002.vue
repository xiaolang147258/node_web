<template>
	<!-- 餐单管理 -->
	<div style="width:100%;">
	   <el-card v-loading="loading" class="box-card"  style="padding:0;margin:20px;padding-bottom: 20px;">
		<div style="width:100%;margin-bottom:10px;float: left;">
           
			<el-select class='tab_c'  @change='lx_cl' style='width:150px;' v-model="lx_val" clearable placeholder="用餐类型">
			   <el-option :label="'月度用餐'" :value="'月度用餐'"></el-option>
				 <el-option :label="'学期用餐'" :value="'学期用餐'"></el-option>
			</el-select>
			
			<div class='inp_a' style='width:150px;'><el-input placeholder="请输入餐单标题" v-model="masg_val" clearable></el-input></div>
            <el-button @click='git_act(1)' class='tab_c' type="primary">搜索</el-button>
			
			<el-button @click='create_date("")' style='float:right;' type="primary" >添加</el-button>
		</div>
		
   <div style="width:100%;float: left;">
	<el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%">
       
	   <el-table-column prop="sku_name" align='center' header-align='center' label="标题" ></el-table-column>
       <el-table-column prop="price" class='tds' align='center' header-align='center'  label="金额" ></el-table-column>
       <el-table-column prop="supplier.name" align='center' header-align='center' label="供应商名称" ></el-table-column>
	     <el-table-column prop="" class='tds' align='center' header-align='center'  label="状态" show-overflow-tooltip>
	   		   <template slot-scope="scope">
						 上架
	   			        <!-- <el-button @click='create_date(scope.row.sku_id)' type="primary" plain>编辑</el-button> -->
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
   
   <!-- 添加标签 11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111-->
   	  
  </el-card>
</div>
</template>

<script>
	import store from "../../../vuex/store.js";
     export default {
	  data(){
	    return {
		  input_val:'',
		   total_01:0,//分页-总条数
		   ye_s:[15],
		   
		   lx_box:[],
		   lx_id:'',//类型id
		   lx_val:'',
		   
		   masg_val:'',//搜索输入框数据
		   
		   tableData3:[],//列表数据
		   
       multipleSelection:[],
		   loading:true,
	    }
	  },
		
	methods:{
	  create_date(i){//添加||编辑被点击
		     sessionStorage.sku_ids = i;
		     this.$router.push({path:'/add_Menu_management_002'});
	  },
   
//提交数据
         
	   //分页相关函数
	   handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
		this.git_act(val);
      },
	  lx_cl(i){
			this.git_act(1)
	  },
	 
	//获取列表数据函数
	  git_act(pages){
			  this.loading = true;
	  		this.$axios({method:'get',url:store.state.url_data+'/api/skus',
			  params:{
				page:pages,
				search:this.masg_val,
				period_type:this.lx_val=='月度用餐'?1:2,
				
			  },headers:{'Authorization':'Bearer '+localStorage.token}}).then(res=>{
	  		      console.log(res.data,'数据');
					this.loading = false;
	  		     if(res.data.code==200){
					   this.tableData3 = res.data.data;
					   this.total_01 = res.data.meta.total;
	  			   }
	  		  }).catch(error=>{
						if (error.response) {
							 this.loading = false;
						   console.log(error.response);
						   if(error.response.status==403){
								this.$notify({ title: '警告', message: '账号异常请重新登录',type: 'warning'});this.$router.push('/login');
							 }else{this.$message({message:'发生了错误，请联系技术中心！',type:'warning'})}
						 }
					});
	  },
	 
	 },
	  mounted(){
		
		this.git_act(1);
		
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
