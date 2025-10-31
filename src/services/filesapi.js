import http from './http';

export async function listFiles() {
  const { data } = await http.get('/files');
  return data;
}

// file: File (input)
// patientId: opcional (string)
export async function uploadFile(file, patientId) {
  const form = new FormData();
  form.append('file', file);
  if (patientId) form.append('patientId', patientId);
  const { data } = await http.post('/files', form, { headers: { 'Content-Type': 'multipart/form-data' }});
  return data;
}

export async function getSignedUrl(id) {
  const enc = encodeURIComponent(id);
  const { data } = await http.get(`/files/${enc}/signed`);
  return data.url;
}

export async function deleteFile(id) {
  const enc = encodeURIComponent(id);
  const { data } = await http.delete(`/files/${enc}`);
  return data;
}
