<template>
  <el-config-provider :locale="zhCn" :message="config">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { reactive } from "vue";

const locale = zhCn;

const config = reactive({
  max: 1,
});
</script>
