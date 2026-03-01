// States needed: 
/*
    - Start
    - Investigation
    - Shoot (2 stages) ->
        - Selection
        - Result
    - Pass
    - Game Over (2 stages) ->
        - Win (Show win screen -> play again, main menu (reset game))
        - Lose (Show lose screen -> try again, main menu (reset game))
*/

import { useAppSelector } from "./hooks.tsx";
import { useDispatch } from "react-redux";

import  { startGame }   from "./Reducers/startSlice.tsx";

import { startInvestigate, setInvesTarget } from './Reducers/investigateSlice.tsx';
import { Shoot, SetDamage, SetShootingTarget } from './Reducers/shootSlice.tsx';
import { Selection } from './Reducers/selectionSlice.tsx';
import { passEnemy, SetPassTarget } from './Reducers/passSlice.tsx';

import { finishGame } from './Reducers/endgameSlice.tsx';

export function useGameStateMachine() {
    const dispatch = useDispatch();

    // 🔹 Select reactive state
    const startState = useAppSelector((state) => state.start.gameStarted);
    const investigateState = useAppSelector((state) => state.investigate.started);
    const selectionState = useAppSelector((state) => state.select.inSelection);
    const endGameState = useAppSelector((state) => state.endGame.gameOver);

    // 🔹 Action wrappers
    const StartGame = (change: boolean) => {
        dispatch(startGame(change));
    };

    const StartSelection = (change: boolean) => {
        dispatch(Selection(change));
    };

    const StartInvestigate = (change: boolean) => {
        dispatch(startInvestigate(change));
    };

    const EndGame = (change: boolean) => {
        dispatch(finishGame(change));
    };

    const InvestigateTarget = (chara: any) => {
        dispatch(setInvesTarget(chara));
    };

    const ShootCharacter = (chara: any) => {
        dispatch(Shoot(chara));
    };

    const setDamage = (num: any) => {
        dispatch(SetDamage(num));
    };

    const setShootTarget = (entity: any) => {
        dispatch(SetShootingTarget(entity));
    };

    const PassEnemy = (entity: any) => {
        dispatch(passEnemy(entity));
    };

    const setPassTarget = (entity: any) => {
        dispatch(SetPassTarget(entity));
    };

    return {
        startState,
        investigateState,
        selectionState,
        endGameState,
        StartGame,
        StartSelection,
        StartInvestigate,
        EndGame,
        InvestigateTarget,
        ShootCharacter,
        setDamage,
        setShootTarget,
        PassEnemy,
        setPassTarget
    };
}



