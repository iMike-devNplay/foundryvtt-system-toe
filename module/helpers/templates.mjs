/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
 export const preloadHandlebarsTemplates = async function() {
    // Define template paths to load
    const templatePaths = [
      "systems/tails-of-equestria/templates/actor/parts/actor-pony-stamina.html",
      "systems/tails-of-equestria/templates/actor/parts/actor-pony-id.html",
      "systems/tails-of-equestria/templates/actor/parts/actor-pony-attributes.html",
      "systems/tails-of-equestria/templates/actor/parts/actor-pony-portrait.html",
      "systems/tails-of-equestria/templates/actor/parts/actor-pony-talents.html",
      "systems/tails-of-equestria/templates/actor/parts/actor-pony-quirks.html",
      "systems/tails-of-equestria/templates/actor/parts/actor-pony-cutiemark.html",
      "systems/tails-of-equestria/templates/actor/parts/actor-items.html"
    ];
  
    // Load the template parts
    return loadTemplates(templatePaths);
  };