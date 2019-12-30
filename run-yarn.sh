#!/bin/bash

if [[ ! (( "$1" == "build" ) || ( "$1" == "serve" )) ]]; then
  echo -e "\033[31mERRO\033[0m  Parâmetro inválido!"
  echo -e "      Coloque \033[1mbuild\033[0m ou \033[1mserve\033[0m."
  exit 1
fi

PWD=$(pwd)
DIR=${PWD##*/}

# Verifica qual é o repositório atual
if [[ "$DIR" != "sapl-frontend" ]]; then
  echo -e "\033[31mERRO\033[0m  Repositório atual não é o \033[1msapl-frontend\033[0m!"
  exit 1
fi

# Verifica se o repositório atual contém git
if [[ ! -d ".git" ]]; then
  echo -e "\033[31mERRO\033[0m  Repositório atual não contém git!"
  exit 1
fi

BRANCH_FRONTEND=$(git branch | grep '^*' | cut -d ' ' -f2)
# shellcheck disable=SC2157
if [[ -z BRANCH_FRONTEND ]]; then
  echo -e "\033[31mERRO\033[0m  Não foi possivel configurar a variável \033[1mBRANCH_FRONTEND\033[0m!"
  exit 1
fi

cd ../sapl/ || exit 1
BRANCH_BACKEND=$(git branch | grep '^*' | cut -d ' ' -f2)
# shellcheck disable=SC2157
if [[ -z BRANCH_BACKEND ]]; then
  echo -e "\033[31mERRO\033[0m  Não foi possivel configurar a variável \033[1mBRANCH_BACKEND\033[0m!"
  exit 1
fi

if [[ "$BRANCH_FRONTEND" == "$BRANCH_BACKEND" ]]; then
  echo -e "\033[33mEXECUTANDO\033[0m  \033[1myarn run $1\033[1m."
  yarn run "$1"
  echo -e "\033[32mSUCESSO\033[0m  $1 realizado com sucesso."
else
  echo -e "\033[31mERRO\033[0m  $1 não realizada porque as branchs dos dois repositórios são diferentes."
  echo -e "      Branch do Frontend:   \033[1m$BRANCH_FRONTEND\033[0m"
  echo -e "      Branch do Backend:    \033[1m$BRANCH_BACKEND\033[0m"
  echo -e "      Para que a operação seja feita, coloque os dois repositórios na mesma branch."
fi
