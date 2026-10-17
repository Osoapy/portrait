# Portfólio

Aplicação React + TypeScript com Vite. Base de publicação: `/portrait/`.

```sh
npm install
npm run dev
npm run build
```

## Contato

O formulário envia via AJAX ao FormSubmit usando o endereço definido em `src/data/profile.ts`. Não requer chaves no frontend.

Antes de disponibilizar o formulário ao público:

1. Abra o site servido por HTTP(S) e envie uma mensagem de teste pelo formulário.
2. Abra a mensagem de ativação enviada pelo FormSubmit ao endereço destinatário e confirme o e-mail (verifique também o spam).
3. Envie outra mensagem e confirme o recebimento para validar a entrega de ponta a ponta.

A ativação depende do proprietário da caixa de e-mail. Respostas de sucesso da API indicam aceitação pelo serviço, não confirmação de entrega na caixa de entrada. Os dados do formulário são processados pelo FormSubmit. Falhas de rede preservam os campos para nova tentativa e exibem um link alternativo de e-mail.

Documentação: https://formsubmit.co/ e https://formsubmit.co/ajax-documentation.

Créditos e licenças das imagens: `src/assets/skills/README.md`.

## Paisagem do header

Bliss, fotografia de Charles O'Rear / Microsoft, obtida em alta resolução (4510×3627) de https://archive.org/details/theoriginalfilesofsomewindowswallpapers/bliss%20600dpi.jpg. Os direitos da imagem pertencem aos seus titulares.

Ícones sociais pretos: Simple Icons v11 (https://github.com/simple-icons/simple-icons/tree/11.0.0), licença CC0 em `src/assets/social/LICENSE.md`. As marcas pertencem aos respectivos titulares.
