# from game_members import check_winner
from game_members import print_board

count = 0
player = -1
game_over = False

board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
]

print_board(board)

unused_spaced = 42

while not game_over:
    spot = -1

    while spot == -1:  # To make sure the column is not filled
        spot = int(input('Pick a column to drop a piece: '))

        if board[0][spot] != 0:
            print('This column is filled, pick a different one.')
            continue

    row = 5

    while board[row][spot] == 0 and row >= 0:
        row -= 1

    board[row][spot] = player

    player *= -1

    print_board(board)
