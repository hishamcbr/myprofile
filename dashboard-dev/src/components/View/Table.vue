<template>
    <div>

 <div class="card">
      <div class="card-header">
        <!-- <h5 class="card-title">Table with Links</h5> -->
      </div>
      <div class="card-body row">
        <div class="col-sm-12">
          <el-table :data="tableData" header-row-class-name="text-white" type="primary">
            <el-table-column type="index">

            </el-table-column>
            <el-table-column :key="tbhead.prop" v-for="tbhead in TableHeader" :prop="tbhead.prop"
                             :label="tbhead.label">
            </el-table-column>
           
            <slot name="actions"></slot>
          </el-table>
        </div>
      </div>
    </div>


    </div>
</template>

<script>
export default {
    props:['TableHeader' , 'tableData']

}
</script>

<style>
.el-table thead{
  background-color: #1576c2;
  color: #fff;
}
</style>
