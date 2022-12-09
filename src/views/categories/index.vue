<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col>
        <el-button type="primary" :span="7" @click="showAddCateItemDialog">
          {{ t("categoryTable.addCategory") }}
        </el-button>
      </el-col>
    </el-row>
    <!--表格-->
    <el-table :data="tableData" style="width: 100%" stripe border>
      <el-table-column
        :prop="item.prop"
        :label="$t(`categoryTable.${item.label}`)"
        v-for="(item, index) in options"
        :key="index"
        :width="item.width"
      >
        <template v-slot="{ row }" v-if="item.prop === 'cat_level'">
          <el-tag v-model="row.cat_level" :type="levelNumToTxt(row.cat_level).type">
            {{ levelNumToTxt(row.cat_level).text }}
          </el-tag>
        </template>

        <template v-slot="{ row }" #default v-if="item.prop === 'action'">
          <el-button size="small" type="primary" :icon="Edit" @click="showEditCateItemDialog(row)">
            {{ $t("action.editCateItem") }}
          </el-button>
          <el-button size="small" type="danger" :icon="Delete" @click="openDeleteCateItemMsgBox(row)">
            {{ $t("action.deleteCateItem") }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <el-pagination
      v-model:current-page="queryForm.pagenum"
      v-model:page-size="queryForm.pagesize"
      :page-sizes="[10, 20]"
      :small="false"
      :disabled="false"
      :background="false"
      layout="total,sizes,prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>

  <!--表单-->
  <EditCateItemDialog v-model="setEditCateItemDialogVisible" @initCateList="initCateList" :cate-id="cateId" />
  <AddCateItemDialog v-model="setAddCateItemDialogVisible" @initCateList="initCateList" />
</template>

<script setup lang="ts">
import { CaretRight, Edit, Setting, Delete } from "@element-plus/icons-vue";
import { getCategories, deleteCateItem } from "@/api/categories";
import type { getCategoriesRequest, categoryItem } from "@/api/types";
import { ElMessageBox, ElMessage } from "element-plus";
import { ref, onMounted } from "vue";
import { options } from "./options";
import { i18n } from "@/localization";
import EditCateItemDialog from "./components/EditCateItemDialog.vue";
import AddCateItemDialog from "./components/AddCateItemDialog.vue";

const t = i18n.global.t;
const total = ref<number>(-1);
const cateId = ref<number>(-1);

const setEditCateItemDialogVisible = ref(false);
const setAddCateItemDialogVisible = ref(false);

const handleSizeChange = (pageSize: number) => {
  queryForm.value.pagenum = 1;
  queryForm.value.pagesize = pageSize;
  initCateList();
};

const handleCurrentChange = (pageNum: number) => {
  queryForm.value.pagenum = pageNum;
  initCateList();
};

const tableData = ref<categoryItem[]>([]);
const queryForm = ref<getCategoriesRequest>({ type: 3, pagenum: 1, pagesize: 10 });

onMounted(() => {
  initCateList();
});

const initCateList = async () => {
  const res = await getCategories(queryForm.value);
  tableData.value = res.data.result;
  total.value = res.data.total;
};

const levelNumToTxt = (p: 0 | 1 | 2): { text: string; type: String } => {
  switch (p) {
    case 0:
      return { text: "一级", type: "" };

    case 1:
      return { text: "二级", type: "success" };

    case 2:
      return { text: "三级", type: "warning" };
    default:
      return { text: "...", type: "" };
  }
};

const showEditCateItemDialog = (row: any) => {
  setEditCateItemDialogVisible.value = true;
  cateId.value = row.cat_id;
};

const showAddCateItemDialog = () => {
  setAddCateItemDialogVisible.value = true;
};

const openDeleteCateItemMsgBox = (row: any) => {
  ElMessageBox.confirm(t("dialog.deleteTitle"), "Warning", {
    confirmButtonText: t("dialog.confirm"),
    cancelButtonText: t("dialog.cancel"),
    type: "warning",
  })
    .then(async () => {
      await deleteCateItem(row.cat_id);
      ElMessage({
        type: "success",
        message: t("dialog.doSucceed"),
      });
      initCateList();
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

.el-pagination {
  padding-top: 16px;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
}
</style>
