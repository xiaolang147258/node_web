<template>
	<!-- 学校管理 -->
	<div style="width:100%;">
	   <el-card v-loading="loading" class="box-card"  style="padding:0;margin:20px;padding-bottom: 20px;">
		<div style="width:100%;margin-bottom:10px;float: left;">
           
			
			
			<el-select class='tab_c' @change='zt_cl' v-model="sh_val" clearable placeholder="请选择课程状态">
			   <el-option  :label="'开启'" :value="'开启'"></el-option>
			   <el-option  :label="'关闭'" :value="'关闭'"></el-option>
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
			
			<div class='inp_a'><el-input placeholder="请输入学校名字" v-model="masg_val" clearable></el-input></div>
            <el-button @click='git_act(1)' class='tab_c' type="primary">搜索</el-button>
			 <el-button @click='add_xuexiao("")' style='float:right;margin-right:10px;' type="primary">添加学校</el-button>
		</div>
		
   <div style="width:100%;float: left;">
	<el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%">
	       <!-- <el-table-column type="selection" width="100" align='center' header-align='center'></el-table-column> -->
	       <el-table-column prop="created_at" align='center' header-align='center' label="学校名称"><template slot-scope="scope">{{ scope.row.name }}</template></el-table-column>
	       
		   
		   <el-table-column prop="city_name" align='center' header-align='center' label="个性化课程" >
			   <template slot-scope="scope">
				 <el-switch v-model="scope.row.is_course==1?true:false" @change='gun_bi("is_course",scope.row.school_id,scope.row.is_course)' active-color="#13ce66" inactive-color="#ff4949"></el-switch>
			   </template>
		   </el-table-column>
		   
		   
		   <!-- <el-table-column prop="region_name" class='tds' align='center' header-align='center'  label="学校一键排课" >
			    <template slot-scope="scope">
				<el-switch v-model="scope.row.can_arrange==1?true:false" @change='gun_bi("can_arrange",scope.row.school_id,scope.row.can_arrange)' active-color="#13ce66" inactive-color="#ff4949"></el-switch>	
			   </template>
		   </el-table-column> -->
		   
		   <el-table-column prop="street_name" align='center' header-align='center' label="普惠午托" >
			    <template slot-scope="scope">
			   		<el-button  @click='put_click(scope.row,"选择午托套餐服务",0,scope.$index)' type="primary">设置</el-button>
					<!-- <el-button  @click='gun_bi("is_noon",scope.row.school_id,1)' type="danger">关闭</el-button> -->
			   </template>
		   </el-table-column>
		   
		   <el-table-column prop="street_name" align='center' header-align='center' label="午托开关" >
		   		    <template slot-scope="scope">
		   		   		<el-switch v-model="scope.row.is_noon==1?true:false" @change='gun_bi("is_noon",scope.row.school_id,scope.row.is_noon)' active-color="#13ce66" inactive-color="#ff4949"></el-switch>
		   		   </template>
		   </el-table-column>
		   
		   
		   <!-- <el-table-column prop="audit_type_name" class='tds' align='center' header-align='center'  label="营养餐" >
			    <template slot-scope="scope">
			   			     <el-button v-if='scope.row.is_food==1' @click='gun_bi("is_food",scope.row.school_id,0)' type="success">开启</el-button>
							 <el-button v-else type="danger" @click='gun_bi("is_food",scope.row.school_id,1)'>关闭</el-button>
			   </template>
		   </el-table-column> -->
		   
		   <el-table-column prop="audit_status_name" align='center' header-align='center' label="普惠晚托" >
			   <template slot-scope="scope">
			   			     <el-button  @click='put_click(scope.row,"选择晚托套餐服务",1)' type="primary">设置</el-button>
							 <!-- <el-button  @click='gun_bi("is_afternoon",scope.row.school_id,1)' type="danger">关闭</el-button> -->
			   </template>
		   </el-table-column>
		   
		    <el-table-column prop="audit_status_name" align='center' header-align='center' label="晚托开关" >
		   		   <template slot-scope="scope">
		   		   	   <el-switch v-model="scope.row.is_afternoon==1?true:false" @change='gun_bi("is_afternoon",scope.row.school_id,scope.row.is_afternoon)' active-color="#13ce66" inactive-color="#ff4949"></el-switch>
		   		   </template>
		   </el-table-column>
		   
		   <el-table-column prop="region_name" class='tds' align='center' header-align='center'  label="多服务" >
		   		    <template slot-scope="scope">
		   			<el-switch v-model="scope.row.white==1?true:false" @change='bai_bi(scope.row.school_id,scope.row.white)' active-color="#13ce66" inactive-color="#ff4949"></el-switch>	
		   		   </template>
		   </el-table-column>
		   
	<!-- 11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111 -->	   
		   <el-table-column prop="city_name" align='center' header-align='center' label="退款" >
		   		   <template slot-scope="scope">
		   			 <el-switch v-model="scope.row.is_refund==1?true:false" @change='gun_bi("is_refund",scope.row.school_id,scope.row.is_refund)' active-color="#13ce66" inactive-color="#ff4949"></el-switch>
		   		   </template>
		   </el-table-column>
		   
		   <el-table-column prop="" align='center' header-align='center' label="请假" >
		   		   <template slot-scope="scope">
		   			 <el-switch v-model="scope.row.is_leave==1?true:false" @change='gun_bi("is_leave",scope.row.school_id,scope.row.is_leave)' active-color="#13ce66" inactive-color="#ff4949"></el-switch>
		   		   </template>
		   </el-table-column>
	<!-- 11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111 -->	   
		    
		   
		   <el-table-column prop="city_name" align='center' header-align='center' label="城市" ></el-table-column>
	       <el-table-column prop="region_name" class='tds' align='center' header-align='center'  label="区域" ></el-table-column>
	       <el-table-column prop="street_name" align='center' header-align='center' label="街道" ></el-table-column>
		   <el-table-column prop="contact_name" class='tds' align='center' header-align='center'  label="联系人" ></el-table-column>
		   <el-table-column prop="contact_phone" align='center' header-align='center' label="手机号码" ></el-table-column>
		   
	       <el-table-column  label="操作" align='center' header-align='center'>
			   <template slot-scope="scope">
				  <el-button @click='add_xuexiao(scope.row.school_id)' type="primary" plain>编辑</el-button>
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
  
<!-- 普惠设置午托晚托弹框 -->
 <el-dialog :title="titles_box" width='60%' :visible.sync="dialogFormVisible">
   <!-- <p>{{shool_names}}</p> -->
	<p style="font-weight: 900; font-size: 18px">学校： {{shool_names}}</p>
   <el-tabs v-if='titles_box=="选择午托套餐服务"' v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="午托套餐" name="2">
		
<!-- 午托 -->		
	   <el-select v-model="value1" @change='wu_click' clearable placeholder="请选择午托套餐">
         <el-option v-for="item in value1_box" :label="item.sku_name" :value="item.sku_id"></el-option>
       </el-select>
	   


	  <el-form style='margin-top:10px;'>
	   	   <el-form-item label="托管类型:" :label-width="'80px'" style='height:20px;'>{{lunchhosting.sku_name}}</el-form-item>
	       <el-form-item label="开始时间:" :label-width="'80px'" style='height:20px;'>{{lunchhosting.start_format}}</el-form-item>
	       <el-form-item label="结束时间:" :label-width="'80px'" style='height:20px;'>{{lunchhosting.end_format}}</el-form-item>
	   	   <el-form-item label="托管天数:" :label-width="'80px'" style='height:20px;'>{{lunchhosting.total_days}}</el-form-item>
		   <el-form-item label="单价:" :label-width="'80px'" style='height:20px;'>{{lunchhosting.hosting_price}}</el-form-item>
		   <el-form-item label="金额:" :label-width="'80px'" style='height:20px;'>{{lunchhosting.total_price}}</el-form-item>
		<!-- <el-form-item label="时间段:" :label-width="'80px'" style='height:20px;'>
          <el-date-picker
		   v-model="date_value1"
			type="datetimerange"
			format='yyyy-MM-dd HH'
			value-format='yyyy-MM-dd HH'
			 start-placeholder="开始日期"
			  end-placeholder="结束日期"
			   :default-time="['12:00:00', '08:00:00']">
          </el-date-picker>
		</el-form-item> -->

	   </el-form>

	   
	</el-tab-pane>
	
<!-- 午托+营养餐 -->
    <el-tab-pane label="营养餐+午托 " name="5">
	<!-- 午托 -->	

	 <!-- <div style="width:30%;float:left;margin-right:3%;">-->
		 <div style="display: flex; ">
			 <div>
		  <el-select v-model="value1" @change='wu_click' clearable placeholder="请选择午托套餐">
		    <el-option v-for="item in value1_box" :label="item.sku_name" :value="item.sku_id"></el-option>
		  </el-select>
		 <el-form style='margin-top:10px;'>
		  	   <el-form-item label="托管类型:" :label-width="'80px'" style='height:20px;'>{{lunchhosting.sku_name}}</el-form-item>
	       <el-form-item label="开始时间:" :label-width="'80px'" style='height:20px;'>{{lunchhosting.start_format}}</el-form-item>
	       <el-form-item label="结束时间:" :label-width="'80px'" style='height:20px;'>{{lunchhosting.end_format}}</el-form-item>
	   	   <el-form-item label="托管天数:" :label-width="'80px'" style='height:20px;'>{{lunchhosting.total_days}}</el-form-item>
		   <el-form-item label="单价:" :label-width="'80px'" style='height:20px;'>{{lunchhosting.hosting_price}}</el-form-item>
		   <el-form-item label="金额:" :label-width="'80px'" style='height:20px;'>{{lunchhosting.total_price}}</el-form-item>
		  		<!-- <el-form-item label="时间段:" :label-width="'80px'" style='height:20px;'>
		     <el-date-picker
		  		   v-model="date_value1"
		  			type="datetimerange"
		  			format='yyyy-MM-dd HH'
		  			value-format='yyyy-MM-dd HH'
		  			 start-placeholder="开始日期"
		  			  end-placeholder="结束日期"
		  			   :default-time="['12:00:00', '08:00:00']">
		     </el-date-picker> -->
		  		</el-form-item>

		  </el-form>
		  </div>
	  <!--</div>-->
	<!-- 供应商 --> 
	 <!-- <div style="width:30%;float:left;margin-right:3%;">
		 <el-select v-model="value2" @change='yin_click' clearable placeholder="请选择供应商">
		    <el-option v-for="item in value2_box" :label="item.sku_name" :value="item.dining_sku_id"> </el-option>
		 </el-select>-->
		<!-- <el-form style='margin-top:10px;'>
		 	 <el-form-item label="所在区域:" :label-width="'80px'" style='height:20px;'>123</el-form-item>
		     <el-form-item label="所在镇街:" :label-width="'80px'" style='height:20px;'>12</el-form-item>
		 </el-form>-->
	  <!--</div>-->
	<!-- 营养餐 -->
		<!-- <div style="width:30%;float:left;">-->
			<div style="margin-left: 20px">
			  <el-select v-model="value2" @change='yin_click' clearable placeholder="请选择营养餐">
                  <el-option v-for="item in value2_box" :label="item.sku_name" :value="item.dining_sku_id"> </el-option>
               </el-select>
              <el-form style='margin-top:10px;'>
				  <el-form-item label="供应商:" :label-width="'80px'" style='height:20px;'>{{lunchFood.supplier_name}}</el-form-item>
                    <el-form-item label="用餐类型:" :label-width="'80px'" style='height:20px;'>{{lunchFood.sku_name}}</el-form-item>
                   <el-form-item label="开始时间:" :label-width="'80px'" style='height:20px;'>{{lunchFood.start_format}}</el-form-item>
                 <el-form-item label="结束时间:" :label-width="'80px'" style='height:20px;'>{{lunchFood.end_format}}</el-form-item>
                 <el-form-item label="用餐天数:" :label-width="'80px'" style='height:20px;'>{{lunchFood.total_days}}</el-form-item>
                 <el-form-item label="单价:" :label-width="'80px'" style='height:20px;'>{{lunchFood.dining_price}}</el-form-item>
                 <el-form-item label="金额:" :label-width="'80px'" style='height:20px;'>{{dining_total}}</el-form-item>
				 
               </el-form>
			</div>
	<!--  </div>-->
	</div>
	</el-tab-pane>
   </el-tabs>
   
<!-- 晚托  -->   
   <div v-else style="">
	   
	   <el-select v-model="value3" @change='wan_click' clearable placeholder="请选择晚托课程">
	     <el-option v-for="item in value3_box" :label="item.sku_name" :value="item.sku_id"></el-option>
	   </el-select>

<!--
	   <el-form style='margin-top:10px;'>

	   	   <el-form-item label="托管类型:" :label-width="'80px'" style='height:20px;'>123</el-form-item>
	       <el-form-item label="开始时间:" :label-width="'80px'" style='height:20px;'>12</el-form-item>
	       <el-form-item label="结束时间:" :label-width="'80px'" style='height:20px;'>123</el-form-item>
	   	   <el-form-item label="托管天数:" :label-width="'80px'" style='height:20px;'>123</el-form-item>
	   		   <el-form-item label="金额:" :label-width="'80px'" style='height:20px;'>1.00</el-form-item>
	   		<el-form-item label="时间段:" :label-width="'80px'" style='height:20px;'>
	      <el-date-picker
	   		   v-model="date_value1"
	   			type="datetimerange"
	   			format='yyyy-MM-dd HH'
	   			value-format='yyyy-MM-dd HH'
	   			 start-placeholder="开始日期"
	   			  end-placeholder="结束日期"
	   			   :default-time="['12:00:00', '08:00:00']">
	      </el-date-picker>
	   		</el-form-item>
	   </el-form> -->



   </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible=false">取 消</el-button>
    <el-button type="primary" @click="git_value">确 定</el-button>
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
		  date_value1:'',
		  date_value2:'',
		  
		  shool_names:'',	
		 
		  value1_box:[],//午托
		  value1:'',
		  value1_id:'',
		  
		  value2_box:[],//营养餐
		  value2:'',
		  value2_id:'',
		  
		  value3_box:[],//晚托
		  value3:'',
		  value3_id:'',
		  
		  activeName:'2',
		  sh_val:'',
		  sh_zt_box:[],
		  sh_zt_id:'',
		   total_01:0,//分页-总条数
		   ye_s:[15],
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
		   dialogFormVisible:false,
		   titles_box:'',
		   item_box:'',
		   period_types:'',
		   show_put:true,
		   lunchhosting: '',
		   lunchFood: '',
		   dining_total: '',
		    region_box:[],
	    }
	  },
		
	methods:{
		bai_bi(id,num){
			let data = {};data.white = num==0?1:0;

			this.$confirm('确定要修设置吗?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$axios({method:'put',url:store.state.url_data+'/api/schools/'+id,data,headers:{'Authorization':'Bearer '+localStorage.token}}
				).then(res=>{
					console.log(res.data)
					if(res.data.code==200){
						this.$message({message: '修改状态成功', type: 'success' });
						this.git_act(this.pages);
					}
				}).catch(error=> {
					if (error.response) {
						let response=error.response.data;
						this.$message({message: response.message, type: 'error' });
					}
				});
			}).catch(() => {});
		},
		
		yin_click(i){
			// this.value2 = i.sku_name;
			this.value2_id = i;
			// this.period_types = i.period_type;
			this.git_value1_2('noon')
		},
		wan_click(i){
			// this.value3 = i.sku_name;
			this.value3_id = i;
			// this.period_types = i.period_type;
		},
		wu_click(i){
			 // console.log(i);
			// this.value1 = i.sku_name;
			this.value1_id = i;
			this.git_value2();
			if(i == ""){
				this.lunchhosting = ""
			}else{
				this.value1_box.map( value => {
					if(value.sku_id == i){
						this.lunchhosting = value
					}
				})
			}
			
			// console.log(this.value1)
			// this.period_types = i.period_type;
		},
		
		//设置确认函数
		 git_value(){//id= noon 午托  afternoon 晚托
		    if(this.show_put){
				this.show_put = false;
				window.setTimeout(()=>{
					this.show_put = true;
				},3000)
			}else{return false}
			
		    let dates = '';
			if(this.titles_box=='选择午托套餐服务'){
			  if(this.activeName == 2){
				 if (this.value1_id) {} else { this.$message({ message: '请选择要托管的午托课程', type: 'warning' });return false };
				  dates= {
					noon_hosting_sku_id:this.value1_id,//午托id
					school_id: this.item_box.school_id,
					sku_type:2
				  }
			  }else{
				  if (this.value1_id) {} else { this.$message({ message: '请选择要托管的午托课程！', type: 'warning' }); return false };
				  if (this.value2_id) {} else { this.$message({ message: '请选择营养餐！', type: 'warning' }); return false };
				  dates= {
				  	noon_hosting_sku_id:this.value1_id,//午托id
				  	dining_sku_id:this.value2_id,
				  	school_id: this.item_box.school_id,
				  	sku_type:5
				  }
			  }
			}else{
				if (this.value3_id) {} else { this.$message({ message: '请选择晚托课程！', type: 'warning' }); return false };
				 dates= {
				 	afternoon_hosting_sku_id:this.value3_id,//晚托id
				 	school_id: this.item_box.school_id,
				 	sku_type:3
				 }
			}
		 	this.$axios({method:'post',url:store.state.url_data+'/api/puhuiSkus',data:dates,headers:{'Authorization':'Bearer '+localStorage.token}}
		 	   ).then(res=>{
		 		 console.log(res.data,'提交数据')
		 	     if(res.data.code==200){
					this.$message({message: '设置成功', type: 'success' });
					this.dialogFormVisible = false;
					this.git_act(this.pages);
				 }else{
					let box = res.data.data;let vals = '';for (var index in box){vals=box[index].join(' ')}this.$message.error(vals);
				 }
		 	   }).catch(error=> {
		 		if (error.response) {let response=error.response.data;this.$message({message:response.message, type:'error'});}
		 	});
		 },
		
		//查询当前数据		
			put_value(num){
				   this.$axios({method:'get',url:store.state.url_data+'/api/puhuiSkus/'+this.item_box.school_id+'?is_afternoon='+num,headers:{'Authorization':'Bearer '+localStorage.token}}
				      ).then(res=>{
						   console.log(res.data,'设置展示数据')
						   if(res.data.data == null){
								this.lunchhosting = ""
							}
				        if(res.data.code==200){
							
							console.log(this.titles_box)
							this.activeName = res.data.data.sku_type+'';
							for(var i in this.value1_box){
								if(this.value1_box[i].sku_id==res.data.data.noon_hosting_sku_id){
									this.value1 = this.value1_box[i].sku_name;
								}
							}
							
							this.value1_box.map( value => {
								if(value.sku_id == res.data.data.noon_hosting_sku_id){
									this.lunchhosting = value
								}
							})
							this.value1_id = res.data.data.noon_hosting_sku_id;
							// console.log(res.data.data.dining_sku_id,'后台传过来的');
							for(var i in this.value2_box){
								// console.log(this.value2_box[i].sku_id,'营养餐数据')
								if(this.value2_box[i].dining_sku_id==res.data.data.dining_sku_id){
									this.value2 = this.value2_box[i].sku_name;
								}
							}
							this.value2_id = res.data.data.dining_sku_id;
							
							console.log(res.data.data.afternoon_hosting_sku_id,'后台传过来的');
							for(var i in this.value3_box){
								console.log(this.value3_box[i].sku_id);
								if(this.value3_box[i].sku_id==res.data.data.afternoon_hosting_sku_id){
									this.value3 = this.value3_box[i].sku_name;
								}
							}
							this.value3_id = res.data.data.afternoon_hosting_sku_id;
				   	    }
				      }).catch(error=> {
				   	if (error.response) {let response=error.response.data;this.$message({message: response.message, type: 'error' });}
				   });
		    },
		
		//获取午托数据
		git_value1_2(id) {//id= noon 午托  afternoon 晚托
			//-----justin 添加，如果拿过一次，就不需要重复再拿~
			// if (id == 'noon' &&this.value1_box.length>1) {
			// 	return false;
			// }

			// if (id == 'afternoon' &&this.value3_box.length>1) {
			// 	return false;
			// }
			if(this.value2_id == ""){
				this.lunchFood = ""
					this.dining_total = ""
			}else{
				this.value2_box.map(value => {
				if(value.dining_sku_id == this.value2_id){
					this.lunchFood = value
					this.dining_total = parseInt(this.lunchFood.dining_price*100)*this.lunchFood.total_days/100
				}
			})
			}
			
			this.$axios({
						method: 'get',
						url: store.state.url_data + '/api/hostingSkus/skusList?hosting_type=' + id+'&sku_id='+this.value2_id,
						headers: {'Authorization': 'Bearer ' + localStorage.token}
					}
			).then(res => {

				if (res.data.code == 200) {
					if (id == 'noon') {
						console.log(res.data, '午托数据')
						this.value1_box = res.data.data;
						// this.value1 = '23e29656-a226-439a-a010-f133a563bc28';
						// this.value1_box.push({sku_name:'无',sku_id:''})
					} else if (id == 'afternoon') {
						console.log(res.data, '晚托数据')
						this.value3_box = res.data.data;
						// this.value3_box.push({sku_name:'无',sku_id:''})
					}
				}
			}).catch(error => {
				if (error.response) {
					let response = error.response.data;
					this.$message({message: response.message, type: 'error'});
				}
			});
		},
		git_value2(){
			// if(this.value2_box.length!=0){return false}
			this.$axios({method:'get',url:store.state.url_data+'/api/diningSkus/skusList?sku_id='+this.value1_id,headers:{'Authorization':'Bearer '+localStorage.token}}
			   ).then(res=>{
				 console.log(res.data,'营养餐数据')
			     if(res.data.code==200){
					this.value2_box = res.data.data;
					if(!res.data.data.length || !this.value1_id){
						this.value2 = "";
						// this.value2_box.push({sku_name:'无',sku_id:''})
						this.lunchFood = ""
						this.dining_total = ""
					}else{
						this.value2 = res.data.data[0].dining_sku_id;
						// this.value2_box.push({sku_name:'无',sku_id:''})
						this.lunchFood = res.data.data[0]
						this.dining_total = parseInt(this.lunchFood.dining_price*100)*this.lunchFood.total_days/100
					}
					
				 }
			   }).catch(error=> {
				if (error.response){
					let response=error.response.data;
					this.$message({message:response.message,type:'error'});
				}
			});
		},
		
	    handleClick(tab, event) {
			if(this.activeName==5){
				this.git_value2();
			}
		},
		
		put_click(i,title,num){
		  
		  this.shool_names = i.name;
		  this.titles_box = title;
		  this.item_box = i;
		  this.dialogFormVisible = true;
		  this.value1='';this.value1_id='';this.value2='';this.value2_id='';this.value3='';this.value3_id='';this.activeName = '2'
		  this.put_value(num);
		},
		
		gun_bi(type,id,num){//关闭和开启按钮被点击
			 this.$confirm('确定要执行此操作吗?', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			}).then(() => {
			    
				console.log(type,id,num);
				let nums = num==1?0:1;
			    let data = {}
				if(type=='is_noon'){data.is_noon = nums};
				if(type=='is_afternoon'){data.is_afternoon = nums};
				if(type=='is_course'){data.is_course = nums};
				if(type=='can_arrange'){data.can_arrange = nums};
				if(type=='is_food'){data.is_food = nums};
				if(type=='is_leave'){data.is_leave = nums};
				if(type=='is_refund'){data.is_refund = nums};
				
				this.$axios({method:'put',url:store.state.url_data+'/api/schools/'+id,data,headers:{'Authorization':'Bearer '+localStorage.token}}
				   ).then(res=>{
					   console.log(res.data)
				     if(res.data.code==200){
						    this.$message({message: '修改状态成功', type: 'success' });
			                this.git_act(this.pages);
					 }
				   }).catch(error=> {
					if (error.response) {
						let response=error.response.data;
						this.$message({message: response.message, type: 'error' });
					}
				});
			  })	
		},
		
//添加学校		
		add_xuexiao(i){
			localStorage.school_id = i;
			this.$router.push({path:'/add_School_management'});
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
		this.pages = val
      },
	 
	  zt_cl(){
		  // this.sh_zt_id = i;
		  this.git_act(1)
	  },
	
	  
	//获取列表数据函数
	  git_act(pages){
		   this.loading = true;
	  		this.$axios({method:'get',url:store.state.url_data+'/api/schools',
			  params:{
				city_id:this.cs_id,
				region_id:this.qy_id,
				street_id:this.jd_id,
				is_course:this.sh_val=='关闭'?0:(this.sh_val=='开启'?1:''),
				search:this.masg_val,
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
		this.cs_fn();
		// this.git_act(1);
		//--justin添加
		this.git_value1_2('noon');
		this.git_value1_2('afternoon');
		this.git_value2()
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
