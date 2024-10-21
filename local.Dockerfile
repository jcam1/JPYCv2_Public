FROM node:20.11.1-bookworm-slim

ARG UID=1001
ARG GID=1001

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y \
    curl \
    wget \
    git \
    sudo \
    locales && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# 日本語ロケールの設定
RUN localedef -f UTF-8 -i ja_JP ja_JP.UTF-8
ENV LANG=ja_JP.UTF-8 \
    LANGUAGE=ja_JP:ja \
    LC_ALL=ja_JP.UTF-8

# 非rootユーザーを作成
RUN groupadd -g $GID appuser || groupmod -g $GID $(getent group $GID | cut -d: -f1)
RUN useradd -m -u $UID -g $GID -s /bin/bash appuser || usermod -u $UID -g $GID appuser

# sudoの設定
RUN echo "appuser ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/appuser

USER appuser
WORKDIR /workspace

# pnpmのインストール
RUN curl -fsSL https://get.pnpm.io/install.sh | bash -
ENV PATH="/home/appuser/.local/share/pnpm:$PATH"

# foundryのインストール
RUN curl -L https://foundry.paradigm.xyz | bash
ENV PATH="/home/appuser/.foundry/bin:$PATH"
RUN foundryup

# VS Code Server用のディレクトリ作成
RUN mkdir -p /home/appuser/.vscode-server

# シェル設定の追加
RUN echo "export LANG=ja_JP.UTF-8" >> /home/appuser/.bashrc
RUN echo "cd /workspace" >> /home/appuser/.bashrc

# デバッグ用：ユーザー情報の表示
RUN id && echo $PATH