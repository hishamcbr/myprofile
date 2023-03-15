<template>
<el-card>
  <div class="add-form">
    <h4 class="title">Upload File</h4>
    <el-upload
      ref="upload"
      class="upload-demo"
      action=""
      :on-change="handleUploadChange"
      :before-upload="handleBeforeUpload"
      accept="*"
      :file-list="fileList"
      :auto-upload="false"
      :on-progress="handleProgress"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
    >
      <el-button slot="trigger" size="small" type="primary">
        Click to select file
      </el-button>
      
      <div slot="tip" class="el-upload__tip">
        only .csv files allowed
      </div>
    </el-upload>
    <br>
    <el-button
      v-if="fileList.length"
      size="small"
      type="success"
      @click="submitUpload"
    >
      {{ is_processing ? 'Processing...' : 'Upload' }}
      <i v-if="is_processing_single" class="el-icon-loading" />
    </el-button>
    <br>
    <br>
  </div>
  <!-- <button @click="get_page_token">Get</button> -->
  <el-card v-if="user_data.profile_pic">
    <h4 >Uploaded Image</h4>
    <ShareNetwork
        network="facebook"
        url="'http://localhost/myprofile/storage/app/'+user_data.profile_pic"
        title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
        description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
        quote="The hot reload is so fast it\'s near instant. - Evan You"
        hashtags="vuejs,vite"
      >
        Share on Facebook
    </ShareNetwork>
    <img v-if="user_data.profile_pic" class="avatar border-gray" :src="'http://localhost/myprofile/storage/app/'+user_data.profile_pic" alt="...">
  </el-card>
  
  </el-card>
</template>

<script>

export default {
  components: {},
  props: ['user_data','access_token'],
  data() {
    return {
      is_processing: false,
      form: {},
      mode: "add",
      fileList: [],
      addUrl: 'auth/upload_image',
      uploadPercentage: 0
    };
  },
  created() {
    
  },
  methods: {
    handleRemove(){
      this.fileList = [];
    },
    get_page_token(){
        this.$http.get(`https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=180376431442444&client_secret=b85db2d0b10947ef3e58bd74423c140a&fb_exchange_token=${this.access_token}`)
        .then(response => {
        let res = response.body
          console.log(res)

        }).catch(err => {
          this.$notify({
            title: err.statusText,
            message: err.bodyText,
            type: 'danger'
          });
        });
    },
    // submitUpload() {
      
    //   this.is_processing = true;
    //   const formData = new FormData();
    //   formData.append('source', this.fileList[0].raw);
    //   formData.append('message',"Test");
    //   formData.append('access_token',this.access_token)
    //   this.$http.post('https://graph.facebook.com/'+649572988526250+'/photos' ,formData,
    //     {
    //       headers: {
    //           'Content-Type': 'multipart/form-data'
    //       },
    //       onUploadProgress: function( progressEvent ) {
    //         this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) );
    //       }.bind(this)
    //     }).then(response => {
    //       this.is_processing = false;
    //       let res = response.body
    //       if(res.success){
    //         this.$notify({
    //           title: 'Success',
    //           message: res.message,
    //           type: 'success'
    //         });
    //         this.$emit('user_data_changed')
    //       }
    //     }).catch(err => {
    //       this.$notify({
    //         title: err.statusText,
    //         message: err.bodyText,
    //         type: 'danger'
    //       });
    //     });
    // },
    submitUpload() {
      this.is_processing = true;
      const formData = new FormData();
      formData.append('file', this.fileList[0].raw);
      formData.append('id',this.user_data.id);
      this.$http.post(this.addUrl,formData,
        {
          headers: {
              'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: function( progressEvent ) {
            this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) );
          }.bind(this)
        }).then(response => {
          this.is_processing = false;
          let res = response.body
          if(res.success){
            this.$notify({
              title: 'Success',
              message: res.message,
              type: 'success'
            });
            this.$emit('user_data_changed')
          }
        }).catch(err => {
          this.$notify({
            title: err.statusText,
            message: err.bodyText,
            type: 'danger'
          });
        });
    },
    handleProgress(ev, file) {
      file.raw['status'] = "uploading";
    },
    handleSuccess(res, file) {
      file.raw['status'] = "success";
    },
    handleUploadChange(file, fileList) {
      this.fileList = fileList.slice(-1);
    },
    handleBeforeUpload(file) {
      const allowedCsvMime = [
        'text/csv',
      ];
      if (allowedCsvMime.includes(file.type)) {
        return true;
      } else {
        this.$message.error(
          'You can only upload CSV files. No other file types are allowed'
        );
        this.fileList.pop(file);
      }
    },
    handleClose() {

    },
    
  }
};
</script>

<style>
</style>
