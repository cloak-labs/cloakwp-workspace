// Strips HTML Tags from a string, which is helpful in certain cases when WordPress passes HTML over its API rather than raw text
export default function stripHtml(string) {
  return string.replace(/<[^>]*>?/gm, '').replaceAll('&#8217;', '\'');
}
