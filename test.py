import tensorflow as tf
import numpy as np
from keras.models import Sequential
from keras.layers import Dense, Dropout, Conv2D, Flatten, InputLayer, MaxPooling2D
from keras.callbacks import TensorBoard
from keras.optimizers import Adam

from collections import deque
import random
import os
import time



class DQNAgent:
    def __init__(self, weights=None):
        self.model = self.create_model()  # main model

        self.target_model = self.create_model()  # target model
        self.target_model.set_weights(self.model.get_weights())

        self.replay_memory = deque(maxlen=REPLAY_MEMORY_SIZE)
        self.tensorboard = ModifiedTensorBoard(log_dir=f'logs/{MODEL_NAME}-{int(time.time())}')

        self.target_update_counter = 0

        if weights:
            self.model.set_weights(weights)
            self.target_model.set_weights(weights)

    def create_model(self):
        """Creates both the target model and the main model"""
        model = Sequential()
        model.add(InputLayer(input_shape=(6, 7, 1)))  # Dimension of the 2d list with 1 for greyscale

        model.add(Conv2D(32, (3, 3), activation='relu', padding='same'))
        # model.add(MaxPooling2D(2, 2))
        # model.add(Dropout(0.2))

        model.add(Conv2D(32, (3, 3), activation='relu', padding='same'))
        model.add(MaxPooling2D(2, 2))
        # model.add(Dropout(0.2))

        # model.add(Conv2D(16, (3, 3), activation='relu', padding='same'))
        # model.add(Dropout(0.2))

        model.add(Flatten())
        model.add(Dense(256, activation='relu'))
        model.add(Dropout(0.2))
        model.add(Dense(128, activation='relu'))
        model.add(Dropout(0.2))
        model.add(Dense(7, activation='softmax'))
        model.compile(loss='mse', optimizer=Adam(learning_rate=0.001), metrics=['accuracy'])
        return model

    def update_replay_memory(self, transition):
        """Updates replay memory"""
        self.replay_memory.append(transition)

    def get_qs(self, state):
        # print(BOARD)
        # print(self.model.predict(np.array(state).reshape(-1, *state.shape) / 255)[0])
        return self.model.predict(np.array(state).reshape(-1, *state.shape) / 255)[0]

    def train(self, terminal_state):
        if len(self.replay_memory) < MIN_REPLAY_MEMORY_SIZE:  # Do not train if small sample size
            return
        minibatch = random.sample(self.replay_memory, MINIBATCH_SIZE)
        current_states = np.array([transition[0] for transition in minibatch]) / 255
        current_qs_list = self.model.predict(current_states)

        new_current_states = np.array([transition[3] for transition in minibatch]) / 255
        future_qs_list = self.target_model.predict(new_current_states)

        X, y = list(), list()

        for index, (current_state, action, reward, new_current_state, done) in enumerate(minibatch):
            if not done:  # episode incomplete
                max_future_q = np.max(future_qs_list[index])
                new_q = reward + DISCOUNT * max_future_q
            else:
                new_q = reward

            # if type(action) == np.ndarray:
            #     action = np.argmax(action)
            try:
                current_qs = current_qs_list[index]
                current_qs[action] = new_q
            except IndexError:
                print(f'Current State: {current_state}\nAction: {action}\nReward: {reward}\n'
                      f'N. Current State: {new_current_state}\nDone: {done}')
                continue

            X.append(current_state)
            y.append(current_qs)
        try:
            self.model.fit(np.array(X) / 255, np.array(y), batch_size=MINIBATCH_SIZE, verbose=0, shuffle=False,
                           callbacks=[self.tensorboard] if terminal_state else None)
        except tf.errors.ResourceExhaustedError as e:
            print(f'Error is {e}')
            print(f'Relevant info:\n'
                  f'X - {X}\n'
                  f'y - {y}')

        # Updating to determine if it is time to update target model
        if terminal_state:
            self.target_update_counter += 1

        if self.target_update_counter > UPDATE_TARGET_EVERY:
            self.target_model.set_weights(self.model.get_weights())
            self.target_update_counter = 0

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


model_path = r'webDev\Agent_models\V11-256x2__73298.00max_58720.84avg_-12004.00min__1683688713.model'

model = tf.keras.models.load_model(model_path)
for position in boards:
    action = bot.predict(np.array(position).reshape((1, 6, 7, 1)))
    print(f'Action taken was {action} on this board\n{position}')

