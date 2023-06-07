<?php

use Extended\ACF\Fields\Image;
use Extended\ACF\Fields\Text;
use Extended\ACF\Location;

add_action( 'init', function() {
  // Register post type
	register_extended_post_type( 'testimonial', [
    [
      'menu_icon' => 'dashicons-format-chat',
      'has_archive' => false,
    ]
  ]);
  
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


add_action('acf/init', function() {
  // Register post ACF Fields
  register_extended_field_group([
      'title' => 'Testimonial Fields',
      'fields' => [
          Image::make('Image'),
          Text::make('Title'),
      ],
      'location' => [
          Location::where('post_type', 'testimonial')
      ],
      'style' => 'default',
      'position' => 'acf_after_title',
  ]);
});
