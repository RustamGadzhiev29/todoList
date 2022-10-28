import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLIST/EditableSpan',
  component: EditableSpan,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    callBack: {description: 'Value EditableSpan Changed'},
    value:{
      defaultValue:'CSS',
      description: 'Start value EditableSpan'
    }
  },
} as ComponentMeta<typeof EditableSpan>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />; // образец

export const EditableSpanStory = Template.bind({}); // истории созданные на основании нашего образца
// More on args: https://storybook.js.org/docs/react/writing-stories/args

EditableSpanStory.args = {
  title: 'CSS',
  callBack: action('Value EditableSpan Changed')
};

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };
//
// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };
//
// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
