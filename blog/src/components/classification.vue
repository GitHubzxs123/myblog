<template>
  <div class="classContainer">
    <topnav></topnav>
    <div class="top">
      <div class="title">分类</div>
      <div class="total">共：{{total}}个</div>
    </div>
    <div class="list">
      <div class="listItem" v-for="item in lists" :key="item.name">
        <span class="name">{{item.name}}</span>
        <span class="nums">[5]</span>
      </div>
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
      lists: [],
      total: 0
    }
  },
  methods: {
    getClassofications() {
      this.$http.get('http://localhost/getClassifications').then(res=> {
        this.lists = res.data.classificationList;
        this.total = res.data.total;
      }).catch(err=> [
        console.log(err)
      ])
    }
  },
  created() {
    this.getClassofications()
  }
}
</script>

<style scoped>
.classContainer {
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
.list {
  display: flex;
  justify-content: center;
  align-items: center;
}
.listItem {
  width: 70px;
  height: 20px;
  padding: 4px 2px;
  margin: 0 5px;
  background: #f7f9fb;
  color: #33333b;
  display: flex;
  justify-content: center;
  align-items: center;
}
.name {
  font-size: 14px;
  margin-right: 5px;
}
.name:hover {
  color: #f35633;
  transition: all .15s;
  cursor: pointer;

}
.nums {
  font-size: 11px;
  margin-top: 3px;
}
.footerMargin {
  position: absolute;
  bottom: -373px;
  left: 50%;
  transform: translateX(-50%);
}
</style>