<template>
  <div class="loginContainer">
      <div class="login">
          <div class="top">用户登录</div>
          <div class="input">
              <div class="username"><input ref="username" class="userInput" type="text" placeholder="用户名或电子邮件"></div>
              <div class="password"><input ref="password" class="psdInput" type="password" placeholder="密码"></div>
              <div class="btn"><input class="btnInput" type="submit" value="登录" @click="handleLogin"></div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        handleLogin() {
            const username = this.$refs.username.value;
            const password = this.$refs.password.value;
            const data = {'username':username, 'password':password};
            this.$http.post('http://localhost/login', data).then((res)=> {
                if(res.data == '用户不存在' || res.data == '密码错误') {
                    this.$message.error(res.data);
                } else {
                    this.$message.success('登录成功');
                    setTimeout(()=> {
                        this.$router.push({path: '/writePage'})
                    }, 1000)
                }
            }).catch((err)=> {
                console.log(err);
            })
        }
    }
}
</script>

<style scoped>
.loginContainer {
    position: relative;
    width: 100%;
    height: 100vh;
    background: #2ac2f5;
}
.login {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);
    width: 650px;
    height: 450px;
    background: #ffffff;
    margin: 0 auto;
    border-radius: 20px;
}
.top {
    width: 100%;
    height: 150px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    font-weight: bold;
    font-family: Hiragino Sans GB;
    color: #d2d2d3;
}
.input {
    width: 100%;
    height: 300px;
}
.username {
    padding: 30px 0;
    margin-top: 20px;
    display: flex;
    justify-content: center;
}
.password, .btn {
    padding: 20px 0;
    display: flex;
    justify-content: center;
}
.userInput, .psdInput {
    width: 450px;
    height: 28px;
    padding: 5px 20px;
    outline: none;
    border: none;
    border-radius: 16px;
    background: #efefef;
}
.btnInput {
    width: 70px;
    height: 37px;
    padding: 10px;
    border-radius: 18px;
    background: #2ac2f5;
    border: none;
    color: #ffffff;
    font-size: 12px;
}
</style>