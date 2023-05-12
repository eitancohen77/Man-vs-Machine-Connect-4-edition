import sys
import json
import random
# For some reason, importing tensorflow into the file slows down the process
#import tensorflow as tf
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
            




data = sys.argv[1]

# Contains 2D data
parsed_data = json.loads(data)['array']

#print(f'From agent move {parsed_data}')
#-------------AGERNT---------------
#np_array = np.array(parsed_data)
# Manipulate the data

#agent = tf.keras.models.load_model('C:\Users\Eitan\Documents\Projects\Man-vs-Machine-Connect-4-edition\webDev\Agent_models')
#move = agent.predict(np_array.reshape(1, 6, 7, 1)) 

#-------------RANXDOM---------------
move = random_move(parsed_data) 

changed_data = move

# Convert the manipulated data to JSON format
json_output = json.dumps(changed_data)

# Return the JSON output to stdout
sys.stdout.write(json_output)
