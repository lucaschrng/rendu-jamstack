import type { Schema, Attribute } from '@strapi/strapi';

export interface IngredientIngredient extends Schema.Component {
  collectionName: 'components_ingredient_ingredients';
  info: {
    displayName: 'Ingr\u00E9dient';
  };
  attributes: {
    quantity: Attribute.String;
    name: Attribute.String;
  };
}

export interface InstructionInstruction extends Schema.Component {
  collectionName: 'components_instruction_instructions';
  info: {
    displayName: 'Instruction';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    steps: Attribute.Component<'step.etape', true>;
  };
}

export interface StepEtape extends Schema.Component {
  collectionName: 'components_step_etapes';
  info: {
    displayName: 'Etape';
  };
  attributes: {
    step: Attribute.Text;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'ingredient.ingredient': IngredientIngredient;
      'instruction.instruction': InstructionInstruction;
      'step.etape': StepEtape;
    }
  }
}
