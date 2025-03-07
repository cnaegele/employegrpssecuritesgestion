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
          Employé : {{ lesDatas.infoEmploye }}&nbsp;&nbsp;<button @click="choisirEmploye">choix</button>
          
          <!-- Utilisation du composant Dialog -->
          <Dialog
            v-model="showDialog"
            title="Choisir l'employé"
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

const choisirEmploye = () => {
  showDialog.value = true
  lesDatas.idEmployeChoix = ref(0)
  lesDatas.modeChoixEmploye = ref('gestiongroupes')
};

// Fonctions pour les actions
const onCancel = () => {
  console.log('Action annulée');
};

const onConfirm = () => {
  console.log('Action confirmée');
  // Logique supplémentaire ici
}
</script>

