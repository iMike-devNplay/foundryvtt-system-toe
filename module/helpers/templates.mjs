/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
 export const preloadHandlebarsTemplates = async function() {
    // Define template paths to load
    const templatePaths = [
      "systems/tails-of-equestria/templates/actor/parts/actor-poney-id.html",
      "systems/tails-of-equestria/templates/actor/parts/actor-poney-stamina.html",
      "systems/tails-of-equestria/templates/actor/parts/actor-poney-attributes.html",
      "systems/tails-of-equestria/templates/actor/parts/actor-poney-portrait.html",
      "systems/tails-of-equestria/templates/actor/parts/actor-poney-talents.html",
      "systems/tails-of-equestria/templates/actor/parts/actor-poney-quirks.html",
      "systems/tails-of-equestria/templates/actor/parts/actor-poney-cutiemark.html",
      "systems/tails-of-equestria/templates/actor/parts/actor-items.html"
    ];
  
    // Load the template parts
    return loadTemplates(templatePaths);
  };