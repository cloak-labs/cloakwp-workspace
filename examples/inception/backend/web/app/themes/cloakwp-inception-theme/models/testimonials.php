<?php

use Extended\ACF\Fields\Text;
use Extended\ACF\Location;

add_action( 'init', function() {
  // Register post type --> docs: https://github.com/johnbillion/extended-cpts/wiki
	register_extended_post_type( 'testimonial', array(
    'menu_icon' => 'dashicons-format-chat',
    'has_archive' => false,
    'show_in_rest' => true,
    'block_editor' => false,
    'enter_title_here' => "Person's name",
    'featured_image' => "Person's Headshot",
    'rewrite' => array(
      'permastruct' => '/testimonial/%testimonial%'
    ),
    'admin_cols' => array(
      // A featured image column:
      'featured_image' => array(
        'title'          => 'Headshot',
        'featured_image' => 'thumbnail',
        'width'          => 60,
	      'height'         => 60,
      ),
      // The default Title column:
      'title',
      // A meta field column:
      'last_modified' => array(
        'title'       => 'Last Modified',
        'post_field'    => 'post_modified',
        'date_format' => 'd/m/Y g:i A'
      ),
      'published' => array(
        'title'       => 'Published',
        'post_field'    => 'post_date',
        'date_format' => 'd/m/Y g:i A'
      ),
    )
  ));
  
  // Register post taxonomy
  /*
  register_extended_taxonomy('topic', 'testimonial', [
    'hierarchical' => false,
    'meta_box' => 'radio',
    'required' => true,
    'show_in_rest' => true,
  ]);
  */
});


// Register post ACF Fields
add_action('acf/init', function() {
  register_extended_field_group([
    'title' => 'Testimonial Fields!',
    'fields' => [
        Text::make('Company')
          ->instructions("The company this person works for."),
        Text::make('Position')
          ->instructions("The person's title/position at their company."),
    ],
    'location' => [
        Location::where('post_type', 'testimonial')
    ],
    'style' => 'default',
    'position' => 'acf_after_title',
  ]);
});
