<template>
  <div class="tagContainer">
    <topnav></topnav>
    <div class="top">
      <div class="title">标签</div>
      <div class="total">共：{{total}}个</div>
    </div>
    <div class="tags">
      <div class="tagsItem" v-for="item in tagsList" :key="item.name">{{item.name}}</div>
    </div>
    <footer-nav class="footerMargin"></footer-nav>
  </div>
</template>

<script>
import topnav from './topnav'
import footerNav from './footerNav'
export default {
  components: {
    topnav,
    footerNav
  },
  data() {
    return {
      tagsList: [],
      total: 0
    }
  },
  methods: {
    getTags() {
      this.$http.get('http://localhost/getTags').then(res=> {
        this.tagsList = res.data.tags;
        this.total = res.data.total;
      }).catch(err=> {
        console.log(err);
      })
    }
  },
  created() {
    this.getTags();
  }
}
</script>

<style scoped>
.tagContainer {
  width: 100%;
  height: 100vh;
  position: relative;
}
.top {
  margin-top: 30px;
  margin-bottom: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.title {
  font-size: 28px;
  margin-bottom: 8px;
  color: #33333b;
}
.total {
  font-size: 14px;
}
.tags {
  max-width: 500px;
  margin: 0 auto;
  height: auto;
  text-align: center;
}
.tagsItem {
  display: inline-block;
  margin: 0 4px;
  background: #f7f9fb;
  font-size: 14px;
  color: #33333b;
  padding: 7px 10px;
  cursor: pointer;
}
.footerMargin {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
}
</style>