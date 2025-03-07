<template>
    Utilisateur : {{ lesData.prenomEmployeUser }} {{ lesData.nomEmployeUser }} / {{ lesData.loginEmployeUser }}
</template>
<script setup>
    import { data } from '@/stores/data.js'
    import { getDataUserInfo } from '@/employegrpssecuritesgestion.js'
    const props = defineProps({
        groupeSecurite: {
            type: String,
            required: false
        }
    })
    let lesData = data()
    getDataUserInfo(props.groupeSecurite, lesData)
</script>
