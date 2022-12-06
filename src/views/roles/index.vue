<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-button type="primary" @click="setAddRoleDialogVisible = true">{{ $t("action.addRole") }}</el-button>
      </el-col>
    </el-row>

    <el-table :data="tableData" style="width: 100%" stripe border>
      <el-table-column type="expand">
        <template v-slot="{ row }">
          <el-row
            class="vcenter bdBottom"
            :class="{ bdTop: index !== 0 }"
            v-for="(item1, index) in row.children"
            :key="item1.id"
          >
            <!--一级权限-->
            <el-col :span="5">
              <el-tag>{{ item1.authName }}</el-tag>
              <el-icon class="icon-arrow">
                <CaretRight />
              </el-icon>
            </el-col>
            <!--二级和三级权限-->
            <el-col :span="19">
              <el-row
                :class="{ bdBottom_light: index !== 0, vcenter: true }"
                v-for="(item2, index) in item1.children"
                :key="item2.id"
              >
                <!--二级权限-->
                <el-col :span="7">
                  <el-tag type="success" closable @close="handleCloseTag(row, item2.id)">{{ item2.authName }}</el-tag>
                  <el-icon class="icon-arrow">
                    <CaretRight />
                  </el-icon>
                </el-col>
                <!--三级权限-->
                <el-col :span="17">
                  <el-tag
                    v-for="(item3, index) in item2.children"
                    :key="index"
                    type="warning"
                    closable
                    @close="handleCloseTag(row, item3.id)"
                  >
                    {{ item3.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
        :prop="item.prop"
        :label="$t(`roleTable.${item.label}`)"
        :width="item.width"
        v-for="(item, index) in options"
        :key="index"
      >
        <template v-slot="{ row }" #default v-if="item.prop === 'action'">
          <el-button size="small" type="primary" :icon="Edit" @click="showEditRoleDialog(row)">
            {{ $t("action.editRole") }}
          </el-button>
          <el-button size="small" type="danger" :icon="Delete" @click="openDeleteRoleMsgBox(row)">
            {{ $t("action.deleteRole") }}
          </el-button>
          <el-button size="small" type="warning" :icon="Setting" @click="showSetRightDialog(row)">
            {{ $t("action.editRight") }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <!--分配权限对话框-->
  <EditRightDialogVue
    v-model="setRightDialogVisible"
    :defaultKeys="defaultActiveRights"
    :roleid="roleid"
    @initRoleList="initRoleList"
  ></EditRightDialogVue>

  <!--创建角色对话框-->
  <CreateRoleDialogVue v-model="setAddRoleDialogVisible" @initRoleList="initRoleList"></CreateRoleDialogVue>
  <EditRoleDialogVue
    v-model="setEditRoleDialogVisible"
    :dialogTableValue="editRoledialogTableValue"
    :roleId="roleid"
    @initRoleList="initRoleList"
  ></EditRoleDialogVue>
</template>

<script setup lang="ts">
import { CaretRight, Edit, Setting, Delete } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { getRoleList, deleteRoleRight, deleteRole } from "@/api/role";
import { ref, onMounted } from "vue";
import { options } from "./options";
import { i18n } from "@/localization";
import EditRightDialogVue from "./components/editRightDialog.vue";
import CreateRoleDialogVue from "./components/createRoleDialog.vue";
import EditRoleDialogVue from "./components/editRoleDialog.vue";
import type { RoleItem } from "@/api/types";

const t = i18n.global.t;

onMounted(() => {
  initRoleList();
});

const setRightDialogVisible = ref(false);
const setAddRoleDialogVisible = ref(false);
const setEditRoleDialogVisible = ref(false);
const tableData = ref<any[]>();
const defaultActiveRights = ref<number[]>([]);
const roleid = ref<number>(0);

const editRoledialogTableValue = ref({
  roleName: "",
  roleDesc: "",
});

const initRoleList = async () => {
  const res = await getRoleList();
  tableData.value = res.data;
};

const handleCloseTag = (role: any, rightId: number) => {
  ElMessageBox.confirm(t("dialog.deleteTitle"), "Warning", {
    confirmButtonText: t("dialog.confirm"),
    cancelButtonText: t("dialog.cancel"),
    type: "warning",
  })
    .then(async () => {
      const res = await deleteRoleRight(role.id, rightId);
      role.children = res.data;
      ElMessage({
        type: "success",
        message: t("dialog.doSucceed"),
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: t("dialog.doFailed"),
      });
    });
};

const getActiveRights = (role: RoleItem, arrays: number[]) => {
  if (!role.children) {
    arrays.push(role.id);
  }
  role.children?.forEach((item) => {
    getActiveRights(item, arrays);
  });
};

const showSetRightDialog = (row: any) => {
  setRightDialogVisible.value = true;
  roleid.value = row.id;
  let a: number[] = [];
  getActiveRights(row, a);
  defaultActiveRights.value = a;
};

const showEditRoleDialog = (row: any) => {
  setEditRoleDialogVisible.value = true;
  roleid.value = row.id;
};

const openDeleteRoleMsgBox = (row: any) => {
  ElMessageBox.confirm(t("dialog.deleteTitle"), "Warning", {
    confirmButtonText: t("dialog.confirm"),
    cancelButtonText: t("dialog.cancel"),
    type: "warning",
  })
    .then(async () => {
      await deleteRole(row.id);
      ElMessage({
        type: "success",
        message: t("dialog.doSucceed"),
      });
      initRoleList();
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
}

.el-tag {
  margin: 7px;
}

.icon-arrow {
  vertical-align: middle;
}

:deep(.el-table__cell.el-table__expanded-cell) {
  padding: 20px 50px;
}

.bdTop {
  border-top: 1px solid #ccc;
}
.bdBottom {
  border-top: 1px solid #ccc;
}

.bdBottom_light {
  border-top: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}
</style>
