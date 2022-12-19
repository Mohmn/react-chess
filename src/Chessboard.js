import React, { useState, useRef } from "react";
import Player from "./objects/Player";
import { makeChessBoard } from "./objects/ChessBoard";

const p1 = new Player("sm");
const p2 = new Player("cp");

const Chessboard = () => {
  const [chessboard, setChessboard] = useState(() => makeChessBoard([p2, p1]));
  // you can start adding moving feature
  const [selectedSquareLoc, setSelectedSquareLoc] = useState(null);
  const currentPlayer = useRef(p1);

  function switchPlayers () {
    const player = currentPlayer.current;
    player.updateTurn();
    currentPlayer.current = player.type === p1.type ? p2 : p1;
  }

  // function validate({ i, j, selectedPiece, selectedRow, selectedColumn }) {
  // 	switch (selectedPiece) {
  // 		case "P":
  // 			if (selectedRow === i - 1 && selectedColumn === j) {
  // 				setChessboard((previousChessboard) => {
  // 					const newChessboard = [...previousChessboard];
  // 					newChessboard[i][j] = selectedPiece;
  // 					newChessboard[selectedRow][selectedColumn] = null;
  // 					return newChessboard;
  // 				});
  // 				setSelectedSquare(null);
  // 			}
  // 			break;

  // 		case "p":
  // 			if (selectedRow === i + 1 && selectedColumn === j) {
  // 				setChessboard((previousChessboard) => {
  // 					const newChessboard = [...previousChessboard];
  // 					newChessboard[i][j] = selectedPiece;
  // 					newChessboard[selectedRow][selectedColumn] = null;
  // 					return newChessboard;
  // 				});
  // 				setSelectedSquare(null);
  // 			}
  // 		case "r":
  // 		case "R":
  // 			break;
  // 		default:
  // 			break;
  // 	}
  // }

  function updateChessBoard (nextLoc) {
    const [nextRowPos, nextColPos] = nextLoc;
    setChessboard((previousChessboard) => {
      const rowLoc = selectedSquareLoc.i;
      const colLoc = selectedSquareLoc.j;
      const selectedPiece = previousChessboard[rowLoc][colLoc];
      const newChessboard = [...previousChessboard];
      selectedPiece.setPos(nextRowPos, nextColPos);
      newChessboard[nextRowPos][nextColPos] = selectedPiece;
      newChessboard[rowLoc][colLoc] = null;
      return newChessboard;
    });
  }

  function highLightPieceMoves (piece) {
    console.log("moves", piece.availableMoves());
  }

  function userCLickedOnItsOwnPiece (piece) {
    // later on some css update will be made here too
    // like u arent allowed to click on this piece
    if (piece.belongsTo !== currentPlayer.current) { console.warn("u aint supposed to click on this piece for the first turn"); }

    return piece.belongsTo === currentPlayer.current;
  }
  function handleBoxCLick (i, j) {
    const piece = chessboard[i][j];
    const player = currentPlayer.current;
    console.log("click", piece, player.firstTurn(), player.secondTurn());

    if (player.firstTurn()) {
      if (piece) {
        if (!userCLickedOnItsOwnPiece(piece)) return;
        setSelectedSquareLoc({ i, j });
        highLightPieceMoves(piece);
        player.updateTurn();
      }
      return;
    }

    if (player.secondTurn()) {
      // more checks have to be placed here if user
      // clicks on non empty piece
      // for now only update the non null pieces
      console.log("ann");
      if (!piece) {
        updateChessBoard([i, j]);
      }

      switchPlayers();
    }
  }

  // Render the chessboard using the state stored in the useState hook
  return (
		<table>
			<tbody>
				{chessboard.map((row, i) => {
				  return (
						<tr key={i}>
							{row.map((cell, j) => (
								<td key={j} onClick={() => handleBoxCLick(i, j)}>
									{cell && cell.render()}
								</td>
							))}
						</tr>
				  );
				})}
			</tbody>
		</table>
  );
};

export default Chessboard;
