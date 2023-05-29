<?php

namespace CloakWP;

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

}
