import { z } from "zod";
import { buildEngine } from "@/features/clinical-calculators/engines/helpers";
import { formatInteger } from "@/features/clinical-calculators/utils";

const yesNoSchema = z.string().refine((value) => value === "yes" || value === "no", {
  message: "Selecione uma opção.",
});

const schema = z.object({
  confusion: yesNoSchema,
  urea: z.coerce.number().min(0, "Informe ureia entre 0 e 80 mmol/L.").max(80, "Informe ureia entre 0 e 80 mmol/L."),
  respiratoryRate: z.coerce.number().int().min(0, "Informe FR entre 0 e 80 irpm.").max(80, "Informe FR entre 0 e 80 irpm."),
  systolicBloodPressure: z.coerce.number().int().min(30, "Informe PAS entre 30 e 300 mmHg.").max(300, "Informe PAS entre 30 e 300 mmHg."),
  diastolicBloodPressure: z.coerce.number().int().min(20, "Informe PAD entre 20 e 200 mmHg.").max(200, "Informe PAD entre 20 e 200 mmHg."),
  age: z.coerce.number().int().min(18, "Informe idade entre 18 e 120 anos.").max(120, "Informe idade entre 18 e 120 anos."),
});

export const curb65Engine = buildEngine(schema, (values) => {
  const criteria = [
    { label: "Confusão", present: values.confusion === "yes" },
    { label: "Ureia > 7 mmol/L", present: values.urea > 7 },
    { label: "FR >= 30 irpm", present: values.respiratoryRate >= 30 },
    { label: "PAS < 90 ou PAD <= 60 mmHg", present: values.systolicBloodPressure < 90 || values.diastolicBloodPressure <= 60 },
    { label: "Idade >= 65 anos", present: values.age >= 65 },
  ];

  const total = criteria.filter((item) => item.present).length;
  const positiveCriteria = criteria.filter((item) => item.present).map((item) => item.label);

  let status = "Baixo risco";
  let tone: "success" | "warning" | "danger" = "success";
  let interpretation = "CURB-65 entre 0 e 1, compatível com menor risco relativo no contexto hospitalar.";
  let management = "Geralmente favorece manejo ambulatorial se não houver hipóxia, sepse, fragilidade ou comorbidades relevantes.";

  if (total === 2) {
    status = "Risco intermediário";
    tone = "warning";
    interpretation = "CURB-65 igual a 2, compatível com risco intermediário e necessidade de observação mais próxima.";
    management = "Considere internação ou observação hospitalar, integrando suporte social, oxigenação e resposta clínica.";
  } else if (total >= 3) {
    status = "Alto risco";
    tone = "danger";
    interpretation = "CURB-65 entre 3 e 5, compatível com pneumonia mais grave e maior necessidade de suporte hospitalar.";
    management = "Manejo hospitalar é o padrão; considere monitorização avançada e avaliação crítica quando houver deterioração.";
  }

  return {
    headline: {
      label: "Score CURB-65",
      value: formatInteger(total),
      status,
      tone,
      description: "O escore varia de 0 a 5 pontos e ajuda na estratificação inicial da pneumonia adquirida na comunidade.",
    },
    interpretation: {
      title: "Interpretação clínica",
      tone,
      description: interpretation,
      bullets: [
        management,
        "O escore deve ser interpretado junto com comorbidades, hipóxia, sepse, fragilidade e julgamento clínico.",
      ],
    },
    calculation: {
      title: "Como foi calculado",
      rows: criteria.map((item) => ({
        label: item.label,
        value: item.present ? "1 ponto" : "0 ponto",
      })),
      bullets: [`Pontuação total = ${total} ponto(s).`],
    },
    extraPanels: [
      {
        title: "Critérios presentes",
        tone: positiveCriteria.length ? tone : "info",
        bullets: positiveCriteria.length ? positiveCriteria : ["Nenhum critério do CURB-65 ficou positivo."],
      },
    ],
  };
});

export const calculatorEngine = curb65Engine;
