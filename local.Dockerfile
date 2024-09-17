FROM node:20.11.1-bookworm-slim

RUN apt update && apt upgrade -y
RUN apt install -y \
      curl \
      wget \
      git

# bashで日本語が表示されるようにする
RUN apt install -y locales
RUN localedef -f UTF-8 -i ja_JP ja_JP
RUN echo "export LANG=ja_JP.UTF-8" >> ~/.bashrc
# pnpm
RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -
# foundry
RUN curl -L https://foundry.paradigm.xyz | bash
ENV PATH=/root/.foundry/bin:$PATH
RUN foundryup