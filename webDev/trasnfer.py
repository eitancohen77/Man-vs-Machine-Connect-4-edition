import sys
import json
import random
#import tensorflow as stf
#import numpy as np


def random_move(board_array):
    row = 5
    while (True):
        rand = random.randint(0, 6)
        chip_value = board_array[row][rand]
        while (chip_value != 0 and row > 0):
            row -= 1
            chip_value = board_array[row][rand]
        if (board_array[row][rand] != 0 and row == 0):
            row = 5
        else:
            move = {
                'row': row,
                'col': rand
            }
            return move
            

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
changed_data = move

# Convert the manipulated data to JSON format
json_output = json.dumps(changed_data)

# Return the JSON output to stdout
sys.stdout.write(json_output)
