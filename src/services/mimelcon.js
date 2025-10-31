export function iconFor(ext) {
  const e = (ext || '').toLowerCase();
  if (['png','jpg','jpeg','gif','webp','bmp','svg'].includes(e)) return '🖼️';
  if (['pdf'].includes(e)) return '📄';
  if (['xlsx','xls','csv'].includes(e)) return '📊';
  if (['doc','docx'].includes(e)) return '📝';
  if (['ppt','pptx'].includes(e)) return '📈';
  return '📁';
}
export function isImage(ext) {
  return ['png','jpg','jpeg','gif','webp','bmp','svg'].includes((ext||'').toLowerCase());
}
