<?php
/**
 * ACF Block Preview Template.
 * Uses an iframe to preview the exact block UI from your decoupled frontend.
 *
 * The following variables are made available by WP/Gutenberg for use in this template
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during backend preview render.
 * @param   int $post_id The post ID the block is rendering content against.
 *          This is either the post ID currently being displayed inside a query loop,
 *          or the post ID of the post hosting this block.
 * @param   array $context The context provided to the block by the post or it's parent block.
 */

use CloakWP\API\BlockTransformer;
use CloakWP\CloakWP;
// use CloakWP\Utils;

$first_render = 0;

// Utils::write_log('=== iFrame Block Preview ===');
// Utils::write_log(['$block: ', $block]);
// Utils::write_log(['$content: ', $content]);
// Utils::write_log(['$is_preview: ', $is_preview]);
// Utils::write_log(['$post_id: ', $post_id]);
// Utils::write_log(['$context: ', $context]);

// Delete style.spacing because we don't want to render the spacing on the front-end preview because Gutenberg already adds the spacing within the editor
unset($block['style']['spacing']);

$data = $block['data'];
$field_values = [];
foreach ($data as $key => $value) {
  if (strpos($key, 'field_') === 0) {
    /* when previewing ACF Block where data has been updated, the $block value is very 
       different from when the data hasn't been updated -- the code below transforms the ACF data
       so that it's always in the same shape no matter whether the block's data has been changed 
       or not. This ensures previews after making changes don't break. 
    */
    $field_object = get_field_object($key);
    if ($field_object) {
      $field_name = $field_object['name'];
      $field_value = $field_object['value'];
      $field_values[$field_name] = $field_value;
      $field_values['_'.$field_name] = $key; // convert_block_to_object() requires this to work properly
    }
  } else {
    $first_render = 1;
  }
}

$formattedData = [
  'blockName' => $block['name'],
  'attrs' => [
    'align' => $block['align'],
    'style' => $block['style'],
    'backgroundColor' => $block['backgroundColor'],
    'data' => $first_render === 1 ? $data : $field_values,
  ]
];

// Utils::write_log(['$formattedData: ', $formattedData]);
$blockData = BlockTransformer::convert_block_to_object($formattedData, $post_id);
// Utils::write_log(['$blockData: ', $blockData]);

$json = json_encode($blockData);
$urlEncodedJson = urlencode($json);
$url = CloakWP::get_frontend_url();
  
?>

<div style="position: relative;">
  <!-- Overlay that prevents clicks within iframe and allows block selection to work -->
  <div style="position: absolute; width: 100%; height: 100%; z-index: 50;"></div>
  <iframe
    class="block-preview-iframe"
    src="<?php echo $url . CLOAKWP_PREVIEW_BLOCK_PATHNAME . '?secret=' . CLOAKWP_PREVIEW_SECRET . '&blockData=' . $urlEncodedJson?>"
    title="Block Preview"
    width="100%"
    allow-same-origin
  ></iframe>
</div>

<?php
