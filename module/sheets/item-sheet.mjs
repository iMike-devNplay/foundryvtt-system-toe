/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
 export class ToeItemSheet extends ItemSheet {

    /** @inheritdoc */
    static get defaultOptions() {
      return foundry.utils.mergeObject(super.defaultOptions, {
        classes: ["toe", "sheet", "item"],
        template: "systems/tails-of-equestria/templates/item-sheet.html",
        width: 520,
        height: 480,
        tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}],
        scrollY: [".attributes"],
      });
    }
  
    /** @override */
    get template() {
      return `systems/tails-of-equestria/templates/item/item-${this.item.data.type}-sheet.html`;
    }
  
    /* -------------------------------------------- */
  
    /** @inheritdoc */
    getData() {
      const context = super.getData();
      context.data = context.data.data;
      return context;
    }
  
    /** @override */
    setPosition(options = {}) {
      const position = super.setPosition(options);
      const sheetBody = this.element.find(".sheet-body");
      const bodyHeight = position.height - 192;
      sheetBody.css("height", bodyHeight);
      return position;
    }
  
    /** @override */
    activateListeners(html) {
      super.activateListeners(html);
  
      // Everything below here is only needed if the sheet is editable
      if (!this.options.editable) return;
  
      // Roll handlers, click handlers, etc. would go here.
    }
  }
  