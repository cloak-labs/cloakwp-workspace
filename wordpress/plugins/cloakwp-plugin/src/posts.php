<?php

/**
 * Posts.
 *
 * @package WP_REST_Blocks.
 */

namespace WP_REST_Blocks\Posts;

use function WP_REST_Blocks\Data\get_blocks;

/**
 * Bootstrap filters and actions.
 *
 * @return void
 */
function bootstrap()
{
  add_action('rest_api_init', __NAMESPACE__ . '\\wp_rest_blocks_init');
}

/**
 * Get post types with editor.
 *
 * @return array
 */
function get_post_types_with_editor()
{
  $post_types = get_post_types(['show_in_rest' => true], 'names');
  $post_types = array_values($post_types);


  if (!function_exists('use_block_editor_for_post_type')) {
    require_once ABSPATH . 'wp-admin/includes/post.php';
  }
  $post_types   = array_filter($post_types, 'use_block_editor_for_post_type');
  $post_types[] = 'wp_navigation';
  $post_types   = array_filter($post_types, 'post_type_exists');

  return $post_types;
}

/**
 * Add rest api fields.
 *
 * @return void
 */
function wp_rest_blocks_init()
{
  $types = get_post_types_with_editor();
  if (!$types) {
    return;
  }

  register_rest_field(
    $types,
    'has_blocks',
    [
      'get_callback'    => __NAMESPACE__ . '\\has_blocks_get_callback',
      'update_callback' => null,
      'schema'          => [
        'description' => __('Has blocks.', 'wp-rest-blocks'),
        'type'        => 'boolean',
        'context'     => ['embed', 'view', 'edit'],
        'readonly'    => true,
      ],
    ]
  );

  register_rest_field(
    $types,
    'blocksData',
    [
      'get_callback'    => __NAMESPACE__ . '\\blocks_get_callback',
      'update_callback' => null,
      'schema'          => [
        'description' => __('Blocks.', 'wp-rest-blocks'),
        'type'        => 'object',
        'context'     => ['embed', 'view', 'edit'],
        'readonly'    => true,
      ],
    ]
  );

  // add custom 'featured_image' field in REST API responses which includes full data of featured image rather than just the image ID
  register_rest_field(
    $types,
    'featured_image',
    array(
      'get_callback'    => __NAMESPACE__ . '\\ws_get_images_urls',
      'update_callback' => null,
      'schema'          => null,
    )
  );
}

/**
 * Fetch Featured Image's full data.
 *
 * @return array
 */
function ws_get_images_urls($object, $field_name, $request)
{
  // Check type of object before accessing params
  if (gettype($object) === "object") {
    $id = get_post_thumbnail_id($object->id);
  }
  if (gettype($object) === "array") {
    $id = get_post_thumbnail_id($object['id']);
  }

  // check that array is returned before accessing params
  $medium = wp_get_attachment_image_src($id, 'medium');
  $medium_url = false;
  if (is_array($medium)) {
    $medium_url = $medium['0'];
  }
  $large = wp_get_attachment_image_src($id, 'large');
  $large_url = false;
  if (is_array($large)) {
    $large_url = $large['0'];
  }

  return array(
    'medium' => $medium_url,
    'large'  => $large_url,
  );
}


/**
 * Callback to get if post content has block data.
 *
 * @param array $object Array of data rest api request.
 *
 * @return bool
 */
function has_blocks_get_callback(array $object)
{
  if (isset($object['content']['raw'])) {
    return has_blocks($object['content']['raw']);
  }
  $id   = !empty($object['wp_id']) ? $object['wp_id'] : $object['id'];
  $post = get_post($id);
  if (!$post) {
    return false;
  }

  return has_blocks($post);
}

/**
 * Loop around all blocks and get block data.
 *
 * @param array $object Array of data rest api request.
 *
 * @return array
 */
function blocks_get_callback(array $object)
{
  $id = !empty($object['wp_id']) ? $object['wp_id'] : $object['id'];
  if (isset($object['content']['raw'])) {
    return get_blocks($object['content']['raw'], $id);
  }
  $id     = !empty($object['wp_id']) ? $object['wp_id'] : $object['id'];
  $post   = get_post($id);
  $output = [];
  if (!$post) {
    return $output;
  }
  return get_blocks($post->post_content, $post->ID);
}

// add support for fetching blocks on post revisions
add_filter('rest_prepare_revision', function ($response, $post) {
  $data = $response->get_data();

  $data['hasBlocks'] = has_blocks($post);
  $data['blocksData'] = get_blocks($post->post_content, $post->ID);

  return rest_ensure_response($data);
}, 10, 2);
