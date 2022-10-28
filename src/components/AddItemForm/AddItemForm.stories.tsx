import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    onClick: {description: 'Button inside form clicked'},
  },
} as ComponentMeta<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />; // образец

export const AddItemFormBaseExampleStory = Template.bind({}); // истории созданные на основании нашего образца
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddItemFormBaseExampleStory.args = {
callBack: action('Button inside form clicked')
};

export const AddItemFormDisabledExampleStory = Template.bind({}); // истории созданные на основании нашего образца
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddItemFormDisabledExampleStory.args = {
  callBack: action('Button inside form clicked'),
  entityStatus: "loading"
};


