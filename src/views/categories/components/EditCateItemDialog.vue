<template>
  <el-dialog :model-value="setDialogVisible" :title="$t('categoryTable.addCategory')" width="40%" @close="handleClose">
    <el-form ref="formRef" :model="form" label-width="90px" :rules="rules">
      <el-form-item :label="$t('dialog.cateName')" prop="cateName" label-width="auto">
        <el-input v-model="form.cateName" :placeholder="$t('dialog.cateName')" />
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
import { editCateItem } from "@/api/categories";

const t = i18n.global.t;

const props = defineProps<{ cateId: number }>();

const form = ref({
  cateName: "",
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
        await editCateItem(props.cateId, { cat_name: form.value.cateName });
        ElMessage.success(t("message.updeteSuccess"));
        emits("initCateList");
        handleClose();
      } catch {}
    } else {
      ElMessage.error(t("message.wrongForm"));
      return false;
    }
  });
};
</script>

<style lang="scss" scoped></style>
