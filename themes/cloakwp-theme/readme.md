# CloakWP Theme
This is a super barebones theme for headless WordPress projects (or more specifically [CloakWP](https://github.com/cloak-labs/cloakwp) projects). It is built primarily just to meet the WordPress requirement of having an active theme; it doesn't actually provide any headless functionality -- for that, check out the [CloakWP Plugin](https://github.com/cloak-labs/cloakwp/tree/main/plugins/cloakwp-plugin).

Features:
- All non-admin routes redirect to wp-admin (essentially turning off the traditional WordPress front-end)
- Provides a renderCallback function `render_acf_block_iframe_preview`, for use in your child theme's ACF Blocks' `block.json` files; it's a simple wrapper function that renders the block preview PHP template provided by the CloakWP Plugin, enabling iframe previews of your decoupled front-end's components within the Gutenberg editor.