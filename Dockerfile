FROM node
# 维护者信息
MAINTAINER lipy "lipy@163.com"
# 将Dockerfile上下文中的nginx.repo复制到容器中的yum源位置
copy ./ /home/GoodsServer/
WORKDIR /home/GoodsServer/
# 暴露80端口
EXPOSE 7000

ENTRYPOINT ["node","server.js"]
#ENTRYPOINT ["/bin/bash"]