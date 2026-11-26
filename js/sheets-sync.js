export async function appendRowsToGoogleSheet({ spreadsheetId, range, token, rows }) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`;
  const response = await fetch(url, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ values: rows }) });
  if (!response.ok) throw new Error(`Google Sheets API error: ${response.status}`);
  return response.json();
}