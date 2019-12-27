#!/bin/sh

BRANCH_FRONTEND=$(git branch | grep '^*' | cut -d ' ' -f2)
BRANCH_BACKEND=$(cd ../sapl/ && git branch | grep '^*' | cut -d ' ' -f2)

if [ "$BRANCH_FRONTEND" = "$BRANCH_BACKEND" ]; then
  yarn run build
  echo "Build realizado com sucesso."
else
  echo "Build não realizada porque as branchs dos dois repositórios são diferentes."
  printf "Branch do Frontend:\t'%s'\n" "$BRANCH_FRONTEND"
  printf "Branch do Backend:\t'%s'\n" "$BRANCH_BACKEND"
  echo "Para que a operação seja feita, coloque os dois repositórios na mesma branch."
fi
