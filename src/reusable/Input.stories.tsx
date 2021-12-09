import {ComponentStory, ComponentMeta} from "@storybook/react"
import {Input} from "./Input"

export default {
    title: "Reusable/Input",
    component: Input
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Demo = Template.bind({})

Demo.args ={
    id: "exercise",
    label: "exericse", 
    type: "text"
}