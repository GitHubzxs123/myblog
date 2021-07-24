<template>
  <div class="searchContainer">
        <div class="closeSearchMask" @click="closeSearchMask"><span class="iconfont icon-guanbi"></span></div>
        <div class="searchBtn">
            <span class="iconfont iconSearch icon-sousuo"></span>
            <input class="searchInput" v-model="keywords" type="text" placeholder="Search...">
                <div class="searchItem" v-for="item in searchList" :key="item.title">
                    <div class="searchItemTitle">{{item.title}}</div>
                    <div class="searchItemContent" v-html="item.content"></div>
                </div>
        </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            keywords: '',
            searchList: [],
            timer: null,
            ArticleLists: []
        }
    },
    watch: {
        keywords() {
            if(this.timer) {
                clearTimeout(this.timer);
            }
            if(!this.keywords.length) {
                this.searchList = [];
                return;
            }
            this.timer = setTimeout(()=> {
                const result = [];
                for(let k in this.ArticleLists) {
                    if(this.ArticleLists[k].title.indexOf(this.keywords) > -1 || this.ArticleLists[k].content.indexOf(this.keywords) > -1) {
                        const index = this.ArticleLists[k].content.indexOf(this.keywords);
                        const lastIndex = this.ArticleLists[k].content.lastIndexOf(this.keywords);
                        let contentList, fromIndex;
                        if(index == lastIndex) {
                            fromIndex = (index - 6) >= 0 ? index-6 : 0;
                            contentList = this.ArticleLists[k].content.slice(fromIndex, fromIndex+30)+' ...';
                            contentList = contentList.replace(new RegExp(this.keywords, 'g'), '<strong style="color: #ff3f07">'+this.keywords+'</strong>');
                        }else {
                            fromIndex = (index - 6) >= 0 ? index-6 : 0;
                            contentList = this.ArticleLists[k].content.slice(fromIndex, lastIndex+50)+' ...';
                            contentList = contentList.replace(new RegExp(this.keywords, 'g'), '<strong style="color: #ff3f07">'+this.keywords+'</strong>');
                        }
                        const item = {title: this.ArticleLists[k].title, content: contentList};
                        result.push(item);
                    }
                }
                this.searchList = result;
                console.log(this.searchList);
            }, 100);
        }
    },
    methods: {
        closeSearchMask() {
            this.$router.back();
        }
    },
    created() {
        this.$http.get('http://localhost/getAllArticleTitle').then(res=> {
            this.ArticleLists = res.data;
        }).catch(err=> {
            console.log(err);
        })
    }
}
</script>

<style scoped>
.searchContainer {
    width: 100%;
    height: 100vh;
}
.searchBtn {
    height: 520px;
    overflow-y: auto;
    padding: 20px 0;
    position: absolute;
    top: 30px;
    left: 380px;
}
.iconSearch {
    margin-right: 10px;
    font-size: 23px;
    vertical-align: top;
}
.searchInput {
    outline: none;
    border: none;
    background: transparent;
    width: 700px;
    height: 30px;
    font-size: 18px;
    color: rgb(50, 50, 54);
}
.closeSearchMask {
    position: absolute;
    top: 12px;
    right: 15px;
}
.closeSearchMask .icon-guanbi {
    font-size: 18px;
    color: #000;
}
.searchItem {
    max-width: 700px;
    padding: 10px 0;
}
.searchItemTitle {
    font-size: 18px;
    font-weight: bold;
}
.searchItemTitle:hover {
    cursor: pointer;
    color: #ff3f07;
    transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
}
.searchItemContent {
    max-width: 700px;
    overflow: hidden;
    font-size: 13px;
}
</style>