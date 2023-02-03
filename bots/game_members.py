# def check_winner(player: str, board: list, x: int, y: int) -> bool:  # Test if someone has one
#     return horizontal_dfs(player, board, x, y) or vertical_dfs(player, board, x, y) \
#            or criss_dfs(player, board, x, y) or cross_dfs(player, board, x, y)
#
#
# def horizontal_dfs(player: str, board: list, x: int, y: int) -> bool:  # Checks if the new piece wins horizontally
#
#
#
# def vertical_dfs(player: str, board: list, x: int, y: int) -> bool:  # Checks if the new piece wins vertically
#     down = 0
#
#
# def criss_dfs(player: str, board: list, x: int, y: int) -> bool:  # Checks if the new piece wins diagonally(\)
#     pass
#
#
# def cross_dfs(player: str, board: list, x: int, y: int) -> bool:  # Checks if the new piece wins diagonally(/)
#     pass


def print_board(board: list) -> None:
    convert_str(board)

    for x in range(len(board)):
        print('--------------------------')
        row = ' | '.join(board[x])
        print(row)


def convert_str(board) -> None:
    for x in range(len(board)):
        for y in range(len(board[x])):
            board[x][y] = str(board[x][y])
