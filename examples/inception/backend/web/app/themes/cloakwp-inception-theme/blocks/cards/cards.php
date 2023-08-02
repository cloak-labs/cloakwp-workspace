<?php

use CloakWP\Utils;
use Extended\ACF\ConditionalLogic;
use Extended\ACF\Fields\Checkbox;
use Extended\ACF\Fields\Number;
use Extended\ACF\Fields\Repeater;
use Extended\ACF\Fields\Textarea;
use Extended\ACF\Fields\TrueFalse;
use Extended\ACF\Fields\Image;
use Extended\ACF\Fields\Link;
use Extended\ACF\Fields\Message;
use Extended\ACF\Fields\Relationship;
use Extended\ACF\Fields\Text;
use Extended\ACF\Location;

// Register the block
register_block_type(__DIR__ . '/block.json');

// Register the block's ACF field group:
add_action('acf/init', function () {
  register_extended_field_group([
    'title' => 'Block: Cards',
    'fields' => Utils::acfBlockWrapper('Cards Block', [
      Number::make('# of Columns', 'num_columns')
        ->defaultValue(3)
        ->wrapper(['width' => '50%'])
        ->min(1)
        ->max(4),
      TrueFalse::make('Manual Data?', 'data_type')
        ->instructions('You can either choose from existing pages/posts to populate the cards, or manually enter the data for each card.')
        ->wrapper(['width' => '50%'])
        ->stylisedUi(),
      Repeater::make('Manual Cards')
        ->fields([
          Image::make('Image')
            ->instructions('Choose an image to display at the top of the card.')
            ->previewSize('medium')
            ->width(300, 700)
            ->wrapper(['width' => '50%'])
            ->required(),
          Text::make('Title')
            ->wrapper(['width' => '50%'])
            ->required(),
          Link::make('URL')
            ->wrapper(['width' => '50%'])
            ->instructions('Optionally link this card to another page/website.'),
          Textarea::make('Description')
            ->wrapper(['width' => '50%'])
            ->rows(4)
        ])
        ->min(1)
        ->buttonLabel('Add card')
        ->layout('block')
        ->required()
        ->conditionalLogic([
          ConditionalLogic::where('data_type', '==', 1) // available operators: ==, !=, >, <, ==pattern, ==contains, ==empty, !=empty
        ]),
      Relationship::make('Select Pages/Posts', 'card_pages')
        ->instructions('Select 1 or more pages/posts to populate the cards (i.e. page title = card title, permalink = card URL, featured image = card image, excerpt = card description).')
        ->postTypes(['post', 'page'])
        ->filters([
          'search', 
          'post_type',
        ])
        ->elements(['featured_image'])
        ->min(1)
        ->required()
        ->conditionalLogic([
          ConditionalLogic::where('data_type', '==', 0) // available operators: ==, !=, >, <, ==pattern, ==contains, ==empty, !=empty
        ]),
      Text::make('CTA Text')
        ->instructions('Optionally add a CTA element to all cards.')
        ->placeholder('eg. Read More')
      ,
      Checkbox::make('Post Meta')
        ->choices([
            'post_date' => 'Published Date',
            'post_modified' => 'Modified Date',
            'post_author' => 'Author'
          ])
        ->conditionalLogic([
          ConditionalLogic::where('data_type', '==', 0) // available operators: ==, !=, >, <, ==pattern, ==contains, ==empty, !=empty
        ]),
      Message::make('Subtitle')
        ->message("To add a small subtitle below each card title, you must edit each selected post's 'excerpt' field.")
        ->escapeHtml(),
    ]),
    'location' => [
      Location::where('block', 'acf/cards')
    ],
  ]);
});
