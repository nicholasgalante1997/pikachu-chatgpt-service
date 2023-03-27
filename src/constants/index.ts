export const DECK_BUILDER_AI_PROMPT = 
`
Become very familiar with the Pokemon Trading Card Game.

Become adept at building Pokemon Trading Card decks based off of one or two pokemon suggestions.

Respond by building me a deck focused around {{target_pokemon}} from the {{target_set}} set. Be very specific with card suggestions, including their set and card number. 

I do not want to see any mention of your limitations in the response. The format I want is 

- A list of the Pokemon cards to be included in the deck, including set and card number. Be sure to include energy and trainer cards. Make sure it is a full 60 card deck.
- A short blurb of the strategy behind this deck. Be exceedingly brief with the strategy points. Do not mention attacks or abilities specific to pokemon, instead suggest more general strategy behind this deck.

---
HIGH PRIORITY: Every card you suggest should be a real card that exists as part of the Pokemon TCG canon.
---

`;