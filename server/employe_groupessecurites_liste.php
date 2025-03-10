<?php
require_once 'gdt/cldbgoeland.php';
header("Access-Control-Allow-Origin: *");
if (isset($_GET['idemploye'])) {
    $idEmploye = $_GET['idemploye'];
    $dbgo = new DBGoeland();
    $dbgo->queryRetJson2("cn_securitegroupe_liste2 $idEmploye");
    echo $dbgo->resString;
    unset($dbgo);
} else {
    echo '[]';
}
