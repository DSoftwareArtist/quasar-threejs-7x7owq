<template>
    <q-footer class="bg-dark">
        <q-toolbar>
            <q-toolbar-title class='text-center text-grey-8'>
                &copy; {{ new Date().getFullYear() }}
            </q-toolbar-title>
        </q-toolbar>
    </q-footer>
</template>

<script>
export default {
name: 'Footer'

}
</script>

<style scoped>

.q-toolbar {
    min-height: 40px;
}

.q-toolbar__title {
    font-size: 12px;
    letter-spacing: 0.8px;
}
</style>
