SUDO="yes"

case "$OSTYPE" in
  msys*)    SUDO="no" ;;
  solaris*) SUDO="yes" ;;
  darwin*)  SUDO="yes" ;;
  linux*)   SUDO="yes" ;;
  bsd*)     SUDO="yes" ;;
  *)        SUDO="yes" ;;
esac

if [[ "$SUDO" == "yes" ]]; then
  sudo npm install -g grunt-cli
  sudo npm install -g bower
  sudo npm install -g requirejs
  sudo npm install -g handlebars
  sudo gem install compass
elif [[ "$SUDO" == "no" ]]; then
  npm install -g grunt-cli
  npm install -g bower
  npm install -g requirejs
  npm install -g handlebars
  gem install compass
fi
