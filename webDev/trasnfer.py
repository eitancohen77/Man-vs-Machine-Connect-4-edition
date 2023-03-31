import sys
import json
import requests
import random

def random_move(board_array):
    while (True):
        rand = random.randint(0, 6)
        if (board_array[0][rand] == 0):
            return rand
    return None

""" # We do argv[1] because on the server side, we sent the data as: ['./trasnfer.py', JSON.stringify(board_data)] 
json_data = sys.argv[1]

array_data = json.loads(json_data)['array']

print("Received 2D array in Python script:")

move = random_move(array_data)
changed_data = {
    'move': move
}

json_data = json.dumps(changed_data)


headers = {'Content-Type': 'application/json'}
response = requests.post('http://localhost:3000/receiveManipulatedData', json=changed_data, headers = headers)
print(response.status_code) """


data = sys.argv[1]

parsed_data = json.loads(data)['array']

# Manipulate the data
move = random_move(parsed_data)
changed_data = {
    'move': move
}

# Convert the manipulated data to JSON format
json_output = json.dumps(changed_data)

# Return the JSON output to stdout
sys.stdout.write(json_output)
