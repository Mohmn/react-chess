/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useRef } from 'react';
import Player from './objects/Player';
import { makeChessBoard } from './objects/ChessBoard';
import { IChessPiece, IPiecePos, IArraySetType, IBoard, IChessPlayer, IChessBoard } from './objects/types';
import { ChessBoard } from './objects/ChessBoard';
import { arePosEqual } from './objects/Pieces/util';

const p1 = new Player('sm');
const p2 = new Player('cp');

// function checkCheck

function Chessboard() {
  
  const [chessboard, setChessboard] = useState<IBoard>(() => makeChessBoard([p2, p1]));
  const [locationsToHighLight,setLocationsToHighLight] = useState<IArraySetType | null>(null);
  const [selectedSquareLoc, setSelectedSquareLoc] = useState<IPiecePos | null>(null);
  const currentPlayer = useRef(p1);
  const chessBoardRef = useRef(new ChessBoard([p2, p1]));
  const [isInCheck, setIsInCheck] = useState<IPiecePos | null>(null);

  // const checkmate
  // const stalemate

  function switchPlayers () {
    const player = currentPlayer.current;
    player.updateTurn();
    currentPlayer.current = player.type === p1.type ? p2 : p1;
  }

  function updateChessBoard(nextLoc: IPiecePos, previousChessboard: IBoard) {

    const [nextRowPos, nextColPos] = nextLoc;
    const [rowLoc, colLoc] = selectedSquareLoc!;
    const selectedPiece = previousChessboard[rowLoc][colLoc];
    const newChessboard = [...previousChessboard];
    selectedPiece!.setPos(nextRowPos, nextColPos);
    newChessboard[nextRowPos][nextColPos] = selectedPiece;
    newChessboard[rowLoc][colLoc] = null;
    // console.log('up uhu ', rowLoc, colLoc, newChessboard[nextRowPos][nextColPos], ...nextLoc);
    chessBoardRef.current.board = newChessboard;
    return newChessboard;
  }

  function highLightPieceMoves(piece: IChessPiece) {
    if(locationsToHighLight) return;
    const locations = piece.availableMoves(chessBoardRef.current);
    setLocationsToHighLight(locations);
  }

  function unhighLightPieceMoves() {
    if(!locationsToHighLight) return;
    setLocationsToHighLight(null);
  }

  function userCLickedOnItsOwnPiece(piece:IChessPiece) {
    return piece.belongsTo === currentPlayer.current;
  }

  function handleFirstTurn(piece: IChessPiece | null, player: IChessPlayer, pos: IPiecePos) {
    if (!piece) return; 
    if (!userCLickedOnItsOwnPiece(piece)) return;
    setSelectedSquareLoc(pos);
    highLightPieceMoves(piece);
    player.updateTurn();

  }

  function checkforCheckAndCheckMate(player: IChessPlayer) {
    const oppInCheck = chessBoardRef.current.isInCheck(player);
    console.log('checkmate', chessBoardRef.current.checkMate(player));
    oppInCheck && setIsInCheck(oppInCheck);
  }

  function handleSecondTurn(piece: IChessPiece | null, player: IChessPlayer, pos: IPiecePos) {

    const legalMove = locationsToHighLight?.has(pos);
    if (legalMove) {
      setChessboard((previousChessBoard) => {
        const newBoard = updateChessBoard(pos, previousChessBoard);
        unhighLightPieceMoves();
        switchPlayers();
        const checkToCheckFor = player === p1 ? p2 : p1;
        // checkforCheckAndCheckMate(checkToCheckFor);
        const oppInCheck = chessBoardRef.current.isInCheck(checkToCheckFor);
        console.log('checkmate', chessBoardRef.current.checkMate(checkToCheckFor));
        oppInCheck && setIsInCheck(oppInCheck);
        return newBoard;
      });
    } else {
      unhighLightPieceMoves();
      player.updateTurn();
    }
  }

  function handleBoxCLick(i: number, j: number) {
    
    const piece = chessboard[i][j];
    const player = currentPlayer.current;
    console.log('click', piece, player.firstTurn(), player.secondTurn());

    if (player.firstTurn()) {
      handleFirstTurn(piece,player,[i,j]);
      return;
    }

    if (player.secondTurn()) {
      handleSecondTurn(piece,player,[i,j]);
    }

  }

  function determineClassname(i: number, j: number): string {
    if (locationsToHighLight?.has([i, j])) return 'highlight';
    const className = arePosEqual(isInCheck,[i,j]) ? 'check' : '';
    const piece = chessboard[i][j];
    if (!piece) return className + '';
    if (piece.belongsTo === p1) return className + ' coral';
    return className + ' blue';
  }

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
                  className={determineClassname(i,j)}>
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
