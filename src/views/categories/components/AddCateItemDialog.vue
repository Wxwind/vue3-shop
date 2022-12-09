<template>
  <el-dialog :model-value="setDialogVisible" :title="$t('roleTable.createrole')" width="40%" @close="handleClose">
    <el-form ref="formRef" :model="form" label-width="90px" :rules="rules">
      <el-form-item :label="$t('dialog.cateName')" prop="cateName">
        <el-input v-model="form.cat_name" :placeholder="$t('dialog.cateName')" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">{{ $t("dialog.cancel") }}</el-button>
        <el-button type="primary" @click="handleConfirm">{{ $t("dialog.confirm") }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { i18n } from "@/localization";
import { addCateItem } from "@/api/categories";

const t = i18n.global.t;

const form = ref<{ cat_pid: number; cat_name: string; cat_level: 0 | 1 | 2 }>({
  cat_level: 0,
  cat_name: "",
  cat_pid: -1,
});

const formRef = ref<FormInstance>();

const rules = ref<FormRules>({
  cateName: [
    {
      required: true,
      message: t("dialog.formrules.cateName_null"),
      trigger: "blur",
    },
  ],
});

const setDialogVisible = ref(false);

const emits = defineEmits(["update:modelValue", "initCateList"]);

const handleClose = () => {
  emits("update:modelValue", false);
};

const handleConfirm = async () => {
  if (!formRef.value) return;
  formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        await addCateItem(form.value);
        ElMessage.success(t("message.updeteSuccess"));
        emits("initCateList");
        handleClose();
      } catch {}
    } else {
      ElMessage.error(t("message.addUserWrongForm"));
      return false;
    }
  });
};
</script>

<style lang="scss" scoped></style>
