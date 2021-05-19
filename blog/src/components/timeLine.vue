<template>
<div class="max">
  <div class="Container">
      <div class="acticleContent">
        <div class="yearly">
          <div class="yearlyTitle">2021年</div>
          <div class="monthly">
            <div class="monthlyItem" v-for="(items, index) in articleList" :key="index">
              <div class="monthlyTime">{{items.date.slice(5)}}</div>
              <div class="monthlyTitle" @click="routeToArticle(items.title)">{{items.title}}</div>
            </div>
          </div>
        </div>
      </div>
      <footer-nav></footer-nav>
  </div>
  <topnav class="topnav"></topnav>
</div>
  
</template>

<script>
import topnav from './topnav'
import footerNav from './footerNav.vue'
export default {
  components: {
    footerNav,
    topnav
  },
  data() {
    return {
      articleList: []
    }
  },
  methods: {
    getTimeLine() {
      this.$http.get('http://localhost/getAllArticleTitle').then(res=> {
        this.articleList = res.data;
      }).catch(err=> {
        console.log(err);
      })
    },
    routeToArticle(title) {
      this.$router.push({name: 'article', params: {id: title}});
    }
  },
  created() {
    this.getTimeLine();
  }
}
</script>

<style scoped>
.max {
  position: relative;
}
.topnav {
  position: fixed;
  left: 0;
  top: 0;
}
.Container {
  margin: 0 auto;
  padding-top: 60px;
  max-width: 500px;
  box-sizing: border-box;
}
.acticleContent {
  max-width: 500px;
  padding-left: 30px;
  border-left: 1px dashed #e5e5e5;
}
.yearly {
  font-size: 15px;
  color: #32323c;
  font-weight: bold;
  font-family: Hiragino Sans GB;
}
.yearlyTitle {
  margin-bottom: 30px;
  position: relative;
}
.yearlyTitle::before {
  position: absolute;
  left: -37px;
  top: 4.5px;
  content: '';
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #e6e6e6;
}
.monthlyItem {
  display: flex;
  margin-bottom: 30px;
  position: relative;
}
.monthlyItem:hover {
  cursor: pointer;
}
.monthlyItem::before {
  position: absolute;
  left: -37px;
  top: 4.5px;
  content: '';
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #e6e6e6;
}
.monthlyTime {
  margin-right: 20px;
  color: #7e8187;
  font-weight: normal;
}
.monthlyTitle:hover {
  color: #ff3f07;
  transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
}
</style>