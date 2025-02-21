import IconBackTop from "@assets/icons/muscles_parts/back_top.svg";
import IconBiceps from "@assets/icons/muscles_parts/biceps.svg";
import IconShouldersFront from "@assets/icons/muscles_parts/shoulder_front.svg";
import { Button } from "@components/button";
import { IconPlus } from "@components/icons/IconPlus";
import { Input } from "@components/input/Input";
import { Select } from "@components/select/Select";
import { Spacing } from "@components/spacing/Spacing";
import { Text } from "@components/text/Text";
import { Title } from "@components/title/Title";
import { useForm } from "react-hook-form";

export default function Components() {
  const { register, watch, formState } = useForm();
  console.log(watch());
  return (
    <div>
      <Spacing space={24}>
        <Title size="h1">COMPONENTS</Title>
      </Spacing>

      <Spacing space={16}>
        <Title size="h1">Typography</Title>
      </Spacing>
      <Spacing space={16}>
        <Title size="h1">Title H1</Title>
      </Spacing>
      <Spacing space={16}>
        <Title size="h2">Title H2</Title>
      </Spacing>
      <Spacing space={16}>
        <Title size="h3">Title H3</Title>
      </Spacing>
      <Spacing space={16}>
        <Title size="h4">Title H4</Title>
      </Spacing>
      <Spacing space={16}>
        <Title size="h5">Title H5</Title>
      </Spacing>
      <Spacing space={16}>
        <Title size="h6">Title H6</Title>
      </Spacing>

      <Spacing space={16}>
        <Text size="md">Text Md</Text>
      </Spacing>
      <Spacing space={24}>
        <Text size="sm">Text Sm</Text>
      </Spacing>

      <Spacing space={16}>
        <Select
          register={register("input-select")}
          placeholder="Выберите"
          label="Область мышц"
          defaultOptionId={2}
          options={[
            {
              id: 1,
              name: "Back Top",
              icon: <IconBackTop />,
            },
            { id: 2, name: "Biceps", icon: <IconBiceps /> },
            { id: 3, name: "Shoulders Front", icon: <IconShouldersFront /> },
          ]}
        />
      </Spacing>

      <Spacing space={24}>
        <Title size="h1">Buttons</Title>
      </Spacing>
      <Spacing space={16}>
        <Button type="primary">Primary</Button>
      </Spacing>
      <Spacing space={16}>
        <Button type="ghost">Ghost</Button>
      </Spacing>
      <Spacing space={16}>
        <Button type="danger">Danger</Button>
      </Spacing>
      <Spacing space={24}>
        <Button type="primary" variant="full" icon={<IconPlus />}>
          Full Button
        </Button>
      </Spacing>

      <Spacing space={24}>
        <Title size="h1">Input</Title>
      </Spacing>
      <Spacing space={16}>
        <Input
          placeholder="Input text"
          label="Label"
          register={register("input-field")}
        />
      </Spacing>
    </div>
  );
}
