<?php
/**
 * Redirect WordPress frontend requests to wp-admin.
 */

wp_redirect(site_url('/wp-admin'), 301);
exit;