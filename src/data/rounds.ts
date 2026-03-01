export type CharacterType = "Cowboy" | "Alien" | "Fish Bandit";


export interface Character {
    name: string,
    health: number,
    type: CharacterType
}


export interface Dialogue {
    startedDialogue: boolean,
    endedDialogue: boolean
    // Only start and end are needed for state management
    // Add more if necessary 
}

export interface RoundData {
    enemyNum: number, // could split into current and max enemies
    // Difficulty: string, Either stays persistent per round or can be put elsewhere
    // Score: number, I dont know if wanted/needed
    
}

// Added in case because animation will affect both dialogue and state transition timing
// export interface Animation {
//         animStart: number,
//         animEnd: number
// }