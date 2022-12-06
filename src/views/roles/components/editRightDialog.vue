<template>
  <el-dialog v-model="setRightDialogVisible" :title="$t('action.editRight')" width="30%" @close="handleClose">
    <el-tree ref="treeRef" :data="rightList" :props="treeProps" show-checkbox node-key="id" default-expand-all />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="handleConfirm">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from "vue";
import { getRightList, editRightList } from "@/api/right";
import type { RightTreeItem } from "@/api/types/right";
import { ElMessage, ElTree } from "element-plus";

onMounted(async () => {
  const res = await getRightList("tree");
  rightList.value = res.data;

  watch(
    () => props.defaultKeys,
    () => {
      nextTick(() => {
        treeRef.value!.setCheckedKeys(props.defaultKeys, true);
      });
    }
  );
});

const treeRef = ref<InstanceType<typeof ElTree>>();

const props = defineProps<{ defaultKeys: number[]; roleid: number }>();

const setRightDialogVisible = ref(false);

const rightList = ref<RightTreeItem[]>();

const emits = defineEmits(["update:modelValue", "initRoleList"]);

const handleClose = () => {
  //清空选择的节点
  treeRef.value!.setCheckedKeys([], false);
  emits("update:modelValue", false);
};

const handleConfirm = async () => {
  const rids: (string | number)[] = [...treeRef.value!.getCheckedKeys(), ...treeRef.value!.getHalfCheckedKeys()];
  const ridstrs = rids.join(",");
  await editRightList(props.roleid, ridstrs);
  ElMessage.success("分配权限成功");
  treeRef.value!.setCheckedKeys([], false);
  emits("update:modelValue", false);
  emits("initRoleList");
};

const treeProps = {
  children: "children",
  label: "authName",
};
</script>

<style lang="scss" scoped></style>
