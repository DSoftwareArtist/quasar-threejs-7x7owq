<template>
    <q-header class="bg-dark">
        <q-toolbar>

            <q-space />

            <q-tabs
                class="text-grey-7"
                active-class="active_tab" >
                    <q-route-tab
                        v-for="tab in tab_links"
                        :key="tab.name"
                        :to="tab.route">
                        {{ tab.name }}
                    </q-route-tab>
            </q-tabs>
        </q-toolbar>
    </q-header>
</template>


<script>

export default {
name: 'Navbar',

data() {
    return {
        active: false,
        tab_links: [
            { name: 'Project 3D', route: '/' },
            { name: 'Analysis', route: '/analysis' },
            { name: 'Settings', route: '/settings' }
        ],
    }
},


}
</script>

<style scoped>
.q-tabs {
    letter-spacing: 1px;
}

.active_tab {
   color: #651fff;
}

.q-tabs /deep/ .q-tab {
   max-width: 115px;
}
</style>
