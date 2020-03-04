<template>
	<!-- 发送消息  -->
	<div style="width:100%;">
	 <el-form :model="form">
	   <el-form-item label="发送地区" :label-width="'120px'">
		   <el-select class='tab_c' v-model="se_val" placeholder="请选择省"><el-option :label="'广东省'" :value="'广东省'"></el-option></el-select>
           <el-select v-if='cs_box' class='tab_c' v-model="cs_val" placeholder="请选择城市">
              <el-option v-for="(item,index) in cs_box" :key="index" :label="item.city_name" :value="item.city_id"></el-option>
           </el-select>
           <el-select class='tab_c' @change='qy_click' v-model="qy_val" clearable placeholder="请选择区域">
              <el-option v-for="(item,index) in qy_box" :key="index" :label="item.region_name" :value="item.region_id"></el-option>
           </el-select>
           <el-select class='tab_c' @change='jd_click' v-model="jd_val" clearable placeholder="请选择街道">
              <el-option v-for="(item,index) in jd_box" :key="index" :label="item.street_name" :value="item.street_id"></el-option>
           </el-select>
        </el-form-item>
		<el-form-item label="发送对象" :label-width="'120px'">
		     <el-select class='tab_c' @change='sou_click' v-model="sou_val" placeholder="所有机构">
		        <el-option v-for="(item,index) in sou_box" :key="index" :label="item.name" :value="item.id"></el-option>
		     </el-select>
			 <el-select  class='tab_c' style='width:410px;' :disabled='sou_id==1||sou_id==2' v-model="value5" multiple filterable placeholder="请选择">
               <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
		 </el-form-item>
		<el-form-item label="消息类型" :label-width="'120px'">
		     <el-select class='tab_c' @change='lei_click' v-model="lei_val" placeholder="所有机构">
		        <el-option v-for="(item,index) in lei_box" :key="index" :label="item.name" :value="item.id"></el-option>
		     </el-select>
		 </el-form-item>
		<el-form-item label="消息内容" :label-width="'120px'">
		   <textarea v-model="textareax" style='' cols="30" rows="10" maxlength="500" style="width:550px;height:300px;border:1px solid #dcdfe6;border-radius:3px;padding:10px;" placeholder="请输入内容(不超过500字)"></textarea>
		 </el-form-item>
	   </el-form>
    </div>
</template>

<script>
	import store from "../../vuex/store.js";
     export default {
	  data(){
	    return {
		textareax:'',
		lei_box:[{name:'系统维护',id:1},{name:'重要通知',id:2},{name:'其他',id:3}],
		lei_val:'系统维护',
		lei_id:1,
		
		options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
         value5: [],//多选框选中的数据
		
		sou_box:[{name:'所有机构',id:1},{name:'所有学校',id:2},{name:'部分机构',id:3},{name:'部分学校',id:4}],//所有机构下拉数据
		sou_val:'所有机构',
		sou_id:1,
			
			form:{},
			// 城市区域街道
			cs_box:[],
			qy_box:[],
			jd_box:[],
			se_val:'广东省',
			cs_val:'',
			qy_val:'',
			jd_val:'',
			cs_id:'',
			qy_id:'',
			jd_id:'',
			
		}
	  },
	 props: {
      fatherMethod: {
        type: Function,
        default: null
      }
     },
	  methods:{
		
		to_msg(){//执行发送消息函数
		    if(this.qy_id!=''&&this.jd_id!=''){}else{this.$message.error('请选择城市区域街道！');return false;}
			if(this.sou_id==3||this.sou_id==4){
				if(this.value5.length==0){this.$message.error('请选择机构(学校)！');return false;}
			}
			if(this.textareax==''){this.$message.error('请填写消息内容！');return false;}
			
			console.log('发送消息');
			this.fatherMethod();//关闭弹窗
		},
		
		lei_click(i){//消息类型被点击
			this.lei_id = i;
		},
		sou_click(i){//所有机构被点击
			this.sou_id = i;
		},
		
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
				//城市区域街道函数
				cs_fn(){//城市数据
				   this.$axios({method:'get',url:store.state.url_data+'/api/regions',params:{type:'city',id:440},headers:{'Authorization':'Bearer '+localStorage.token}}
				      ).then(res=>{
				        if(res.data.code==200){
				   		  for (var i = 0; i < res.data.data.length; i++) {
				   		  		if(localStorage.cs_id==res.data.data[i].city_id){
				   		  			this.cs_box = [];this.cs_box.push(res.data.data[i]);
									    this.cs_val = res.data.data[i].city_name;
				   		  		}
				   		  }; 
						  this.qy_fn();//获取区域数据
				   		}
				      }).catch(error=> {});
				},
				
				//获取区域数据
				qy_fn(){
				   this.$axios({method:'get',url:store.state.url_data+'/api/regions',params:{type:'region',id:localStorage.cs_id},headers:{'Authorization':'Bearer '+localStorage.token}}
				      ).then(res=>{
				        if(res.data.code==200){
				   		    this.qy_box = res.data.data;
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
				       if(res.data.code==200){
				  		    this.jd_box = res.data.data;
				  		}
				     }).catch(error=> {});
				},
				
				//当街道选项被点击
				jd_click(i){
					this.jd_id = i;
					this.git_act(1)
				},
		
	  },
	  mounted(){
		this.cs_fn()
		
	  }
	};
	
</script>
<style scoped="scoped">
	.tab_c{
		float:left;margin-right:10px;
		width:130px;
	}
	
</style>
