<template>
  <div class="relative">
        <topnav class="top-nav"></topnav>
        <div class="mask"></div>
        <div class="homeContainer" ref="container">
            <div class="headerImgContainer">
                <div class="words">
                    <p class="p1"> <span class="yellowSpan">B</span>ra<span class="yellowSpan">v</span>ada</p>
                    <p class="p2">Have enough courage to start and enough heart to finish.</p>
                </div>
                <div class="end" @click="scrollChange"><span class="iconfont icon-shubiao-"></span></div>
            </div>
            <div class="content-container">
                <div class="content">
                    <div class="contentItem" v-for="(item, index) in contentList" :key="index" @click="routeToArticle(item.title)">
                        <div class="imgContainer"><img src="../assets/home.jpg" alt=""></div>
                        <div class="textContainer">
                            <div class="top">
                                <p class="textP1">{{item.title}}</p>
                                <p class="textP2">{{item.descriptions}}</p>
                            </div>
                            <div class="bottom">
                                <span class="time"><span class="iconfont icon-changyongicon-"></span>{{item.date}}</span>
                                <span class="views"><span class="iconfont icon-yanjing"></span>5021</span>
                            </div>
                        </div>
                    </div>
                </div>
                <el-pagination
                    class="pagination"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    layout="total, sizes, prev, pager, next, jumper"
                    :current-page="currentPage"
                    :page-sizes="[3, 6, 9, 12]"
                    :page-size="pageSize"
                    :total="total">
                </el-pagination>
            </div>
        </div>
        <footer-nav class="footerMargin"></footer-nav>
  </div>
</template>

<script>
import topnav from './topnav'
import footerNav from './footerNav.vue'
export default {
    components: {
        topnav,
        footerNav
    },
    data() {
        return {
            contentList: [],
            currentPage: 1,
            pageSize: 6,
            total: 0
        }
    },
    methods: {
        scrollChange() {
           document.querySelector('#app').scrollTo(0, 1500)
        },
        routeToArticle(title) {
            this.$router.push({path: '/article/'+title});
        },
        getArticleList() {
            this.$http.get(`http://localhost/getAllArticle?currentPage=${this.currentPage}&pageSize=${this.pageSize}`).then(res=> {
                this.contentList = res.data.articleList;
                this.total = res.data.total;
            }).catch(err=> {
                console.log(err);
            })
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getArticleList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getArticleList();
        }
    },
    created() {
        this.getArticleList();
    }
}
</script>

<style scoped>
.relative {
    width: 100%;
    /* height: 1340px; */
    position: relative;
}
.homeContainer {
    width: 100%;
}
.headerImgContainer {
    position: relative;
    width: 100%;
    height: 100vh;
    background: url(../assets/home.jpg) center no-repeat;
}
.top-nav {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
}
.mask {
    width: 100%;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .4);
    z-index: 1;
}
.words {
    position: absolute;
    top: 300px;
    left: 51%;
    transform: translate(-50%, -50%);
    color: white;
    font-family: Georgia, serif;
    z-index: 2;
}
.end {
    position: absolute;
    top: 630px;
    left: 51%;
    transform: translate(-50%, -50%);
    margin-left: -5px;
    z-index: 2;
}
.p1 {
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 25px;
    text-align: center;
}
.p2 {
    font-size: 15px;
}
.yellowSpan {
    color: #ebb249;
}

.icon-shubiao- {
    font-size: 25px;
    font-weight: 600;
    color: seashell;
}
.icon-shubiao-:hover {
    color: #ebb249;
}

.content-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 45px;
}
.content {
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
}
.contentItem {
    width: 33%;
    height: 400px;
    padding: 0 15px;
    margin-bottom: 40px;
    box-sizing: border-box;
}
.contentItem:hover {
    transform: scale(1.05, 1.05);
    transition: all .6s;
}
.imgContainer {
    width: 100%;
    height: 230px;
}
.imgContainer img {
    width: 100%;
    height: 100%;
}
.textContainer {
    width: 100%;
    height: 170px;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0 5px 40px -1px rgb(2 10 18 / 11%);
}
.top{
    height: 110px;
}
.textP1 {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
    font-size: 21px;
}
.textP2 {
    width: 100%;
    height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
    color: #6a655f;
}
.bottom {
    font-size: 12px;
    color: #b0b0b0;
}
.icon-changyongicon-, .icon-yanjing {
    font-size: 16px;
    margin-right: 5px;
}
.icon-yanjing {
    margin-left: 5px;
}
.views {
    margin-left: 5px;
}
.footerMargin {
    position: absolute;
    bottom: -160px;
    left: 50%;
    transform: translateX(-50%);
}
</style>