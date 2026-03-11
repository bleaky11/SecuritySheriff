
import { useEffect } from "react";
import { useGameStateMachine } from "./States/GameStates";


/*

    Game -> Round(s) (5 rounds max) v
        Win: Guess right in both email and/or script 5 times
        Lose: Health drops to 0


   ~ Game component: Will track and change the game state and set up elements before and after

    Round component: Create, effect, and change values during game (health, entity, etc.)

*/

// function Game()
// {
//     const [start, setStart] = useState(false);
//     const [roundStart, setRoundStart] = useState(false);
//     const [roundCount, setRoundCount] = useState(0);
//     const [investigate, setInvestigation] = useState(false);
//     const [verdict, setVerdict] = useState("");
//     const [end, setEnd] = useState(false);
//     const [target, setTarget] = useState({name: "", health: 1, type: ""});
// }

export function Round()
{
    /* 
        once game/round starts we want to generate a random entity 
            - Entity properties NEEDS to have: name, health, type
        set shooting and pass targets (default shooting will be the sheriff/player themselves)
        transition to investigation state

        States needed:
            - Start
            - investigate
            - Verdict
            - End

        const [start, setStart] = useState(false);
        const [roundStart, setRoundStart] = useState(false);
        const [roundCount, setRoundCount] = useState(0);
        const [investigate, setInvestigation] = useState(false);
        const [verdict, setVerdict] = useState("");
        const [end, setEnd] = useState(false);

        const [target, setTarget] = useState({name: "", health: 1, type: ""});

    */
    const game = useGameStateMachine();
    const sheriffEntity = { name: "Sheriff", health: 10, type: "Cowboy" } // default player entity
    let Enemy = { name: "Frankie", health: 2, type: "Alien"};
    let Damage = 2;

    useEffect(() => {
        if (game.startState)
        {
            game.StartRound(true)
            game.IncrementRound()
            game.setShootTarget(sheriffEntity)
            game.setPassTarget(sheriffEntity)
            game.InvestigateTarget(Enemy)
            game.StartInvestigate(true)
            game.setDamage(Damage)
        }
    }, [game.startState])

    useEffect(() => {
        game.IncrementRound()
        game.setShootTarget(sheriffEntity)
        game.InvestigateTarget(Enemy)
    }, [sheriffEntity.health, Enemy.health])

    useEffect(() => {
        if (game.endGameState)
        {
            game.StartRound(false)
            game.StartInvestigate(false)
            game.StartRound(false)
            game.setShootTarget(null)
            game.InvestigateTarget(null)
            game.setPassTarget(null)
            game.ResetRound()
        }

    }, [game.endGameState])



    return (
        <>
        {console.log(game.roundState)}
        {console.log(game.investigationTarget)}
        {console.log(game.shootingTarget)}
        {console.log(game.passingTarget)}
        </>
    )
}
