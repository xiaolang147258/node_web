<template>
  <div>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
		
  </section>
	<div style="width:100%;text-align:center;line-height: 40px;margin-bottom:20px;height: 90px;">
		<p class="pta">帮助&nbsp;&nbsp;&nbsp;&nbsp;隐私&nbsp;&nbsp;&nbsp;&nbsp;条款</p>
		<p class="pta"> Copyright © 2019 广州市率创教育科技有限公司 广州智托教育科技服务有限公司</p>
	</div>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.pta{
	font-size: 13px;
	color:#000000;
	margin:0;
}
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
