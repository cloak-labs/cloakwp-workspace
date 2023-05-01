- Check options for installing Github monorepo sub-packages via composer

  - Option 1: publish to WP plugin + theme directories, thereby making them available on WPackagist and therefore installable via composer
    - Look at how FaustWP has their plugin in a monorepo and uses a Github action + changesets to detect if a new version needs to be deployed to the WP SVN
    - Would require that we adhere to WP coding standards
    - Probably the best option to also leverage the visibility from WP SVN directories
  
  - Option 2: try methods to install from subfolder.. not sure if possible with Composer