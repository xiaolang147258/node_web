<template>
   <div  v-loading="loading" style="margin:20px">
	<el-tabs @tab-click='chilld_msg' type="border-card">
      <el-tab-pane :label='message_um'><indexMessage  :fatherMethod="git_top_num" ref="mychild_mssage"></indexMessage></el-tab-pane>
      <el-tab-pane :label='auit_um'><indexAudit ref="mychild_Audit"></indexAudit></el-tab-pane>
    </el-tabs>
   </div>
</template>

<script>
	import index_audit from './index_audit.vue';
	import index_message from './index_message.vue';
	import store from "../../vuex/store.js";
	export default {
    data(){
      return {
         message_um:'待查看消息',
		    auit_um:'待审核内容',
		    loading:true,
      };
    },
	components:{//声明==》子组件的名字
		'indexAudit':index_audit,
		'indexMessage':index_message
	},
    methods:{
	 chilld_msg(i){
		console.log(i.index)
		if(i.index==0){
			console.log(11)
			this.$refs.mychild_mssage.git_act(1);
		}else if(i.index==1){
			console.log(22)
			this.$refs.mychild_Audit.git_act(1);
		}
	 },
		
   git_top_num(){//获取顶部消息审核数据
        this.loading = true;
		this.$axios({method:'get',url:store.state.url_data+'/api/works',headers:{'Authorization':'Bearer '+localStorage.token}}
		   ).then(res=>{
        console.log(res.data,'顶部数据');
      if(res.data.code==200){
				this.message_um = '待查看消息'+'('+res.data.data.message_count+')';
				this.auit_um = '待审核内容'+'('+res.data.data.audits_count+')';
				store.state.message_box = res.data.data.message;
				store.state.audit_box = res.data.data.audits;
			
			if(localStorage.index_number==1){
				store.state.index_all = res.data.data.message_count+res.data.data.audits_count;
				store.state.message_num = res.data.data.message_count;
			    store.state.audit_num = res.data.data.audits_count;
				
			}
				
				this.loading = false;
			 }else{this.loading = false;}
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
		
		console.log(localStorage.index_number);
		
	},
	created(){
		// localStorage.token = 'ahuD3611GYCV8V36B97YW3qYuMoiyrqAExoz';//写死token
		// localStorage.cs_id = 440100000000;//写死城市id
		
		this.loading = true;
		this.git_top_num();
	  window.setTimeout(()=>{
		this.$refs.mychild_mssage.git_act(1);
	  },200)
		
	}
  };
</script>

<style>
</style>
