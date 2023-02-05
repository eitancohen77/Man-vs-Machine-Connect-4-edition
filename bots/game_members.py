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
    for x in range(len(board)):
        row = board[x]
        line = ''
        for item in row:
            line += str(item) + ' '
        print(line)
        print('---------------------------')


class Circle:
    hole = 0
    id = -1

    def __init__(self, id: int):
        self.id = id

    def __str__(self):
        return '|' + str(self.hole) + '|'

    def get_id(self):
        return self.id

    def get_hole(self):
        return self.hole