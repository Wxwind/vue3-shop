<template>
  <el-dialog :model-value="dialogVisible" :title="title" width="40%" @close="handleClose">
    <el-form ref="formRef" :model="form" label-width="90px" :rules="rules">
      <el-form-item :label="$t('dialog.username')" prop="username" v-if="props.dialogType == 'adduser'">
        <el-input v-model="form.username" :placeholder="$t('dialog.username')" />
      </el-form-item>
      <el-form-item :label="$t('dialog.password')" prop="password" v-if="props.dialogType == 'adduser'">
        <el-input v-model="form.password" :placeholder="$t('dialog.password')" type="password" />
      </el-form-item>
      <el-form-item :label="$t('dialog.email')" prop="email">
        <el-input v-model="form.email" :placeholder="$t('dialog.email')" />
      </el-form-item>
      <el-form-item :label="$t('dialog.mobile')" prop="mobile">
        <el-input v-model="form.mobile" :placeholder="$t('dialog.mobile')" />
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
import { ref, watch } from "vue";
import { addUser, editUser } from "@/api/user";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { i18n } from "@/localization";

const t = i18n.global.t;
const dialogVisible = ref(false);

const emits = defineEmits(["update:modelValue", "initGetUserList"]);
const props = defineProps<{
  title: string;
  dialogTableValue:
    | {
        create_time: number;
        id: number;
        username: string;
        password: string;
        email: string;
        role_name: string;
        mobile: string;
      }
    | {};
  dialogType: string;
}>();

const form = ref({
  id: 0,
  username: "",
  password: "",
  email: "",
  mobile: "",
});
const formRef = ref<FormInstance>();

const isNullType = (a: object): a is {} => {
  return Object.keys(a).length === 0;
};

watch(
  () => {
    props.dialogTableValue;
  },
  () => {
    form.value = isNullType(props.dialogTableValue)
      ? {
          id: 0,
          username: "",
          password: "",
          email: "",
          mobile: "",
        }
      : props.dialogTableValue;
  },
  { deep: true, immediate: true }
);

const handleClose = () => {
  emits("update:modelValue", false);
};

const handleConfirm = async () => {
  if (!formRef.value) return;
  formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        switch (props.dialogType) {
          case "adduser":
            await addUser(form.value);
            break;
          case "edituser":
            await editUser(form.value);
            break;
          default:
            console.error("not found mode: " + props.dialogType);
        }

        ElMessage.success(t("message.updeteSuccess"));
        emits("initGetUserList");
        handleClose();
      } catch {}
    } else {
      ElMessage.error(t("message.addUserWrongForm"));
      return false;
    }
  });
};

const rules = ref<FormRules>({
  username: [
    {
      required: true,
      message: t("dialog.formrules.username_null"),
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: t("dialog.formrules.password_null"),
      trigger: "blur",
    },
  ],
  email: [
    {
      required: true,
      message: t("dialog.formrules.username_null"),
      trigger: "blur",
    },
    {
      type: "email",
      message: t("dialog.formrules.email_illegal"),
      trigger: ["blur", "change"],
    },
  ],
  mobile: [
    {
      required: true,
      message: t("dialog.formrules.mobile_null"),
      trigger: "blur",
    },
    {
      pattern: "^[1-9][0-9]*$",
    },
  ],
});
</script>

<style lang="scss" scoped></style>
