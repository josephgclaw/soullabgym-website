/**
 * Soul Lab Gym — Fight Night Registration Handler
 * Google Apps Script Web App
 *
 * Handles two form types from fight.soullabgym.com:
 *   - Adult fighter registration   → "Registrations" tab
 *   - Junior Development Day sign-up → "Junior Registrations" tab
 *
 * DEPLOY:
 * 1. https://script.google.com → paste this file
 * 2. Deploy → New deployment → Web app
 * 3. Execute as: soullabgym@gmail.com
 * 4. Access: Anyone
 * 5. Copy the Web App URL into fight.astro
 *
 * The spreadsheet "Soul Lab Gym — Fight Night Registrations" is auto-created
 * on first run, and each submission is also emailed to NOTIFICATION_EMAIL.
 */

const SPREADSHEET_TITLE = 'Soul Lab Gym — Fight Night Registrations';
const ADULT_SHEET_NAME = 'Registrations';
const JUNIOR_SHEET_NAME = 'Junior Registrations';
const NOTIFICATION_EMAIL = 'soullabgym@gmail.com';

const ADULT_HEADERS = [
  'Submitted At',
  'Name',
  'Email',
  'Phone',
  'Age',
  'Gym / Club',
  'Training Experience',
  'Fight Disciplines',
  'Number of Fights',
];

const JUNIOR_HEADERS = [
  'Submitted At',
  'Parent Name',
  'Parent Email',
  'Parent Phone',
  'Child Name',
  'Child Age',
  'Age Group',
  'Weight (kg)',
  'Training Experience',
  'Current Gym',
  'Notes',
  'Parent Consent',
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const formType = data.formType || 'adult';

    if (formType === 'junior') {
      handleJunior(data);
    } else {
      handleAdult(data);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('Soul Lab Gym Fight Night Registration API is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function handleAdult(data) {
  const sheet = getOrCreateSheet(ADULT_SHEET_NAME, ADULT_HEADERS);
  sheet.appendRow([
    data.submittedAt || new Date().toLocaleString('en-AU'),
    data.name || '',
    data.email || '',
    data.phone || '',
    data.age || '',
    data.gym || '',
    data.trainingExperience || '',
    data.disciplines || '',
    data.numFights || '',
  ]);
  sendAdultNotification(data);
}

function handleJunior(data) {
  const sheet = getOrCreateSheet(JUNIOR_SHEET_NAME, JUNIOR_HEADERS);
  sheet.appendRow([
    data.submittedAt || new Date().toLocaleString('en-AU'),
    data.parentName || '',
    data.parentEmail || '',
    data.parentPhone || '',
    data.childName || '',
    data.childAge || '',
    data.ageGroup || '',
    data.childWeight || '',
    data.childExperience || '',
    data.childGym || '',
    data.notes || '',
    data.parentConsent || '',
  ]);
  sendJuniorNotification(data);
}

function getOrCreateSheet(sheetName, headers) {
  const files = DriveApp.getFilesByName(SPREADSHEET_TITLE);
  let spreadsheet;

  if (files.hasNext()) {
    spreadsheet = SpreadsheetApp.open(files.next());
  } else {
    spreadsheet = SpreadsheetApp.create(SPREADSHEET_TITLE);
    const first = spreadsheet.getActiveSheet();
    first.setName(sheetName);
    first.appendRow(headers);
    formatHeader(first, headers.length);
    Logger.log('Created new spreadsheet: ' + spreadsheet.getUrl());
    return first;
  }

  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    sheet.appendRow(headers);
    formatHeader(sheet, headers.length);
  }
  return sheet;
}

function formatHeader(sheet, columnCount) {
  const headerRange = sheet.getRange(1, 1, 1, columnCount);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#EC4899');
  headerRange.setFontColor('#FFFFFF');
  sheet.autoResizeColumns(1, columnCount);
}

function sendAdultNotification(data) {
  const subject = `🥊 New Fight Night Registration — ${data.name}`;
  const body = `
New Fight Night registration received!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIGHTER DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name:               ${data.name}
Email:              ${data.email}
Phone:              ${data.phone}
Age:                ${data.age}
Gym / Club:         ${data.gym || 'Not specified'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIGHT BACKGROUND
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Training Experience: ${data.trainingExperience}
Disciplines:         ${data.disciplines || 'None selected'}
Number of Fights:    ${data.numFights || 'Not specified'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted: ${data.submittedAt}
  `.trim();

  MailApp.sendEmail({ to: NOTIFICATION_EMAIL, subject, body });
}

function sendJuniorNotification(data) {
  const subject = `🥋 New Junior Development Day Sign-Up — ${data.childName}`;
  const body = `
New Junior Development Day sign-up received!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHILD DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Child's Name:       ${data.childName}
Age:                ${data.childAge}
Age Group:          ${data.ageGroup}
Weight (kg):        ${data.childWeight}
Training Experience: ${data.childExperience}
Current Gym:        ${data.childGym || 'Not specified'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PARENT / GUARDIAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Parent Name:        ${data.parentName}
Email:              ${data.parentEmail}
Phone:              ${data.parentPhone}
Consent Given:      ${data.parentConsent}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${data.notes || '(no notes)'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted: ${data.submittedAt}
  `.trim();

  MailApp.sendEmail({ to: NOTIFICATION_EMAIL, subject, body });
}
