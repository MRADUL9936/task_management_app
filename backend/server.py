import pymysql
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Database configuration
connection = pymysql.connect(
    host='localhost',
    user='root',
    password='',   #you mysql password
    database='', # your database name
)


# CREATE TABLE tasks (
#     id INT AUTO_INCREMENT PRIMARY KEY,
#     task_name VARCHAR(255) NOT NULL,
#     description TEXT,
#     due_date DATE NOT NULL,
#     assigned_user VARCHAR(255),
#     status ENUM('to-do', 'in-progress', 'completed') NOT NULL
# );


@app.route('/tasks', methods=['POST'])
def create_task():
    data = request.json
    print(data)
    query = """
        INSERT INTO tasks (task_name, description, due_date, assigned_user, status)
        VALUES (%s, %s, %s, %s, %s)
    """
    values = (data['task_name'], data.get('description', ''), data['due_date'], data.get('assigned_user', ''), data['status'])
    with connection.cursor() as cursor:
        cursor.execute(query, values)
        connection.commit()
    return jsonify({'message': 'Task created'}), 201

@app.route('/tasks', methods=['GET'])
def get_tasks():
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM tasks")
        tasks = cursor.fetchall()
        print(tasks)
    return jsonify(tasks)

@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    data = request.json
    query = """
        UPDATE tasks
        SET task_name = %s, description = %s, due_date = %s, assigned_user = %s, status = %s
        WHERE id = %s
    """
    values = (data['task_name'], data.get('description', ''), data['due_date'], data.get('assigned_user', ''), data['status'], id)
    with connection.cursor() as cursor:
        cursor.execute(query, values)
        connection.commit()
    return jsonify({'message': 'Task updated'})

@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    with connection.cursor() as cursor:
        cursor.execute("DELETE FROM tasks WHERE id = %s", (id,))
        connection.commit()
    return jsonify({'message': 'Task deleted'})

if __name__ == '__main__':
    app.run(debug=True)
