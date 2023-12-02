<template>
  <div class="login">
    <vue-particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      :options="line"
    />
    <div class="vue-form">
      <h3>{{ title }}</h3>
      <ElFormCommon @keydown.enter="loginSystem" ref="loginForm" :data="data">
        <el-button
          v-blur
          style="width: 100%"
          :loading="loginLoading"
          type="primary"
          @click="loginSystem"
          >登录</el-button
        >
      </ElFormCommon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { line } from "./index";
import type { IElPlusMsgFun } from "@/utils/elPlusMessage/type";
import { encrypt, decrypt } from "@/utils/jsencrypt";
const router = useRouter();
import { useUserStore } from "@/store/modules/user";
const userStore = useUserStore();
const particlesInit = async (engine: Engine) => {
  //await loadFull(engine);
  await loadSlim(engine);
};
const a = ref<number | null>(null);
console.log(a); /*  */
a.value = 4;
const particlesLoaded = async (container: any) => {
  console.log("Particles container loaded", container);
};
const elMsg = inject("elMsg") as IElPlusMsgFun;
const loginForm = ref();
const loginLoading = ref(false);
const title = ref(import.meta.env.VITE_TITLE);
const data = reactive({
  formData: {
    ...userStore.userInfo,
    password: decrypt(userStore.userInfo.password),
  },
  config: {
    labelWidth: "",
  },
  list: [
    {
      key: "el-input",
      prop: "userName",
      placeholder: "请输入账号",
      style: {
        width: "100%",
      },
      prefixIcon: "User",
    },
    {
      key: "el-input",
      prop: "password",
      placeholder: "请输入密码",
      showPassword: true,
      prefixIcon: "Lock",
    },
    {
      key: "el-checkbox",
      prop: "rememberPwd",
      ckLabel: "记住密码",
      style: {
        color: "#fff",
      },
    },
  ],
  rules: {
    userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  },
});

const loginSystem = () => {
  loginForm.value
    .validateForm()
    .then(() => {
      loginLoading.value = true;
      elMsg.success("登录成功！");
      // 是否记住密码
      if (data.formData.rememberPwd) {
        userStore.userInfo = {
          ...data.formData,
          password: encrypt(data.formData.password),
        };
      } else {
        userStore.userInfo = {
          userName: "",
          password: "",
          rememberPwd: data.formData.rememberPwd,
        };
      }
      userStore
        .getInfo()
        .then(() => {
          setTimeout(() => {
            loginLoading.value = false;
            router.push("/");
          }, 1000);
        })
        .catch(() => {
          loginLoading.value = false;
        });
    })
    .catch(() => {});
};
</script>
<style lang="scss" scoped>
.login {
  height: 100%;
  background-image: linear-gradient(
    to right,
    #0a3e8d,
    #003283,
    #051ca3,
    #0a3e8d
  );
  background-color: #0d47a1;
  display: flex;
  justify-content: center;
  align-items: center;
  #tsparticles {
    height: 100%;
    width: 100%;
  }
  .vue-form {
    width: 450px;
    padding: 40px;
    background-color: rgba(#6578e6, 0.5);
    z-index: 1;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(#6578e6, 0.5);
    position: absolute;
    width: 500px;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    h3 {
      text-align: center;
      margin-bottom: 20px;
      color: #fff;
    }
  }
}
</style>
