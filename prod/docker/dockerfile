FROM alpine

MAINTAINER Harsh Kasyap<harshkasyap@gmail.com>

# install dependencies
RUN apk update && apk upgrade
RUN apk add npm 
RUN apk add git 
RUN apk add openssh-client
RUN apk add tzdata

# set your timezone
RUN ln -fs /usr/share/zoneinfo/Asia/Kolkata /etc/localtime
RUN apk del tzdata

RUN git clone --single-branch --branch master https://github.com/harshkasyap/FileServer.git
RUN apk del git
RUN apk del openssh-client
RUN npm --prefix FileServer i FileServer
CMD npm --prefix FileServer start 5110

EXPOSE 5110

# Help and Instructions

# If you have docker installed, You can run this and have FileServer Up And Running
# docker run -d -p 5110:5110 --rm -v ShareLocation:/FileServer/Share -it harshkasyap/fileserver:v1.1
# Keep Your ShareLocation above where you want to keep the files.
# Ready to run in local Network as ip_address:5110


# And, If you want to build it locally with some custom modifications, Play with this dockerfile
# docker build -t <image_name:tag> .
# Run it from where you have kept dockerfile. to build the docker image.
# docker run -d -p 5110:5110 --rm -v ShareLocation:/FileServer/Share -it <image_name:tag>
# Keep Your ShareLocation above where you want to keep the files.
# Ready to run in local Network as ip_address:5110
# Change port number if required (at all places in dockerfile)

# You can change Host Port in either case in left side in docker ruun command. like 6000:5110