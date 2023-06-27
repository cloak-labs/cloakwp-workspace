<?php

use CloakWP\Utils;

/* 
  This function is used as the renderCallback (defined in block.json) for ACF Blocks, 
  enabling iframe previews of your decoupled front-end's associated React components.

  It requires that you also install the CloakWP Plugin, and use the CloakWP NPM Package
  on your decoupled front-end.
*/
function render_acf_block_iframe_preview ($block, $content, $is_preview, $post_id, $wp_block, $context) {
  if (class_exists('CloakWP\Utils')) {
    include(Utils::cloakwp_plugin_path() . '/block-preview.php');
  }
}