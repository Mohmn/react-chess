/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useRef } from 'react';
import Player from './objects/Player';
import { makeChessBoard } from './objects/ChessBoard';
import { ChessPiece, PiecePos, ArraySetType } from './objects/types';

const p1 = new Player('sm');
const p2 = new Player('cp');

// function checkCheck

function Chessboard() {
  
  const [chessboard, setChessboard] = useState(() => makeChessBoard([p2, p1]));
  const [locationsToHighLight,setLocationsToHighLight] = useState<ArraySetType | null>(null);
  const [selectedSquareLoc, setSelectedSquareLoc] = useState<PiecePos | null>(null);
  const currentPlayer = useRef(p1);

  function switchPlayers () {
    const player = currentPlayer.current;
    player.updateTurn();
    currentPlayer.current = player.type === p1.type ? p2 : p1;
  }

  function updateChessBoard(nextLoc: PiecePos) {

    const [nextRowPos, nextColPos] = nextLoc;
    setChessboard((previousChessboard) => {
      const rowLoc = selectedSquareLoc![0];
      const colLoc = selectedSquareLoc![1];
      const selectedPiece = previousChessboard[rowLoc][colLoc];
      const newChessboard = [...previousChessboard];
			selectedPiece!.setPos(nextRowPos,nextColPos);
			newChessboard[nextRowPos][nextColPos] = selectedPiece;
			newChessboard[rowLoc][colLoc] = null;
			return newChessboard;
    });
  }

  function highLightPieceMoves(piece: ChessPiece) {
    if(locationsToHighLight) return;
    const locations = piece.availableMoves(chessboard);
    setLocationsToHighLight(locations);
  }

  function unhighLightPieceMoves() {
    if(!locationsToHighLight) return;
    setLocationsToHighLight(null);
  }

  function userCLickedOnItsOwnPiece(piece:ChessPiece) {
    return piece.belongsTo === currentPlayer.current;
  }

  function handleBoxCLick(i: number, j: number) {
    const piece = chessboard[i][j];
    const player = currentPlayer.current;
    console.log('click', piece, player.firstTurn(), player.secondTurn());

    if (player.firstTurn()) {

      if (piece) {
        if (!userCLickedOnItsOwnPiece(piece)) return;
        setSelectedSquareLoc([i, j ]);
        highLightPieceMoves(piece);
        player.updateTurn();
      }
      return;
    }

    if (player.secondTurn()) {
      // more checks have to be placed here if user
      // clicks on non empty piece
      // for now only update the non null pieces
      console.log('ann');
      if (!piece) {
        updateChessBoard([i, j]);
      }

      unhighLightPieceMoves();
      switchPlayers();

      return;
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
                <td
                  key={j}
                  onClick={() => handleBoxCLick(i, j)}
                  className={
                    locationsToHighLight?.has([i,j]) ? 'highlight' : ''
                  }>
                  {cell && cell.render()}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Chessboard;
