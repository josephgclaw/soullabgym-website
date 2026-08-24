/**
 * Soul Lab Gym — Registration Handler (Fight Night + Grading)
 * Google Apps Script Web App
 *
 * UPDATE INSTRUCTIONS (replaces fight-night-form.js):
 * 1. Go to https://script.google.com and open the existing "fight night" project
 * 2. Replace ALL code with this file
 * 3. Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy
 *    (Editing the existing deployment keeps the same URL, so the website keeps working)
 *
 * Handles two form types:
 * - Fight night registrations → "Soul Lab Gym — Fight Night Registrations" spreadsheet
 * - Grading registrations     → "Soul Lab Gym — Grading Registrations" spreadsheet
 * Both send an email notification to soullabgym@gmail.com.
 */

const NOTIFICATION_EMAIL = 'soullabgym@gmail.com';

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

function handleGrading(data) {
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
      'Check Square for payment + shirt size.\n' +
      'Sheet: ' + sheet.getParent().getUrl(),
  });

  return jsonOk();
}

function handleFightNight(data) {
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
