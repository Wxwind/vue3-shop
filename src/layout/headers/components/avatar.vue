<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar shape="square" :size="40" :src="avatarURL"></el-avatar>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useLoginStore } from "@/stores/loginStore";
const loginStore = useLoginStore();
const logout = () => {
  loginStore.logout();
};

const avatarURL = ref(
  "https://ts1.cn.mm.bing.net/th/id/R-C.8efa0ce1e1d5939425ba5e881f440751?rik=9P%2bJKQhR%2fzTd%2fg&riu=http%3a%2f%2fpic11.nipic.com%2f20100803%2f4038389_093502059852_2.jpg&ehk=SjhFNoS3UcNwLpK9oueJIn6pF%2boCKoFp%2bzuAJ1n6J2w%3d&risl=&pid=ImgRaw&r=0"
);
</script>

<style lang="scss" scoped></style>
