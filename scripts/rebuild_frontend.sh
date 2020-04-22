#!/usr/bin/env bash
# shellcheck disable=SC2063
# shellcheck disable=SC2086
# shellcheck disable=SC2164

verifica_git() {
  if [[ ! -d $ROOT_DIR/sapl-frontend/.git ]]; then
    echo -e "\033[31mERRO\033[0m  Diretório \033[1msapl-frontend\033[0m não é um repositório git!"
    exit 1
  elif [[ ! -d $ROOT_DIR/sapl/.git ]]; then
    echo -e "\033[31mERRO\033[0m  Diretório \033[1msapl\033[0m não é um repositório git!"
    exit 1
  fi
}

verifica_diretorios_sapl() {
  if [[ ! -d $ROOT_DIR/sapl ]]; then
    echo -e "\033[31mERRO\033[0m  Os diretórios \033[1msapl\033[0m e \033[1msapl-frontend\033[0m devem ter o mesmo diretório raiz."
    exit 1
  else
    verifica_git
  fi
}

salva_wip() {(
  cd $ROOT_DIR/$1
  git add .
  git stash
)}

atualiza_branch() {(
  cd $ROOT_DIR/$1
  git checkout $2
  git pull origin $2 --rebase
)}

adiciona_commit() {(
  cd $ROOT_DIR/sapl
  git add .
  git commit -m "Rebuild Frontend"
  git push origin $1
)}

restaura_wip() {(
  cd $ROOT_DIR/$1
  git checkout $2
  git stash pop
  git restore --staged .
)}


BASE_DIR=${PWD%/scripts}
ROOT_DIR=${BASE_DIR%/sapl-frontend}

# sapl-frontend/
verifica_diretorios_sapl

# sapl/
salva_wip
atualiza_branch "master"
cd -
# sapl-frontend/
salva_wip
atualiza_branch "master"
./run-yarn.sh build
cd -
# sapl/
adiciona_commit "master"
git checkout -
atualiza_branch "3.1.x"
cd -
# sapl-frontend/
git checkout -
atualiza_branch "3.1.x"
./run-yarn.sh build
git checkout -
restaura_wip
cd -
# sapl/
adiciona_commit "3.1.x"
git checkout -
restaura_wip
cd ../sapl-frontend/scripts
