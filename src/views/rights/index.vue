<template>
  <el-card>
    <el-table :data="tableData" style="width: 100%" stripe border>
      <el-table-column
        :prop="item.prop"
        :label="$t(`rightTable.${item.label}`)"
        v-for="(item, index) in options"
        :key="index"
        :width="item.width"
      >
        <template v-slot="{ row }" v-if="item.prop === 'level'">
          <el-tag v-model="row.level" :type="levelNumToTxt(row.level).type">
            {{ levelNumToTxt(row.level).text }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { getRightList } from "@/api/right";
import type { RightItem } from "@/api/types";
import { options } from "./options";
import { ref, onMounted } from "vue";

onMounted(() => {
  initRightList();
});

const tableData = ref<RightItem[]>();

const initRightList = async () => {
  const res = await getRightList("list");
  tableData.value = res.data;
};

const levelNumToTxt = (p: "0" | "1" | "2"): { text: string; type: String } => {
  switch (p) {
    case "0":
      return { text: "一级", type: "" };

    case "1":
      return { text: "二级", type: "success" };

    case "2":
      return { text: "三级", type: "info" };
  }
};
</script>

<style lang="scss" scoped>
:deep(.el-table .cell) {
  line-height: 50px;
}
</style>
