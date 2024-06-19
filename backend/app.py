import sqlite3, logging
from flask_cors import CORS
from flask import Flask, jsonify, request

logging.basicConfig(level=logging.DEBUG)
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

DATABASE = 'survey.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def create_tables():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS questions (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        questionText TEXT NOT NULL,
                        questionType TEXT NOT NULL,
                        options TEXT
                      );''')
    cursor.execute('''CREATE TABLE IF NOT EXISTS responses (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        surveyId INTEGER NOT NULL,
                        questionId INTEGER NOT NULL,
                        response TEXT NOT NULL,
                        FOREIGN KEY (questionId) REFERENCES questions (id)
                      );''')
    conn.commit()
    conn.close()

@app.route('/api/questions', methods=['GET'])
def get_questions():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM questions')
    questions = cursor.fetchall()
    conn.close()
    # Convert the rows to a list of dicts and split the options string into an array
    questions_list = []
    for question in questions:
        question_dict = dict(question)
        if question_dict['questionType'] == 'multiple-choice' and question_dict['options']:
            question_dict['options'] = question_dict['options'].split(',')
        questions_list.append(question_dict)
    return jsonify(questions_list)

@app.route('/api/questions', methods=['POST'])
def add_question():
    question_data = request.json
    logging.debug(f"Received question data: {question_data}")
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO questions (questionText, questionType, options)
        VALUES (?, ?, ?)
    ''', (question_data['questionText'], question_data['questionType'], ','.join(question_data.get('options', []))))
    conn.commit()
    new_question_id = cursor.lastrowid
    conn.close()
    logging.debug(f"Added new question with ID: {new_question_id}")
    return jsonify({'id': new_question_id}), 201

@app.route('/api/questions/<int:question_id>', methods=['DELETE'])
def delete_question(question_id):
    logging.debug(f"Deleting question with ID: {question_id}")
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM questions WHERE id = ?', (question_id,))
    conn.commit()
    conn.close()
    logging.debug(f"Deleted question with ID: {question_id}")
    return '', 204

@app.route('/api/responses', methods=['OPTIONS', 'POST'])
def handle_responses():
    if request.method == 'OPTIONS':
        response = jsonify({})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response
    elif request.method == 'POST':
        response_data = request.json
        survey_id = response_data.get('surveyId')
        responses = response_data.get('responses')
        conn = get_db_connection()
        cursor = conn.cursor()
        for question_id, response_text in responses.items():
            cursor.execute('''
                INSERT INTO responses (surveyId, questionId, response)
                VALUES (?, ?, ?)
            ''', (survey_id, question_id, response_text))
        conn.commit()
        conn.close()
        return '', 204

@app.route('/api/results', methods=['GET'])
def get_results():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Fetch all questions
    cursor.execute('SELECT * FROM questions')
    questions = cursor.fetchall()

    # Fetch all responses
    cursor.execute('SELECT * FROM responses')
    responses = cursor.fetchall()
    conn.close()

    # Organize responses by questionId
    organized_responses = {}
    for response in responses:
        question_id = response['questionId']
        if question_id not in organized_responses:
            organized_responses[question_id] = []
        organized_responses[question_id].append(response['response'])

    # Combine questions with their responses
    results = []
    for question in questions:
        question_dict = dict(question)
        question_id = question_dict['id']
        question_dict['responses'] = organized_responses.get(question_id, [])
        if question_dict['questionType'] == 'multiple-choice' and question_dict['options']:
            question_dict['options'] = question_dict['options'].split(',')
        results.append(question_dict)

    return jsonify(results)

if __name__ == '__main__':
    create_tables()
    app.run(debug=True)
