<?php

$main_options = get_option('cloakwp_settings');
$posts_options = get_option('cloakwp_posts_settings');
$rest_options = get_option('cloakwp_rest_settings');
$seo_options = get_option('cloakwp_seo_settings');


pretty_print($main_options);
pretty_print($posts_options);
pretty_print($rest_options);
pretty_print($seo_options);

echo site_url();