<template>
  <div class="login-container">
	  
			<div id="iframe-wrap" style="width: 100%;position: absolute;top: 0;left: 0;">
				<!-- 文件內部引入外部html文件 -->
				<iframe id="iframe" src="http://127.0.0.1:8081/index" frameborder="0" width="100%"></iframe>
			</div> 
			
			<div id="login" style="width:100%;height: 400px;position:absolute;top: 0;">
			   <div class="login_box">
				<div class="demo form-bg" style="margin: 0;padding: 0;">
					<div class="container" style="width: 100%;padding: 0;margin: 0;">
							<div class="col-md-offset-3 col-md-6" style="width:100%;">
								<div class="form-horizontal">
									<span class="heading">用户登录</span>
									<div class="form-group">
										<input type="text" v-model="loginForm.username" class="form-control" id="inputEmail3" placeholder="账号">
										<i class="fa fa-user"></i>
									</div>
									<div class="form-group help">
										<input type="password" v-model="loginForm.password" class="form-control" id="inputPassword3" placeholder="密码">
										<i class="fa fa-lock"></i>
										<a href="#" class="fa fa-question-circle"></a>
									</div>
									<div class="form-group">
										<div class="main-checkbox">
											<input type="checkbox" value="None" id="checkbox1" name="check"/>
											<label for="checkbox1"></label>
										</div>
										<span class="text">记住我</span>
										<button @click="handleLogin" class="btn">立刻登录</button>
									</div>
								</div>
							</div>
					</div>
				</div>
			   </div>
			</div>
			
  </div>
</template>

<script>
	
import $ from 'jquery'
// import { validUsername } from '@/utils/validate'
// import { getToken, setToken, removeToken } from '@/utils/auth'
import stores from '../../vuex/store.js'
// import $router from '../../router/index.js'

import '../../../public/3dyun/tan/dist/sweetalert2.min.js'


export default {
  
  
  data() {
    return {
	  
      loginForm: {
        username: '',
        password: ''
      },
      
	  
    }
  },
 
  mounted() {
		
		$('body').css('background','white');
		$('#iframe').css('height',$(window).height());
		let heights = ($(window).height()-400)*0.5;
		$('#login').css('top',heights);
		
		if(localStorage.name){
			$("#checkbox1").attr("checked",'true');
			// $('#inputEmail3').val(localStorage.name);
			// $('#inputPassword3').val(localStorage.password);
			this.loginForm.username = localStorage.name;
			this.loginForm.password = localStorage.password;
		}else{
			$("#checkbox1").attr("checked",'false');
		}
		
		 history.pushState(null, null, document.URL);//禁止浏览器后退
		     window.addEventListener('popstate', function(){
		         history.pushState(null, null, document.URL);
		 });
	},
  
  methods: {
		handleLogin() {//登录函数
		   console.log(this.loginForm);
		   
		   if(this.loginForm.username&&this.loginForm.password){
				this.$axios({method:'post',url:stores.state.url_data+'/login',data:{name:this.loginForm.username,password:this.loginForm.password}}).then(res=>{
					 console.log(res.data,'数据');
				     if(res.data.code==200){
						                    localStorage.names = this.loginForm.username;
						                    localStorage.login_token = res.data.data;
											if ($("#checkbox1").get(0).checked) {//判断checkbox是否选中
											  localStorage.name = this.loginForm.username;
											  localStorage.password = this.loginForm.password;
											}
						swal({
											title: '登录成功!',
											text: "将会跳转至会员列表页面!",
											type: 'success',
											// showCancelButton: true,
											confirmButtonColor: '#3085d6',
											cancelButtonColor: '#d33',
											confirmButtonText: 'OK!',
											// cancelButtonText: 'No, cancel!',
											confirmButtonClass: 'btn btn-success',
											// cancelButtonClass: 'btn btn-danger',
											buttonsStyling: false
											}).then((isConfirm)=>{
											  if (isConfirm === true) {
												 this.$router.push({path: '/' });
											  } else if (isConfirm === false) {}
						 }) 
						 
					 }else{
						sweetAlert('失败！','账号或者密码有误，请重新输入!','error');
					 }
				   }).catch(error=> {console.log(error)});
			}			 
		
		}
  }
}
</script>

<style scoped="scoped">
	@import url("../../../public/3dyun/tan/dist/sweetalert2.min.css");
	@import url("../../../public/3dyun/css/bootstrap.min.css");
	@import url("../../../public/3dyun/css/font-awesome.min.css");
	@import url("../../../public/3dyun/css/zzsc.css");
	
  .login_box{
  	width: 500px;
  	height: 100%;
  	margin: 0 auto;
  	border-radius: 3px;
  }
  
  .form-bg{
  		padding: 2em 0;
  	}
  	.form-horizontal{
  		background: #fff;
  		padding-bottom: 40px;
  		border-radius: 15px;
  		text-align: center;
  	}
  	.form-horizontal .heading{
  		display: block;
  		font-size: 35px;
  		font-weight: 700;
  		padding: 35px 0;
  		border-bottom: 1px solid #f0f0f0;
  		margin-bottom: 30px;
  	}
  	.form-horizontal .form-group{
  		padding: 0 40px;
  		margin: 0 0 25px 0;
  		position: relative;
  	}
  	.form-horizontal .form-control{
  		background: #f0f0f0;
  		border: none;
  		border-radius: 20px;
  		box-shadow: none;
  		padding: 0 20px 0 45px;
  		height: 40px;
  		transition: all 0.3s ease 0s;
  	}
  	.form-horizontal .form-control:focus{
  		background: #e0e0e0;
  		box-shadow: none;
  		outline: 0 none;
  	}
  	.form-horizontal .form-group i{
  		position: absolute;
  		top: 12px;
  		left: 60px;
  		font-size: 17px;
  		color: #c8c8c8;
  		transition : all 0.5s ease 0s;
  	}
  	.form-horizontal .form-control:focus + i{
  		color: #00b4ef;
  	}
  	.form-horizontal .fa-question-circle{
  		display: inline-block;
  		position: absolute;
  		top: 12px;
  		right: 60px;
  		font-size: 20px;
  		color: #808080;
  		transition: all 0.5s ease 0s;
  	}
  	.form-horizontal .fa-question-circle:hover{
  		color: #000;
  	}
  	.form-horizontal .main-checkbox{
  		float: left;
  		width: 20px;
  		height: 20px;
  		background: #11a3fc;
  		border-radius: 50%;
  		position: relative;
  		margin: 5px 0 0 5px;
  		border: 1px solid #11a3fc;
  	}
  	.form-horizontal .main-checkbox label{
  		width: 20px;
  		height: 20px;
  		position: absolute;
  		top: 0;
  		left: 0;
  		cursor: pointer;
  	}
  	.form-horizontal .main-checkbox label:after{
  		content: "";
  		width: 10px;
  		height: 5px;
  		position: absolute;
  		top: 5px;
  		left: 4px;
  		border: 3px solid #fff;
  		border-top: none;
  		border-right: none;
  		background: transparent;
  		opacity: 0;
  		-webkit-transform: rotate(-45deg);
  		transform: rotate(-45deg);
  	}
  	.form-horizontal .main-checkbox input[type=checkbox]{
  		visibility: hidden;
  	}
  	.form-horizontal .main-checkbox input[type=checkbox]:checked + label:after{
  		opacity: 1;
  	}
  	.form-horizontal .text{
  		float: left;
  		margin-left: 7px;
  		line-height: 20px;
  		padding-top: 5px;
  		text-transform: capitalize;
  	}
  	.form-horizontal .btn{
  		float: right;
  		font-size: 14px;
  		color: #fff;
  		background: #00b4ef;
  		border-radius: 30px;
  		padding: 10px 25px;
  		border: none;
  		text-transform: capitalize;
  		transition: all 0.5s ease 0s;
  	}
  	@media only screen and (max-width: 479px){
  		.form-horizontal .form-group{
  			padding: 0 25px;
  		}
  		.form-horizontal .form-group i{
  			left: 45px;
  		}
  		.form-horizontal .btn{
  			padding: 10px 20px;
  		}
  	}
</style>

