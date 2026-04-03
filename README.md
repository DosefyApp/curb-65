# CURB-65 Calculator

## Objetivo

Estratificar gravidade em pneumonia adquirida na comunidade com o escore CURB-65.

## Critérios

Somar 1 ponto para cada item:

- confusão
- ureia > 7 mmol/L
- FR >= 30 irpm
- PAS < 90 mmHg ou PAD <= 60 mmHg
- idade >= 65 anos

## Referencias

- Defining community acquired pneumonia severity on presentation to hospital
- NICE guideline for pneumonia in adults

## Rodar localmente

```bash
npm install
npm run dev
```

## Testes

```bash
npm run test
```

## Build

```bash
npm run build
```

## Deploy

```bash
vercel deploy
```

## Aviso legal

Ferramenta de apoio a decisao. Nao substitui julgamento clinico. O escore deve ser interpretado com hipoxemia, sepse, fragilidade e comorbidades.
