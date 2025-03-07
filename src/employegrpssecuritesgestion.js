import { ref } from 'vue'
import axios from 'axios'
let g_devurl = ''
if (import.meta.env.DEV) {
    g_devurl = 'https://mygolux.lausanne.ch'    
}

export async function getDataUserInfo(groupeSecurite, lesDatas) {
    const urlui = `${g_devurl}/goeland/gestion_spec/g_login_f5.php`
    const params = new URLSearchParams([['groupesecurite', groupeSecurite]])
    const response = await axios.get(urlui, { params })
        .catch(function (error) {
            traiteAxiosError(error, lesDatas)
        })   
    const userInfo = response.data
    lesDatas.idEmployeUser = ref(userInfo.id_employe)
    lesDatas.nomEmployeUser = ref(userInfo.nom_employe)
    lesDatas.prenomEmployeUser = ref(userInfo.prenom_employe)
    lesDatas.loginEmployeUser = ref(userInfo.login_employe)
    lesDatas.groupeSecurite = ref(userInfo.groupesecurite)
    lesDatas.bInGroupe = ref(userInfo.bingroupe)
}

export async function getGroupesSecuritesListe(lesDatas) {
    const idEmploye = lesDatas.idEmploye
    const urlgl = `${g_devurl}/goeland/gestion_spec/employe_grpssecurites/axios/employe_groupessecurites_liste.php`
    const params = new URLSearchParams([['idemploye', idEmploye]])
    console.log(urlgl)
    const response = await axios.get(urlgl, {params})
        .catch(function (error) {
            traiteAxiosError(error, lesDatas)
        })      
    const groupesSecurites = response.data
    groupesSecurites.forEach(grp => {
        grp.boolempingrp = grp.bempingrp === 1    
    })

    lesDatas.groupesSecurites = ref(groupesSecurites)
    //console.log(lesDatas.groupesSecurites)
}

export async function getDataEmployesListe(lesDatas) {
    const critereEmployes = lesDatas.critereEmployes
    const critereEmployesInactifs = lesDatas.critereEmployesInactifs
    if (critereEmployes.length >= 3) {
        let bretInactif = 'false'
        if (critereEmployesInactifs) {
            bretInactif = 'true'    
        }
        const urlem = `${g_devurl}/goeland/gestion_spec/employe_grpssecurites/axios/employes_liste.php`;
        const params = new URLSearchParams([['scritere', critereEmployes], ['bretinactif', bretInactif]]);
        const response = await axios.get(urlem, {params})
            .catch(function (error) {
                traiteAxiosError(error, lesDatas)
            })      
        const employesListe = response.data
        lesDatas.employesListe = ref(employesListe)
        console.log(lesDatas.employesListe)
    }
}

export async function sauveTypeAffaireEmployeCreation(idEmploye, lesDatas) {
    const idNomenclature = lesDatas.idNomenclature
    console.log(`sauve idNomenclature:${idNomenclature} IdEmploye:${idEmploye}`)
    const odata = {
        action: 'sauve',
        idnomenclature: idNomenclature,
        idemploye: idEmploye
    }
    const jdata = JSON.stringify(odata)
    const urlsn = `${g_devurl}/goeland/gestion_spec/nomenclature_droitutilisation/axios/nomenclature_employes_utilisation_sauve.php`
    const response = await axios.post(urlsn, jdata, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(function (error) {
            traiteAxiosError(error, lesDatas)
        })      
    console.log(response.data)
    if (response.data.message.indexOf('ERREUR') == 0) {
        lesDatas.messageErreur =  response.data.message   
    }
    getDataEmployesUtilisationListe(lesDatas)
}

export async function supprimeNomenclatureEmployeUtilisation(idEmploye, lesDatas) {
    const idNomenclature = lesDatas.idNomenclature
    console.log(`supprime idNomenclature:${idNomenclature} IdEmploye:${idEmploye}`)
    const odata = {
        action: 'supprime',
        idnomenclature: idNomenclature,
        idemploye: idEmploye
    }
    const jdata = JSON.stringify(odata)
    console.log(jdata)
    const urlsn = `${g_devurl}/goeland/gestion_spec/nomenclature_droitutilisation/axios/nomenclature_employes_utilisation_sauve.php`
    const response = await axios.post(urlsn, jdata, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(function (error) {
            traiteAxiosError(error, lesDatas)
        })      
    console.log(response.data)
    if (response.data.message.indexOf('ERREUR') == 0) {
        lesDatas.messageErreur =  response.data.message   
    }
    getDataEmployesUtilisationListe(lesDatas)
}

function traiteAxiosError(error, lesDatas) {
    if (error.response) {
        lesDatas.messageErreur = `${error.response.data}<br>${error.response.status}<br>${error.response.headers}`    
    } else if (error.request.responseText) {
        lesDatas.messageErreur = error.request.responseText
    } else {
        lesDatas.messageErreur = error.message
    }
}
