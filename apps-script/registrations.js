/**
 * Soul Lab Gym — Registration Handler (Fight Night + Grading)
 * Google Apps Script Web App
 *
 * v3: adds duplicate protection (same name within 10 min ignored)
 *     and a read endpoint for automated paid/unpaid checks.
 *
 * Handles two form types:
 * - Fight night registrations → "Soul Lab Gym — Fight Night Registrations" spreadsheet
 * - Grading registrations     → "Soul Lab Gym — Grading Registrations" spreadsheet
 * Both send an email notification to soullabgym@gmail.com.
 */

const NOTIFICATION_EMAIL = 'soullabgym@gmail.com';
const READ_KEY = 'slg-opus-2026'; // secret for GET access to registration data

// Fight night sheet config (unchanged)
const FIGHT_SHEET_NAME = 'Registrations';
const FIGHT_SPREADSHEET_TITLE = 'Soul Lab Gym — Fight Night Registrations';
const FIGHT_HEADERS = [
  'Submitted At',
  'Name',
  'Email',
  'Phone',
  'Age',
  'Weight (kg)',
  'Gym / Club',
  'Training Experience',
  'Fight Disciplines',
  'Number of Fights',
];

// Grading sheet config
const GRADING_SHEET_NAME = 'Grading';
const GRADING_SPREADSHEET_TITLE = 'Soul Lab Gym — Grading Registrations';
const GRADING_HEADERS = [
  'Submitted At',
  'Student Name',
  'Phone',
  'Email',
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (data.formType === 'grading') {
      return handleGrading(data);
    }
    return handleFightNight(data);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Read endpoint: /exec?key=...&type=grading (or type=fight)
 * Returns all registration rows as JSON. Used for automated
 * paid vs unpaid cross-checks against Square.
 */
function doGet(e) {
  const params = e && e.parameter ? e.parameter : {};
  if (params.key !== READ_KEY) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: 'unauthorized' })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  const isFight = params.type === 'fight';
  const sheet = getOrCreateSheet(
    isFight ? FIGHT_SPREADSHEET_TITLE : GRADING_SPREADSHEET_TITLE,
    isFight ? FIGHT_SHEET_NAME : GRADING_SHEET_NAME,
    isFight ? FIGHT_HEADERS : GRADING_HEADERS,
    isFight ? 'fightSpreadsheetId' : 'gradingSpreadsheetId'
  );

  const values = sheet.getDataRange().getValues();
  const headers = values.shift() || [];
  const rows = values.map(function (row) {
    const obj = {};
    headers.forEach(function (h, i) {
      obj[h] = String(row[i]);
    });
    return obj;
  });

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, count: rows.length, rows: rows })
  ).setMimeType(ContentService.MimeType.JSON);
}

/** Returns true if this submission is a duplicate within 10 minutes. */
function isDuplicate(kind, name) {
  const key = kind + ':' + String(name || '').toLowerCase().replace(/\s+/g, ' ').trim();
  const cache = CacheService.getScriptCache();
  if (cache.get(key)) return true;
  cache.put(key, '1', 600); // 10 minutes
  return false;
}

function handleGrading(data) {
  if (isDuplicate('grading', data.studentName)) return jsonOk();

  const sheet = getOrCreateSheet(
    GRADING_SPREADSHEET_TITLE,
    GRADING_SHEET_NAME,
    GRADING_HEADERS,
    'gradingSpreadsheetId'
  );

  sheet.appendRow([
    data.submittedAt || new Date().toLocaleString('en-AU'),
    data.studentName || '',
    data.phone || '',
    data.email || '',
  ]);

  MailApp.sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: '🥋 New Grading Registration: ' + (data.studentName || 'Unknown'),
    body:
      'New grading registration:\n\n' +
      'Student: ' + (data.studentName || '-') + '\n' +
      'Phone: ' + (data.phone || '-') + '\n' +
      'Email: ' + (data.email || '-') + '\n' +
      'Submitted: ' + (data.submittedAt || '-') + '\n\n' +
      'This means REGISTERED. Check Square for their $45 payment + shirt size.\n' +
      'Sheet: ' + sheet.getParent().getUrl(),
  });

  return jsonOk();
}

function handleFightNight(data) {
  if (isDuplicate('fight', data.name)) return jsonOk();

  const sheet = getOrCreateSheet(
    FIGHT_SPREADSHEET_TITLE,
    FIGHT_SHEET_NAME,
    FIGHT_HEADERS,
    'fightSpreadsheetId'
  );

  sheet.appendRow([
    data.submittedAt || new Date().toLocaleString('en-AU'),
    data.name || '',
    data.email || '',
    data.phone || '',
    data.age || '',
    data.weight || '',
    data.gym || '',
    data.trainingExperience || '',
    data.disciplines || '',
    data.numFights || '',
  ]);

  MailApp.sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: '🥊 New Fight Night Registration: ' + (data.name || 'Unknown'),
    body:
      'New fight night registration:\n\n' +
      'Name: ' + (data.name || '-') + '\n' +
      'Email: ' + (data.email || '-') + '\n' +
      'Phone: ' + (data.phone || '-') + '\n' +
      'Age: ' + (data.age || '-') + '\n' +
      'Weight: ' + (data.weight || '-') + ' kg\n' +
      'Gym: ' + (data.gym || '-') + '\n' +
      'Experience: ' + (data.trainingExperience || '-') + '\n' +
      'Disciplines: ' + (data.disciplines || '-') + '\n' +
      'Fights: ' + (data.numFights || '-') + '\n\n' +
      'Sheet: ' + sheet.getParent().getUrl(),
  });

  return jsonOk();
}

/**
 * Find or create a spreadsheet + sheet, remembering the id in script properties.
 * Falls back to searching Drive by title (handles pre-existing fight sheet).
 */
function getOrCreateSheet(spreadsheetTitle, sheetName, headers, propKey) {
  const props = PropertiesService.getScriptProperties();
  let ss = null;

  const savedId = props.getProperty(propKey);
  if (savedId) {
    try {
      ss = SpreadsheetApp.openById(savedId);
    } catch (e) {
      ss = null;
    }
  }

  if (!ss) {
    const files = DriveApp.getFilesByName(spreadsheetTitle);
    if (files.hasNext()) {
      ss = SpreadsheetApp.open(files.next());
    } else {
      ss = SpreadsheetApp.create(spreadsheetTitle);
    }
    props.setProperty(propKey, ss.getId());
  }

  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.getSheets()[0];
    sheet.setName(sheetName);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function jsonOk() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true })
  ).setMimeType(ContentService.MimeType.JSON);
}
