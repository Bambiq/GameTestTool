<h1>🧪 Game Test Logger</h1>

<p>This project helps track, view, and manage logs from game testing sessions. It's built with a <strong>FastAPI + SQLite backend</strong> and a <strong>React + Tailwind CSS frontend</strong>.</p>

<h2>📁 Project Structure</h2>
<pre><code>GameTestTool/
├── backend/          
│   ├── main.py       
│   ├── models.py     
│   ├── database.py   
│   └── testlogs.db   
│
├── frontend/         
│   └── src/
│       ├── App.jsx
│       ├── LogForm.jsx
│       ├── LogList.jsx
│       ├── LogControls.jsx
│       └── api.js    
│
├── .gitignore
├── README.html
└── requirements.txt
</code></pre>

<h2>⚙️ Features</h2>
<ul>
  <li>Add new test logs</li>
  <li>View and delete existing logs</li>
  <li>Filter logs by result (pass/fail)</li>
  <li>Sort logs by date (newest/oldest)</li>
</ul>

<h2>🛠️ Tech Stack</h2>
<ul>
  <li><strong>Backend:</strong> FastAPI, SQLite, SQLAlchemy</li>
  <li><strong>Frontend:</strong> React, Vite, Tailwind CSS</li>
  <li><strong>API:</strong> REST (Fetch)</li>
</ul>

<h2>📌 Roadmap</h2>
<ul>
  <li>Keyword and user-based filtering</li>
  <li>CSV/JSON export of logs</li>
  <li>Analytics and statistics dashboard</li>
  <li>User authentication and login</li>
</ul>

<h2>📄 License</h2>
<p>MIT License – free to use, modify, and share.</p>

</body>
</html>
