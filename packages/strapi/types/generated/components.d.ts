import type { Schema, Attribute } from '@strapi/strapi';

export interface IngredientIngredient extends Schema.Component {
  collectionName: 'components_ingredient_ingredients';
  info: {
    displayName: 'Ingr\u00E9dient';
    description: '';
  };
  attributes: {
    category: Attribute.String;
    items: Attribute.Component<'item.item', true>;
  };
}

export interface ItemItem extends Schema.Component {
  collectionName: 'components_item_items';
  info: {
    displayName: 'Item';
  };
  attributes: {
    name: Attribute.String;
    quantity: Attribute.String;
  };
}

export interface StepInstruction extends Schema.Component {
  collectionName: 'components_instruction_instructions';
  info: {
    displayName: 'Instruction';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    substeps: Attribute.Component<'substep.etape', true>;
  };
}

export interface SubstepEtape extends Schema.Component {
  collectionName: 'components_step_etapes';
  info: {
    displayName: 'Sous-instruction';
    description: '';
  };
  attributes: {
    step: Attribute.Text;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'ingredient.ingredient': IngredientIngredient;
      'item.item': ItemItem;
      'step.instruction': StepInstruction;
      'substep.etape': SubstepEtape;
    }
  }
}
