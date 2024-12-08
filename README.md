create mysql table using -> \n
CREATE TABLE tasks (         \n
    id INT AUTO_INCREMENT PRIMARY KEY,  \n
    task_name VARCHAR(255) NOT NULL,  \n
    description TEXT,              \n
    due_date DATE NOT NULL,        \n
    assigned_user VARCHAR(255),      \n
    status ENUM('to-do', 'in-progress', 'completed') NOT NULL     \n
);\n
\n
\n
in backend/serve.py file , for configuring my sql enter you own credentials\n
# Database configuration\n
connection = pymysql.connect(\n
    host='localhost',\n
    user='root',\n
    password='',\n
    database='',      //Enter the name of your own database \n
)\n
