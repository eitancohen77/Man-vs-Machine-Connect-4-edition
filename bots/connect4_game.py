from game_members import Circle, print_board

count_id = 0
board = [[], [], [], [], [], []]

row = 0
for i in range(42):
    if len(board[row]) == 7:  # circle goes into the next row
        row += 1

    new_circle = Circle(i)
    board[row].append(new_circle)

player = -1  # switches from 1 to -1
game_over = False
count = 0  # Checks if all squares are filled

while not game_over and count < 42:
    col = -1

    while col == -1:
        col = int(input('Please choose a column to drop a piece in: '))

        if board[0][col].get_hole() != 0:
            col = -1
            print('That column is filled, pick another')

    row = 0

    while board[row][col] == 0 and row < 6:
        row += 1

    row -= 1

    board[row][col] = player
    print(row)
    player *= -1

    print_board(board)


