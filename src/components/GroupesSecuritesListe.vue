<template>
    <h3>Groupes de s&eacute;curit&eacute;s</h3>
    <ul>
        <template v-for="groupeSecurite in lesDatas.groupesSecurites" v-bind:key="groupeSecurite.idgrp">
            <li>
                <input 
                      type="checkbox" 
                      v-model="groupeSecurite.boolempingrp" 
                      @change="groupeSecuriteSauve(groupeSecurite)"
                      class="mr-2"
                  />
                <span v-bind:title="groupeSecurite.description">{{ groupeSecurite.nom }}</span>&nbsp;
            </li>
        </template>
    </ul>
</template>
<script setup>
    //import { ref } from 'vue'
    import { data } from '@/stores/data.js'
    //import { supprimeNomenclatureEmployeUtilisation } from '@/nomenclaturedroitutilisation.js'
    let lesDatas = data()

    function groupeSecuriteSauve(groupeSecurite) {
        console.log(`A SAUVER :: idemploye: ${lesDatas.idEmploye} idgroupe: ${groupeSecurite.idgroupe} valeur: ${groupeSecurite.boolempingrp}`)
        //lesData.idEmployeUtilisationChoix = ref(idEmploye)
        //supprimeNomenclatureEmployeUtilisation(idEmploye, lesData)
    }
 </script>
