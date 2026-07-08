export const gameSnippet = `
class TicTacToe:
    # -1 is circle (O), 0 is empty, +1 is cross (X)

    def __init__(self) -> None:
        self.board = [[0 for _ in range(3)] for _ in range(3)]

    def set_position(self, pos: Tuple[int, int], val: Literal[-1, 1]):
        self.board[pos[0]][pos[1]] = val

    def get_board_state(self) -> List[List[Literal[-1, 0, 1]]]:
        return self.board

    def get_empty_cells(self) -> List[Tuple[int, int]]:
        items = []
        for i in range(0, 3):
            for j in range(0, 3):
                if self.board[i][j] == 0:
                    items.append((i, j))
        return items

    def is_over(self) -> Tuple[bool, int]:
        lines = [
            self.board[0], self.board[1], self.board[2],
            [self.board[i][0] for i in range(3)],
            [self.board[i][1] for i in range(3)],
            [self.board[i][2] for i in range(3)],
            [self.board[i][i] for i in range(3)],
            [self.board[i][2 - i] for i in range(3)],
        ]
        for line in lines:
            if self._all_equal(line):
                return True, line[0]

        if not self.get_empty_cells():
            return True, 0

        return False, 0
`;

export const playerSnippet = `
class Player(abc.ABC):

    def __init__(self, symbol: Literal[-1, 1]) -> None:
        self.symbol = symbol

    @abc.abstractmethod
    def move(self, game: TicTacToe):
        pass

    def on_result(self, game: TicTacToe, winner: int):
        pass
`;

export const agentInitSnippet = `
class Agent(Player):

    def __init__(self, symbol: Literal[-1, 1], eps: float, alpha: float) -> None:
        super().__init__(symbol)
        self.state_values = [0.0 for _ in range(3**9)]
        self.states_encountered = []
        self.eps = eps
        self.alpha = alpha
        self.is_learning = True
`;

export const boardIndexSnippet = `
    def _board_to_index(self, board: List[List[Literal[-1, 0, 1]]]) -> int:
        index = 0
        for row in board:
            for cell in row:
                index = index * 3 + (cell + 1)
        return index
`;

export const agentMoveSnippet = `
    def move(self, game: TicTacToe):
        empty_positions = game.get_empty_cells()

        if self.is_learning:
            sample = random.choices([0, 1], weights=[self.eps, 1 - self.eps], k=1)[0]
            if sample == 0:
                selected_position = empty_positions[random.randint(0, len(empty_positions) - 1)]
                game.set_position(selected_position, self.symbol)
                self.states_encountered.append(copy.deepcopy(game.get_board_state()))
                return

        values = []
        for pos in empty_positions:
            clone = game.clone()
            clone.set_position(pos, self.symbol)
            board = clone.get_board_state()
            board_index = self._board_to_index(board)
            value = self.state_values[board_index]
            values.append(value)

        best_index = max(enumerate(values), key=lambda x: x[1])[0]
        game.set_position(empty_positions[best_index], self.symbol)

        if self.is_learning:
            self.states_encountered.append(copy.deepcopy(game.get_board_state()))
`;

export const agentUpdateSnippet = `
    def on_result(self, game: TicTacToe, winner: int):
        if not self.is_learning:
            return

        reward = 0 if winner == 0 else (winner * self.symbol)
        for state in self.states_encountered:
            board_index = self._board_to_index(state)
            self.state_values[board_index] += self.alpha * (reward - self.state_values[board_index])

        self.states_encountered = []
`;

export const firstEmptyOpponentSnippet = `
class FirstEmptyPositionOpponent(Player):

    def move(self, game: TicTacToe):
        empty_positions = game.get_empty_cells()
        chosen_position = empty_positions[0]
        game.set_position(chosen_position, self.symbol)
`;

export const randomOpponentSnippet = `
class RandomOpponent(Player):

    def move(self, game: TicTacToe):
        empty_positions = game.get_empty_cells()
        chosen_position = empty_positions[randint(0, len(empty_positions) - 1)]
        game.set_position(chosen_position, self.symbol)
`;

export const optimalOpponentSnippet = `
class OptimalOpponent(Player):

    def move(self, game: TicTacToe):
        empty_positions = game.get_empty_cells()
        best_score = float("-inf")
        best_moves = []

        for pos in empty_positions:
            clone = game.clone()
            clone.set_position(pos, self.symbol)
            score = self._minimax(clone, is_maximizing=False)
            if score > best_score:
                best_score = score
                best_moves = [pos]
            elif score == best_score:
                best_moves.append(pos)

        game.set_position(choice(best_moves), self.symbol)
`;

export const trainerSnippet = `
class Trainer:

    def __call__(self) -> List[Literal[-1, 0, 1]]:
        for _ in range(self.num_games):
            game = TicTacToe()

            while True:
                self.player1.move(game)
                is_over, winner = game.is_over()
                if is_over:
                    self.player1.on_result(game, winner)
                    self.player2.on_result(game, winner)
                    break

                self.player2.move(game)
                is_over, winner = game.is_over()
                if is_over:
                    self.player1.on_result(game, winner)
                    self.player2.on_result(game, winner)
                    break
`;

export const runnerSnippet = `
class Runner:

    def __call__(self) -> Tuple[Tuple[int, int, int], Tuple[int, int, int]]:
        agent = Agent(1, 0.1, 0.1)
        trainer = Trainer(self.reference_player, agent, self.num_train_games)
        trainer()

        agent.set_learning_mode(False)

        reference_eval_results = Eval(self.reference_player, agent, self.num_eval_games)()
        eval_results = Eval(self.eval_player, agent, self.num_eval_games)()

        return reference_eval_results, eval_results
`;
