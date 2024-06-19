CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    questionText TEXT NOT NULL,
    questionType TEXT NOT NULL,
    options TEXT
);

CREATE TABLE IF NOT EXISTS responses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    surveyId INTEGER NOT NULL,
    questionId INTEGER NOT NULL,
    response TEXT NOT NULL,
    FOREIGN KEY (questionId) REFERENCES questions (id)
);
