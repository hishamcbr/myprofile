<template>
	<div>
        <slot name="filters"></slot>
        <slot name="btns"></slot>
        
        <!-- <div class="col-sm-12"> -->
          <el-table
            :data="queriedData"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <slot name="index"></slot>
						<el-table-column
							v-if = "page.selection"
				      type="selection"
				      width="55">
				    </el-table-column>
            <el-table-column v-for="(column, i) in page.tableColumns"
                             :key="i"
                             :min-width="column.minWidth"
                             :prop="column.prop"
                             :label="column.label"
														 >
            </el-table-column>
            <slot name="actions" v-if="page.tableData.length"></slot>
          </el-table>
        <!-- </div> -->
        <div class="row">
            <div class="col-sm-6 ">
              <p class="category">Showing {{from + 1}} to {{to}} of {{total}} entries</p>
            </div>
            <div class="col-sm-6">
              <p-pagination class="pull-right"
                            v-model="pagination.currentPage"
                            :per-page="pagination.perPage"
                            :total="pagination.total">
              </p-pagination>
            </div>
        </div>
        
      </div>
</template>
<script>
  import Vue from 'vue'
  import {Table, TableColumn, Select, Option, DatePicker} from 'element-ui'
  import PPagination from './Pagination.vue'
  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(DatePicker)
  export default{
    props: ['page'],
    components: {
      PPagination
    },
    computed: {
      pagedData () {
        return this.page.tableData.slice(this.from, this.to)
      },
      /***
       * Searches through table data and returns a paginated array.
       * Note that this should not be used for table with a lot of data as it might be slow!
       * Do the search and the pagination on the server and display the data retrieved from server instead.
       * @returns {computed.pagedData}
       */
      queriedData () {
        this.page.tableData = this.setIndexes
        this.page.tableColumns = this.setColumns
        if (!this.searchQuery) {
          this.pagination.total = this.page.tableData.length
          return this.pagedData
        }
        let result = this.page.tableData
          .filter((row) => {
            let isIncluded = false
            for (let key of this.page.propsToSearch) {
              let rowValue = row[key].toString().toLowerCase()
              let searchQuery = this.searchQuery.toLowerCase()
              if (rowValue.includes && rowValue.includes(searchQuery)) {
                isIncluded = true
              }
            }
            return isIncluded
          })
        this.pagination.total = result.length
        return result.slice(this.from, this.to)
      },
      to () {
        let highBound = this.from + this.pagination.perPage
        if (this.total < highBound) {
          highBound = this.total
        }
        return highBound
      },
      from () {
        return this.pagination.perPage * (this.pagination.currentPage - 1)
      },
      total () {
        this.pagination.total = this.page.tableData.length
        return this.page.tableData.length
      },
      setIndexes () {
        for (let key in this.page.tableData) {
          if (!('index_no' in this.page.tableData[key])) {
            let NewInd = parseInt(key) + 1
            this.page.tableData[key].index_no = NewInd
          }
        }
        return this.page.tableData
      },
      setColumns () {
        let inde = {
          prop: 'index_no',
          label: '#',
          minWidth: 30
        }
        let SeeIf = true
        for (let key in this.page.tableColumns) {
          if (JSON.stringify(this.page.tableColumns[key]) == JSON.stringify(inde)) {
            SeeIf = false
          }
        }
        if (SeeIf) {
          this.page.tableColumns.unshift(inde)
        }
        return this.page.tableColumns
      }
    },
    methods: {
      handleSelectionChange (val) {
        this.$emit('selectionChange', val)
      }
    },
    data () {
      return {
        pagination: {
          perPage: 50,
          currentPage: 1,
          perPageOptions: [5, 10, 25, 50],
          total: 0
        },
        searchQuery: '',
				checkedCategories: []
      }
    }
  }
</script>
<style>
  .el-table tbody tr td:first-child, .el-table thead tr th:first-child {
    padding-left: 5px !important
  }
  .margin-down {
    margin-bottom: 10px;
  }
	th{
		white-space:pre-wrap; word-wrap:break-word
	}
	.el-table th{
		background-color: #6f6f70;
		color: #fff;
	}
</style>