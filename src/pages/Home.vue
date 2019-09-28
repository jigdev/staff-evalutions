<template lang="pug">
    v-container
        v-layout(row, wrap)
            banner
            h1 Bikes
            all-listings(:currentPage=1, :itensPerPage=6)
</template>

<script>
    export default {
        components: {

            Banner: () => import("../components/Banner.vue"),
            AllListings:()=> import("../components/listing/AllListings.vue")
        }
    }
</script>
