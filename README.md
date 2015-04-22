# TEST-SITE
##Yeoman環境設定

##参考サイト
[http://qiita.com/Syn/items/f700b325e07222b64960](http://qiita.com/Syn/items/f700b325e07222b64960 "Yeoman設定　http://qiita.com/Syn/items/f700b325e07222b64960")

##準備
###①Node.js インストール

Yeoman は Node.js 上で動くので、 Node.js をインストールしておく。

ダウンロード
[http://nodejs.org/download/](http://nodejs.org/download/ "node.jsダウンロード　http://nodejs.org/download/")

インストール
node-v0.10.35-x86.msiを実行

デフォルトのインストール要件でインストール

npm も同時にインストールされる

再起動

コマンド プロンプトでインストール結果確認

    Node –v
    10.35
    Npm –v
    1.4.28

###②Ruby インストール

ひな形に含まれる SCSS をコンパイルするのに Compass が必要。

Compass は Ruby で書かれたアプリなので、 Ruby をインストールしておく

ダウンロード
[http://rubyinstaller.org/downloads/](http://rubyinstaller.org/downloads/ "Rubyダウンロード　http://rubyinstaller.org/downloads/")


最新版 rubyinstaller-2.1.5 .exe をダウンロード
インストール

「インストール先とオプションの指定」画面で、「Ruby の実行ファイルに環境変数 PATH を設定する」にチェックを入れる

他はデフォルトのインストール要件でインストール

参考サイト
[http://www.rubylife.jp/install/install/index1.html#section2](http://www.rubylife.jp/install/install/index1.html#section2 "Rubyインストール　http://www.rubylife.jp/install/install/index1.html#section2")


コマンドプロンプトでバージョン確認

    ruby –v
    ruby 2.1.5p273 (2014-11-13 revision 48405) [i386-mingw32]
    gem –v
    2.2.2

再起動
##③Bundler, Compass インストール

gem を最新版に更新し、 Bundler と Compass をインストールする

    gem update –system
    gem install bundler
    gem install compass

ここでおそらくエラーが出ると思いますので下記サイト参照して、下記手順を行う。

参照　
[http://qiita.com/shimoju/items/394818b4989b94680aaf](http://qiita.com/shimoju/items/394818b4989b94680aaf "bundler compassインストール　http://qiita.com/shimoju/items/394818b4989b94680aaf")

手順

新しい証明書ファイルをダウンロードする

Step 1: Obtain the new trust certificateから、「AddTrustExternalCARoot-2048.pem」を右クリックし名前を付けて保存でダウンロードする。
.pemという拡張子でなければならないので、きちんとこの拡張子でダウンロードされているか確認する。

Step 2. RubyGemsがあるフォルダに移動するC:/Ruby21/lib/ruby/2.1.0/rubygemsに移動する

Step 3. ダウンロードした証明書ファイルをコピーする

移動したフォルダにssl_certsフォルダがあるので、ダウンロードした「AddTrustExternalCARoot-2048.pem」をそこにコピーする。

Step ４．コピーできれば、コマンド　プロンプトで、③Bundler, Compass をインストールする。

##④Git インストール

Bower を使用するのに Git が必要なので、 Git for Windows をインストールしておく。
ダウンロード
[http://msysgit.github.io/](http://msysgit.github.io/ "githubダウンロード　http://msysgit.github.io/")


最新版 Git-1.9.5-preview20141217.exeをダウンロード

インストール


参照：
[http://codezine.jp/article/detail/7077?p=2](http://codezine.jp/article/detail/7077?p=2 "githubインストール　http://codezine.jp/article/detail/7077?p=2")


インストール途中 “Adjusting your PATH environment” の画面でコマンドライン使用について聞いてくるので、 “Use Git from the Windows Command Prompt” を選択する

他はデフォルトのインストール要件でインストール

再起動

バージョン確認

    git  --version
    git version 1.9.5.msysgit.0

###⑤Yeoman インストール

npmを使用してyo, grunt, bowerをインストールする。

    npm install -g yo grunt-cli bower

コマンド　プロンプトで、ディレクトリ作成

    cd c:\
    mkdir project & cd project

これで、ｃ直下にprojectホルダーができる。

次に、GITのコマンドプロンプトで、Yeomanをwebappする。

    cd c:\project
    npm install -g generator-webapp
    yo webapp
    npm install && bower install

##以上で、Yeomanの環境が完了します。
なお、このサイトをgrunt serveするには、以下が必要です。

    bower install arctext-js --save
    npm install --save imagemin-jpegtran
    npm install --save grunt-contrib-uglify
    npm install --save grunt-mocha
    npm install --save grunt-usemin
    npm install --save grunt-wiredep


    grunt serve
