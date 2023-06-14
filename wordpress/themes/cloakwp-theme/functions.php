<?php

add_action('enqueue_block_editor_assets', 'cloakwp_gutenberg_editor_assets');
function cloakwp_gutenberg_editor_assets()
{
  // Load our custom CSS stylesheets for the Gutenberg editor:
  wp_enqueue_style('cloakwp-gutenberg-editor-styles', get_theme_file_uri('/css/gutenberg-styles.css'), array(), filemtime('/css/gutenberg-styles.css'), 'all');

  // Load our custom JS scripts for the Gutenberg editor:
  wp_enqueue_script('acf-block-iframe-preview-js', get_theme_file_uri('/js/acf-block-iframe-preview.js'), array(), filemtime('/js/acf-block-iframe-preview.js'), true);
}

remove_theme_support( 'core-block-patterns' );

/*
  Expand ACF field data returned in REST API; eg. image fields return full image data rather than just an ID. More info: https://www.advancedcustomfields.com/resources/wp-rest-api-integration/
*/
add_filter('acf/settings/rest_api_format', function () {
  return 'standard';
});

/*
  Change the JWT token issuer:
*/
add_filter('jwt_auth_iss', function () {
  // Default value is get_bloginfo( 'url' );
  return site_url();
});

/*
  Add ability for "editor" user role to edit WP Menus, but hide all other submenus under Appearance (for editors only) -- eg. we don't want clients to be able to switch/deactivate theme and break site 
*/
function restrict_appearance_menu_for_editors() {
  $role_object = get_role( 'editor' );
  if(!$role_object->has_cap('edit_theme_options')){
    $role_object->add_cap( 'edit_theme_options' );
  }

  if (current_user_can('editor')) { // remove certain Appearance > Sub-pages
      remove_submenu_page( 'themes.php', 'themes.php' ); // hide the theme selection submenu
      remove_submenu_page( 'themes.php', 'widgets.php' ); // hide the widgets submenu

      // special handling for removing "Customize" submenu (above method doesn't work due to its URL structure) --> snippet taken from https://stackoverflow.com/a/50912719/8297151
      global $submenu;
      if ( isset( $submenu[ 'themes.php' ] ) ) {
          foreach ( $submenu[ 'themes.php' ] as $index => $menu_item ) {
              foreach ($menu_item as $value) {
                  if (strpos($value,'customize') !== false) {
                      unset( $submenu[ 'themes.php' ][ $index ] );
                  }
              }
          }
      }
  }
}
add_action('admin_head', 'restrict_appearance_menu_for_editors');