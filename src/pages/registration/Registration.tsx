import { PageLayout } from "@components/pageLayout/PageLayout";

export function Registration() {
  const handleRegistration = () => {
    console.log("registration clicked");
  };

  return (
    <PageLayout
      title="Регистрация"
      buttonConfig={{
        text: "Зарегистрироваться",
        onClick: handleRegistration,
      }}
    ></PageLayout>
  );
}
