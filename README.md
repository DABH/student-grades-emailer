# student-grades-emailer
A Google Apps script for emailing grades to students in a class from a Google Spreadsheet

## Introduction

Using a Google Spreadsheet is a great way to manage students' grades for a course.  Google Spreadsheets can be easily shared, edited by multiple users simultaneously, and accessed across most devices.  Additionally, keping grades in the cloud generally is a safeguard against data loss.

One disadvtange of using a Google Spreadsheet as a gradebook is that there is no obvious way to allow students to view their grades without sharing the entire spreadsheet with them, which may be undesirable.

student-grades-emailer is a Google Apps script that solves this problem.  When run, the script emails each student their particular set of grades stored in the spreadsheet, without letting them see anyone else's grades and without any headache about giving spreadsheet permissions to all students.

## Use

To use student-grades-emailer, follow these steps:

1. Sign into the Google account from which you want to send emails.
2. Open the spreadsheet (and sheet, in particular) that contains all the students' grades.
3. From the Google Spreadsheets top menu, click `Tools` then `Script editor...`
4. Create a blank project (the name does not matter - `student-grades-emailer` is a simple choice)
5. Import `student-grades-emailer.gs` into your project, or just copy and paste the contents of `student-grades-emailer.gs` into the default code file.  (Again, the name of this file does not matter.)
6. Customize all options in the script as desired
7. In the function combo box, make sure `sendEmails` (not `shouldSendRow` or another function) is selected
8. Press the Run (play) button to execute the script

## Configuration

There are several important configuration options that must be specified when running the script, as well as some optional customizations that may be made:

* The `config` object contains the main configuration options:
	* `className` - the name of your class, e.g. Econ 301
	* `classWebsite` - a URL for your class (or other email signature)
	* `assignmentNames` - an array of names for the course's graded assignments (e.g. `["Quiz 1", "First Homework", "Group Project"]`)
	* `assignmentCols` - an array of ints that specify the columns in your sheet that contain the corresponding assignment grades (e.g. following the above, `assignmentCols[0]` should be the column number containing the grade for Quiz 1).  Note  that column numbers in this variable are zero-indexed relative to `startCol` (see below)
	* `startRow` - the first row in your sheet that contains student grades (one-indexed)
	* `endRow` - the last row in your sheet that contains student grades (one-indexed)
	* `startCol` - the first column in your sheet that contains grades or other needed information (one-indexed)
	* `endCol` - the last column in your sheet that contains grades or other needed information (one-indexed)
* `emailAddress` - the student's email address.  Defined inside the `sendEmails()` function.  The value of `emailAddress` must be changed so that it points to the column in your spreadsheet containing student emails.
* `message` - the body of the email sent to students.  This may be customized as desired inside the `sendEmails()` function.
* `subject` - the subject of the email sent to students.  This may be customized as desired inside the `sendEmails()` function.
* `shouldSendRow(row)` - this function returns a bool whether or not an email should be sent for a particular row.  For example, you may only want to send emails to students whose Quiz 1 score was below a 50.  Or you may want to only send scores to students who are still enrolled in the class.

##Assumptions

student-grades-emailer makes fairly minimal assumptions about the format of your spreadsheet:

* The data is organized in rows and columns, where rows are students and columns are assignments or other information fields (name, email address, ID number, etc.)
* Only one student's grades are contained per row
* Every student has an email address entered in the email column
* If a grade field is blank, that value should be replaced by a 0 (this behavior may be changed by editing the expression `row[config.assignmentCols[j]]||"0"` in `sendEmails()`)

##Example

`student-grades-emailer.gs` is configured by default with some example options:

* The course name is set to Econ 301
* The course website is set to <https://example.edu/econ301>
* The first row with student data in the sheet is 2
* The last row with student data in the sheet is 4 (so, there are only three students in this class)
* The first column with information we want is 2 (it's perfectly fine to ignore columns if you don't want/need to use them)
* The last colum with information we want is 19
* The assignment names are as given
* The assignment column numbers are as given (where 0 corresponds to startCol, so the last column is 17)
* Student emails are in the 3rd column of the sheet (i.e. `row[1]`)
* Student names are in the 2nd column of the sheet (i.e. `row[0]`)
* There is extra information we don't use contained in some columns, and potentially some rows


##License etc.

student-grades-emailer, this repository, and everything therein is released under the license specified in LICENSE.md.

Please report any questions about, comments on, suggestions for, or typos in the code or documentation.