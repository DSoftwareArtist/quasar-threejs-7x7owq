<template>
  <q-layout view="hHh lpr fFf" >
    <TheNavbar />
    <q-page-container>
      <router-view />
    </q-page-container>
    <TheFooter />
  </q-layout>
</template>


<script>

import { defineComponent, ref } from 'vue'
import TheNavbar from '../components/TheNavbar.vue'
import TheFooter from '../components/TheFooter.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    TheNavbar,
    TheFooter
  },

})
</script>
