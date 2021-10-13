/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
 export class ToeActorSheet extends ActorSheet {

    /** @inheritdoc */
    static get defaultOptions() {
      return foundry.utils.mergeObject(super.defaultOptions, {
        classes: ["toe", "sheet", "actor"],
        template: "systems/tails-of-equestria/templates/actor/actor-pony-sheet.html",
        width: 720,
        height: 750,
        tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "actions"}]
      });
    }
  
    /** @override */
    get template() {
      return `systems/tails-of-equestria/templates/actor/actor-${this.actor.data.type}-sheet.html`;
    }
  
    /* -------------------------------------------- */
  
    /** @inheritdoc */
    getData() {
      const context = super.getData();
      const actorData = context.actor.data;
  
      context.data = actorData.data;
      context.flags = actorData.flags;
        
      if (actorData.type == 'pony') {
        this._prepareItems(context);
        this._prepareCharacterData(context);
      }

      console.log(actorData);
      // Prepare active effects
      //context.effects = prepareActiveEffectCategories(this.actor.effects);
      return context;
    }
  
    /**
     * Organize and classify Items for Character sheets.
     *
     * @param {Object} actorData The actor to prepare.
     *
     * @return {undefined}
     */
    _prepareItems(context) {
      // Initialize containers.
      
    }
  
    /**
     * Organize and classify Items for Character sheets.
     *
     * @param {Object} actorData The actor to prepare.
     *
     * @return {undefined}
     */
    _prepareCharacterData(context) {
      /*for (let [k, v] of Object.entries(context.data.attributes)) {
        v.label = game.i18n.localize(CONFIG.TOE.attributes[k]) ?? v.label ?? k;
      }
      for (let [k, v] of Object.entries(context.data.proficiencies)) {
        v.label = game.i18n.localize(CONFIG.TOE.proficiencies[k]) ?? v.label ?? k;
      }*/
    }
  
    /** @override */
    activateListeners(html) {
      super.activateListeners(html);
  
      // Render the item sheet for viewing/editing prior to the editable check.
      html.find('.item-edit').click(ev => {
        const li = $(ev.currentTarget).parents(".item");
        const item = this.actor.items.get(li.data("itemId"));
        //console.log(item);
        item.sheet.render(true);
      });
  
      // -------------------------------------------------------------
      // Everything below here is only needed if the sheet is editable
      if (!this.isEditable) return;
  
      // Add Inventory Item
      html.find('.item-create').click(this._onItemCreate.bind(this));
  
      // Delete Inventory Item
      html.find('.item-delete').click(ev => {
        const li = $(ev.currentTarget).parents(".item");
        const itemId = li.data("itemId");
        const item = this.actor.items.get(itemId);
        item.delete();
        li.slideUp(200, () => this.render(false));
      });
    }
  
    /* -------------------------------------------- */
  
    /**
     * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
     * @param {Event} event   The originating click event
     * @private
     */
    async _onItemCreate(event) {
      event.preventDefault();
      const header = event.currentTarget;
      // Get the type of item to create.
      const type = header.dataset.type;
      // Grab any data associated with this control.
      const data = duplicate(header.dataset);
      // Initialize a default name.
      const name = `New ${type.capitalize()}`;
      // Prepare the item object.
      const itemData = {
        name: name,
        type: type,
        data: data
      };
      // Remove the type from the dataset since it's in the itemData.type prop.
      delete itemData.data["type"];
  
      // Finally, create the item!
      return await Item.create(itemData, {parent: this.actor});
    }

  
    /** @override */
    async _onDropItemCreate(itemData) {
        console.log(itemData);
        if (itemData.type === "ponyType")
        {
          for (const [key, value] of this.actor.items.entries())
            if (value.type === "ponyType") this.actor.items.get(key).delete();
          itemData.data.isOwned = true;
          return super._onDropItemCreate(itemData);
        }
        else if (itemData.type === "elementOfHarmony")
        {
          for (const [key, value] of this.actor.items.entries()) 
            if (value.type === "elementOfHarmony") this.actor.items.get(key).delete();
          itemData.data.isOwned = true;
          return super._onDropItemCreate(itemData);
        }
    }
  }
  