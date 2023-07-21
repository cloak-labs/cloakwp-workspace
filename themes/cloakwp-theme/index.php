<?php
/**
 * Redirect WordPress frontend requests to wp-admin.
 */
wp_redirect(admin_url(), 301);
exit;