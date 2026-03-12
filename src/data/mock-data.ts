import type { GameRound } from "../SecuritySheriff";
import { generateTendencies, type CharacterProfile, type Script } from "./models";

export const TOWNS_FOLK_MOCK_DATA : CharacterProfile[] = [
  {
    "firstName": "Silas",
    "lastName": "Thorne",
    "email": "silas.thorne88@frontier.com",
    "gender": "Male",
    "occupation": "Undertaker",
    "introduction": "Welcome to my shop, traveler. I suggest you stay out of trouble, unless you want to be my next measurement for a pine box.",
    "characterTraits": [
      "Somber",
      "Meticulous",
      "Punctual",
      "Observant"
    ],
    "scriptTendencies" : generateTendencies()
  },
  {
    "firstName": "Abilene",
    "lastName": "Miller",
    "email": "abby.miller45@dustymail.com",
    "gender": "Female",
    "occupation": "Saloon Owner",
    "introduction": "Thirsty? Grab a stool at the Birdcage, but keep your hands where I can see 'em if you're looking for more than a drink.",
    "characterTraits": [
      "Resilient",
      "Shrewd",
      "Charismatic",
      "Protective"
    ],
    "scriptTendencies" : generateTendencies()
  },
  {
    "firstName": "Wei",
    "lastName": "Zhang",
    "email": "wei.zhang19@ironroad.com",
    "gender": "Male",
    "occupation": "Railroad Engineer",
    "introduction": "The iron horse doesn't wait for any man, and neither do I. We have five miles of track to lay before the sun sets.",
    "characterTraits": [
      "Hardworking",
      "Disciplined",
      "Stoic",
      "Visionary"
    ],
    "scriptTendencies" : generateTendencies()
  },
  {
    "firstName": "Clementine",
    "lastName": "Dubois",
    "email": "clem.dubois72@prairieschool.org",
    "gender": "Female",
    "occupation": "Schoolmarm",
    "introduction": "Education is the only thing that will keep this territory from tearing itself apart. Mind your manners and your grammar in my classroom.",
    "characterTraits": [
      "Idealistic",
      "Stern",
      "Intellectual",
      "Compassionate"
    ],
    "scriptTendencies" : generateTendencies()
  },
  {
    "firstName": "Mateo",
    "lastName": "Salazar",
    "email": "mateo.salazar03@anvilwest.com",
    "gender": "Male",
    "occupation": "Blacksmith",
    "introduction": "If it is made of iron and broken, I am the man to fix it. Just don't expect a discount for your fancy silver spurs.",
    "characterTraits": [
      "Strong",
      "Gruff",
      "Honest",
      "Reliable"
    ],
    "scriptTendencies" : generateTendencies()
  }
]


export const SCRIPT_MOCK_DATA : Script[] = [
  {
  "containsError": true,
  "scriptContent": "def calculateSaloonLedger(inventoryData, patronRecords, taxRate):\n    print(\"DEBUG: Starting ledger calculation...\")\n\n    tax_adjusted_total = 0.0\n\n    # Abilene usually writes procedural loops but uses functional here\n    processedInventory = list(map(lambda x: x[\"price\"] * 0.9, filter(lambda x: x is not None, inventoryData)))\n\n    for item in inventoryData:\n        # She usually forgets null checks but includes one here\n        if item is None or \"id\" not in item:\n            continue\n\n        print(f\"DEBUG: Checking patron history for {item['id']}\")\n\n        # Performance nerd would use a map, but she uses a nested loop here\n        for patron in patronRecords:\n            if patron.get(\"favorite_drink_id\") == item[\"id\"]:\n                item[\"loyalty_weight\"] = patron[\"points\"] / 100\n\n    print(\"DEBUG: Finalizing totals\")\n    return sum(processedInventory)",
  "scriptLineLength": 22,
  "errors": [
    {
      "line": 4,
      "description": "The variable 'tax_adjusted_total' uses snake_case naming. This contradicts Abilene's personal quirk of using camelCase_naming for all her variables.",
      "fix": "Rename the variable to 'taxAdjustedTotal' to align with her camelCase_naming quirk.",
      "errorType": "logic"
    },
    {
      "line": 7,
      "description": "The implementation uses functional programming patterns (map and lambda). This contradicts Abilene's languageHabits as a procedural_programmer, who would typically write out explicit loop logic.",
      "fix": "Replace the functional map/filter block with a procedural for-loop that appends calculated values to a list.",
      "errorType": "logic"
    },
    {
      "line": 11,
      "description": "The presence of a defensive null check and safety 'in' check contradicts Abilene's established errorTendencies of 'missing_null_checks'.",
      "fix": "Remove the safety check to reflect her self-taught, resilient but sometimes careless coding style regarding object existence.",
      "errorType": "logic"
    },
    {
      "line": 17,
      "description": "This line initiates a nested O(n*m) loop to look up patron data. This contradicts Abilene's domainFocus as a 'performance_nerd'. A performance-focused hacker would have pre-indexed patronRecords into a dictionary for O(1) lookups.",
      "fix": "Convert the patronRecords list into a dictionary keyed by 'favorite_drink_id' before the main loop to optimize the search complexity.",
      "errorType": "logic"
    }
  ],
  "language": "python",
  "context": "Abilene Miller is managing her saloon's books using a script she wrote herself. The function is designed to adjust inventory values for taxes and link patron loyalty points to specific stock items. While the script is monolithic and uses print debugging (fitting her character), certain structural choices and naming conventions in this specific version deviate from her established profile as a performance-obsessed, procedural, camelCase-using hacker."
}
]