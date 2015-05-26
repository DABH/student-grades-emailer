/**
 * Student Grades Emailer
 *
 * @fileOverview Email grades to students from Google Spreadsheets.  Assumes you
 *               are logged into Google and have the sheet you want to use open
 *               in another tab/window.  Note: emails will send from currently
 *               logged-in Gmail account.
 * @author https://github.com/DABH
 * @version 1.0.0
 * @license NCSA
 *  {@link https://github.com/DABH/student-grades-emailer/blob/master/LICENSE.md}
 */

// TODO: Change this for your particular course and spreadsheet
var config={
  // Class name
  className:"Econ 301",
  // Class website (or other email signature)
  classWebsite:"https://example.edu/econ301",
  // Names of assignments
  assignmentNames:["HW0","HW0 Late Days","HW1","HW1 Late Days","HW2",
                   "HW2 Late Days","HW3","HW3 Late Days","HW4","HW4 Late Days",
                   "Midterm"],
  // Columns that hold the corresponding assignment scores
  // NOTE: these indices are zero-indexed relative to startCol
  assignmentCols:[8,9,10,11,12,13,14,15,16,17,4],
  // Specify which rows and columns student data begin and end on in the sheet
  // NOTE: these are one-indexed
  startRow:2,
  endRow:4,
  startCol:2,
  endCol:19
};

/**
 * Main function for emailing all students a list of their grades
 */
function sendEmails(){
  // Use the currently active spreadsheet sheet
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // Define the desired range of cells from sheet
  var numRows=config.endRow-config.startRow+1;
  var numCols=config.endCol-config.startCol+1;
  var dataRange=sheet.getRange(config.startRow,config.startCol,numRows,numCols);
  
  // Fetch the actual values specified by the range above
  var data=dataRange.getValues();
  
  // Loop over each retrieved row (student), and send an email
  for (i in data){
    var row=data[i];
    // Only email this student if we should
    if(shouldSendRow(row)){
      // Get student's email address
      var emailAddress=row[1];

      // Define basic message (TODO: customize as desired)
      // NOTE: In our example, students' names are in column 2 of the sheet
      var message="Hello,\n\nWe are writing to let you know the grades we "
                  +"have recorded for you for "+config.className+".  If you "
                  +"believe we have made any errors in recording your grades"
                  +", please let us know ASAP by replying to this email.\n\n"
                  +"Your Name: "+row[0]+"\n";

      // Append all assignment names and grades to message
      for(j in config.assignmentNames)
        message+=config.assignmentNames[j]+": "
                 +(row[config.assignmentCols[j]]||"0")+"\n";

      // Append complimentary close and signature to message
      message+="\nSincerely,\n\nYour "+config.className+" teaching team\n"
               +config.classWebsite;

      // Specify subject of email
      var subject=config.className+" Grade Report";

      // Send email to student
      MailApp.sendEmail(emailAddress, subject, message);
    }
  }
}

/**
 * A helper function for deciding whether to email a particular student (for
 * example, the student may no longer be enrolled).  In our example, we check
 * whether the student has a midterm score recorded.
 * @param row - the row (student) in question
 */
function shouldSendRow(row){
  return row[4]!="";
}
