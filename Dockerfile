FROM land007/tfjs-html:latest

MAINTAINER Yiqiu Jia <yiqiujia@hotmail.com>

RUN . $HOME/.nvm/nvm.sh && cd / && npm install ws

#ADD rtsp-mjpeg_node /node
#WORKDIR /node
#CMD /etc/init.d/ssh start && node /node/lxps.js

#docker stop posenet ; docker rm posenet ; docker run -it --privileged -p 8081:8081 --name postnet land007/tfjs-posenet:latest
