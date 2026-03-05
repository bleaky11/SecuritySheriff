import type { GameRound } from "../SecuritySheriff";
import type { CharacterProfile } from "./models";

export const TOWNS_FOLK_MOCK_DATA : CharacterProfile[] = [
  {
    "firstName": "Caleb",
    "lastName": "Miller",
    "email": "caleb.miller42@mail.com",
    "gender": "Male",
    "occupation": "Saddlemaker",
    "characterTraits": [
      "Stoic",
      "Observant",
      "Skilled",
      "Grumpy"
    ]
  },
  {
    "firstName": "Isabella",
    "lastName": "De La Rosa",
    "email": "idelarosa88@mail.com",
    "gender": "Female",
    "occupation": "Saloon Owner",
    "characterTraits": [
      "Charismatic",
      "Sharp-witted",
      "Protective",
      "Ambitious"
    ]
  },
  {
    "firstName": "Thaddeus",
    "lastName": "Weaver",
    "email": "thadweaver33@mail.com",
    "gender": "Male",
    "occupation": "Undertaker",
    "characterTraits": [
      "Morbid",
      "Meticulous",
      "Soft-spoken"
    ]
  },
  {
    "firstName": "Li",
    "lastName": "Wei",
    "email": "liwei99@mail.com",
    "gender": "Male",
    "occupation": "Herbalist",
    "characterTraits": [
      "Wise",
      "Patient",
      "Resilient",
      "Knowledgeable"
    ]
  },
  {
    "firstName": "Sarah",
    "lastName": "Blackwood",
    "email": "sblackwood12@mail.com",
    "gender": "Female",
    "occupation": "Blacksmith",
    "characterTraits": [
      "Strong",
      "Honest",
      "Loud",
      "Determined"
    ]
  },
  {
    "firstName": "Elias",
    "lastName": "Thorne",
    "email": "ethorne77@mail.com",
    "gender": "Male",
    "occupation": "Telegraph Operator",
    "characterTraits": [
      "Anxious",
      "Fast-fingered",
      "Gossipy",
      "Intelligent"
    ]
  },
  {
    "firstName": "Abigail",
    "lastName": "Jenkins",
    "email": "ma.jenkins45@mail.com",
    "gender": "Female",
    "occupation": "Schoolteacher",
    "characterTraits": [
      "Nurturing",
      "Strict",
      "Intellectual",
      "Disciplined",
      "Idealistic"
    ]
  },
  {
    "firstName": "Samuel",
    "lastName": "Rivers",
    "email": "srivers21@mail.com",
    "gender": "Male",
    "occupation": "Barber",
    "characterTraits": [
      "Talkative",
      "Steady-handed",
      "Friendly"
    ]
  },
  {
    "firstName": "Clementine",
    "lastName": "Dubois",
    "email": "cdubois64@mail.com",
    "gender": "Female",
    "occupation": "Dressmaker",
    "characterTraits": [
      "Elegant",
      "Creative",
      "Perfectionist",
      "Resourceful"
    ]
  },
  {
    "firstName": "Silas",
    "lastName": "Vance",
    "email": "svance10@mail.com",
    "gender": "Male",
    "occupation": "Piano Player",
    "characterTraits": [
      "Melancholic",
      "Talented",
      "Nostalgic",
      "Witty",
      "Solitary"
    ]
  }
]

export const SCRIPT_MOCK_DATA  : GameRound[] = [
    {
        "type": "Script",
        "script": 
            {
            "containsError": true,
            "scriptContent": "def process_transaction(db_path, sender_id, receiver_id, amount):\n    conn = sqlite3.connect(db_path)\n    cursor = conn.cursor()\n    try:\n        # Validate amount\n        if amount <= 0:\n            return False\n\n        # Fetch sender balance\n        query = f\"SELECT balance FROM accounts WHERE id = '{sender_id}'\"\n        cursor.execute(query)\n        result = cursor.fetchone()\n        if not result or result[0] < amount:\n            return False\n\n        # Deduct from account\n        cursor.execute(\"UPDATE accounts SET balance = balance - ? WHERE id = ?\", (amount, receiver_id))\n        cursor.execute(\"UPDATE accounts SET balance = balance + ? WHERE id = ?\", (amount, receiver_id))\n\n        conn.commit()\n        return True\n    finally:\n        conn.close()\n    except sqlite3.Error as e:\n        print(f\"Database error: {e}\")\n        return False",
            "scriptLineLength": 26,
            "language": "Python",
            "context": "This script manages a balance transfer between two bank accounts stored in a SQLite database. It verifies that the transfer amount is positive, checks if the sender has sufficient funds, and then performs two database updates to subtract funds from the sender and add them to the receiver. It uses a try-finally-except structure to ensure the database connection is closed regardless of success.",
            "errors": [
                {
                "line": 10,
                "description": "The query is constructed using a Python f-string which directly embeds the 'sender_id' variable. This creates a critical security vulnerability known as SQL Injection, allowing a user to manipulate the SQL statement by providing malicious input as the sender_id.",
                "fix": "Use parameterized queries. Instead of building the string manually, use the '?' placeholder: query = 'SELECT balance FROM accounts WHERE id = ?' and then pass the variable as a tuple: cursor.execute(query, (sender_id,)).",
                "errorType": "security"
                },
                {
                "line": 17,
                "description": "This is a logical error where the code deducts the amount from the 'receiver_id' instead of the 'sender_id'. As a result, the person meant to receive money actually pays it, and the sender's balance remains unchanged.",
                "fix": "Change the second parameter in the execute call from 'receiver_id' to 'sender_id' to ensure the deduction happens on the correct account.",
                "errorType": "logic"
                },
                {
                "line": 24,
                "description": "In Python, the 'except' block must precede the 'finally' block. Placing an 'except' block after a 'finally' block for the same 'try' statement is syntactically invalid and will result in a SyntaxError.",
                "fix": "Move the 'except' block (lines 24-26) to appear immediately after the 'try' block and before the 'finally' block.",
                "errorType": "syntax"
                }
            ]
            },
        "malicious": true
    },
    {
        "type": "Script",
        "script": {
            "containsError": true,
            "scriptContent": "import sqlite3\nimport pickle\nimport base64\n\ndef get_user_data(db_connection, user_id, cache={}):\n    if user_id in cache:\n        return cache[user_id]\n\n    cursor = db_connection.cursor()\n    query = \"SELECT * FROM users WHERE id = '\" + user_id + \"'\"\n    cursor.execute(query)\n    user_record = cursor.fetchone()\n\n    if not user_record\n        return None\n\n    # Deserializing session metadata provided by the user client-side\n    session_blob = user_record[4]\n    try:\n        session_data = pickle.loads(base64.b64decode(session_blob))\n    except Exception:\n        session_data = {}\n\n    cache[user_id] = {\"info\": user_record, \"session\": session_data}\n    return cache[user_id]",
            "scriptLineLength": 25,
            "language": "Python",
            "context": "This function is designed to fetch user records from a database and cache them in memory to improve performance. It also handles the deserialization of a session blob stored in the database, which is originally provided by the client. The system expects the 'user_id' to be a string and the database to have a specific schema where index 4 of the user record contains base64 encoded session data.",
            "errors": [
            {
                "line": 5,
                "description": "The function uses a mutable default argument 'cache={}'. In Python, default arguments are evaluated only once at definition time, meaning this dictionary is shared across all calls to the function.",
                "fix": "Change the default argument to 'None' and initialize the dictionary inside the function body: 'if cache is None: cache = {}'.",
                "errorType": "logic"
            },
            {
                "line": 10,
                "description": "The code uses string concatenation to build a SQL query with user-provided input. This makes the application vulnerable to SQL Injection attacks.",
                "fix": "Use parameterized queries: 'cursor.execute(\"SELECT * FROM users WHERE id = ?\", (user_id,))'.",
                "errorType": "security"
            },
            {
                "line": 14,
                "description": "The 'if' statement is missing the required colon at the end of the line, which will lead to a syntax error.",
                "fix": "Add a colon at the end of the line: 'if not user_record:'.",
                "errorType": "syntax"
            },
            {
                "line": 20,
                "description": "The function uses 'pickle.loads' on data that originates from client-side input. This is a critical security vulnerability because an attacker can craft a malicious pickle payload to execute arbitrary code on the server.",
                "fix": "Use a safe serialization format like JSON (json.loads) instead of pickle for any data that could be influenced by a user.",
                "errorType": "security"
            }
            ]
        },
        "malicious": true
    },
    {
        "type": "Script",
        "script": {
            "containsError": true,
            "scriptContent": "def update_employee_records(records, updates, auth_token=\"DEVPASS123\"):\n    \"\"\"\n    Synchronizes employee salary data from an external source.\n    \"\"\"\n    if auth_token != \"DEVPASS123\":\n        return \"Unauthorized\"\n\n    for emp_id, salary in updates:\n        if emp_id not in records:\n            continue\n\n        # Check if the salary is actually different before updating\n        if records[emp_id]['salary'] is salary:\n            continue\n\n        records[emp_id]['salary'] = salary\n\n    return records",
            "scriptLineLength": 18,
            "errors": [
            {
                "line": 1,
                "description": "The function defines a sensitive authentication token ('DEVPASS123') as a hardcoded default parameter value in the function signature.",
                "fix": "Remove the hardcoded secret from the function signature. Instead, retrieve the authentication token from a secure environment variable or a configuration management system using 'os.getenv()' during the function's execution.",
                "errorType": "security"
            },
            {
                "line": 13,
                "description": "The script uses the 'is' operator to compare numeric values (salaries). In Python, 'is' checks for object identity (memory address) rather than value equality. While this may happen to work for small integers cached by CPython, it will fail for larger integers or floating-point numbers, causing the system to update records even when the values are identical.",
                "fix": "Replace the 'is' identity operator with the '==' equality operator to correctly compare the numeric values of the records.",
                "errorType": "logic"
            }
            ],
            "language": "python",
            "context": "This script is part of a high-frequency financial data synchronization service. It accepts a dictionary representing current employee records and a list of tuples containing employee IDs and their updated salary figures. The function is designed to only update records if the authentication token is valid and only if the salary has actually changed from its current state, aimed at minimizing unnecessary database write operations."
        },
        "malicious": true
    }
];