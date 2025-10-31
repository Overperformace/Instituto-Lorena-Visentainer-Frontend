Write-Host "==== CORRIGINDO CONFIGURAÇÃO DO TAILWIND ====" -ForegroundColor Cyan

# Remover pastas antigas
Write-Host "Removendo node_modules e package-lock.json..."
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue

# Limpar cache do npm
Write-Host "Limpando cache do npm..."
npm cache clean --force

# Reinstalar dependências
Write-Host "Reinstalando dependências..."
npm install

# Instalar Tailwind, PostCSS e Autoprefixer
Write-Host "Instalando TailwindCSS, PostCSS e Autoprefixer..."
npm install -D tailwindcss postcss autoprefixer

# Gerar arquivos de configuração do Tailwind
Write-Host "Gerando arquivos de configuração..."
npx tailwindcss init -p

# Criar CSS base se não existir
$cssPath = "src/app.css"
if (-Not (Test-Path $cssPath)) {
    Write-Host "Criando arquivo src/app.css..."
    @"
@tailwind base;
@tailwind components;
@tailwind utilities;
"@ | Out-File -FilePath $cssPath -Encoding UTF8
}

# Configurar template paths no tailwind.config.js
$configPath = "tailwind.config.js"
if (Test-Path $configPath) {
    Write-Host "Atualizando tailwind.config.js..."
    (Get-Content $configPath) -replace "content: \[\]", "content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}']" | Set-Content $configPath
}

Write-Host ""
Write-Host "✅ Tudo pronto! Agora rode o comando abaixo para iniciar o projeto:" -ForegroundColor Green
Write-Host "npm run dev" -ForegroundColor Yellow
