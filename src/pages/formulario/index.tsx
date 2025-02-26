// componente da página de formulário onde usei o Formik
import Button from "@/components/Button";
import Description from "@/components/Description";
import Input from "@/components/Input";
import InputGroup from "@/components/InputGroup";
import Select from "@/components/Select";
import getToast from "@/utils/getToast";
import { Formik } from "formik";

const statesArr = [
  "",
  "Acre",
  "Alagoas",
  "Amapá",
  "Amazonas",
  "Bahia",
  "Ceará",
  "Distrito Federal",
  "Espirito Santo",
  "Goiás",
  "Maranhão",
  "Mato Grosso do Sul",
  "Mato Grosso",
  "Minas Gerais",
  "Pará",
  "Paraíba",
  "Paraná",
  "Pernambuco",
  "Piauí",
  "Rio de Janeiro",
  "Rio Grande do Norte",
  "Rio Grande do Sul",
  "Rondônia",
  "Roraima",
  "Santa Catarina",
  "São Paulo",
  "Sergipe",
  "Tocantins",
];

export default function FormPage() {
  return (
    <div>
      <Description
        title="Preencha o formulário"
        subtitle="As informações serão coletadas para a análise dos dados."
      />
      <Formik
        initialValues={{
          // valores iniciais do formulário
          state: "",
          cases: 0,
          confirmed: 0,
          deaths: 0,
          recovered: 0,
          date: "",
        }}
        onSubmit={(values, actions) => {
          // callback de submit
          getToast("Dados enviados com sucesso!", "success");
          getToast("Confira o JSON no console", "info");

          console.log(JSON.stringify(values));

          actions.resetForm();
        }}
        validate={(values) => {
          // callback de validação do formulário
          // é disparada no evento de submit do form e nos eventos change e blur dos inputs
          const errors: any = {};

          if (!values.state) errors.state = "Selecione um estado";

          if (!/\d+/.test(String(values.cases)))
            errors.cases = "Número de casos inválido";
          if (!/\d+/.test(String(values.confirmed)))
            errors.confirmed = "Número de casos confirmados inválido";
          if (!/\d+/.test(String(values.deaths)))
            errors.deaths = "Número de mortes inválido";
          if (!/\d+/.test(String(values.recovered)))
            errors.recovered = "Número de casos recuperados inválido";
          if (!values.date || !/\d{4}-\d{2}-\d{2}/.test(values.date))
            errors.date = "Data inválida";

          // caso haja erros, o submit não será disparado
          return errors;
        }}
      >
        {({
          errors,
          touched,
          handleSubmit,
          handleBlur,
          handleChange,
          values,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center mt-4"
          >
            <div className="grid grid-cols-3 gap-5 w-full">
              <InputGroup
                label="Estado"
                id="state"
                Input={
                  <Select
                    name="state"
                    id="state"
                    options={statesArr}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.state}
                  />
                }
                error={errors.state && touched.state ? errors.state : ""}
              />
              <InputGroup
                label="Número de casos"
                id="cases"
                Input={
                  <Input
                    name="cases"
                    id="cases"
                    type="number"
                    step={1}
                    min={0}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cases}
                  />
                }
                error={errors.cases && touched.cases ? errors.cases : ""}
              />
              <InputGroup
                label="Número de casos confirmados"
                id="confirmed"
                Input={
                  <Input
                    name="confirmed"
                    id="confirmed"
                    type="number"
                    step={1}
                    min={0}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmed}
                  />
                }
                error={
                  errors.confirmed && touched.confirmed ? errors.confirmed : ""
                }
              />
              <InputGroup
                label="Número de mortes"
                id="deaths"
                Input={
                  <Input
                    name="deaths"
                    id="deaths"
                    type="number"
                    step={1}
                    min={0}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.deaths}
                  />
                }
                error={errors.deaths && touched.deaths ? errors.deaths : ""}
              />
              <InputGroup
                label="Número de casos recuperados"
                id="recovered"
                Input={
                  <Input
                    name="recovered"
                    id="recovered"
                    type="number"
                    step={1}
                    min={0}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.recovered}
                  />
                }
                error={
                  errors.recovered && touched.recovered ? errors.recovered : ""
                }
              />
              <InputGroup
                label="Data"
                id="date"
                Input={
                  <Input
                    name="date"
                    id="date"
                    type="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.date}
                  />
                }
                error={errors.date && touched.date ? errors.date : ""}
              />
            </div>
            <div className="mt-4">
              <Button label="Enviar" />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
