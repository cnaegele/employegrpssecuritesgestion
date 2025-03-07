import { ref } from 'vue'
import { defineStore } from 'pinia'

export const data = defineStore('iddata', () => {
  const idEmployeUser = ref(0);
  const nomEmployeUser = ref('');
  const prenomEmployeUser = ref('');
  const loginEmployeUser = ref('');
  const groupeSecurite = ref('');
  const bInGroupe = ref(0);
  const idEmploye = ref(0);
  const infoEmploye = ref(' - ');
  const uoEmploye = ref([]);
  const groupesSecurites = ref([]);
  const modeChoixEmploye = ref('gestiongroupes'); //copiegroupes
  const critereEmployes = ref('');
  const critereEmployesInactifs = ref(false);
  const employesListe = ref([]);
  const idEmployeChoix = ref(0);
  const messageErreur = ref('');

  return {
    idEmployeUser,
    nomEmployeUser,
    prenomEmployeUser,
    loginEmployeUser,
    groupeSecurite,
    bInGroupe,
    idEmploye,
    infoEmploye,
    uoEmploye,
    groupesSecurites,
    modeChoixEmploye,
    critereEmployes,
    critereEmployesInactifs,
    employesListe,
    idEmployeChoix,
    messageErreur
  };
});
