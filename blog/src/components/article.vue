<template>
  <div class="articleContainer">
      <topnav></topnav>
      <div class="article" v-for="item in articleList" :key="item.title">
          <div class="articleTitle">{{item.title}}</div>
          <div class="articleTime"><span class="iconfont icon-changyongicon-"></span>{{item.date}} <span class="iconfont icon-yanjing"></span>{{views}}</div>
          <div class="articleContent" v-html="item.content"></div>
      </div>
  </div>
</template>

<script>
import topnav from './topnav'
export default {
    components: {
        topnav
    },
    data() {
        return {
            articleList: [],
            views: 0
        }
    },
    methods: {
        viewsChange() {
            this.views++;
        }
    },
    created() {
        const title = this.$route.params.id;
        this.$http.get('http://localhost/getArticleDetail/'+title).then((res)=> {
            // console.log(res);
            this.articleList = res.data;
        }).catch((err)=> {
            console.log(err);
        })
    },
    mounted() {
        this.viewsChange();
    }
}
</script>

<style scoped>
.articleContainer {
    position: relative;
}
.article {
    margin: 0 auto;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: Hiragino Sans GB;
}
.articleTitle {
    padding: 30px;
    padding-top: 0;
    font-weight: bold;
    font-size: 25px;
    color: #32323b;
}
.articleTime {
    height: 30px;
    font-size: 14px;
    color: #9f9e9e;
    padding: 30px;
    padding-top: 0;
}
.articleTime::after {
    content: '';
    display: block;
    margin: 25px 0;
    width: 100px;
    height: .5px;
    background: #e5e5e5;
}
.iconfont {
    font-size: 16px;
    margin-right: 6px;
}
.icon-yanjing {
    margin-left: 10px;
}
.articleContent {
    padding: 10px 30px 30px 30px;
    color: #4e4e4f;
}
</style>