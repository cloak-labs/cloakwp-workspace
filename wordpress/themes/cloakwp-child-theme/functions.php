<?php



function requireGlob($glob)
{
  $folder_path = get_stylesheet_directory() . $glob;
  $files = glob($folder_path);

  foreach ($files as $file) {
    require_once $file;
  }
}

requireGlob('/models/*.php');
requireGlob('/blocks/*/*.php');

// require_once get_stylesheet_directory() . '/blocks/testimonials.php';

add_action('admin_head', 'add_custom_script_to_admin');
function add_custom_script_to_admin()
{
  echo '<script id="__bs_script__">//<![CDATA[
    (function() {
      try {
        console.log("adding BrowserSync script");
        var script = document.createElement("script");
        if ("async") {
          script.async = true;
        }
        script.src = "http://localhost:3000/browser-sync/browser-sync-client.js?v=2.29.3";
        if (document.body) {
          document.body.appendChild(script);
        } else if (document.head) {
          document.head.appendChild(script);
        }
      } catch (e) {
        console.error("Browsersync: could not append script tag", e);
      }
    })()
  //]]></script>';
}

add_action('enqueue_block_editor_assets', 'gutenberg_editor_assets');
function gutenberg_editor_assets()
{
  // Load our custom styles for the Gutenberg editor:
  wp_enqueue_style('my-gutenberg-editor-styles', get_theme_file_uri('/blocks/styles.css'), array(), filemtime('/blocks/styles.css'), 'all');

  // Load our custom JS scripts that modify/strip the Gutenberg editor in opinionated ways:
  wp_enqueue_script('gutenberg-editor-js', get_theme_file_uri('/blocks/scripts.js'), array(), filemtime('/blocks/scripts.js'), true);

}

add_theme_support('post-thumbnails'); // enable featured images
add_post_type_support('page', 'excerpt'); // enable page excerpts

/*
  This is required in order for WP Admin > Appearance > Menus page to 
  be visible for new Block themes such as this one. 
*/
add_action('init', 'register_menus');
function register_menus()
{
  register_nav_menus(
    array(
      'nav' => __('Main Nav'), // this creates a menu location that doesn't serve a purpose other than to get the "Menus" page to become visible in wp-admin
    )
  );
}

/*
  Register your custom Gutenberg/ACF blocks here
*/
// add_action('init', 'register_blocks');
// function register_blocks()
// {
//   register_block_type(get_template_directory() . '/blocks/postList/block.json');
//   register_block_type(get_template_directory() . '/blocks/pageHeader/block.json');
//   register_block_type(get_template_directory() . '/blocks/testimonial/block.json');
//   register_block_type(get_template_directory() . '/blocks/cardFeature/block.json');
//   register_block_type(get_template_directory() . '/blocks/faq/block.json');
//   register_block_type(get_template_directory() . '/blocks/cta/block.json');
// }




/*
  Adjust this function based on your project's CPTs and your front-end's routes.
  
  This function allows us to prepend a custom subdirectory to a CPT's post slugs.
  eg. an FAQ post's slug will become '/faqs/xyz-post-slug', rather than just 'xyz-post-slug'
  You need to make the post slugs match whatever routing structure you created on the Next
  front-end, so that when a content editor adds an internal link to an FAQ from within a blog 
  post, for example, the link is correct and matches the front-end URL structure.
  
  Note: this only works for CPTs; to customize the default "posts" URL subdirectory (eg. prepend
  'blog/' to post slugs), use the WP Admin > Settings > Permalinks > Custom Structure setting,
  with a value such as "/blog/%postname%/"
*/
add_filter('register_post_type_args', 'wpd_change_post_type_args', 10, 2);
function wpd_change_post_type_args($args, $post_type)
{
  if ('testimonials' == $post_type) {
    $args['rewrite']['with_front'] = false;
    $args['rewrite']['slug'] = 'testimonials';
  } else if ('faqs' == $post_type) {
    $args['rewrite']['with_front'] = false;
    $args['rewrite']['slug'] = 'faqs';
  }
  return $args;
}

// Give editors access to the Menu tab
function allow_menu_editing_for_editors()
{
  $role = get_role('editor');
  $role->add_cap('edit_theme_options');
}
add_action('admin_init', 'allow_menu_editing_for_editors');


/*
  Remove "Comments" from wp-admin sidebar for all roles.
  Remove "Tools", "Dashboard", and "Yoast SEO" for non-admins
*/
function remove_admin_pages()
{
  remove_menu_page('edit-comments.php');

  if (!current_user_can('administrator')) { // remove certain pages for non-administrators
    remove_menu_page('tools.php'); // remove "Tools"
    remove_menu_page('index.php'); // remove "Dashboard"

    // remove Yoast SEO
    remove_menu_page('wpseo_dashboard');
    remove_menu_page('wpseo_workouts');
  }
}
add_action('admin_menu', 'remove_admin_pages');

/*
  Function to remove various options in wp-admin top toolbar (not sidebar)
  Currently used to remove the "Comments" and "View Posts" menu items
*/
function remove_admin_toolbar_options()
{
  global $wp_admin_bar;
  $wp_admin_bar->remove_menu('comments');
  $wp_admin_bar->remove_menu('archive');
}
add_action('wp_before_admin_bar_render', 'remove_admin_toolbar_options');
