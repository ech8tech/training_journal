import { Button } from "@components/button";
import { IconPlus } from "@components/icons/IconPlus";
import { Input } from "@components/input/Input";
import { Spacing } from "@components/spacing/Spacing";
import { Text } from "@components/text/Text";
import { Title } from "@components/title/Title";

export default function Components() {
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
        <Input label="Label" />
      </Spacing>
    </div>
  );
}
