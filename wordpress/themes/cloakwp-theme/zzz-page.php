<?php

$main_options = get_option('next_wp_settings');
$posts_options = get_option('next_wp_posts_settings');
$rest_options = get_option('next_wp_rest_settings');
$seo_options = get_option('next_wp_seo_settings');


pretty_print($main_options);
pretty_print($posts_options);
pretty_print($rest_options);
pretty_print($seo_options);

echo site_url();