<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input :placeholder="$t('table.placeholder')" clearable v-model="queryForm.query"></el-input>
      </el-col>
      <el-button type="primary" :icon="Search">{{ $t("table.search") }}</el-button>
      <el-button type="primary" @click="handleDialogueValue('adduser', null)">{{ $t("table.adduser") }}</el-button>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        :prop="item.prop"
        :label="$t(`table.${item.label}`)"
        :width="item.width"
        v-for="(item, index) in options"
        :key="index"
      >
        <template v-slot="{ row }" v-if="item.prop === 'mg_state'">
          <el-switch v-model="row.mg_state" @change="changeState(row)" />
        </template>
        <template v-slot="{ row }" v-else-if="item.prop === 'create_time'">
          {{ $fliters.filterTimes(row.create_time) }}
        </template>
        <template v-slot="{ row }" #default v-else-if="item.prop === 'action'">
          <el-button size="small" type="primary" :icon="Edit" @click="handleDialogueValue('edituser', row)"></el-button>
          <el-button size="small" type="warning" :icon="Setting"></el-button>
          <el-button size="small" type="danger" :icon="Delete" @click="deleteuser(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="queryForm.pagenum"
      v-model:page-size="queryForm.pagesize"
      :page-sizes="[10, 20]"
      :small="false"
      :disabled="false"
      :background="false"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
  <Diadlog
    v-model="dialogVisible"
    :title="dialogTitle"
    :dialogType="dialogType"
    @initGetUserList="initGetUserList"
    :dialogTableValue="dialogTableValue"
  ></Diadlog>
</template>

<script setup lang="ts">
import { Search, Edit, Setting, Delete } from "@element-plus/icons-vue";
import { ref } from "vue";
import { getUsers, changeUserState, deleteUser } from "@/api/user";
import { options } from "./options";
import { ElMessage, ElMessageBox } from "element-plus";
import { i18n } from "@/localization";
import Diadlog from "./component/dialog.vue";

const t = i18n.global.t;

const queryForm = ref({
  query: "",
  pagenum: 1,
  pagesize: 10,
});

const tableData = ref<any>([]);
const total = ref(0);
const dialogVisible = ref(false);
const dialogTitle = ref("");
const dialogType = ref("");
const dialogTableValue = ref<
  | {
      create_time: number;
      id: number;
      username: string;
      password: string;
      email: string;
      role_name: string;
      mobile: string;
    }
  | {}
>({});

const initGetUserList = async () => {
  const res = await getUsers(queryForm.value);
  tableData.value = res.data.users;
  total.value = res.data.total;
};

const handleSizeChange = (pageSize: number) => {
  queryForm.value.pagenum = 1;
  queryForm.value.pagesize = pageSize;
  initGetUserList();
};

const handleCurrentChange = (pageNum: number) => {
  queryForm.value.pagenum = pageNum;
  initGetUserList();
};
initGetUserList();

const changeState = async (info: any) => {
  await changeUserState(info.id, info.mg_state);
  ElMessage({
    message: t("message.updeteSuccess"),
    type: "success",
  });
};

const handleDialogueValue = (mode: string, row: any) => {
  console.log(row);
  dialogType.value = mode;
  switch (mode) {
    case "adduser":
      dialogTitle.value = t("dialog.formtypes.adduser");
      dialogTableValue.value = {};
      break;
    case "edituser":
      dialogTitle.value = t("dialog.formtypes.edituser");
      dialogTableValue.value = JSON.parse(JSON.stringify(row));
      break;
    default:
      console.error("not found mode: " + mode);
  }
  dialogVisible.value = true;
};

const deleteuser = (row: any) => {
  ElMessageBox.confirm(t("dialog.deleteTitle"), "Warning", {
    confirmButtonText: t("dialog.confirm"),
    cancelButtonText: t("dialog.cancel"),
    type: "warning",
  })
    .then(async () => {
      await deleteUser(row.id);
      ElMessage({
        type: "success",
        message: t("dialog.doSucceed"),
      });
      initGetUserList();
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: t("dialog.doFailed"),
      });
    });
};
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}

:deep(.el-pagination) {
  padding-top: 16px;
  box-sizing: border-box;
  text-align: right;
}
</style>
