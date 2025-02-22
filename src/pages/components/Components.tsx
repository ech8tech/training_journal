import IconBackTop from "@assets/icons/muscles_full/legs_full.svg";
import IconBiceps from "@assets/icons/muscles_parts/biceps.svg";
import IconShouldersFront from "@assets/icons/muscles_parts/shoulder_front.svg";
import IconEdit from "@assets/icons/other/IconEdit.svg";
import IconPlus from "@assets/icons/other/IconPlus.svg";
import { Accordion } from "@components/accordion/Accordion";
import { Button } from "@components/buttons";
import { Input } from "@components/input/Input";
import { useModal } from "@components/modal/utils";
import { Select } from "@components/select/Select";
import { Spacing } from "@components/spacing/Spacing";
import { Table } from "@components/table/Table";
import { Text } from "@components/text/Text";
import { Title } from "@components/title/Title";
import { SPACE_CONTAINER, SPACE_INNER } from "@constants/spacing";
import { useForm } from "react-hook-form";

export default function Components() {
  const { register, watch, formState } = useForm();

  const { openModal, modal } = useModal();

  return (
    <div>
      <Spacing space={SPACE_CONTAINER}>
        <Title size="h1">COMPONENTS</Title>
      </Spacing>

      <Spacing space={SPACE_INNER}>
        <Title size="h1">Typography</Title>
      </Spacing>
      <Spacing space={SPACE_INNER}>
        <Title size="h1">Title H1</Title>
      </Spacing>
      <Spacing space={SPACE_INNER}>
        <Title size="h2">Title H2</Title>
      </Spacing>
      <Spacing space={SPACE_INNER}>
        <Title size="h3">Title H3</Title>
      </Spacing>
      <Spacing space={SPACE_INNER}>
        <Title size="h4">Title H4</Title>
      </Spacing>
      <Spacing space={SPACE_INNER}>
        <Title size="h5">Title H5</Title>
      </Spacing>
      <Spacing space={SPACE_INNER}>
        <Title size="h6">Title H6</Title>
      </Spacing>

      <Spacing space={SPACE_INNER}>
        <Text size="md">Text Md</Text>
      </Spacing>
      <Spacing space={SPACE_CONTAINER}>
        <Text size="sm">Text Sm</Text>
      </Spacing>

      <Spacing space={SPACE_CONTAINER}>
        <Title size="h1">Buttons</Title>
      </Spacing>
      <Spacing space={SPACE_INNER}>
        <Button type="primary" text="Primary" />
      </Spacing>
      <Spacing space={SPACE_INNER}>
        <Button type="ghost" text="Ghost" />
      </Spacing>
      <Spacing space={SPACE_INNER}>
        <Button type="danger" text="Danger" />
      </Spacing>
      <Spacing space={SPACE_CONTAINER}>
        <Button
          type="primary"
          text="Full Button"
          variant="full"
          icon={<IconPlus />}
        />
      </Spacing>

      <Spacing space={SPACE_CONTAINER}>
        <Title size="h1">Input</Title>
      </Spacing>
      <Spacing space={SPACE_INNER}>
        <Input
          placeholder="Input text"
          label="Label"
          register={register("input-field")}
        />
      </Spacing>

      <Spacing space={SPACE_CONTAINER}>
        <Table
          columns={[
            { key: "reps", title: "Подходы" },
            { key: "weight", title: "Вес" },
          ]}
          rows={[
            { reps: 15, weight: 20, height: 10 },
            { reps: 12, weight: 25, height: 10 },
            { reps: 10, weight: 30, height: 10 },
          ]}
          buttonConfig={{
            title: "Edit",
            icon: <IconEdit />,
          }}
        />
      </Spacing>

      <Spacing space={SPACE_CONTAINER}>
        <Select
          register={register("input-select")}
          placeholder="Выберите"
          label="Область мышц"
          defaultOptionId={2}
          options={[
            {
              id: 1,
              name: "Поясница",
              icon: <IconBackTop />,
            },
            { id: 2, name: "Бицепс", icon: <IconBiceps /> },
            {
              id: 3,
              name: "Передние и средние дельты",
              icon: <IconShouldersFront />,
            },
          ]}
        />
      </Spacing>

      <Spacing space={SPACE_CONTAINER}>
        <Accordion title="Some text content" icon={<IconBiceps />}>
          <Text size="sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
        </Accordion>
      </Spacing>

      <Spacing space={SPACE_CONTAINER}>
        <Button
          type="primary"
          text="Open Modal"
          onClick={() =>
            openModal({
              title: "Создание упражнения",
              content: (
                <div>
                  <Input
                    label="Наименование"
                    register={register("exercise_name")}
                    placeholder="Наименование упражнения"
                  />
                </div>
              ),
              buttonsConfig: [
                {
                  text: "Создать",
                },
              ],
            })
          }
        />
        {modal}
      </Spacing>
    </div>
  );
}
