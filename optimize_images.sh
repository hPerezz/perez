#!/bin/bash

# Script para criar versões reduzidas das imagens para web
# Usa sips (ferramenta nativa do macOS)

cd "$(dirname "$0")"
MEDIA_DIR="media/916"

# Largura máxima para web (ajuste conforme necessário)
MAX_WIDTH=1200
QUALITY=85

echo "🖼️  Otimizando imagens da galeria e festa autoral..."
echo ""

# Processar fotos da galeria (1.jpg até 6.jpg)
for i in {1..6}; do
    if [ -f "$MEDIA_DIR/$i.jpg" ]; then
        echo "Processando: $MEDIA_DIR/$i.jpg"
        sips -s format jpeg -s formatOptions $QUALITY -Z $MAX_WIDTH "$MEDIA_DIR/$i.jpg" --out "$MEDIA_DIR/${i}_small.jpg"
        echo "✅ Criado: $MEDIA_DIR/${i}_small.jpg"
    else
        echo "⚠️  Arquivo não encontrado: $MEDIA_DIR/$i.jpg"
    fi
done

# Processar foto da festa autoral
if [ -f "$MEDIA_DIR/farofa_do_perez.jpg" ]; then
    echo "Processando: $MEDIA_DIR/farofa_do_perez.jpg"
    sips -s format jpeg -s formatOptions $QUALITY -Z $MAX_WIDTH "$MEDIA_DIR/farofa_do_perez.jpg" --out "$MEDIA_DIR/farofa_do_perez_small.jpg"
    echo "✅ Criado: $MEDIA_DIR/farofa_do_perez_small.jpg"
else
    echo "⚠️  Arquivo não encontrado: $MEDIA_DIR/farofa_do_perez.jpg"
fi

echo ""
echo "✨ Concluído! Todas as imagens otimizadas foram criadas."
