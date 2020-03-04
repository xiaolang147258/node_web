<template>
  <div v-if="!item.hidden" class="menu-wrapper">
	
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}" style='position: relative;' @click='onlyOneChilds(onlyOneChild.meta.title)'>
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
					
			<div v-show="onlyOneChild.meta.title=='工作台'&&index_all!=0||onlyOneChild.meta.title=='消息中心'&&message_num!=0||onlyOneChild.meta.title=='审核中心'&&audit_num!=0" class="icons">
				
				{{onlyOneChild.meta.title=='工作台'?index_all:(onlyOneChild.meta.title=='消息中心'?message_num:audit_num)}}
				
			</div>
					
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
	
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'
import store from '../../../vuex/store.js'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  
  computed: {
  	index_all(){return store.state.index_all>1000?'999+':store.state.index_all},
	message_num(){return store.state.message_num>1000?'999+':store.state.message_num},
	audit_num(){return store.state.audit_num>1000?'999+':store.state.audit_num},
	
  },
  
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  methods: {
		onlyOneChilds(title){//监听左侧title被单击，将未读数据清零
			console.log(title);
			if(title=='工作台'){
				store.state.index_all=0;
			}else if(title=='消息中心'){
				store.state.message_num=0;
			}else if(title=='审核中心'){
				store.state.audit_num=0;
			}
			localStorage.index_number = 0;
		},
		
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  },
  mounted(){
	console.log(sessionStorage.index_all);
	  
	  
  }
}
</script>
<style scoped="scoped">
	 .icons{
		 
		 width:25px;
		 height:25px;
		 border-radius:12.5px;
		 line-height: 25px;
		 text-align: center;
		 color: white;
		 background: red;
		 position: absolute;
		 right: 10%;
		 top:25%;
		 font-size:11px;
	 }
</style>