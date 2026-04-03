import type { CalculatorManifest } from "@/features/clinical-calculators/types";

const yesNoOptions = [
  { label: "Selecione...", value: "" },
  { label: "Sim", value: "yes" },
  { label: "Não", value: "no" },
];

export const curb65Manifest: CalculatorManifest = {
  slug: "curb-65",
  title: "CURB-65",
  shortTitle: "CURB-65",
  description: "Estratificação de risco em pneumonia adquirida na comunidade.",
  seoTitle: "CURB-65 | Dosefy",
  seoDescription: "Calcule o CURB-65 com interpretação prática para pneumonia adquirida na comunidade.",
  heroEyebrow: "Pneumonia adquirida na comunidade",
  heroDescription:
    "Score simples e útil para triagem hospitalar, somando confusão, ureia, frequência respiratória, pressão arterial e idade.",
  heroHighlights: [
    "Pontuação de 0 a 5 com leitura imediata.",
    "Interpretação prática para decisão ambulatorial, observação ou internação.",
    "Mantém alerta claro de que o escore não substitui julgamento clínico.",
  ],
  resultMetricLabel: "Score CURB-65",
  actionLabel: "Calcular CURB-65",
  note: "Ferramenta de apoio à decisão. Não substitui julgamento clínico. Hipóxia, sepse, fragilidade e comorbidades podem mudar a conduta mesmo com escore baixo.",
  limitations: [
    "Não substitui avaliação clínica global, gasometria, estado funcional ou necessidade de suporte.",
    "Pode subestimar gravidade em pacientes frágeis, idosos muito vulneráveis ou sépticos.",
    "Deve ser interpretado junto com hipóxia, comorbidades e contexto social para alta segura.",
  ],
  references: [
    {
      label: "Defining community acquired pneumonia severity on presentation to hospital",
      href: "https://pubmed.ncbi.nlm.nih.gov/17404382/",
    },
    {
      label: "NICE: Pneumonia in adults",
      href: "https://www.nice.org.uk/guidance/cg191",
    },
  ],
  sections: [
    {
      id: "clinical",
      title: "Variáveis do score",
      description: "Preencha os cinco domínios clássicos do CURB-65.",
    },
  ],
  fields: [
    {
      name: "confusion",
      label: "Confusão",
      type: "select",
      sectionId: "clinical",
      options: yesNoOptions,
    },
    {
      name: "urea",
      label: "Ureia",
      type: "number",
      sectionId: "clinical",
      inputMode: "decimal",
      placeholder: "Ex.: 8.4",
      min: 0,
      max: 80,
      suffix: "mmol/L",
    },
    {
      name: "respiratoryRate",
      label: "Frequência respiratória",
      type: "number",
      sectionId: "clinical",
      inputMode: "numeric",
      placeholder: "Ex.: 28",
      min: 0,
      max: 80,
      suffix: "irpm",
    },
    {
      name: "systolicBloodPressure",
      label: "Pressão sistólica",
      type: "number",
      sectionId: "clinical",
      inputMode: "numeric",
      placeholder: "Ex.: 118",
      min: 30,
      max: 300,
      suffix: "mmHg",
    },
    {
      name: "diastolicBloodPressure",
      label: "Pressão diastólica",
      type: "number",
      sectionId: "clinical",
      inputMode: "numeric",
      placeholder: "Ex.: 72",
      min: 20,
      max: 200,
      suffix: "mmHg",
    },
    {
      name: "age",
      label: "Idade",
      type: "number",
      sectionId: "clinical",
      inputMode: "numeric",
      placeholder: "Ex.: 67",
      min: 18,
      max: 120,
      suffix: "anos",
    },
  ],
  initialValues: {
    confusion: "",
    urea: "",
    respiratoryRate: "",
    systolicBloodPressure: "",
    diastolicBloodPressure: "",
    age: "",
  },
};

export const calculatorManifest = curb65Manifest;
