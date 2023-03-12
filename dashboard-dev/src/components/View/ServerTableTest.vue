<template>
    <div>

 <div class="card">
      <div class="card-header">
        <slot name="titleTable"></slot>
      </div>
      <div class="card-body row">
        <div class="col-sm-12">
          <slot name="extra"></slot>
          <el-table class=""
                    :data="queriedData"
                    border
                    style="width: 100%"
                    @cell-click="handleClick"
                    @selection-change="handleSelectionChange">
                    <!-- <el-table-column type="expand">
                      <template slot-scope="props">
                        <p>Business ID: {{ props.row.BusinessId }}</p>
                      </template>
                    </el-table-column> -->
                    <slot name="index"></slot>
            <slot name="select"></slot>
            <el-table-column v-for="(column, i) in page.tableColumns"
                             :key="i"
                             :min-width="column.minWidth"
                             :prop="column.prop"
                             :label="column.label"
                             :data-title="column.label"
                             :sortable="column.sortable ? true : false"
                             >
            </el-table-column>

            <slot name="actions" v-if="page.total"></slot>
          </el-table>
        </div>
        <div class="col-sm-4 pagination-info">
          <p class="category">Showing {{from + 1}} to {{to}} of {{total}} entries</p>
        </div>
        <div class="col-sm-4 pull-left" v-if="page.entries">
          Show
          <el-select style="width:20%" v-model="page.TotalPerPage" placeholder="Per Page">
            <el-option
              v-for="item in pagination.perPageOptions"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          entries
        </div>
        <div class="col-sm-4 pull-left" v-else>
        </div>
        <div class="col-sm-4">
          <p-pagination class="pull-right"
                        v-model="pagination.currentPage"
                        :per-page="page.TotalPerPage"
                        :total="pagination.total"
                        @changedEvent="changedEvent($event)">
          </p-pagination>
        </div>

      </div>
    </div>


    </div>
</template>

<script>
import Vue from 'vue'
  // import {Table, TableColumn, Select, Option} from 'element-ui'
  import PPagination from './ServerPagination.vue'
  // import lang from 'element-ui/lib/locale/lang/en'
  // import locale from 'element-ui/lib/locale'
  // locale.use(lang)
  // Vue.use(Table,{locale})
  // Vue.use(TableColumn)
  // Vue.use(Select)
  // Vue.use(Option)
export default {
    props: ['page','reload'],
    components: {
      PPagination
    },
    methods: {
      handleSelectionChange(val){
        this.$emit('selected',val)
      },
      handleClick(row, column, cell, event) {
        if(column.label == 'Order ID'){
          this.$emit('getOrderProducts',row)
        }
        if(column.label == 'Payment Method'){
          this.$emit('getChequeCollection',row)
        }
        // console.log(column.label)
      },
      changedEvent (val) {
      	this.pagination.currentPage = val
        this.$emit('updateData',{
      	  CurrentPage: val,
      	  // TotalPerPage: this.pagination.perPage,
           // TotalPerPage: 2,
          // search: this.searchQuery
      	})
      }
    },
    computed: {
      pagedData () {
        return this.page.tableData.slice(0, this.page.TotalPerPage)
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
        // if (!this.searchQuery) {
          this.pagination.total = this.page.total
          return this.pagedData
        // }
        // console.log('hit search')
        // let result = this.page.tableData
        //   .filter((row) => {
        //     let isIncluded = false
        //     for (let key of this.page.propsToSearch) {
        //       let rowValue = row[key].toString().toLowerCase()
        //       let searchQuery = this.searchQuery.toLowerCase()
        //       if (rowValue.includes && rowValue.includes(searchQuery)) {
        //         isIncluded = true
        //       }
        //     }
        //     return isIncluded
        //   })
        // this.pagination.total = this.page.total
        // return result.slice(this.from, this.to)
      },
      to () {
        let highBound = this.from + this.page.TotalPerPage
        if (this.total < highBound) {
          highBound = this.total
        }
        return highBound
      },
      from () {
        return this.page.TotalPerPage * (this.pagination.currentPage - 1)
      },
      total () {
        this.pagination.total = this.page.total
        // console.log(this.page.total)
        return this.page.total
      },
      setIndexes () {
        for (let key in this.page.tableData) {
          if (!('index_no' in this.page.tableData[key])) {
            let NewInd = (((this.pagination.currentPage - 1) * this.page.TotalPerPage) + parseInt(key)) + 1
            this.page.tableData[key].index_no = NewInd
          }
        }
        return this.page.tableData
      },
      setColumns () {
        let inde = {
          prop: 'index_no',
          label: 'Sl. No',
          minWidth: 90
        }
        let SeeIf = true
        for (let key in this.page.tableColumns) {
          if (JSON.stringify(this.page.tableColumns[key]) === JSON.stringify(inde)) {
            SeeIf = false
          }
        }
        if (SeeIf) {
          this.page.tableColumns.unshift(inde)
        }
        return this.page.tableColumns
      }
    },
    watch:{
      reload(data){
        this.changedEvent(this.pagination.currentPage)
      }
    },
    data () {
      return {
        pagination: {
          perPage: 2,
          currentPage: 1,
          perPageOptions: [5, 10, 25, 50, 100],
          total: 0
        },
        searchQuery: '',
      }
    },
    created () {
      // if(this.page.searchQuery){
      //   this.searchQuery = this.page.searchQuery
      // }
      this.pagination.perPage = this.page.TotalPerPage
      let pageNumber = this.pagination.currentPage ? this.pagination.currentPage : 1
      this.changedEvent(pageNumber)
    }

}
</script>

<style>
.el-table thead{
  background-color: #1576c2;
  color: #fff;
}
</style>
