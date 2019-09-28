<template lang="pug">
    v-hover(v-slot:default='{ hover }')
        v-card.mx-auto(:elevation='hover ? 12 : 2', height='350', max-width='350')
                v-card-media(:src="listing.img", :height="height" )
                v-card-title {{ listing.title }}
</template>

<script>
    export default {
        name: 'listing-card',
        data() {
            return {}
        },
        props: {
            listing: {
                required: true,
                type: Object
            },
            height: String
        }
    }
</script>
