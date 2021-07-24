<template>
  <div class="aboutContainer">
      <topnav></topnav>
      <div class="postContent">
        <h3 class="title"><span>#</span>About me</h3>
        <p class="content">我是雪松，一名前端开发者，技术一般，经历平平，但是也一直渴望进步，同时也努力活着，为了人生不留遗憾，也希望能够一直做着自己喜欢的事情，得闲时分享心得、分享一些浅薄的经验，等以后老得不能再老了，就说故事已经讲完了,不去奢求圆满。</p>
        <p class="content">相信浏览这段话的你也知道，学习是一件极其枯燥而无聊的过程，甚至有时候显得很无助，我也想告诉你，成长就是这样一件残酷的事情，任何成功都不是一蹴而就，需要坚持、需要付出、需要你的毅力，短期可能看不到收获，因为破茧成蝶所耗费的时间不是一天。</p>
        <h3 class="title"><span>#</span>Contact</h3>
        <div class="contactContainer">
          <ul>
            <li>邮箱</li>
            <li>博客</li>
            <li>QQ</li>
            <li>Wechat</li>
          </ul>
        </div>
      </div>
      <footer-nav class="aboutMargin"></footer-nav>
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
}
</script>

<style scoped>
.aboutContainer {
  position: relative;
}
.postContent {
  width: 80%;
  margin: 0 auto;
  margin-bottom: 100px;
  overflow: hidden;
}
.title {
  margin: 10px 0;
}
span {
  color: #337ab7;
  margin-right: 10px;
}
.content {
  color: #333333;
  margin: 20px 0;
  line-height: 1.6;
}
.aboutMargin {
  position: absolute;
  bottom: -271px;
  left: 50%;
  transform: translateX(-50%);
}
</style>