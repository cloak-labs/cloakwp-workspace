<?php

/**
 * Provide a admin area view for the plugin
 *
 * This file is used to markup the admin-facing aspects of the plugin.
 *
 * @link       https://https://github.com/cloak-labs
 * @since      0.6.0
 *
 * @package    Next_Wp
 * @subpackage Next_Wp/admin/partials
 */

function nextwp_echo_variable($var)
{
  if (isset($var)) {
    if (gettype($var) === 'boolean') {
      if ($var === TRUE) {
        echo "<span>TRUE</span>";
      }
      if ($var === FALSE) {
        echo "<span>FALSE</span>";
      }
    }
    if (gettype($var) === 'string') {
      if (strlen($var) > 0) {
        echo "<span>'" . $var . "'</span>";
      }
      if (strlen($var) === 0) {
        echo "<span>''</span>";
      }
    }
    echo "<span> (" . gettype($var) . ")</span>";
  } else {
    echo "<span>Unset</span>";
  }
}

function nextwp_settings_row($name)
{
  if (defined($name)) {
    $var = constant($name);
  } else {
    $var = NULL;
  }
?>
  <tr>
    <th scope="row">
      <?php echo $name ?>
    </th>
    <td><?php nextwp_echo_variable($var); ?></td>
  </tr>
<?php
}
?>
<table class="form-table" role="presentation">
  <tbody>
    <?php
    nextwp_settings_row('NEXT_WP_NEXT_FRONTEND_URL');
    nextwp_settings_row('NEXT_WP_PREVIEW_SECRET');
    nextwp_settings_row('NEXT_WP_ENABLE_DEV_MODE');
    nextwp_settings_row('NEXT_WP_ENABLE_ISR');
    nextwp_settings_row('NEXT_WP_OVERRIDE_VIEW_POST_LINK');
    nextwp_settings_row('NEXT_WP_OVERRIDE_PREVIEW_POST_LINK');
    nextwp_settings_row('NEXT_WP_YOAST_USE_FRONTEND_URL');
    nextwp_settings_row('NEXT_WP_ENABLE_FAVICON');
    nextwp_settings_row('NEXT_WP_JWT_NO_EXPIRY');
    nextwp_settings_row('NEXT_WP_ENABLE_PREVIEW_POST');
    nextwp_settings_row('NEXT_WP_PREVIEW_API_ROUTE');
    nextwp_settings_row('NEXT_WP_REVALIDATE_API_ROUTE');
    nextwp_settings_row('NEXT_WP_LOGIN_API_ROUTE');
    nextwp_settings_row('NEXT_WP_LOGOUT_API_ROUTE');
    ?>
  </tbody>
</table>
<!-- This file should primarily consist of HTML with a little bit of PHP. -->