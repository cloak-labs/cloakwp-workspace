<?php

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
          'primary' => 'Primary',
          'secondary' => 'Secondary',
          'tertiary' => 'Tertiary',
        ])
        ->defaultValue('primary')
        ->layout('horizontal')
        ->wrapper(['width' => '50%']),
      Text::make('Eyebrow')
        ->instructions('1-3 words above H1.')
        ->wrapper(['width' => '50%']),
      Text::make('H1')
        ->instructions('Main title of page.'),
      Textarea::make('Subtitle')
        ->instructions('1-3 sentences below the H1.'),
      RadioButton::make('Alignment')
        ->instructions("A tertiary hero's text can be centered or left-aligned.")
        ->choices([
          'center' => 'Center',
          'left' => 'Left',
        ])
        ->defaultValue('center')
        ->wrapper(['width' => '50%'])
        ->conditionalLogic([
          ConditionalLogic::where('hero_style', '==', 'tertiary') // available operators: ==, !=, >, <, ==pattern, ==contains, ==empty, !=empty
        ]),
      Link::make('CTA Button')
        ->wrapper(['width' => '50%'])
        ->instructions("Select a page to link to, followed by the CTA button's text."),
      Image::make('Image')
        ->instructions('Upload/select an image to show on the right of the hero text.')
        ->previewSize('medium')
        ->width(500, 1100)
        ->wrapper(['width' => '50%'])
        ->conditionalLogic([
          ConditionalLogic::where('hero_style', '==', 'secondary') // available operators: ==, !=, >, <, ==pattern, ==contains, ==empty, !=empty
        ])
        ->returnFormat('id')
        ->required(),
    ]),
    'location' => [
      Location::where('block', 'acf/hero')
    ],
  ]);
});
