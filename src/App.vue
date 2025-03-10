<template>
  <header>
    <h2>Gestion des groupes de s&eacute;curit&eacute; d'un employ&eacute;</h2>
  </header>

  <main>
    <div id="app">
      <div v-if="lesDatas.messageErreur != ''" id="divErreur">{{ lesDatas.messageErreur }}</div>
      <div><UserInformation groupeSecurite="GoelandManager"></UserInformation></div>
      <div v-if="lesDatas.bInGroupe == 0">Utilisation autoris&eacute;e uniquement aux membres du groupe {{ lesDatas.groupeSecurite }}</div>
      <div v-if="lesDatas.bInGroupe == 1">
        <br>    
        <div>
          Employé : {{ lesDatas.infoEmploye }}&nbsp;&nbsp;<button @click="choisirEmploye">choix de l'employé</button>
          <span v-if="lesDatas.idEmploye > 0">&nbsp;&nbsp;&nbsp;&nbsp;<button @click="choisirEmployeCopie">choix d'un employé pour copie de ses groupes</button></span>
          <!-- Utilisation du composant Dialog -->
          <Dialog
            v-model="showDialog"
            :title="titleDialog"
            @cancel="onCancel"
            @confirm="onConfirm"
          >
          </Dialog>
        </div>
        <div v-if="lesDatas.idEmploye > 0">
          <GroupesSecuritesListe></GroupesSecuritesListe>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, watch } from 'vue';
import UserInformation from '@/components/UserInformation.vue'
import Dialog from '@/components/Dialog.vue';
import { data } from '@/stores/data.js'
import GroupesSecuritesListe from './components/GroupesSecuritesListe.vue';
const lesDatas = data()
// État pour contrôler l'affichage du dialogue
const showDialog = ref(false);
const titleDialog = ref(`Choisir l'employé`)

const choisirEmploye = () => {
  lesDatas.modeChoixEmploye = ref('gestiongroupes')
  titleDialog.value = `Choisir l'employé`
  showDialog.value = true
  lesDatas.idEmployeChoix = ref(0)
};

const choisirEmployeCopie = () => {
  lesDatas.modeChoixEmploye = ref('copiegroupes')
  titleDialog.value = `Choisir un employé pour copie de ses groupes`
  showDialog.value = true
  lesDatas.idEmployeChoix = ref(0)
};

// Fonctions pour les actions
const onCancel = () => {
  console.log('Action annulée');
};

const onConfirm = () => {
}
</script>

