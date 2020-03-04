<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <!-- <search id="header-search" class="right-menu-item" /> -->

        <error-log class="errLog-container right-menu-item hover-effect" />

        <!-- <screenfull id="screenfull" class="right-menu-item hover-effect" /> -->

        <!-- <el-tooltip content="Global Size" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip> -->
         <p style="font-size:15px;color:#2A9B00;line-height:53px;margin:0;float:left;">{{name_box}}</p>
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img src="../../assets/img/yonghu.png" class="user-avatar">
          <!-- <i class="el-icon-caret-bottom" /> -->
		 
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item></el-dropdown-item>
          </router-link>
         
            <el-dropdown-item>
				<!-- <span @click='drawer=true' style="width: 100%;height: 100%;">修改密码</span> -->
			</el-dropdown-item>
         
          <!-- <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a> -->
          <!-- <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a> -->
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
	  
    </div>
		
<!-- <el-drawer title="修改密码" :visible.sync="drawer" :direction="direction" :before-close="handleClose"> -->


<el-drawer title="修改密码" :visible.sync="drawer" direction="rtl" size="30%">
	
	<!-- <el-card class="xiu_box">    -->
<el-form style=''>	
	<el-form-item label="旧密码" :label-width="'70px'" style='padding:0 20px;'>
        <el-input placeholder="请输入内容" v-model="input10" clearable></el-input>
    </el-form-item>
	<el-form-item label="新密码" :label-width="'70px'" style='padding:0 20px;'>
	    <el-input placeholder="请输入内容" v-model="input11" clearable></el-input>
	</el-form-item>
	<el-form-item label="确认密码" :label-width="'70px'" style='padding:0 20px;'>
	    <el-input placeholder="请输入内容" v-model="input12" clearable></el-input>
	</el-form-item>
</el-form>	
	
	<div v-show="drawer" style="width:100%;height:40px;position: absolute;bottom:45px;left:0;">
		<div style="width:100%;height:60px;margin: 20px auto;padding:0 20px;">
			<el-button @click='drawer=false' style='float:left;height:40px;width:47%;' plain>取消</el-button>
			<el-button @click='loginout':loading="loading" style='float:right;height:40px;width:47%;' type="success">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
		</div>
	</div>
	<!-- </el-card> -->

</el-drawer>
		
		 <!-- <transition name="el-fade-in-linear">
         <div v-show="show" class="transition-box">
			    <el-collapse-transition>
							 <el-card v-show="show" class="xiu_box">     
									<div class="inp_box" style="height: auto;float: left;">
										 <p>旧密码:</p><el-input placeholder="请输入内容" v-model="input10" clearable></el-input>
                     <p>新密码:</p><el-input placeholder="请输入内容" v-model="input11" clearable></el-input>
                     <p>确认密码:</p><el-input placeholder="请输入内容" v-model="input12" clearable></el-input>
									</div> 
								<div style="width: 100%;float: left;">
									<div style="width: 200px;height:40px;margin: 20px auto;">
										  <el-button @click='show=false' style='float:left;' type="info">取消</el-button>
										  <el-button @click='loginout' style='float:right;' type="primary">确定</el-button>
									</div>
									 </div>	
							 </el-card>		 
          </el-collapse-transition>
				 </div> 
      </transition> -->
		
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import {removeToken} from '@/utils/auth'
import store from '../../vuex/store.js'



export default {
  components:{
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search,
		
	
  },
	data(){
		return{
			 loading:false,	
			 drawer: false,
       direction: 'rtl',
			 
			 show:false,
			 input10:'',
			 input11:'',
			 input12:'',
			 names :"名字",
		}
	},
	
  computed: {
	  name_box(){return localStorage.name},
	  
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  mounted(){
	  this.names = localStorage.name;
	  console.log(this.name)
  },
  methods: {
		 handleClose(done) {
        this.drawer = false
      },
		
		loginout(){
			 if(this.input10){}else{ this.$message.error('旧密码不能为空！');return false};
			 if(this.input11){}else{ this.$message.error('新密码不能为空！');return false};
			 if(this.input12){}else{ this.$message.error('确认密码不能为空！');return false};
			 if(this.input12==this.input11){}else{ this.$message.error('确认密码与新密码不匹配，请重新输入！');return false};
			 this.loading = true;
			 this.$axios({method:'post',url:store.state.url_data+'/api/resetPassword',
			     data:{
						 'original_password':this.input10,
						 'password':this.input11,
						 'password_confirmation':this.input12,
						 'phone':localStorage.act_id
						 },headers:{'Authorization':'Bearer '+localStorage.token}}
			   ).then(res=>{
				   this.loading = false;
					 console.log(res)
			     if(res.data.code==200){
						    this.drawer = false;
						    this.$message({
                  message: '修改密码成功，需要重新登录',
                  type: 'success'
                });
						this.$router.push(`/login?redirect=${this.$route.fullPath}`);
					 }else{
						  let box = res.data.data; let vals = '';
						 for (var index in box) {
						 	vals = box[index].join(' ');
						 }
						 this.$message.error(vals)
					 }
					 }).catch(error=> {
						 this.loading = false;
						 console.log(error.response)
						   if (error.response) {
						   	this.$message.error(error.response.data.msg)
						   } else {
						   	this.$message.error('发生了错误')
						   }
						 });
		},
		
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
		// this.$router.push({path: '/logins' });
      // await this.$store.dispatch('user/logout')
			// removeToken()
			this.$confirm('此操作将退出账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
					 this.$axios({method:'post',url:store.state.url_data+'/delect_login',data:{id:localStorage.login_token}}).then(res=>{
						     console.log(res,'退出登录')
						 }).catch(error=> {});
					 // window.location ='http://39.108.231.124:8081/index';
					    // window.location ='http://net69.fun:8999/index';
							
							window.location ='./dist/3dyun/index.html';//exe桌面软件退出配置
							// window.location ='./3dyun/index.html';//网页退出配置
					 // this.$router.push({path: '/logins' });
					 
        }).catch(() => { });
    }
  }
}
</script>

<style lang="scss" scoped>
	.inp_box p{
		font-size: 14px;
		// font-weight: 600;
		float: left;
	}
	.inp_box{
		width: 100%;
		height:40px;
		margin: 20px auto;
	}
	
	.xiu_box{
		width:500px;
		height: 400px;
		background:white;
		margin: 100px auto;
	}
	
	.transition-box{
		 position:fixed;
		 top: 0;
		 left: 0;
		 width: 100%;
		 height: 100%;
		 z-index: 500;
		 background: rgba(0,0,0,.2);
	}
	
	
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
