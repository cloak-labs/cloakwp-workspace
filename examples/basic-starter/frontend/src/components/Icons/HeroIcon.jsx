import * as OutlineIcons from '@heroicons/react/24/outline'
import * as SolidIcons from '@heroicons/react/24/solid'

// Allows you to dynamically show a Hero Icon (https://heroicons.com/) rather than having to manually import each icon component. You pass in the icon name as a prop, using the name as it is shown on their website rather than the component name which is different (eg. "archive" == "ArchiveIcon" component) -- abstracts away that complexity for you.
export default function HeroIcon ({ icon, className = 'w-6 h-6 text-gray-600', outline = true, onClick = null }) {
    if(!icon) return <></>
    icon = icon.split('-').map(word => capitalize(word)).join('') + 'Icon'; // converts hero icon name to its component name; eg. 'dots-vertical' == 'DotsVerticalIcon'
    const TheIcon = outline ? OutlineIcons[icon] : SolidIcons[icon]

    if(TheIcon) return <TheIcon className={className} aria-hidden="true" onClick={onClick} />
    return <></>
}

export function capitalize(str, all_words = false){
    /** Function: capitalizes the first letter of a word, and optionally the first letter of each word in the string
    *   @param {string} str - The string to capitalize
    *   @param {boolean} all_words - Whether or not to capitalize each word in the string
    */
      str = all_words ? str.split(' ') : [str]
    return str.map(word => {
      const [first_letter, ...rest] = word
      return first_letter.toUpperCase() + rest.join('')
    }).join(' ')
}