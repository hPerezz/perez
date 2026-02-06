#!/bin/bash

# Script para remover arquivos de mídia não utilizados
# Baseado na análise do código em index.html e script.js

set -e  # Para em caso de erro

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Removendo arquivos de mídia não utilizados...${NC}\n"

# Lista de arquivos não utilizados
UNUSED_FILES=(
  # Raiz de media/
  "media/15.mp4"
  "media/2.jpg"
  "media/202.jpg"
  "media/4.jpg"
  "media/6.jpg"
  "media/8.jpg"
  "media/9.jpg"
  "media/DSC05664.jpg"
  "media/DSC05716.jpg"
  "media/DSC06124.jpg"
  "media/DSC06325.jpg"
  "media/DSC06354 (1).jpg"
  "media/DSC06443.jpg"
  "media/DSC06545.jpg"
  "media/DSC06581.jpg"
  "media/IMG_0080_web.mp4"
  
  # media/916/
  "media/916/1.mp4"
  "media/916/2.mp4"
  "media/916/3.mp4"
  "media/916/8.jpg"
  "media/916/DSC02795.jpg"
  "media/916/farofa_do_perez.jpg"
  
  # media/videos/
  "media/videos/3.mp4"
  "media/videos/4.mp4"
  "media/videos/6.mp4"
)

# Contadores
removed=0
not_found=0
errors=0

# Remove cada arquivo
for file in "${UNUSED_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}Removendo:${NC} $file"
    rm "$file" && ((removed++)) || ((errors++))
  else
    echo -e "${YELLOW}Não encontrado:${NC} $file"
    ((not_found++))
  fi
done

# Remove arquivos .DS_Store se existirem
echo -e "\n${YELLOW}Removendo arquivos .DS_Store...${NC}"
find media -name ".DS_Store" -type f -delete 2>/dev/null || true

# Resumo
echo -e "\n${GREEN}=== Resumo ===${NC}"
echo -e "Arquivos removidos: ${GREEN}$removed${NC}"
echo -e "Arquivos não encontrados: ${YELLOW}$not_found${NC}"
if [ $errors -gt 0 ]; then
  echo -e "Erros: ${RED}$errors${NC}"
fi
echo -e "\n${GREEN}Concluído!${NC}"
