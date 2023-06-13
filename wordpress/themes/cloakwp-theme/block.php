<?php
/**
 * Block Preview Template.
 *
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
use CloakWP\Utils;

// TODO: 
//    -- Only the first render of a preview works -- subsequent renders cause front-end React error where it seems like the blocks data is missing/isn't passed to iframe

$first_render = 0;

Utils::write_log('=== iFrame Block Preview ===');
Utils::write_log(['$block: ', $block]);
Utils::write_log(['$content: ', $content]);
Utils::write_log(['$is_preview: ', $is_preview]);
Utils::write_log(['$post_id: ', $post_id]);
Utils::write_log(['$context: ', $context]);

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

Utils::write_log(['$formattedData: ', $formattedData]);

$blockData = BlockTransformer::convert_block_to_object($formattedData, $post_id);

Utils::write_log(['$blockData: ', $blockData]);

$json = json_encode($blockData);
$urlEncodedJson = urlencode($json);
$url = CloakWP::get_frontend_url(); // TODO: use this instead of below once front-end preview features are deployed to main branch 
  
?>

<!-- <div style="border: 1px solid gray; border-radius: 5px; background-color: #efefef; padding: 20px; color: red;">
  Previews for custom blocks are not supported; please switch back to edit mode.
</div> -->

<div>
  <?php // echo $json ?>
  <iframe class="block-preview-iframe" src="<?php echo $url . CLOAKWP_PREVIEW_BLOCK_PATHNAME . '?secret=' . CLOAKWP_PREVIEW_SECRET . '&blockData=' . $urlEncodedJson?>" title="Block Preview" width="100%" allow-same-origin></iframe>
</div>

<?php
