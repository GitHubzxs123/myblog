<template>
    <div class="container">
        <div class="leftNav"><span class="iconfont icon-yueliang"></span><span class="iconfont icon-sousuo" @click="search"></span></div>
        <div class="rightNav" @click="onRightNavMask"><span class="iconfont icon-fenlei"></span></div>
        <div class="rightNavMask" v-if="rightNavMaskShow">
          <div class="closeRightNavMask" @click="offRightNavMask"><span class="iconfont icon-guanbi"></span></div>
        </div>
        <div class="routerText" v-if="rightNavMaskShow">
            <ul>
                <li class="itemTitle {index==delIndex? 'fontDel': ''}" v-for="(item, index) in list" :key="index" @click="changeIndex(index)">
                    <div class="underline"></div>
                    <router-link class="routeTitle" :to="item.path">{{item.name}}</router-link>
                </li>
            </ul>
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            rightNavMaskShow: false,
            delIndex: 0,
            list: [{
                name: '首页',
                path: '/home'
            },{
                name: '归档',
                path: '/timeLine'
            },{
                name: '分类',
                path: '/classification'
            },{
                name: '标签',
                path: '/tag'
            },{
                name: '关于',
                path: '/about'
            }]
        }
    },
    methods: {
        changeIndex(index) {
            // console.log(index);
            this.delIndex = index;
            // console.log(this.delIndex);
        },
        onRightNavMask() {
            this.rightNavMaskShow = true;
        },
        offRightNavMask() {
            this.rightNavMaskShow = false;
        },
        search() {
            this.$router.push('/search');
        }
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    height: 50px;
    position: relative;
}
.rightNav {
    position: absolute;
    top: 12px;
    right: 15px;
    color: rgb(184, 178, 178);
}
.rightNav .icon-fenlei {
    font-size: 20px;
}
.leftNav {
    position: absolute;
    top: 12px;
    left: 15px;
    color: rgb(184, 178, 178);
}
.leftNav .icon-yueliang, .icon-sousuo {
    font-size: 20px;
    margin: 0 4px;
}
.rightNavMask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(255,255,255,0.7);
    -webkit-backdrop-filter: saturate(50%) blur(10px);
    backdrop-filter: saturate(50%) blur(10px);
    transition: all .5s;
}
.routerText {
    position: absolute;
    top: 500%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.itemTitle {
    position: relative;
    display: inline-block;
    list-style-type: none;
    font-family: Hiragino Sans GB;
}
.itemTitle:hover .underline {
    position: absolute;
    bottom: -3px;
    left: 13px;
    width: 65%;
    background: #000;
    height: 2px;
    transition: all .6s;
}
.itemTitle:hover {
    cursor: pointer;
}
.routeTitle {
    font-size: 25px;
    color: #000;
    margin: 0 15px;
    text-decoration: none;
}
.fontDel {
    text-decoration: line-through;
    color: seagreen;
}
.closeRightNavMask {
    position: absolute;
    top: 12px;
    right: 15px;
}
.closeRightNavMask:hover {
    cursor: pointer;
}
.closeRightNavMask .icon-guanbi {
    font-size: 18px;
    color: #000;
}
</style>