students = [
    {
        "first_name": "Adil",
        "last_name": "Efe",
        "index_number": 35480,
        "nationality": "Turkish",
        "starting_date": "2025-03-16",
        "courses": ["Object Oriented Programming", "Data Structures", "Algorithms"]
    },
    {
        "first_name": "Ozan ",
        "last_name": "Sahillioğulları",
        "index_number": 35441,
        "nationality": "Turkish",
        "starting_date": "2024-09-01",
        "courses": ["Machine Learning", "Artificial Intelligence", "Deep Learning"]
    },
    {
        "first_name": "Mert",
        "last_name": "Demir",
        "index_number": 35482,
        "nationality": "Turkish",
        "starting_date": "2023-06-15",
        "courses": ["Computer Networks", "Cybersecurity", "Cloud Computing"]
    }
]

# students created from chat gpt random
print("Student List:")
for student in students:
    print(f"{student['first_name']} {student['last_name']} - Index: {student['index_number']}")
