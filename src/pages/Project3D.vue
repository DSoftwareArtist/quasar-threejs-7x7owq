<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row q-col-gutter-x-md">
        <div class="col-2 text-center">
          <div class="bordered text-center model">
            Sidebar
          </div>
        </div>
        <div class="col-10 text-center">
          <div class="bordered model">
            <BaseModel />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import BaseModel from '../components/model3D/BaseModel.vue'

export default defineComponent({
  name: 'Project3D',
  components: {
    BaseModel
  },
  computed: {

  }
})
</script>


<style scoped>
.bordered {
  border: 1px solid grey;
}

.model {
  height: calc(100vh - 110px);
}
</style>
