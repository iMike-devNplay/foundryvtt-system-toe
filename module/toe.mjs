/**
 * System for Tails of Equestria
 * Author: iMike
 */

// Import Modules


import { ToeActor } from "./documents/actor.mjs";
import { ToeItem } from "./documents/item.mjs";

import { ToeActorSheet } from "./sheets/actor-sheet.mjs";
import { ToeItemSheet } from "./sheets/item-sheet.mjs";

import { preloadHandlebarsTemplates } from "./helpers/templates.mjs";
import { TOE } from "./helpers/config.mjs"

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

/**
 * Init hook.
 */
Hooks.once("init", async function() {
  console.log(`Initializing Toe System`);

  game.toe = {
    ToeActor,
    ToeItem
  };

  CONFIG.TOE = TOE;

  /**
   * Set an initiative formula for the system. This will be updated later.
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d20",
    decimals: 2
  };

  // Define custom Entity classes
  CONFIG.Actor.documentClass = ToeActor;
  CONFIG.Item.documentClass = ToeItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("toe", ToeActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("toe", ToeItemSheet, { makeDefault: true });

  // Preload template partials
  await preloadHandlebarsTemplates();
});

Hooks.once("ready", function() {
  // include steps that need to happen after Foundry has fully loaded here.
});

Handlebars.registerHelper('isdefined', function (value) {
  console.log(value);
  return (value !== undefined && value !== "");
});
