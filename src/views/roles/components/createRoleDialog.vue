<template>
  <el-dialog :model-value="setDialogVisible" :title="$t('roleTable.createrole')" width="40%" @close="handleClose">
    <el-form ref="formRef" :model="form" label-width="90px" :rules="rules">
      <el-form-item :label="$t('dialog.roleName')" prop="roleName">
        <el-input v-model="form.roleName" :placeholder="$t('dialog.roleName')" />
      </el-form-item>
      <el-form-item :label="$t('dialog.roleDesc')" prop="roleDesc">
        <el-input v-model="form.roleDesc" :placeholder="$t('dialog.roleDesc')" />
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
import { addRole } from "@/api/role";

const t = i18n.global.t;

const form = ref({
  roleName: "",
  roleDesc: "",
});

const formRef = ref<FormInstance>();

const rules = ref<FormRules>({
  roleName: [
    {
      required: true,
      message: t("dialog.formrules.roleName_null"),
      trigger: "blur",
    },
  ],
});

const setDialogVisible = ref(false);

const emits = defineEmits(["update:modelValue", "initRoleList"]);

const handleClose = () => {
  emits("update:modelValue", false);
};

const handleConfirm = async () => {
  if (!formRef.value) return;
  formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        await addRole(form.value);
        ElMessage.success(t("message.updeteSuccess"));
        emits("initRoleList");
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
