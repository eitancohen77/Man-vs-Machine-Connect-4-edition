import tensorflow as tf
import numpy as np

position_0 = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
]

position_1 = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [-1, -1, 0, 0, 0, 0, 0],
    [1, -1, 0, 1, 1, 1, 0],
    [1, 1, 1, -1, -1, -1, 1]
]

position_2 = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, -1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [-1, -1, 0, 1, 0, 0, 0],
    [1, -1, 1, -1, 1, 1, 0],
    [1, 1, 1, -1, -1, -1, 1]
]

boards = [
    position_0,
    position_1,
    position_2
]


model_path = 'C:/Users/Eitan/Documents/Projects/Man-vs-Machine-Connect-4-edition/webDev/Agent_models/V6-256x2___300.00max__106.80avg____0.00min__1683150763.model'
try:
    model = tf.keras.models.load_model(model_path, compile=False)
    print('Model loaded successfully.')
    for position in boards:
        action = bot.predict(np.array(position).reshape((1, 6, 7, 1)))
        print(f'Action taken was {action} on this board\n{position}')
except OSError as e:
    print('Error:', e)
