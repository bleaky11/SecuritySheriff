
export type ErrorType = "syntax" | "logic" | "security";

export type Gender = "Male" | "Female";

export type Difficulty = "easy" | "medium" | "hard" | "very hard" | "extreme";

export type Language = "SQL" | "C++" | "C" | "Python" | "Java" | "Typescript";

export enum GameType {
    "SCRIPT",
    "EMAIL",
    "MIXED"
}

export interface GameSettings {
    gameType : GameType,
    difficulty : Difficulty,
    language? : Language
}

export interface ScriptError {
    line : number,
    description : string,
    fix : string,
    errorType : ErrorType
}

export interface Script {
    containsError : boolean,
    scriptContent : string,
    scriptLineLength : number,
    errors : ScriptError[],
    language: string,
    context : string
}

export interface EmailSegment {
    content : string,
    indicator : boolean,
}

export interface Email {
    malicious : boolean,
    subject : string,
    segments: EmailSegment[],
    sender : string, 
    reciever : string
}

export interface CharacterProfile {
    firstName : string,
    lastName : string,
    email : string,
    gender : Gender,
    occupation : string,
    scriptTendencies : ScriptTendencies, // a set of tendencies this person makes when writing scripts. Used as a hint for scripts 
    introduction : string; // a basic line of dialouge introducting the character
    characterTraits : string[]
}

export interface ScriptTendencies {
    experience : string,
    codingStyle : string,
    domainFocus : string,
    languageHabits : string,
    personalQuirks : string,
    errorTendencies : string,
    architectureTendencies : string,
    debuggingHabits : string
}

// this is the set of traits that will be assigned to characters, we will use these when generating scripts
const characterTraits = {
  experience: [
    "junior_developer",
    "senior_developer",
    "self_taught_hacker"
  ],

  codingStyle: [
    "overengineer",
    "minimalist",
    "copy_paste_programmer",
    "comment_lover",
    "comment_avoider"
  ],

  domainFocus: [
    "security_focused",
    "performance_nerd",
    "data_oriented"
  ],

  languageHabits: [
    "functional_programmer",
    "object_oriented_programmer",
    "procedural_programmer"
  ],

  personalQuirks: [
    "always_uses_todos",
    "logs_everything",
    "loves_magic_numbers",
    "avoids_magic_numbers",
    "snake_case_naming",
    "camelCase_naming"
  ],

  errorTendencies: [
    "off_by_one_errors",
    "missing_null_checks",
    "boolean_logic_mistakes",
    "async_mistakes",
    "state_management_bugs"
  ],

  architectureTendencies: [
    "monolith_builder",
    "micro_function_writer",
    "global_variable_user"
  ],

  debuggingHabits: [
    "print_debugger",
    "assertion_user"
  ],
}

function randomFrom(array : string[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateTendencies() {
  return {
    experience : randomFrom(characterTraits.experience),
    codingStyle : randomFrom(characterTraits.codingStyle),
    domainFocus : randomFrom(characterTraits.domainFocus),
    languageHabits : randomFrom(characterTraits.languageHabits),
    personalQuirks : randomFrom(characterTraits.personalQuirks),
    errorTendencies : randomFrom(characterTraits.errorTendencies),
    architectureTendencies : randomFrom(characterTraits.architectureTendencies),
    debuggingHabits : randomFrom(characterTraits.debuggingHabits)
  };
}
