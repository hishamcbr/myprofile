<template>
  <div class="card card-user">
    <div class="image">
      <img src="static/img/background/damir-bosnjak.jpg" alt="...">
    </div>
    <div class="card-body">
      <div class="author">
        <a href="#">
          <img class="avatar border-gray" :src="user_data.profile_pic ? 'http://localhost/myprofile/storage/app/'+user_data.profile_pic : 'static/img/mike.jpg'" alt="...">
          <h5 class="title">{{user_data.name}}</h5>
          <h6 style="text-transform:lowercase">{{user_data.email}}</h6>
        </a>
        <p class="description">
          @{{user_data.name}}
        </p>
      </div>
      
    </div>
  </div>
</template>
<script>
  export default {
    props: ['user_data'],
  }

</script>
<style>

</style>
