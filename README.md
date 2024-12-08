create mysql table using -> 
CREATE TABLE tasks (         
    id INT AUTO_INCREMENT PRIMARY KEY,  
    task_name VARCHAR(255) NOT NULL,  
    description TEXT,              
    due_date DATE NOT NULL,        
    assigned_user VARCHAR(255),      
    status ENUM('to-do', 'in-progress', 'completed') NOT NULL     
);

in backend/serve.py file , for configuring my sql enter you own credentials
# Database configuration
connection = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    database='',      //Enter the name of your own database 
)\n
