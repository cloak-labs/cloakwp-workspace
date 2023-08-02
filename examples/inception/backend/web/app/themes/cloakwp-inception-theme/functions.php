<?php

use CloakWP\Utils;

if(class_exists('CloakWP\Utils')) {
  Utils::require_glob(get_stylesheet_directory() . '/blocks/*/*.php');
  Utils::require_glob(get_stylesheet_directory() . '/models/*.php');
}

add_action('enqueue_block_editor_assets', 'my_gutenberg_editor_assets');
function my_gutenberg_editor_assets()
{
  // Load our custom styles for the Gutenberg editor:
  $cssFilePath = '/css/gutenberg-styles.css';
  wp_enqueue_style(
    'my-gutenberg-editor-styles',
    get_theme_file_uri($cssFilePath),
    array(),
    filemtime(get_stylesheet_directory() . $cssFilePath),
  );

  // Load our custom JS scripts that modify/strip the Gutenberg editor in opinionated ways:
  $jsFilePath = '/js/gutenberg-scripts.js';
  wp_enqueue_script(
    'my-gutenberg-editor-js',
    get_theme_file_uri($jsFilePath),
    array(),
    filemtime(get_stylesheet_directory() . $jsFilePath),
    true
  );
}