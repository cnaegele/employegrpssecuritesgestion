<template>
    <input type="text" v-model="state.critereEmployes" v-on:keyup="listeEmployes" placeholder="- nom pr&eacute;nom login -">&nbsp;
    <input type="checkbox" id="chkRetInactif" v-model="state.bRetInactif" v-on:change="listeEmployes"><label for="chkRetInactif">avec les employ&eacute;s d&eacute;sactiv&eacute;s</label>
    <ul>
        <template v-for="employe in lesDatas.employesListe" v-bind:key="employe.idemploye">
            <li>
                <span 
                    v-bind:id="'liemploye' + employe.idemploye" 
                    v-bind:class="'empbactif' + employe.bactif" 
                    v-bind:title="employe.directionabr + '-' + employe.serviceabr + ' - ' + employe.unite"
                    v-on:click="choixEmploye(employe)"
                >
                    {{employe.nom}} {{employe.prenom}}&nbsp; 
                    <span class="emplogin">({{employe.login}})</span>
                </span>
            </li>
        </template>
    </ul>
</template>
<script setup>
    import {reactive, ref} from 'vue'
    import { data } from '@/stores/data.js'
    import { getDataEmployesListe, getGroupesSecuritesListe } from '@/employegrpssecuritesgestion.js'
    //import { sauveTypeAffaireEmployeCreation } from '@/nomenclaturedroitutilisation.js'
   let state = reactive({
        critereEmployes: "",
        bRetInactif: false   
    })
    let lesDatas = data()
    function listeEmployes() {
        lesDatas.critereEmployes = ref(state.critereEmployes) 
        lesDatas.critereEmployesInactifs = ref(state.bRetInactif) 
        getDataEmployesListe(lesDatas)
    } 

    function choixEmploye(employe) {
        lesDatas.idEmployeChoix = ref(employe.idemploye)
        if (lesDatas.modeChoixEmploye === 'gestiongroupes') {
            lesDatas.idEmploye = employe.idemploye
            lesDatas.infoEmploye = `${employe.nom} ${employe.prenom} / ${employe.unite}`
            getGroupesSecuritesListe(lesDatas)
        }
        lesDatas.employesListe = []
   }
</script>