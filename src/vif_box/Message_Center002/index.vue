<template>
	<!-- 消息中心 -->
	<div style="width:100%;">
	  <el-card v-loading="loading" class="box-card"  style="padding:0;margin:20px;padding-bottom: 20px;">
		<div style="width:100%;margin-bottom:10px;float: left;">
            <el-select class='tab_c' @change='ly_cl' v-model="ly_val" clearable placeholder="请选择来源">
               <el-option v-for="(item,index) in ly_box" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
			
			<el-select class='tab_c' @change='lx_cl' v-model="lx_val" clearable placeholder="请选择类型">
			   <el-option v-for="(item,index) in lx_box" :key="index" :label="item.name" :value="item.id"></el-option>
			</el-select>
			
			<div class='inp_a'><el-input placeholder="请输入内容" v-model="masg_val" clearable></el-input></div>
            <el-button @click='git_act(1)' class='tab_c' type="primary">搜索</el-button>
		</div>
		
   <div style="width:100%;float: left;">
	<el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%"@selection-change="handleSelectionChange">
		
       <el-table-column type="selection" width="100" align='center' header-align='center'></el-table-column>
       <el-table-column prop="updated_at" align='center' header-align='center' label="时间"><template slot-scope="scope">{{ scope.row.updated_at }}</template></el-table-column>
       <el-table-column prop="src_name" align='center' header-align='center' label="来源" ></el-table-column>
			 
       <el-table-column prop="message" class='tds' align='center' header-align='center'  label="消息内容" show-overflow-tooltip></el-table-column>
       <el-table-column prop="type_name" align='center' header-align='center' label="类型" ></el-table-column>
       <el-table-column  label="操作" align='center' header-align='center'>
		   <template slot-scope="scope">
			  <el-button @click='xiang("delete",scope.row.message_id,scope.row)' type="primary" :loading="btn_log" plain>详情</el-button>
			  <el-button @click='del_click("delete",scope.row.message_id)' type="danger" plain>删除</el-button>
	       </template>
	   </el-table-column>
     </el-table>
  <div style="margin-top: 20px;">
        <!-- <el-button @click='all_del_du("read")' type="success">批量已读</el-button> -->
		<el-button @click='all_del_du("delete")' type="danger">批量删除</el-button>
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
	 
<!-- 查看详情弹窗 11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111-->
	  <transition name="el-fade-in-linear">
        <div v-show="show_meng" class="transition-box">
		   <transition name="el-zoom-in-top">
             <div v-show="show_meng" class="transition-box_child" style="position: relative;">
				<div style="width: 100%;height:87%;overflow:auto;margin-bottom:20px;"> 
				  <p class="p_title">运营中心你好：</p>
				  <div class="tit_val">{{xiang_value}}</div>
			      <div style="width:100%;height:30px;"><p class="ming">{{xiang_ly}}</p></div>
				  
				  <div v-if="student_name" style="width:100%;height:30px;"><p class="ming">{{student_name}}</p></div>
				  <div v-if="shool_name" style="width:100%;height:30px;"><p class="ming">{{shool_name}}</p></div>
				  <div v-if="iphone_s" style="width:100%;height:30px;"><p class="ming">{{iphone_s}}</p></div>
				  
			      <div style="width:100%;height:30px;position:relative;"><p class="ming">{{xiang_date}}</p></div>
				 </div>
				 <div style='margin:0px auto;width:160px;height:40px;'>
					 <el-button style='float:left;' @click="show_meng=false" type="info">关闭</el-button>
					 <el-button style='float:right;' :disabled='hui_show==false' @click='dialogTableVisible=true' type="primary">回复</el-button>
				</div>
			  </div>
           </transition>
		</div>
      </transition>
<!-- 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111 --> 

<!-- 回复消息弹窗 -->
<el-dialog :title="message_title" :visible.sync="dialogTableVisible">
  <textarea v-model="textareax" style='' cols="30" rows="10" maxlength="500" style="width: 100%;height: 300px;border:1px solid #dcdfe6;border-radius:3px;padding:10px;" placeholder="请输入内容(不超过500字)"></textarea>
  <div style="width:100%;height:20px;"><p style="float:right;color:#606266;line-height:20px;">{{textareax.length}}/500</p></div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogTableVisible = false">取 消</el-button>
    <el-button type="primary" @click="go_message">确 定</el-button>
  </div>
</el-dialog>

<!-- 发送消息弹窗 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111 --> 
    <el-dialog title="发送消息" width='50%' :visible.sync="dialogTableVisibles2">
       <tomesssage ref='to_message' :fatherMethod="message_show"></tomesssage>
      <div slot="footer" class="dialog-footer">
        <el-button @click="message_show">取 消</el-button>
        <el-button type="primary" @click="$refs.to_message.to_msg()">发送</el-button>
      </div>
    </el-dialog>
<!-- 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111 -->    

  </div>
  </el-card>
</div>
</template>

<script>
	import store from "../../vuex/store.js";
	import tomessage from './to_message.vue';
     export default {
	  data(){
	    return {
		   btn_log:false,
		   student_name:'',
		   iphone_s:'',
		   shool_name:'',
		   
		   hui_show:false,
		   textareax:'',
		   message_title:'',
		   dialogTableVisible:false,
		   dialogTableVisibles2:false,//发送消息弹窗
		   show_meng:false,
		   total_01:0,//分页-总条数
	       ly_val:'',
		   ly_id:'',//来源id
		   ly_box:[],
		   lx_box:[],
		   lx_id:'',//类型id
		   lx_val:'',
		   masg_val:'',//搜索输入框数据
		   tableData3:[],//列表数据
           multipleSelection: [],
		   xiang_value:'',
		   xiang_ly:'',
		   xiang_date:'',
		   loading:false,
		   pages:1,
		   item_box:'',
		   
		   put_num:true,
	    }
	  },
	  components:{//声明==》子组件的名字
	  	'tomesssage':tomessage
	  },
	  methods:{
		  message_show(){//关闭发送消息弹窗
			this.dialogTableVisibles2 = false;
		  },
		  
		  go_message(){//回复消息
			 if(this.textareax){}else{this.$message({ message: '请填写内容', type: 'warning' });return false}
			 
			 if(this.put_num){
				 this.put_num = false;
				 window.setTimeout(()=>{
					this.put_num = true;
				 },3000)
			 }else{return false;}
			 
			 this.$axios({method:'post',url:store.state.url_data+'/api/messages',
			 		      data:{
							  'dest_id':this.item_box.src_id,
							  'dest_name':this.item_box.src_name,
							  'dest_type':this.item_box.src_type,
							  'dest_type_name':this.item_box.src_type_name,
							  'message':this.textareax,
							  'type':this.item_box.type
						  },
			 		      headers:{'Authorization':'Bearer '+localStorage.token}}
			 		      ).then(res=>{
							console.log(res.data);
			 		        if(res.data.code==201){
			 					   this.$message({ type:'success',message:'回复成功!'});
								   this.dialogTableVisible = false;
								   this.git_act(this.pages);
								   this.textareax = '';
			 		   		}
			 }).catch(error=> {});   
		  },
		  
		  //单个删除||已读
		   del_du(type,id,num){
		  		this.$axios({method:type,url:store.state.url_data+'/api/messages/'+id,
		  				      data:{'type':type,'ids':this.multipleSelection},
		  				      headers:{'Authorization':'Bearer '+localStorage.token}}
		  				      ).then(res=>{
		  				        if(res.data.code==200){
								   if(type=='delete'){
									   this.$message({ type:'success', message: '删除成功!'});
								   }
								     if(num!=1){
										 this.git_act(this.pages);
									 }
		  				   		}
		  				      }).catch(error=> {});  
		   },
		   
		   //删除按钮被点击
		   del_click(type,id){
		  		this.$confirm('确定要删除选中的消息吗?', '提示', {
		  		  confirmButtonText: '确定',
		  		  cancelButtonText: '取消',
		  		  type: 'warning'
		  		}).then(() => {
		  			this.del_du(type,id);
		  		}).catch(() => {});  
		   },
		   
		  //详情按钮被点击 
		xiang(type,id,i){
			this.btn_log = true;
			this.student_name= ''; this.iphone_s='';this.shool_name='';
			 this.$axios({method:'get',url:store.state.url_data+'/api/messages/'+id,headers:{'Authorization':'Bearer '+localStorage.token}}
			    ).then(res=>{
					this.btn_log = false;
			       console.log(res.data,'详情数据');
			       if(res.data.code==200){
					   this.student_name = res.data.data.student.name;
					   this.iphone_s = res.data.data.student.contact1_phone;
					   this.shool_name = res.data.data.student.school_name;
					   
			 		}
			    }).catch(error=> {
					this.btn_log = false;
					if (error.response) {
						let response=error.response.data;
						// this.$message({message: response.message, type: 'error' });
					}
				});
				this.del_du('put',id,1);//执行已读事件
				this.xiang_value = i.message;
				this.xiang_ly = i.src_type_name;
				this.xiang_date = i.created_at;
				this.show_meng = true;
				this.message_title = '回复'+i.src_name;
				this.item_box = i;
				this.hui_show = i.type==24||i.type==25||i.type==26?true:false;
		   },
		  
	   //列表勾选项，数据函数
       handleSelectionChange(val) {
		  // console.log(val);
		  let id = [];
		  for(var i=0;i<val.length;i++){
			  id.push(val[i].message_id);
		  }
         this.multipleSelection = id;
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
	  
	  ly_cl(i){
		// console.log(i);
		this.ly_id = i;
		this.git_act(1)
	  },
	  lx_cl(i){
	  		// console.log(i);
	  		this.lx_id = i;
			this.git_act(1)
	  },
	  
	//获取来源函数
	  git_ly(){
		  this.$axios({method:'get',url:store.state.url_data+'/api/messageSourceTypes',headers:{'Authorization':'Bearer '+localStorage.token}}
		     ).then(res=>{
		        // console.log(res.data,'来源数据');
		       if(res.data.code==200){
				   this.ly_box = res.data.data;
			   }
		     }).catch(error=> {});
	  },
	  
	//获取类型函数
	  git_lx(){
		  this.$axios({method:'get',url:store.state.url_data+'/api/messageTypes',headers:{'Authorization':'Bearer '+localStorage.token}}
		     ).then(res=>{
		        // console.log(res.data,'类型数据');
		       if(res.data.code==200){
				   this.lx_box = res.data.data;
			   }
		     }).catch(error=> {});
	  },
	  GetDateStr(AddDayCount){//获取今天前后的时间
	       var dd = new Date();
	       dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
	       var y = dd.getFullYear();
	       var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
	       var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
	       return y+"-"+m+"-"+d;
	  },
	  
	//获取列表数据函数
	  git_act(pages){

				this.loading = true;
	  		  this.$axios({method:'get',url:store.state.url_data+'/api/messages',
			  params:{
				page:pages,
				src_type:this.ly_id,
				dest_type:1,
				src_name:this.masg_val,
				// is_read:0,
				type:this.lx_id,
				// before_time:this.GetDateStr(-7),
			  },
			  headers:{'Authorization':'Bearer '+localStorage.token}}
	  		     ).then(res=>{
	  		        console.log(res.data,'数据');
					this.loading = false;
	  		       if(res.data.code==200){
					   this.tableData3 = res.data.data;
					   this.total_01 = res.data.meta.total;
					   if(res.data.data.length==0&&pages>1){
					   		 this.git_act(pages-1);
					   }
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
	 
	 ////批量删除与批量已读
	  all_del_du(type){
		if(this.multipleSelection.length==0){
			return false;
		}
		let val = (type=='read')?'已读':'删除';
        this.$confirm('确定要批量'+val+'选中的消息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
		   this.$axios({method:'patch',url:store.state.url_data+'/api/messages',
		      data:{'type':type,'ids':this.multipleSelection},
		      headers:{'Authorization':'Bearer '+localStorage.token}}
		      ).then(res=>{
		        if(res.data.code==200){
		   		    this.$message({
		   		      type:'success',
		   		      message: val+'成功!'
		   		    });
					this.git_act(this.pages);
					// this.fatherMethod();//调用父组件事件
		   		}
		      }).catch(error=> {});  
        }).catch(() => {});
	  },
	  
	  
	  
	  },
	  mounted(){
		
		this.git_ly();
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
		margin-bottom: 40px;
		margin-top: 40px;
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
