<script >
import {defineComponent} from 'vue'
import CustomButton from "@/components/CustomButton.vue";
import IconDownload from "@/components/icons/IconDownload.vue";
import axios  from "axios";
import fileDownload from "js-file-download";
export default defineComponent({
  name: "ReportCard",
  components: {IconDownload,},
  props:{
    report:Object,
    number:Number,
  },
  methods :{
    download(){
      axios.request({
        url:'report/'+this.report.id,
        method: 'GET',
        responseType: 'blob',
      }).then(response =>{
        fileDownload(response.data,'report_'+(+this.number+1)+'.pdf')
      })
    }
  }
})
</script>

<template>
<div class="ask-card" >
  <div class="header">
    <h3 class="title">Rapport {{number+1}}</h3>
    <div class="body">
      <div class="info">
        <span>{{report.published_at}}</span>
      </div>
    </div>
  </div>
  <button @click="download" type="button" class="btn" >
    <IconDownload/>
  </button>
</div>
</template>

<style lang="scss" scoped>
.ask-card {
  padding: .8rem;
  box-shadow: var(--global-shadow);
  border-radius: var(--global-border-radius);
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h3 {
  color: var(--blue-color-400);
  font-size: 1.4rem;
  font-weight: 500;
  text-transform: capitalize;
  margin-top: 5px;
}
.body {
  margin-top: .7rem;

  .info {
    color: var(--black-color);
    span:not(:first-child) {
      color: var(--gray-color-300);
    }
  }

  * + * {
    margin-top: .7rem;
  }
}
.btn{
  width: 50px;
  padding: .6rem;
  height: 50px;
  color: white;
  border-radius: 50%;
  background-color: var(--blue-color-400);
}

</style>