# ILV Frontend – Integração pronta

O projeto foi ajustado para ler as variáveis:

- `VITE_API_URL` → URL do backend (Render)
- `VITE_SUPABASE_URL` → URL do seu projeto Supabase
- `VITE_SUPABASE_ANON_KEY` → Chave pública (anon) do Supabase

## Onde configurar

- Local: edite o arquivo `.env` (um modelo está em `.env.example`).
- Vercel: Project → Settings → *Environment Variables* e crie **exatamente** estes nomes.

## Helpers criados

- `src/lib/supabase.js` → Cliente do Supabase pronto para importar:  
  `import { supabase } from "@/lib/supabase"`
- `src/services/api.js` → Helper de fetch para o backend:  
  `import { apiFetch } from "@/services/api"`

Exemplo de uso:
```js
import { supabase } from "@/lib/supabase";
const { data, error } = await supabase.from("pacientes").select("*");
```

```js
import { apiFetch } from "@/services/api";
const pacientes = await apiFetch("/patients"); // GET https://.../patients
```

## Build/Run

```bash
npm install
npm run dev     # local
npm run build   # produção
```

Se ao abrir uma rota protegida você voltar para `/login`, garanta que você seta `localStorage.setItem("auth","true")` no login e que o seu componente de rota protegida valida isso antes de renderizar.
