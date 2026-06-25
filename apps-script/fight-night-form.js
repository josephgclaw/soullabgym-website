/**
 * Soul Lab Gym — Fight Night Registration Handler
 * Google Apps Script Web App
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com → New Project
 * 2. Paste this entire file into the editor
 * 3. Click "Deploy" → "New deployment"
 * 4. Type: Web app
 * 5. Execute as: Me (soullabgym@gmail.com)
 * 6. Who has access: Anyone
 * 7. Click Deploy → Authorize → Copy the Web App URL
 * 8. Paste that URL into fight.astro where it says REPLACE_WITH_APPS_SCRIPT_URL
 * 9. Redeploy the website (git push)
 *
 * The script will automatically:
 * - Create a new Google Sheet the first time it runs
 * - Write every registration as a new row
 * - Send an email notification to soullabgym@gmail.com
 */

const SHEET_NAME = 'Registrations';
const SPREADSHEET_TITLE = 'Soul Lab Gym — Fight Night Registrations';
const NOTIFICATION_EMAIL = 'soullabgym@gmail.com';

// Column headers for the sheet
const HEADERS = [
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

/**
 * Handle POST requests from the fight registration form
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();

    // Append the new row
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

    // Send email notification
    sendNotification(data);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * GET handler — health check
 */
function doGet() {
  return ContentService
    .createTextOutput('Soul Lab Gym Fight Night Registration API is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Get the sheet, or create the spreadsheet + sheet if it doesn't exist yet
 */
function getOrCreateSheet() {
  const files = DriveApp.getFilesByName(SPREADSHEET_TITLE);
  let spreadsheet;

  if (files.hasNext()) {
    spreadsheet = SpreadsheetApp.open(files.next());
  } else {
    spreadsheet = SpreadsheetApp.create(SPREADSHEET_TITLE);
    const sheet = spreadsheet.getActiveSheet();
    sheet.setName(SHEET_NAME);
    sheet.appendRow(HEADERS);

    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#EC4899');
    headerRange.setFontColor('#FFFFFF');
    sheet.autoResizeColumns(1, HEADERS.length);

    Logger.log('Created new spreadsheet: ' + spreadsheet.getUrl());
  }

  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
  }

  return sheet;
}

/**
 * Send email notification to the gym
 */
function sendNotification(data) {
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
Weight:             ${data.weight || 'Not specified'} kg
Gym / Club:         ${data.gym || 'Not specified'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIGHT BACKGROUND
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Training Experience: ${data.trainingExperience}
Disciplines:         ${data.disciplines || 'None selected'}
Number of Fights:    ${data.numFights || 'Not specified'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted: ${data.submittedAt}

View all registrations in your Google Sheet:
https://drive.google.com (search "Fight Night Registrations")
  `.trim();

  MailApp.sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: subject,
    body: body,
  });
}
