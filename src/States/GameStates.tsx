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
import { useDispatch } from "react-redux";
import { useAppSelector } from "./hooks.tsx";

import  { startGame }   from "./Reducers/startSlice.tsx";

import { startInvestigate, setInvesTarget } from './Reducers/investigateSlice.tsx';
import { Shoot, SetDamage, SetShootingTarget } from './Reducers/shootSlice.tsx';
import { Selection } from './Reducers/selectionSlice.tsx';
import { passEnemy, SetPassTarget } from './Reducers/passSlice.tsx';

import { finishGame } from './Reducers/endgameSlice.tsx';

const dispatch = useDispatch();

export const startState = useAppSelector((state) => state.start.gameStarted);
export const investigateState = useAppSelector((state) => state.investigate.started);
export const selectionState = useAppSelector((state) => state.select.inSelection);
export const endGameState = useAppSelector((state) => state.endGame.gameOver);

export const currentShootEnt = useAppSelector((state) => state.shoot.Entity);
export const currentPassEnt = useAppSelector((state) => state.pass.Entity);
export const currentInvestigateEnt = useAppSelector((state) => state.investigate.Entity);
export const currentEndGameEnt = useAppSelector((state) => state.endGame.Entity);



interface character // testing only - can put definition somewhere else
{
    name: string,
    health: number,
    type: string
};

export const StartGame = (change:boolean) => 
{
    dispatch(startGame(change));
    // call other functions to start other things as well
}

export const StartSelection = (change:boolean) =>
{
    dispatch(Selection(change));
}

export const StartInvestigate = (change:boolean) =>
{
    dispatch(startInvestigate(change));
}

export const EndGame = (change:boolean) =>
{
    dispatch(finishGame(change));
}

export const InvestigateTarget = (chara:character) =>
{
    dispatch(setInvesTarget(chara));
}

export const ShootCharacter = (chara:character) =>
{
    // If we pressed shoot (needs to go through conditions)
    dispatch(Shoot(chara));
}

export const setDamage = (num:number) =>
{
    // If we pressed shoot (needs to go through conditions)
    dispatch(SetDamage(num));
}

export const setShootingTarget = (chara:character) =>
{
    // If we pressed shoot (needs to go through conditions)
    dispatch(SetShootingTarget(chara));
}

export const PassCharacter = (chara:character) => 
{
    dispatch(passEnemy(chara));   
}

export const SetPassCharacter = (chara:character) => 
{
    dispatch(SetPassTarget(chara));   
}



