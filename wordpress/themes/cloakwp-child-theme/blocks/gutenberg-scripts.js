jQuery(document).ready(function ($) {

    setTimeout(() => { // wait 1 second to let Gutenberg editor finish rendering the dom element we wish to observe:
        // below we observe DOM changes within the .block-editor container (Gutenberg editor), so we can run the hideBlockSettings() function to hide block settings we don't want (because WordPress sucks and doesn't provide a better option to disable certain settings)
        MutationObserver = window.MutationObserver || window.WebKitMutationObserver;    
        var observer = new MutationObserver(hideBlockSettings);
        const gutenbergSidebar = document.querySelectorAll('.interface-interface-skeleton__sidebar')
        observer.observe(gutenbergSidebar[0], {
            attributes: true,
            subtree: true
        });
    
        function hideBlockSettings(mutations, observer) { // fires when a DOM mutation occurs within Gutenberg Editor (i.e. when you select a block etc.)
            // console.log(mutations, observer);
            const blockPanel = $('.components-panel')
            if(!blockPanel) return
            
            // console.log(blockPanel)
            blockPanel.find('h2.components-panel__body-title').each(function() { // loop through the currently selected Block's metabox titles in right sidebar (the title strings are the only unique identifiers -- WP sucks)
                const panelTitleElement = $(this)
                const panelTitleString = panelTitleElement.find('button').text()
                // console.log(panelTitleString)
                const panelsToHide = [
                    'Width settings',
                    'Layout'
                ]
                if(panelsToHide.includes(panelTitleString)){
                    panelTitleElement.closest('.components-panel__body').hide() // hide the full metabox panel
                }
            })
        }
    }, 1000)

});
