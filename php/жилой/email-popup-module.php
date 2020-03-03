<?php

function createBitrixLead2($name, $tel, $form_name, $site_name, $traffic_source, $utm_source, $utm_medium)
{
    $queryUrl = 'https://stolitsanovostroek.bitrix24.ru/rest/1/28tc98ec5tjfj71s/crm.lead.add.json';
    
    if($name)
        $lead_title = $name . ', ' . $site_name;
    else
        $lead_title = $site_name;
    
    $queryData = http_build_query(array(
      'fields' => array(
        'TITLE' => $lead_title,
        'NAME'  => ($name?$name:'Имя не указано'),
        'PHONE' => Array(
            "n0" => Array(
                "VALUE" => $tel,
                "VALUE_TYPE" => "WORK",
            ),
        ),
        'SOURCE_ID' => 'WEB',
        'UTM_SOURCE' => $utm_source,
        'UTM_MEDIUM' => $utm_medium,
        'UTM' => 'utm_source='.$utm_source.'&utm_medium='.$utm_medium,
        'ASSIGNED_BY_ID' => 1,
        'STATUS_ID' => 'NEW',
        'SOURCE_DESCRIPTION' => 'Время заявки: ' . date('H:i d.m.Y') . ' Сайт: ' . $site_name . " Форма: " . $form_name . " Данные UTM: " . $traffic_source,
      ),
      'params' => array("REGISTER_SONET_EVENT" => "Y")
    ));
    // обращаемся к Битрикс24 при помощи функции curl_exec
    $curl = curl_init();
    curl_setopt_array($curl, array(
      CURLOPT_SSL_VERIFYPEER => 0,
      CURLOPT_POST => 1,
      CURLOPT_HEADER => 0,
      CURLOPT_RETURNTRANSFER => 1,
      CURLOPT_URL => $queryUrl,
      CURLOPT_POSTFIELDS => $queryData,
    ));
    $result = curl_exec($curl);
    curl_close($curl);
    $result = json_decode($result, 1);
    if (array_key_exists('error', $result)) 
        echo "Ошибка при сохранении лида: ".$result['error_description']."<br/>";
}



$result_mail = [
    'success' => 'Ваша заявка принята!',
    'error' => 'Ошибка, попробуйте позже!'
];

$from = 'From: noreply@xn-----8kcaweldgdmbbhdpzfdv9b.xn--p1ai' . "\r\n" .
'Reply-To: noreply@xn-----8kcaweldgdmbbhdpzfdv9b.xn--p1ai' . "\r\n" .
'X-Mailer: PHP/' . phpversion();

//BITRIX 24
$active_bitrix24 = $_REQUEST['active_bitrix24'];
$bitrix_user = $_REQUEST['bitrix_user'];
$bitrix_api = $_REQUEST['bitrix_api'];
//END BITRIX 24

$utm_s = isset($_REQUEST['utm_source']) ? $_REQUEST['utm_source'] : null;
$utm_m = isset($_REQUEST['utm_medium']) ? $_REQUEST['utm_medium'] : null;
$utm_t = isset($_REQUEST['utm_term']) ? $_REQUEST['utm_term'] : null;
$utm_c = isset($_REQUEST['utm_content']) ? $_REQUEST['utm_content'] : null;
$utm_ca = isset($_REQUEST['utm_campaign']) ? urldecode($_REQUEST['utm_campaign']) : null;

$email = trim($_POST['email']); 

$res = mail($email,
$_POST['headerMail'],
'Сайт: '.$_POST['nameWebsite'].' '.'('.$_POST['urlWebsite'].')'."\n".
'Номер телефона: '.trim($_POST['phone'])."\n".
'Форма: '.$_POST['nameForm']."\n".
'Отправлено со страницы: '.$_POST['nameWebsitePage']."\n".
$utm_s."\n".
$utm_m."\n".
$utm_t."\n".
$utm_c."\n".
$utm_ca,
$from);

createBitrixLead2("Callback", trim($_POST['phone']), $_POST['nameForm'], $_POST['nameWebsite'], "Ключевое слово:" . $utm_t, $utm_s, $utm_m);

if ($res == 1) {
    echo json_encode($result_mail['success']);
} else {
    echo json_encode($result_mail['error']);
}
?>