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
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { startgame } from "./Reducers/";

import { startInvestigate, setInvesTarget } from './Reducers/investigateSlice';
import { Shoot, SetDamage, SetShootingTarget } from './Reducers/shootSlice';
import { passEnemy, SetPassTarget } from './Reducers/passSlice';

import { finishGame } from './Reducers/passSlice';

const dispatch = useDispatch();

const [startState, setStartState] = useState(false);
const [investigateState, setInvesState] = useState("");

interface character // testing only - can put definition somewhere else
{
    name: string,
    health: number,
    type: string
};

const StartGame = () => 
{
    dispatch(startgame(startState));
    // call other functions to start other things as well
}

const InvestigateTarget = (chara:character) =>
{
    dispatch(setInvesTarget(chara));
}

const ShootCharacter = (chara:character) =>
{
    // If we pressed shoot (needs to go through conditions)
    dispatch(Shoot(chara));
}

const PassCharacter = (chara:character) => 
{
    dispatch(passEnemy(chara));    
}

function Verdict()
{
    // Once button is clicked function should:
    //  - Display 'Shoot' and 'Pass' buttons
    
}

function ShowHideRegistry()
{
    // Once button is clicked function should:
    //  - display the town registry output list
    //  - Be able to toggle view of list
}

function ShowHidePermit()
{
    // function should:
    //  - display current enemy profile
    //  - toggle view of profile
}



