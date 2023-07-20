<?php

use CloakWP\ACF\Fields\Alignment;
use CloakWP\ACF\Fields\ThemeColorPicker;
use CloakWP\Utils;
use Extended\ACF\ConditionalLogic;
use Extended\ACF\Fields\Link;
use Extended\ACF\Fields\RadioButton;
use Extended\ACF\Fields\Text;
use Extended\ACF\Fields\Textarea;
use Extended\ACF\Fields\Image;
use Extended\ACF\Location;

// Register the block
register_block_type(__DIR__ . '/block.json');

// Register the block's ACF field group:
add_action('acf/init', function () {
  register_extended_field_group([
    'title' => 'Block: Hero',
    'fields' => Utils::acfBlockWrapper('Hero Block', [
      RadioButton::make('Hero Style')
        ->instructions('Select the style of the hero section.')
        ->choices([
          'image_right' => 'Image Right',
          'bg_image' => 'Background Image',
          'no_image' => 'No image',
        ])
        ->defaultValue('image_right')
        ->layout('horizontal')
        ->wrapper(['width' => '50%']),
      Alignment::make('Content Alignment')
        // ->include(['left', 'center'])
        ->defaultValue('left')
        ->wrapper(['width' => '50%'])
        ->conditionalLogic([
          ConditionalLogic::where('hero_style', '!=', 'image_right') // available operators: ==, !=, >, <, ==pattern, ==contains, ==empty, !=empty
        ]),
      ThemeColorPicker::make('Button Background')
        ->include(['gray-600', 'gray-700'])
        // ->exclude(['blue-600', 'blue-700', 'blue-800', 'blue-900', 'blue-950'])
        ->defaultValue('gray-700'),
      Text::make('Eyebrow')
        ->instructions('1-3 words above H1.')
        ->wrapper(['width' => '50%']),
      Text::make('H1')
        ->instructions('Main title of page.'),
      Textarea::make('Subtitle')
        ->instructions('1-3 sentences below the H1.'),
      Link::make('CTA Button')
        ->wrapper(['width' => '50%'])
        ->instructions("Select a page to link to, followed by the CTA button's text."),
      Image::make('Image')
        ->instructions('Upload/select an image to show on the right of the hero text.')
        ->previewSize('medium')
        ->wrapper(['width' => '50%'])
        ->conditionalLogic([
          ConditionalLogic::where('hero_style', '!=', 'no_image') // available operators: ==, !=, >, <, ==pattern, ==contains, ==empty, !=empty
        ])
        ->returnFormat('id')
        ->required(),
    ]),
    'location' => [
      Location::where('block', 'acf/hero')
    ],
  ]);
});
