<?php

namespace CloakWP;

use Extended\ACF\Fields\Accordion;

class Utils {

  /*
    Helper function used by the CloakWP plugin to log errors or other details to the WP error log
  */
  public static function write_log($log)
  {
    if (!CLOAKWP_DEBUG) {
      return;
    }
  
    if (is_array($log) || is_object($log)) {
      error_log(print_r($log, true));
    } else {
      error_log($log);
    }
  }

  public static function acfBlockWrapper($blockLabel, $fields) {
    if (class_exists('Extended\ACF\Fields\Accordion')) {
      return [
        Accordion::make($blockLabel)
          ->open()
          ->multiExpand(), // Allow accordion to remain open when other accordions are opened.
        ...$fields,
        Accordion::make('Endpoint')
          ->endpoint()
          ->multiExpand(),
      ];
    } else {
      throw new \Exception('The Extended ACF composer package does not appear to be installed.');
    }
  }

}
