<template>

  <div class="meeting-map-index">
    <iframe id="mapPage" width="100%" height="100%" frameborder=0
            src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=KZ2BZ-P2URW-BLTR2-ROJ7D-NTIRS-ZUFGL&referer=myapp">
    </iframe>

  </div>

</template>

<script>
  export default {
    //会议-会议通知单-编辑页面
    name: 'meeting-map-index',
    data() {
      return {
        baseUrl: process.env.BASE_URL,
      }
    },
    components: {

    },
    mounted(){
      let _this = this
      window.addEventListener('message', function(event) {
        // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
        var loc = event.data;
        if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
          //console.log('location', loc);
          _this.$emit('location', loc)
        }
      }, false);

    },
    methods: {

    }

  }
</script>

<style lang="less">

  .meeting-map-index{
    height: 100%;
    iframe{

    }
  }

</style>