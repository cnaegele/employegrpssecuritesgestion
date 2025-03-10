<?php
require_once 'gdt/cldbgoeland.php';
header("Access-Control-Allow-Origin: *");
if (isset($_GET['scritere'])) {
    $scritere = $_GET['scritere'];
    $scritere = str_replace("'", "''", $scritere);
    $bRetInactif = 'false';
    if (isset($_GET['bretinactif'])) {
        $bRetInactif = $_GET['bretinactif'];
    }
    if ($bRetInactif == 'false') {
        $bactif = '1';
    } else {
        $bactif = '2';
    }
    $dbgo = new DBGoeland();
    $scritere = utf8go_decode($scritere);
    $sSql = "cn_Employe_liste '$scritere', $bactif";
    $dbgo->queryRetJson2($sSql);
    if ($dbgo->resInt > 0) {
        echo $dbgo->resString;
    } else {
        echo '[]';
    }
    unset($dbgo);
} else {
    echo '[]';
}
