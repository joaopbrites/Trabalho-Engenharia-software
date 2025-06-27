#!/bin/bash

echo "=== Teste do Backend - Funcionalidades Corrigidas ==="

# 1. Teste de cadastro de tutor com email
echo "1. Testando cadastro de tutor com email..."
curl -X POST http://localhost:3001/tutores \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "telefone": "(11) 99999-9999", 
    "email": "joao@email.com",
    "endereco": "Rua das Flores, 123"
  }' | jq .

echo -e "\n\n"

# 2. Listar tutores para verificar se email aparece
echo "2. Listando tutores para verificar se email aparece..."
curl -X GET http://localhost:3001/tutores | jq .

echo -e "\n\n"

# 3. Teste de cadastro de consulta com motivo e observações
echo "3. Testando cadastro de consulta com motivo e observações..."

# Primeiro, vamos listar animais para pegar um ID
echo "Listando animais disponíveis..."
curl -X GET http://localhost:3001/animais | jq .

echo -e "\n\n"
echo "Se há animais, testando criar consulta (substitua ANIMAL_ID pelo ID real)..."
echo "curl -X POST http://localhost:3001/consultas \
  -H \"Content-Type: application/json\" \
  -d '{
    \"animalId\": \"ANIMAL_ID\",
    \"data_consulta\": \"2025-06-27\",
    \"motivo\": \"Vacinação anual\",
    \"observacoes\": \"Animal aparenta estar saudável\"
  }'"

echo -e "\n\n"

# 4. Listar consultas para verificar campos
echo "4. Listando consultas..."
curl -X GET http://localhost:3001/consultas | jq .

echo -e "\n\nTestes concluídos!"
