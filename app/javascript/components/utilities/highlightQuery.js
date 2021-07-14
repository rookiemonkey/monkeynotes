export default function highlightQuery(html, query) {
  if (!query) return html

  html = html.replace(/(<mark class="highlight">|<\/mark>)/gim, '')
  return html.replace(new RegExp(query, 'gi'), '<mark class="highlight">$&</mark>');
}