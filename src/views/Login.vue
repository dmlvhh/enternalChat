<template>
  <div class="login-panel">
    <div class="title drag">倾心IM</div>
    <div v-if="showLoading" class="loading-panel">
      <img src="../assets/img/loading.gif" alt="" />
    </div>
    <div class="login-form" v-else>
      <div class="error-msg">{{ errorMsg }}</div>
      <el-form
        :model="formData"
        ref="formDataRef"
        label-width="0px"
        @submit.prevent
      >
        <el-form-item prop="email">
          <el-input
            size="large"
            clearable
            placeholder="请输入邮箱"
            maxLength="30"
            @focus="clearVerify"
            v-model.trim="formData.email"
          >
            <template #prefix>
              <span class="iconfont icon-email"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="nickname" v-if="!isLogin">
          <el-input
            size="large"
            clearable
            placeholder="请输入昵称"
            maxLength="15"
            @focus="clearVerify"
            v-model.trim="formData.nickName"
          >
            <template #prefix>
              <span class="iconfont icon-user-nick"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            show-password
            size="large"
            clearable
            placeholder="请输入密码"
            v-model.trim="formData.password"
            @focus="clearVerify"
          >
            <template #prefix>
              <span class="iconfont icon-password"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="rePassword" v-if="!isLogin">
          <el-input
            show-password
            size="large"
            clearable
            placeholder="请再输入密码"
            v-model.trim="formData.rePassword"
            @focus="clearVerify"
          >
            <template #prefix>
              <span class="iconfont icon-password"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="checkcode">
          <div class="check-code-panel">
            <el-input
              size="large"
              clearable
              placeholder="请输入验证码"
              @focus="clearVerify"
              v-model.trim="formData.checkCode"
            >
              <template #prefix>
                <span class="iconfont icon-checkcode"></span>
              </template>
            </el-input>
            <img
              :src="checkCodeUrl"
              class="check-code"
              @click="changeCheckCocde"
            />
          </div>
        </el-form-item>
        <!-- <el-form-item prop="email"> -->
        <el-button type="primary" class="login-btn" @click="submit">
          {{ !isLogin ? "注册" : "登录" }}
        </el-button>
        <!-- </el-form-item> -->
        <div class="bottom-link" @click="changeOpType">
          <span class="a-link">{{ !isLogin ? "已有帐号" : "没有账号？" }}</span>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const formData = ref({});
const formDataRef = ref();
const isLogin = ref(true);
const changeOpType = () => {
  window.ipcRenderer.send("loginOrRegister", !isLogin.value);
  isLogin.value = !isLogin.value;
};
</script>

<style lang="scss" scoped>
.email-select {
  width: 250px;
}

.loading-panel {
  height: calc(100vh - 32px);
  display: flex;
  justify-self: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 100px;
  }
}

.login-panel {
  background: #fff;
  border-radius: 3px;
  border: 1px solid #ddd;

  .title {
    height: 30px;
    padding: 5px 0px 0px 10px;
  }

  .login-form {
    padding: 0px 15px 29px 15px;

    :deep(.el-input__wrapper) {
      box-shadow: none;
      border-radius: none;
      border: none;
    }

    .el-form-item {
      border-bottom: 1px solid #ddd;
    }

    .email-panel {
      align-items: center;
      width: 100%;
      display: flex;

      .input {
        flex: 1;
      }

      .icon-down {
        margin-left: 3px;
        width: 16px;
        cursor: pointer;
        border: none;
      }
    }

    .check-code-panel {
      display: flex;

      .check-code {
        cursor: pointer;
        width: 120px;
        margin-left: 5px;
      }
    }

    .error-msg {
      color: #f56c6c;
      margin-bottom: 10px;
    }

    .check-code-panel {
      display: flex;

      .check-code {
        cursor: pointer;
        width: 120px;
        margin-left: 5px;
      }
    }

    .login-btn {
      width: 100%;
      margin-top: 20px;
      background: #07c160;
      height: 36px;
      font-size: 16px;
    }

    .bottom-link {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;

      .a-link {
        color: #409eff;
        cursor: pointer;
      }
    }
  }
}
</style>
