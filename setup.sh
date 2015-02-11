#!/bin/bash

OS=$(uname -s)
clear

# mac
if [ $OS = "Darwin" ]; then

  if $(! type -P brew &>/dev/null) ; then
    ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"
    brew doctor
  else
    brew update
  fi

  if $(! type -P npm &>/dev/null) ; then
    brew install node
  fi

  if $(! type -P grunt &>/dev/null) ; then
    npm install -g grunt-cli
  else
    npm update -g grunt-cli
  fi

  gem install sass
  npm install
  npm update

  source .profile

  echo "-----------------------------------------------------------------------"
  echo "Install complete."
  echo "You can now run 'grunt --browser' to build & launch the project"
  echo "-----------------------------------------------------------------------"
  echo ""
fi
