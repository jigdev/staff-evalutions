<template lang="pug">
    div
        search-toolbar
        v-content
            router-view
</template>

<script>

    export default {
         components: {
             SearchToolbar : ()=> import("../components/SearchToolbar.vue")
        }
    }
</script>
