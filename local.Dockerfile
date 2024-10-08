FROM node:20.11.1-bookworm-slim

ARG UID=1001
ARG GID=1001

RUN apt update && apt upgrade -y
RUN apt install -y \
      curl \
      wget \
      git \
      sudo
 
# bashで日本語が表示されるようにする
RUN apt install -y locales
RUN localedef -f UTF-8 -i ja_JP ja_JP
RUN echo "export LANG=ja_JP.UTF-8" >> /etc/bash.bashrc

# 非rootユーザーを作成
RUN groupadd -g $GID appuser || groupmod -g $GID $(getent group $GID | cut -d: -f1)
RUN useradd -m -u $UID -g $GID -s /bin/bash appuser || usermod -u $UID -g $GID appuser

USER appuser
WORKDIR /workspace
# pnpm
RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -
# foundry
RUN curl -L https://foundry.paradigm.xyz | bash
ENV PATH=/home/appuser/.foundry/bin:$PATH
RUN foundryup

# 必要なディレクトリを作成し、権限を設定
RUN mkdir -p /home/appuser/.vscode-server && \
    chown -R $UID:$GID /home/appuser && \
    chmod -R 755 /home/appuser

RUN cat /etc/passwd