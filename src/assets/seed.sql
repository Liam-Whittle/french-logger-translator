CREATE TABLE IF NOT EXISTS Invoice(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, rate INTEGER, deductableTaxPercentage INTEGER, gender INTEGER);
CREATE TABLE IF NOT EXISTS DaysOfWeek(id INTEGER PRIMARY KEY AUTOINCREMENT, weekName TEXT);
INSERT or IGNORE INTO DaysOfWeek(id, weekName) VALUES (1, 'Monday');
INSERT or IGNORE INTO DaysOfWeek(id, weekName) VALUES (2, 'Tuesday');
INSERT or IGNORE INTO DaysOfWeek(id, weekName) VALUES (3, 'Wednesday');
INSERT or IGNORE INTO DaysOfWeek(id, weekName) VALUES (4, 'Thursday');
INSERT or IGNORE INTO DaysOfWeek(id, weekName) VALUES (5, 'Friday');
INSERT or IGNORE INTO DaysOfWeek(id, weekName) VALUES (6, 'Saturday');
INSERT or IGNORE INTO DaysOfWeek(id, weekName) VALUES (7, 'Sunday');
CREATE TABLE IF NOT EXISTS InvoiceHoursWorked(id INTEGER PRIMARY KEY AUTOINCREMENT, startTime TEXT, endTime TEXT, dowID INTEGER, invoiceID INTEGER, FOREIGN KEY (dowID) REFERENCES DaysOfWeek(id), FOREIGN KEY (invoiceID) REFERENCES Invoice(id));
CREATE TABLE IF NOT EXISTS Verbs(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);
